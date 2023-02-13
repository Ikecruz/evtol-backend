import { PrismaClient, State } from "@prisma/client";
import { isIn, isMongoId } from "class-validator";
import { StatusCodes } from "http-status-codes";
import database from "../database";
import CreateEvtolDto from "../dtos/create-evtol.dto";
import HttpException from "../utils/exception";

export default class EvtolService {

    private ormService: PrismaClient

    constructor () {
        this.ormService = database.getClient()
    }

    async list () {

        return this.ormService.evtol.findMany({})

    }

    async create (createEvtolDto: CreateEvtolDto) {

        const nameExists = await this.ormService.evtol.findFirst({
            where: {
                serial_number: createEvtolDto.serial_number
            }
        })

        if (nameExists) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                "Evtol already exists"
            )
        }
        
        return await this.ormService.evtol.create({
            data: {
                serial_number: createEvtolDto.serial_number,
                model: createEvtolDto.model,
                weight_limit: createEvtolDto.weight_limit,
                battery_capacity: createEvtolDto?.battery_capacity
            }
        })

    }

    async findOne (id: string) {

        if (!isMongoId(id)) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                "Record not found"
            )
        }

        const evtol = await this.ormService.evtol.findUnique({
            where: {
                id
            },
            include: {
                trips: {
                    where: {
                        is_active: true
                    },
                    select: {
                        medications: true
                    }
                }
            }
        })

        if (!evtol) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                "Record not found"
            )
        }

        return {
            ...evtol,
            medications: evtol.trips.map(ev => ev.medications)[0]
        };

    }

    async findByState (state: State) {

        if (!isIn(state, Object.values(State))) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                "Invalid Evtol State"
            )
        }

        return await this.ormService.evtol.findMany({
            where: {
                state: state
            }
        })

    }

}
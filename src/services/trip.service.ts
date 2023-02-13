import { PrismaClient, State } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import database from "../database";
import CreateTripDto from "../dtos/create-trip.dto";
import HttpException from "../utils/exception";
import EvtolService from "./evtol.service";

export default class TripService {

    private ormService: PrismaClient;
    private evtolService: EvtolService;

    constructor () {
        this.evtolService = new EvtolService()
        this.ormService = database.getClient()
    }

    async list () {
        return await this.ormService.trip.findMany({
            include: {
                evtol: true,
                medications: true
            }
        })
    }

    async create (createTripDto: CreateTripDto) {

        const evtol = await this.evtolService.findOne(createTripDto.evtol_id)

        const medications = await this.ormService.medication.findMany({
            where: {
                id: {
                    in: createTripDto.medications
                }
            }
        })

        if (medications.length === 0) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                "Records not found"
            )
        }

        if (evtol.battery_capacity < 25) {
            throw new HttpException(
                StatusCodes.CONFLICT,
                "Battery level too low for loading."
            )
        }

        const medicationsWeight = medications.reduce((a, b) => a + b.weight, 1)

        if (medicationsWeight > evtol.weight_limit) {
            if (evtol.battery_capacity < 25) {
                throw new HttpException(
                    StatusCodes.CONFLICT,
                    "Medications weight exceeds eVTOL weight limit."
                )
            }
        }

        const trip = await this.ormService.trip.create({
            data: {
                evtol_id: createTripDto.evtol_id,
                medication_id: medications.map(m => m.id)
            }
        })

        const evtolUpdate = await this.ormService.evtol.update({
            where: {
                id: createTripDto.evtol_id
            },
            data: {
                state: State.LOADED
            }
        })

        if (!trip && !evtolUpdate) {
            throw new HttpException(
                StatusCodes.CONFLICT,
                "Error creating trip"
            )
        }

        return trip

    }

}
import { PrismaClient } from "@prisma/client";
import { isMongoId } from "class-validator";
import { StatusCodes } from "http-status-codes";
import database from "../database";
import CreateMedicationDto from "../dtos/create-medication.dto";
import HttpException from "../utils/exception";
import MediaService from "./media.service";

export default class MedicationService {

    private mediaService: MediaService;
    private ormService: PrismaClient

    constructor () {
        this.mediaService = new MediaService()
        this.ormService = database.getClient()
    }

    async list () {

        return await this.ormService.medication.findMany()

    }

    async findOne (id: string) {

        if (!isMongoId(id)) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                "Record not found"
            )
        }

        const medication = await this.ormService.medication.findUnique({
            where: {
                id
            }
        })

        if (!medication) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                "Record not found"
            )
        }

        return medication

    }

    async create(createMedicationDto: CreateMedicationDto, image: Express.Multer.File) {
        const nameExists = await this.ormService.medication.findFirst({
            where: {
                name: createMedicationDto.name
            }
        })

        if (nameExists) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                "Medication already exists"
            )
        }

        const uploadedImage = await this.mediaService.uploadImage(image, 'images/medication')

        return await this.ormService.medication.create({
            data: {
                name: createMedicationDto.name,
                code: createMedicationDto.code,
                image: uploadedImage.url,
                weight: createMedicationDto.weight
            }
        })
    }

    async remove (id: string) {

        await this.findOne(id)

        return this.ormService.medication.delete({
            where: { id }
        })

    }

}
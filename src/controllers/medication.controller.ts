import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MedicationService from "../services/medication.service";
import fs from "fs"
import path from "path"

export default class MedicationController {

    private medicationService: MedicationService

    constructor () {
        this.medicationService = new MedicationService()
    }

    public list = async (
        request: Request, 
        response: Response, 
        next: NextFunction
    ) => {

        try {
            const res = await this.medicationService.list()
            response.status(StatusCodes.OK).send(res)
        } catch (error) {
            next(error)
        }

    }

    public create = async (
        request: Request, 
        response: Response, 
        next: NextFunction
    ) => {

        try {
            const res = await this.medicationService.create(request.body, request.file as Express.Multer.File)
            response.status(StatusCodes.CREATED).send(res)
        } catch (error) {
            next(error)
        } finally {
            fs.unlink(path.resolve(request?.file?.path as string), () => {})
        }

    }

    public delete = async (
        request: Request, 
        response: Response, 
        next: NextFunction
    ) => {

        try {
            
            const res = await this.medicationService.remove(request.params.id)
            response.status(StatusCodes.OK).send(res)

        } catch (error) {
            next(error)
        }

    }

}
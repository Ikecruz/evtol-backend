import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TripService from "../services/trip.service";

export default class TripController {

    private tripService: TripService;

    constructor () {
        this.tripService = new TripService()
    }

    public list = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            
            const res = await this.tripService.list()
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
            
            const res = await this.tripService.create(request.body)
            response.status(StatusCodes.CREATED).send(res)

        } catch (error) {
            next(error)
        }

    }

}
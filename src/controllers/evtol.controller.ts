import { State } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import EvtolService from "../services/evtol.service";

export default class EvtolController {

    public evtolService: EvtolService;

    constructor() {
        this.evtolService = new EvtolService()
    }

    public list = async ( 
        request: Request, 
        response: Response, 
        next: NextFunction 
    ) => {

        try {
            
            const res = await this.evtolService.list()
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
            
            const res = await this.evtolService.create(request.body)
            response.status(StatusCodes.CREATED).send(res)

        } catch (error) {
            next(error)
        }

    }

    public findOne = async ( 
        request: Request, 
        response: Response, 
        next: NextFunction 
    ) => {

        try {
            
            const res = await this.evtolService.findOne(request.params.id)
            response.status(StatusCodes.OK).send(res)

        } catch (error) {
            next(error)
        }

    }

    public findByState = async ( 
        request: Request, 
        response: Response, 
        next: NextFunction 
    ) => {

        try {
            
            const res = await this.evtolService.findByState(request.params.state as State)
            response.status(StatusCodes.OK).send(res)

        } catch (error) {
            next(error)
        }

    }

}
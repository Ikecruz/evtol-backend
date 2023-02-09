import { NextFunction, request, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AuthService from "../services/auth.service";

export default class AuthController {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService()
    }

    public login = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.authService.login(request.body)
            response.status(StatusCodes.OK).send(res)
        } catch (error) {
            next(error)
        }
    }

}
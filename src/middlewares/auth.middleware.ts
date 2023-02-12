import { User } from "@prisma/client";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import database from "../database";
import AuthService from "../services/auth.service";
import HttpException from "../utils/exception";

const authMiddleware: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const token = req.headers.authorization?.split(' ')[1]
        const authService = new AuthService()
        const ormServices = database.getClient()

        if (!token) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                'Unauthorized'
            )
        }

        const userPayload = authService.verifyJwt(token)

        if (!userPayload) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                'Invalid Token'
            )
        }

        const user = await ormServices.user.findFirst({
            where: {
                id: userPayload.id
            }
        })

        req.authUser = user as User

        next()
    } catch (error) {
        next(error)
    }


}

export default authMiddleware
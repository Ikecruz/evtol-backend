import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import db from "../database"
import HttpException from '../utils/exception';
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../config';
import { PrismaClient } from '@prisma/client';
import LoginDto from '../dtos/login.dto';

export default class AuthService {

    private ormService: PrismaClient;

    constructor () {
        this.ormService = db.getClient()
    }

    public async login (loginDto: LoginDto) {
        const user = await this.ormService.user.findFirst({
            where: {
                email: loginDto.email
            }
        })

        if (!user) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                'Record not found'
            )
        }

        const passwordCorrect = await this.passwordsMatch(user?.password as string, loginDto.password)

        if (!user && !passwordCorrect) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Password incorrect'
            )
        }

        const token = this.signJwt(user.id)

        return { user, token }

    }

    public signJwt ( id: string | object | Buffer  ) {
        return jwt.sign(
            {id},
            JWT_SECRET_KEY as string,
            { expiresIn: JWT_EXPIRES_IN }
        )
    }

    public verifyJwt ( token: string ) {
        return jwt.verify(token, JWT_SECRET_KEY as string) as {id: string}
    }

    public async hashPassword (password: string) {
        return await bcrypt.hash(password, 10)
    }

    private async passwordsMatch (currentPassword: string, newPassword: string): Promise<boolean> {
        return await bcrypt.compare(currentPassword, newPassword)
    }

}
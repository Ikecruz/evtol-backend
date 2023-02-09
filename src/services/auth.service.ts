import * as bcrypt from 'bcrypt';
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
        const userFromDb = await this.ormService.user.findFirst({
            where: {
                email: loginDto.email,
                
            }
        })

        if (!userFromDb) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                'Record not found'
            )
        }

        const passwordCorrect = await this.passwordsMatch(userFromDb.password as string, loginDto.password)

        if (!userFromDb || !passwordCorrect) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'Password incorrect'
            )
        }

        const token = this.signJwt(userFromDb.id)

        const { password, ...user  } = userFromDb

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
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }

    private async passwordsMatch (passwordFromDb: string, loginPassword: string): Promise<boolean> {
        return await bcrypt.compare(loginPassword, passwordFromDb)
    }

}
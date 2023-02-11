import cors from 'cors';
import express, { Application, Request } from "express";
import { StatusCodes } from 'http-status-codes';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME, PORT } from './config';
import { IRoute } from './interfaces/route.interface';
import errorMiddleware from './middlewares/error.middleware';
import morganMiddleware from './middlewares/morgan.middleware';
import { logger } from './utils/logger';
import db from "./database"
import { v2 as cloudinary } from "cloudinary"

export default class App {

    public app: Application;
    public port: string | number;
    private db: typeof db;

    constructor(routes: IRoute[]) {
        this.app = express();
        this.port = PORT || 8000;
        this.db = db;
        this.initializeMiddlewares()
        this.initializeRoutes(routes)
        this.initializeCloudinary()
        this.initializeErrorHandling()
        this.initializeDatabase()
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            logger.info(`⚡️[server]: Server is running @ http://localhost:${this.port}`)
        })
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(cors<Request>());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morganMiddleware)
    }

    private initializeRoutes(routes: IRoute[]): void {
        this.app.get('/', (req, res) => res.status(StatusCodes.OK).send("Welcome to my backend application"))

        routes.forEach(route => {
            this.app.use(route.router)
        })
    }

    private async initializeDatabase() {

        try {

            await this.db.connect()
            logger.info(`🛢️  [Database]: Database connected`)

        } catch (error) {
            logger.error(`🛢️  [Database]: Database connection failed`)
        }

    }

    private async initializeCloudinary() {
        cloudinary.config({
            cloud_name: CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET
        })

        logger.info(`🖼️ [cloudinary]: Cloudinary configured`)
    }

    private async initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }

}
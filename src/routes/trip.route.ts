import { Router } from "express";
import TripController from "../controllers/trip.controller";
import CreateTripDto from "../dtos/create-trip.dto";
import ErrorMessage from "../enums/validation.error.enum";
import { IRoute } from "../interfaces/route.interface";
import authMiddleware from "../middlewares/auth.middleware";
import dtoValidationMiddleware from "../middlewares/validation.middleware";

export default class TripRoute implements IRoute {
    public path: string;
    public router: Router;
    public tripController: TripController

    constructor () {
        this.path = "/trip"
        this.router = Router()
        this.tripController = new TripController()
        this.initializeRoutes()
    }

    private initializeRoutes () {

        this.router.get(
            this.path,
            authMiddleware,
            this.tripController.list
        )

        this.router.post(
            this.path,
            authMiddleware,
            dtoValidationMiddleware(CreateTripDto, "body", ErrorMessage.FIELDS),
            this.tripController.create
        )

    }
}
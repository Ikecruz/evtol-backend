import { Router } from "express";
import EvtolController from "../controllers/evtol.controller";
import CreateEvtolDto from "../dtos/create-evtol.dto";
import ErrorMessage from "../enums/validation.error.enum";
import { IRoute } from "../interfaces/route.interface";
import authMiddleware from "../middlewares/auth.middleware";
import dtoValidationMiddleware from "../middlewares/validation.middleware";

export default class EvtolRoute implements IRoute{

    public path: string;
    public router: Router;
    public evtolController: EvtolController

    constructor () {

        this.path = "/evtol";
        this.router = Router()
        this.evtolController = new EvtolController()
        this.initializeRoutes()

    }

    private initializeRoutes () {

        this.router.get(
            this.path,
            authMiddleware,
            this.evtolController.list
        )

        this.router.get(
            `${this.path}/:id`,
            authMiddleware,
            this.evtolController.findOne
        )

        this.router.get(
            `${this.path}/:state`,
            authMiddleware,
            this.evtolController.findByState
        )

        this.router.post(
            this.path,
            authMiddleware,
            dtoValidationMiddleware(CreateEvtolDto, "body", ErrorMessage.FIELDS),
            this.evtolController.create
        )

    }

}
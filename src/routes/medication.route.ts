import { Router } from "express";
import MedicationController from "../controllers/medication.controller";
import CreateMedicationDto from "../dtos/create-medication.dto";
import ErrorMessage from "../enums/validation.error.enum";
import { IRoute } from "../interfaces/route.interface";
import authMiddleware from "../middlewares/auth.middleware";
import dtoValidationMiddleware from "../middlewares/validation.middleware";
import multer from "../utils/multer";

export default class MedicationRoute implements IRoute {
    public path: string;
    public router: Router;
    public medicationController: MedicationController;

    constructor () {
        this.path = "/medication"
        this.router = Router()
        this.medicationController = new MedicationController()
        this.initializeRoutes()
    }

    private initializeRoutes() {

        this.router.get(
            this.path,
            authMiddleware,
            this.medicationController.list
        )

        this.router.post(
            this.path,
            authMiddleware,
            multer.single('image'),
            dtoValidationMiddleware(CreateMedicationDto, "body", ErrorMessage.FIELDS),
            this.medicationController.create
        )

        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            this.medicationController.delete
        )

    }

}
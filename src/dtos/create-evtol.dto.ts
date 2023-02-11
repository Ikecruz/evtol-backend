import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import EvtolModel from "../enums/evtol-model.enum";

export default class CreateEvtolDto {

    @IsString()
    @IsNotEmpty()
    serial_number: string

    @IsString()
    @IsNotEmpty()
    @IsIn(Object.values(EvtolModel))
    model: string

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    weight_limit: number

    @IsNumber()
    @IsOptional()
    battery_capacity?: number

}
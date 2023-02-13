import { Model } from "@prisma/client";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export default class CreateEvtolDto {

    @IsString()
    @IsNotEmpty()
    serial_number: string

    @IsString()
    @IsNotEmpty()
    @IsIn(Object.values(Model))
    model: Model

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    weight_limit: number

    @IsNumber()
    @IsOptional()
    battery_capacity?: number

}
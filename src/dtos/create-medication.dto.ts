import { Transform, Type } from "class-transformer";
import "reflect-metadata"
import { IsInt, IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString, IsUppercase } from "class-validator";

export default class CreateMedicationDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @Type(() => Number)
    @IsInt()
    weight: number

    @IsString()
    @IsUppercase()
    @IsNotEmpty()
    code: string

}
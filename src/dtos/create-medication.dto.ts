import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUppercase } from "class-validator";

export default class CreateMedicationDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    weight: number

    @IsString()
    @IsUppercase()
    @IsNotEmpty()
    code: string

}
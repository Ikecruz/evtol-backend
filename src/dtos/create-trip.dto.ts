import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export default class CreateTripDto {

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    evtol_id: string

    @IsArray()
    @ArrayNotEmpty()
    @IsMongoId( { each: true } )
    medications: string[]

}
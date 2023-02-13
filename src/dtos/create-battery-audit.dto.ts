import { IsMongoId, IsString } from 'class-validator';
export default class CreateBatteryAuditDto {

    @IsString()
    @IsMongoId()
    evtol_id: string

}
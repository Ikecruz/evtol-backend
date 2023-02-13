import { PrismaClient } from "@prisma/client";
import database from "../database";
import CreateBatteryAuditDto from "../dtos/create-battery-audit.dto";

export default class AuditService {

    private ormService: PrismaClient;

    constructor() {
        this.ormService = database.getClient()
    }

    async createBatteryAudit (dto: CreateBatteryAuditDto[]) {

        return await this.ormService.batteryAudit.createMany({
            data: dto
        })

    }

}
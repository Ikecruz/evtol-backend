import { schedule } from "node-cron";
import { logger } from "../utils/logger";
import AuditService from "./audit.service";
import EvtolService from "./evtol.service";

export default class CronService {

    private evtolService: EvtolService;
    private auditService: AuditService;

    constructor () {
        this.evtolService =  new EvtolService()
        this.auditService = new AuditService()
    }

    private start (date: string, func: () => void) {
        schedule(date, func)
    }

    async batteryAudit () {

        const evtols = (await this.evtolService.list()).map(ev => {
            return { evtol_id: ev.id }
        })

        this.start( "0 0 0 * * *", async () => {

            try {
                const audit = await this.auditService.createBatteryAudit(evtols)
                logger.info(`📝 [Audit]: Battery audit logged`)
                console.log(audit)
            } catch (error) {
                console.log(error)
                logger.error(`📝 [Audit]: Error logging battery audit`)
            }

        })

    }

}
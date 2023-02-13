import App from "./app"
import AuthRoute from "./routes/auth.route"
import EvtolRoute from "./routes/evtol.route"
import MedicationRoute from "./routes/medication.route"
import TripRoute from "./routes/trip.route"
import CronService from "./services/cron.service"

async function bootstrap() {

    const app = new App([
        new AuthRoute(),
        new MedicationRoute(),
        new EvtolRoute(),
        new TripRoute()
    ])
    
    const cron = new CronService()
    await cron.batteryAudit()
    
    app.listen()
}

bootstrap()
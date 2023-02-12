import App from "./app"
import AuthRoute from "./routes/auth.route"
import MedicationRoute from "./routes/medication.route"

const app = new App([
    new AuthRoute(),
    new MedicationRoute()
])

app.listen()
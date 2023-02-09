import { PrismaClient } from "@prisma/client";
import AuthService from "../../services/auth.service";
import { logger } from "../../utils/logger";

const prisma = new PrismaClient()
const authService = new AuthService()

async function main() {

    try {

        const password = await authService.hashPassword("ikecruz")

        await prisma.user.upsert({
            where: {
                email: "ikedinobicruz7@gmail.com",
            },
            update: {},
            create: {
                email: "ikedinobicruz7@gmail.com",
                password: password
            }
        })

    } catch (error) {
        logger.error("Error seeding database")
        console.log(error)
    }

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        logger.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
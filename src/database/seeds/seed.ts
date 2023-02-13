import { Evtol, Medication, PrismaClient } from "@prisma/client";
import AuthService from "../../services/auth.service";
import { logger } from "../../utils/logger";
import { readFile } from "node:fs/promises"

const prisma = new PrismaClient()
const authService = new AuthService()

async function main() {

    // ADMIN SEED
    try {

        logger.info(`🌱 [Seeding]: Admin seed is running`)

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
        
        logger.info(`🌱 [Seeding]: Admin seed complete`)

    } catch (error) {
        logger.error(`🌱 [Seeding]: Admin seed failed`)
        console.log(error)
    }
    // ADMIN SEED END

    // EVTOL SEED
    try {
        
        logger.info(`🌱 [Seeding]: Evtol is running`)

        const data = await readFile(
            __dirname + '/evtol.json',
            'utf-8',
        )

        const json: Evtol[] = JSON.parse(data)

        json.forEach(async (ev) => {
            try {

                await prisma.evtol.upsert({
                    where: {
                        serial_number: ev.serial_number
                    },
                    create: {
                        serial_number: ev.serial_number,
                        model: ev.model,
                        weight_limit: ev.weight_limit
                    },
                    update: {}
                })

            } catch (error) {
                logger.warn(`🌱 [Seeding]: Seeding Error`)
            }
        });

        logger.info(`🌱 [Seeding]: Evtol seed complete`)

    } catch (error) {
        logger.error(`🌱 [Seeding]: Evtol seed failed`)
        console.log(error)
    }
    // EVTOL SEED END

    // MEDICATION SEED
    try {
        
        logger.info(`🌱 [Seeding]: Medication is running`)

        const data = await readFile(
            __dirname + '/medication.json',
            'utf-8',
        )

        const json: Medication[] = JSON.parse(data)

        json.forEach(async (md) => {
            try {

                await prisma.medication.upsert({
                    where: {
                        name: md.name
                    },
                    update: {},
                    create: {
                        name: md.name,
                        weight: md.weight,
                        code: md.code,
                        image: md.image
                    }
                })

            } catch (error) {
                logger.warn(`🌱 [Seeding]: Seeding Error`)
            }
        });

        logger.info(`🌱 [Seeding]: Medication seed complete`)

    } catch (error) {
        logger.error(`🌱 [Seeding]: Medication seed failed`)
        console.log(error)
    }
    // MEDICATION SEED END

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
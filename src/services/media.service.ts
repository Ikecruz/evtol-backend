import { v2 } from "cloudinary"

export default class MediaService {

    async uploadImage (
        file: Express.Multer.File,
        folder: string
    ) {
        return new Promise((resolve, reject) => {
            return v2.uploader.upload(file.path, { folder }, (error, value) => {
                if (error) reject(error)
                resolve(value)
            })
        })
    }

}
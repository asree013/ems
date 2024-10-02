import { enviromentDev } from "@/configs/enviroment.dev";
import { endpoint } from "./endpoint.service";

export function uploadImage(file: FormData) {
    try {
        return endpoint.post(enviromentDev.upload_image, file, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });
    } catch (error) {
        throw error
    }
}
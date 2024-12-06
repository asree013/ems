import { enviromentDev } from "@/configs/enviroment.dev";
import { endpoint } from "./endpoint.service";
import imageCompression from 'browser-image-compression';

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

export async function uploadBase64Image(file: File) {
    const imageFile = file;
    const newImage = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
    })
    console.log(String(newImage).length);

    // console.log();
    // console.log();
    // console.log();
    // console.log();


    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 380,
        useWebWorker: true,
        maxIteration: 30,            // จำกัดจำนวนการลองบีบอัด 10 ครั้ง
        initialQuality: 0.2,         // กำหนดคุณภาพเริ่มต้นที่ 20% เพื่อให้ภาพมีขนาดเล็กลง
        alwaysKeepResolution: false, // ไม่ต้องคงความละเอียดไว้
        preserveExif: false,
    }
    try {
        const compressedFile = await imageCompression(imageFile, options);
        const resultImage = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
        })
        console.log(String(resultImage).length);

        return resultImage
    } catch (error) {
        throw error
    }
}
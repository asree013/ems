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
    ///เอาไว้log ขนาด base64 ก่อน ลดขนาด
    const imageFile = file;
    const newImage = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
    })
    console.log('ขนาด base64 ก่อน ลดขนาด: ', String(newImage).length);

    ///setting เพื่อลดขนาด base 64
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 380,
        useWebWorker: true,
        maxIteration: 30,            // จำกัดจำนวนการลองบีบอัด 30 ครั้ง
        initialQuality: 0.4,         // กำหนดคุณภาพเริ่มต้นที่ 40% เพื่อให้ภาพมีขนาดเล็กลง
        alwaysKeepResolution: false, // ไม่ต้องคงความละเอียดไว้
        preserveExif: false,
    }
    try {
        ///เอาไว้log ขนาด base64 หลัง ลดขนาด
        const compressedFile = await imageCompression(imageFile, options);
        const resultImage = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
        })
        console.log('ขนาด base64 หลัง ลดขนาด: ',String(resultImage).length);
        return resultImage as string
    } catch (error) {
        throw error
    }
}
import {Env} from "../lib/env.js";

export class CloudinaryApi {
    static async upload(fileData) {
        const formData = new FormData();
        formData.append('file', fileData)
        formData.append('upload_preset', 'my-uploads')
        const imgUpload = await fetch('https://api.cloudinary.com/v1_1/dfpldejtd/image/upload', {
            method: 'POST',
            body: formData
        })
        return await imgUpload.json();
    }

    static async delete(imgName) {
        if (typeof document === 'undefined') {
            import('cloudinary').then(async (cloudinary) => {
                cloudinary.config(JSON.parse(Env.getValue("VITE_CLOUDINARY_CONFIG")));
                await cloudinary.v2.uploader.destroy('my-uploads/' + imgName);
            })
        }
    }

    static getFileNameFromURL(url) {
        const fileName = url.split('/')[url.split('/').length - 1];
        return fileName.substr(0, fileName.lastIndexOf('.')) || fileName;
    }
}

export class Cloudinary {
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
}
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } from '../config';

cloudinary.config({
    cloud_name: CLOUDINARY_NAME || '',
    api_key: CLOUDINARY_KEY || '',
    api_secret: CLOUDINARY_SECRET || '',
});

function extractPublicId(url: string): string {
    try{
        const parts = url.split('/');
        const publicId = parts[parts.length - 1].split('.')[0];
        return publicId;
    }
    catch(err){
        throw err;
    }
}

export async function cloudinaryUpload( file: Express.Multer.File ): Promise<UploadApiResponse>{
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result:UploadApiResponse) => {
            if(result){
                resolve(result);
            }else{
                reject(error);
            }
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
}
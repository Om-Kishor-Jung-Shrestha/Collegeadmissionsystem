import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

type ResourceType = 'image' | 'video' | 'raw';

export async function uploadBuffer(buffer: Buffer, folder: string, resourceType: ResourceType = 'image'): Promise<{ public_id: string; secure_url: string; duration?: number }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: resourceType }, (err, result) => {
      if (err) {
        let error: Error;

        if (err instanceof Error) {
          error = err;
        } else if (typeof err === 'string') {
          error = new Error(err);
        } else {
          error = new Error('Upload failed');
        }

        return reject(error);
      }

      if (!result) return reject(new Error('Upload failed'));

      resolve({ public_id: result.public_id, secure_url: result.secure_url, duration: result.duration });
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

export async function deleteAsset(publicId: string, resourceType: ResourceType = 'image'): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export const cloudinaryService = {
  uploadImage: (buffer: Buffer, folder: string) => uploadBuffer(buffer, folder, 'image'),
  uploadVideo: (buffer: Buffer, folder: string) => uploadBuffer(buffer, folder, 'video'),
  deleteAsset,
};
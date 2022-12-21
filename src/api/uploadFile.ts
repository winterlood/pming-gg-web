import { api_types } from "@types";
import imageCompression from "browser-image-compression";
import { stroageAgent } from "./agent";
const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};
async function compressFile(file: File) {
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function uploadFile(
  file: File
): Promise<api_types.ImageUpload | null> {
  const compreseedFile = await compressFile(file);
  if (compreseedFile) {
    const form = new FormData();
    form.append("image", compreseedFile);
    return stroageAgent.post("upload", form).then((data) => data.data);
  } else {
    return null;
  }
}

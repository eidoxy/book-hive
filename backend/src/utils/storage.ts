import { Request } from 'express';
import multer from 'multer';
import path from 'path';

// ? : define the storage for the uploaded images
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, 'public/images');
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.mimetype.split('/')[1];
    cb(null, uniqueSuffix + '.' + fileExtension);
  },
});

export default storage;

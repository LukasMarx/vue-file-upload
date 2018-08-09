import { IncomingForm } from 'formidable';
import { Request, Response } from 'express';

export function upload(req: Request, res: Response) {
  const form = new IncomingForm();
  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    console.log('file', file.name);
  });
  form.on('end', () => {
    res.json();
  });
  form.parse(req);
}

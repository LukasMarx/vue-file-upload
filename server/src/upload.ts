import { IncomingForm } from 'formidable';
import { Request, Response } from 'express';
import fs, { ReadStream } from 'fs';

export function upload(req: Request, res: Response) {
  var form = new IncomingForm();
  let readStream: ReadStream;
  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    console.log('file', file.name);
    readStream = fs.createReadStream(file.path);
  });
  form.on('end', () => {
    readStream.pipe(res);
  });
  form.parse(req);
}

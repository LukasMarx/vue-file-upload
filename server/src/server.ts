import express from 'express';
import { upload } from './upload';
import cors from 'cors';

const server = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

server.post('/upload', upload);

server.listen(3000, () => {
  console.log('Server started!');
});

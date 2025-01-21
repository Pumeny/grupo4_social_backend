import express from 'express';
import morgan from 'morgan';
import  { v4 as uuidv4 } from 'uuid';

uuidv4();
const app = express();

let movies = [
    { id: '1', name: 'Matrix' },
    { id: '2', name: 'Star Wars' }
];

app.use(express.json());
app.use(morgan('tiny'));

// API

app.listen(3000, () => {
    console.log('Ready on port 3000!');
});
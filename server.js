import express from 'express';
import morgan from 'morgan';
import  { v4 as uuidv4 } from 'uuid';

const app = express();

let agricultores = [
    { id: '1', name: 'Josefo', lastname: "Sanz", description: "Soy super majo y vendo barato y de calidad", direction: "calle matata, 3", phoneNumber: "+342838392", mail: "josefinsanz@gmail.com"},
    { id: '2', name: 'María', lastname: "Gutierrez", description: "Me gusta cantar y bailar, comprame", direction: "calle sol, 5", phoneNumber: "+342844392", mail: "maría@gmail.com"}
];

app.use(express.json());
app.use(morgan('tiny'));

// API

app.post('/agricultores', (req, res) => {
    const agricultor = req.body;
    agricultor.id = uuidv4(); 
    agricultores.push(agricultor); 
    res.json(agricultor); 
});

//get all movies
app.get('/agricultores', (req, res) => {
    res.json(agricultores);
});

app.listen(3000, () => {
    console.log('Ready on port 3000!');
});
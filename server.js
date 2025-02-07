import express from 'express';
import morgan from 'morgan';
import  { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app = express();

let agricultores = [
    { id: '1', name: 'Josefo', lastname: "Sanz", description: "Soy super majo y vendo barato y de calidad", direction: "calle matata, 3", phoneNumber: "+342838392", mail: "josefinsanz@gmail.com"},
    { id: '2', name: 'María', lastname: "Gutierrez", description: "Me gusta cantar y bailar, comprame", direction: "calle sol, 5", phoneNumber: "+342844392", mail: "maría@gmail.com"}
];

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors()); // Habilitar CORS
// API

app.post('/agricultores', (req, res) => {
    console.log("Solicitud recibida:", req.body);
    const agricultor = req.body;
    agricultor.id = uuidv4(); 
    agricultores.push(agricultor); 
    res.json(agricultor); 
});

//get all agricultores
app.get('/agricultores', (req, res) => {
    res.json(agricultores);
});

// Endpoint para obtener el detalle de un agricultor por ID
app.get('/agricultores/:id', (req, res) => {
    const agricultorId = req.params.id; // Obtener el ID de los parámetros de la URL

    // Buscar el agricultor en la lista
    const agricultor = agricultores.find((agricultor) => agricultor.id === agricultorId);

    if (agricultor) {
        res.json(agricultor); // Enviar los datos del agricultor encontrado
    } else {
        res.status(404).json({ error: "Agricultor no encontrado" }); // Enviar error si no existe
    }
});

//opcionales:

// Endpoint para actualizar un agricultor
app.put('/agricultores/:id', (req, res) => {
    const agricultorId = req.params.id;
    const { name, lastname, description, direction, phoneNumber, mail } = req.body;

    // Buscar agricultor por ID
    const agricultor = agricultores.find((agricultor) => agricultor.id === agricultorId);

    if (!agricultor) {
        return res.status(404).json({ error: "Agricultor no encontrado" });
    }

    // Actualizar solo los campos enviados en la petición
    if (name) agricultor.name = name;
    if (lastname) agricultor.lastname = lastname;
    if (description) agricultor.description = description;
    if (direction) agricultor.direction = direction;
    if (phoneNumber) agricultor.phoneNumber = phoneNumber;
    if (mail) agricultor.mail = mail;

    res.json({
        message: "Agricultor actualizado con éxito",
        updatedAgricultor: agricultor,
    });
});

// Endpoint para eliminar un agricultor
app.delete('/agricultores/:id', (req, res) => {
    const agricultorId = req.params.id;

    // Buscar la posición del agricultor en el array
    const index = agricultores.findIndex((agricultor) => agricultor.id === agricultorId);

    if (index === -1) {
        return res.status(404).json({ error: "Agricultor no encontrado" });
    }

    // Eliminar agricultor del array
    agricultores.splice(index, 1);

    res.json({ message: "Agricultor eliminado con éxito" });
});

app.listen(3000, () => {
    console.log('Ready on port 3000!');
});


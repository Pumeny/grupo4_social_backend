import express from 'express';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const dbName = 'social_group_DB';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors()); // Habilitar CORS

const mongoUrl = 'mongodb://localhost:27017/';
let db;

MongoClient.connect(mongoUrl, {useNewUrlParser: true, useUniFiedTopology: true})
    .then(client => {
        console.log('Conectado a MongoDB');
        db = client.db(dbName);
    })
    .catch(err => {
        console.error('Error al conectar MongoDB:', err);
    });

// API
app.post('/agricultores', (req, res) => {
    const agricultor = req.body;
    agricultor.id = uuidv4();
    agricultor.createdAt = new Date();
    agricultor.updatedAt = new Date();
    createAgricultor(agricultor); // TODO esta funcion tiene que estar declarada antes del endpoint post
    res.json(agricultor);
});
//  let peticion = req.body;  try {
//Connect to the "insertDB" database and access its "haiku" collection
//const database = client.db("social_group_DB");
//const agricultores = database.collection("agricultores");
// Create a document to insert
/*const doc = {
        fotoPerfil: "url",
        nombre:peticion.nombre,
         apellido:peticion.apellido,
         direccion:peticion.direccion,
         telefono:peticion.telefono,
         email:peticion.email,
         //Espacio / Huerta
         localizacion:peticion.localizacion,
         horario:peticion.horarios,
         descripcion:peticion.descripcion,
        //Espacio / Productos
        tipoCaja:peticion.tipoCaja,
        disponibilidad:peticion.disponibilidad,
        precio:peticion.precio,
        envioRecogida:peticion.envioRecogida,
        tipoPago:peticion.tipoPago,
        },
        const result = await agricultores.insertOne(doc);
        // console.log("Solicitud recibida:", req.body);
//const agricultor = req.body;
//agricultor.id = uuidv4();
//agricultores.push(agricultor);
//res.status(201);
//});*/

//get all agricultores
// TODO const getAgricultores = ('/agricultores') => { esto lo quite por que no puedes pasar un string como parametro
// TODO he quitado el parametro, pero si esto es un endpoint revisalo xq no es correcta la definicion
const getAgricultores = () => {
    return new Promise((resolve, reject) => {
        agricultoresColection.find().toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

// Endpoint para obtener el detalle de un agricultor por ID
// TODO: tenian esto /agricultor/:id en el parametro, pero no es correcto, lo cambie a agriculotorId
// TODO: creo que lo que quieren hacer aqui es un endpoint para obtener 1 solo agricultor por id, revisen la forma de definir los endpoints
function getAgricultor(agricultorId) {
    return new Promise((resolve, reject) => {
        agricultoresColection.findOne({_id: ObjectId(agricultorId)})
            .then(agricultor => resolve(agricultor))
            .catch(errorFind => reject(errorFind));
    });
}

//, //(req, res) => {
//const agricultorId = req.params.id; // Obtener el ID de los parámetros de la URL
// Buscar el agricultor en la lista
// const agricultor = agricultores.find((agricultor) => agricultor.id === agricultorId);

// if (agricultor) {
// res.json(agricultor); // Enviar los datos del agricultor encontrado
// } else {
// res.status(404).json({ error: "Agricultor no encontrado" }); // Enviar error si no existe
// }
// });

// Endpoint para obtener zonas
//TODO: xq estan poniendo un index.html en la ruta? no es necesario
app.get('/index.html/:id/agricultores', async (req, res) => {
    // si tuviesemos filtros irian aqui? const {por caja por no se}
    const zonasId = req.params.id;
    try {
        let AgriculturesPorZonas = await db.collection('agricultores').find({zonaId: new ObjectId(zonasId)}).toArray();

        //if (cajaId) {
        // agricultoresPorZonas = agricultoresPorZonas.filter((agricultores) => agricultores.caja === cajaId);
        // }

        res.json(agricultoresPorZonas);
    } catch (error) {
        console.error('Error al obtener agricultores:', error);
        res.status(500).json({error: 'hubo un problema al obtener datos'});
    }
});

// Endpoint para obtener agricultores por zonas
//TODO: xq estan poniendo un index.html en la ruta? no es necesario
app.get('/index.html', async (req, res) => {
    try {
        console.log("conectando a mongodb");
        if (!db) {
            return res.status(500).json({error: 'la conexión a la base de datos no está lista'});
        }
        const data = await db.collection('zonas').find().toArray();
        console.log('datos obtenidos:', data);
        res.json(data);
    } catch (err) {
        console.error('Error al obtener los datos:', err);
        res.status(500).json({error: err.message});
    }
});


//opcionales:

// Endpoint para actualizar un agricultor
app.put('/agricultores/:id', (req, res) => {
    const agricultorId = req.params.id;
    const {name, lastname, description, direction, phoneNumber, mail} = req.body;

    // Buscar agricultor por ID
    //TODO donde esta definida la variable agricultores?
    //TODO recuerden que tienen que buscar en DB y debe ser algo como: db.collection('agricultores').find({id: agricultorId})
    const agricultor = agricultores.find((agricultor) => agricultor.id === agricultorId);

    if (!agricultor) {
        return res.status(404).json({error: "Agricultor no encontrado"});
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
        return res.status(404).json({error: "Agricultor no encontrado"});
    }

    // Eliminar agricultor del array
    agricultores.splice(index, 1);

    res.json({message: "Agricultor eliminado con éxito"});
});


app.listen(3000, () => {
    console.log('Ready on port 3000!');
});

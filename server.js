import express from 'express';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors()); // Habilitar CORS

uuidv4();

// URL de conexión a MongoDB y nombre de la base de datos
const mongoUrl = 'mongodb://127.0.0.1:27017/';
const dbName = 'social_group_DB';
let zonasCollection;
let agricultoresCollection;

//const zonasCollection = collection('zonas');
//const agricultoresCollection = collection('agricultores');

// Variable para almacenar la conexión a la base de datos
let db;

// Conectar a MongoDB

//const ObjectID = require('mongodb').ObjectID;

MongoClient.connect(mongoUrl) //{useNewUrlParser: true, useUniFiedTopology: true})
    .then(client => {
        console.log('Conectado a MongoDB');
        db = client.db(dbName);// Asignar la base de datos
        zonasCollection = db.collection('zonas');
        agricultoresCollection = db.collection('agricultores');
        //app.listen(5000, () => {
            //console.log('server is running on port 5000');
            //});

    })
    .catch(err => {
        console.error('Error al conectar MongoDB:', err);
    });

// API

//POST
export const createAgricultor = async (agricultor) => {
    try {
        const newAgricultor = {
            "id": uuidv4(),
            fotoPerfil: agricultor.fotoPerfil,
            nombre:agricultor.nombre,
             apellido:agricultor.apellido,
             direccion:agricultor.direccion,
             telefono:agricultor.telefono,
             email:agricultor.email,
             //Espacio / Huerta
             localizacion:agricultor.localizacion,
             horario:agricultor.horarios,
             descripcion:agricultor.descripcion,
            //Espacio / Productos
            tipoCaja:agricultor.tipoCaja,
            disponibilidad:agricultor.disponibilidad,
            precio:agricultor.precio,
            envioRecogida:agricultor.envioRecogida,
            tipoPago:agricultor.tipoPago,
            "createdAt": new Date(),
            "updatedAt": new Date(),
        }
        return await agricultoresCollection.insertOne(newAgricultor);
    }
    catch (error) { 
        console.error('Error al crear un Agricultor:', error);
        res.status(500).json({ error: 'Hubo un problema al crear un Agricultor' }); 
    } 
}

app.post('/agricultores/', async (req, res) => {
    const body = req.body;
    const newAgricultor = await createAgricultor(body);
    res.json(newAgricultor);
});

//get all agricultores

export const getAgricultores = async (req, res) => {
    try { 
        const agricultores = await agricultoresCollection.find({}).toArray();
        console.log("The agricultores are in servers");
        return agricultores;
    } 
    catch (error) { 
        console.error('Error al obtener un agricultores:', error);
        res.status(500).json({ error: 'Hubo un problema al obtener un agricultores' }); 
    } 
};

//Endpoint para obtener agricultores
app.get('/agricultores', async (req, res) => {
    console.log("get all agricultores");
    const allagricultores = await getAgricultores(res);
    console.log("get all agricultores");
    res.json(allagricultores);
});

//Get a Agricultor  por ID

export const getAgricultor = async (agricultorId) => {
    try {
        const agricultor = await agricultoresCollection.findOne({ _id: new ObjectId(agricultorId) });
        if (!agricultor) {
            console.warn(`No se encontró un agricultor con ID: ${agricultorId}`);
            return null;
        }
        return agricultor;
    } catch (error) {
        console.error('Error al obtener agricultor:', error);
        throw error;
    }
};

// Endpoint para obtener un agricultor
app.get('/agricultores/:id', async(req, res) => {
    const agricultorId = req.params.id;
    console.log(agricultorId);
    // Buscar agricultor por ID   
    //TODO recuerden que tienen que buscar en DB y debe ser algo como: db.collection('agricultores').find({id: agricultorId})
    const agricultor = await getAgricultor(agricultorId);
    console.log("get agricultor by id");
    res.json(agricultor);
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

// Endpoint para obtener usuarios con filtros (nombre y apellido)

app.get('/usuarios', async (req, res) => {

    const { nombre, apellido } = req.query; // Capturamos los parámetros de la URL
  
     
  
    const query = {}; // Objeto para construir los filtros
  
  
  
    if (nombre) {
  
      query.nombre = { $regex: nombre, $options: 'i' }; // Búsqueda insensible a mayúsculas
  
    }
  
  
  
    if (apellido) {
  
      query.apellido = { $regex: apellido, $options: 'i' }; // Búsqueda insensible a mayúsculas
  
    }
  
  
  
    try {
  
      const usuariosFiltrados = await db.collection('usuarios').find(query).toArray();
  
      res.json(usuariosFiltrados); // Devolvemos los usuarios filtrados
  
    } catch (error) {
  
      console.error('Error al obtener usuarios:', error);
  
      res.status(500).json({ error: 'Hubo un problema al obtener los usuarios' });
  
    }
  
  });
  
  
  
 // y la llamada al endpoint sería algo así:
  
  //usuarios?nombre=Juan&apellido=Pérez 
// Endpoint para obtener agricultores por zonas
//TODO: xq estan poniendo un index.html en la ruta? no es necesario
app.get('/', async (req, res) => {
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

// Endpoint para obtener zonas

app.get('/:id/agricultores', async (req, res) => {
    /*si tuviesemos filtros irian aqui? const {por caja por no se}
    const zonasId = req.params.id;
    try {
        let AgriculturesPorZonas = await db.collection('agricultores').find({zonaId: new ObjectId(zonasId)}).toArray();
     if (cajaId) { agricultoresPorZonas = agricultoresPorZonas.filter((agricultores) => agricultores.caja === cajaId); }*/
     const zonasId = req.params.id;
     try {
         let AgriculturesPorZonas = await db.collection('agricultores').find({zonaId: new ObjectId(zonasId)}).toArray();
         res.json(agricultoresPorZonas);
        } catch (error) {
            console.error('Error al obtener agricultores:', error);
            res.status(500).json({error: 'hubo un problema al obtener datos'});
        }
    });
  
  
//filtros: 

//pruebas pasadas post
/*function createAgricultor(agricultor) {
    db.collection('AGRICULTORES').insertOne(agricultor) 
    .then(result => {
    console.log('Agricultor añadido:', result.insertedId);
    })
    .catch(err => {
        console.error('Error al añadir agricultor:', err);   
        });   
        }

app.post('/agricultores', (req, res) => {
    const agricultor = req.body;
    agricultor.id = uuidv4();
    agricultor.createdAt = new Date();
    agricultor.updatedAt = new Date();

    createAgricultor(agricultor);
    res.json(agricultor);
});*/

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
/*
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
// TODO: tenian esto /agricultor/:id en el parametro, pero no es correcto, lo cambie a agricultorId
// TODO: creo que lo que quieren hacer aqui es un endpoint para obtener 1 solo agricultor por id, revisen la forma de definir los endpoints
/*
app.get('/agricultor/id/:id', async (req, res) => {
    const agricultorId = req.params.id;   // Obtener el ID de los parámetros de la URL
    console.log(agricultorId);
    const agricultorn = await getAgricultorbyId(agricultorId);
    
})
function getAgricultor(agricultorId) {
    return new Promise((resolve, reject) => {
        agricultoresColection.findOne({_id: ObjectId(agricultorId)})
            .then(agricultor => resolve(agricultor))
            .catch(errorFind => reject(errorFind));
    });
}

/* si quisieramos ordenar por orden de lista:
export const getAllAgricultores = async () => {
    try { 
      const options = {
        sort: { "nombre": 1 }, // Ordena por nombre en orden ascendente (alfabético)
        projection: { nombre: 1, zona: 1, telefono: 1, descripcion: 1, _id: 0 }
      };
      const agricultores = await db.collection('AGRICULTORES').find({}, options).toArray();
      console.log("Los agricultores han sido obtenidos del servidor.");
      return agricultores;
    } 
    catch (error) { 
      console.error('Error al obtener los agricultores:', error);
      res.status(500).json({ error: 'Hubo un problema al obtener los agricultores' }); 
    } 
  };*/

// Buscar el agricultor en la lista
// const agricultor = agricultores.find((agricultor) => agricultor.id === agricultorId);

// if (agricultor) {
// res.json(agricultor); // Enviar los datos del agricultor encontrado
// } else {
// res.status(404).json({ error: "Agricultor no encontrado" }); // Enviar error si no existe
// }
// });


app.listen(3000, () => {
    console.log('Ready on port 3000!');
});

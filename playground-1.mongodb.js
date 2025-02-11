/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// Create a new database.
use('social_group_DB');

// Create a new collection.
db.createCollection('zonas');
db.createCollection('agricultores');

db.zonas.insertMany([

    {nombre:"Horta Nord", 
      id: "1"
    },
    {nombre:"Horta Sur", 
      id: "2"
    },
    {nombre:"Horta Est", 
      id: "3"
    },
]);

let zonasId = db.zonas.findOne({nombre: "Horta Nord"}).id;

db.agricultores.insertMany([
    {
    fotoPerfil: "vscode-remote://wsl%2Bdebian/home/pumeny/workspace/grupo4_social_front/assets/esther.webp",
    nombre:"Ana", 
    apellido:"Rodríguez",
    direccion:"calle matata, 3",
    telefono:"+342838392",
    email:"pepita@gmail.com",
     //Espacio / Huerta
    localizacion:"Horta Nord",
    horario:"9am - 2pm",
    descripcion:"Soy Ana y cultivo frutas y verduras frescas en la zona este. Utilizo prácticas agrícolas sostenibles y ofrezco mis productos en cajas, que incluyen una selección de frutas y hortalizas locales, perfectas para quienes aprecian los productos frescos y naturales. Soy super maja y vendo barato y de calidad",
    //Espacio / Productos
    tipoCaja:"Caja Grande",
    disponibilidad:"Lunes",
    precio:"30€",
    envioRecogida:"Envío",
    tipoPago:"Tarjeta",
    zonaId: "1"
    },
]);
    zonasId = db.zonas.findOne({nombre: "Horta Est"}).id;

    db.agricultores.insertMany([
    {
//fotoPerfil: "url",
    nombre:"María", 
     apellido:"Sanz",
     direccion:"calle sol, 5",
     telefono:"+342838392",
     email:"juana@gmail.com",
     //Espacio / Huerta
     localizacion:"Horta Est",
     horario:"8am - 1pm",
     descripcion:"Soy María y me dedico al cultivo de frutas y verduras en la zona sur. Mis productos están disponibles en cajas, con una mezcla de lo mejor de la temporada. Cada caja está llena de frutas y verduras frescas, cultivadas con mucho cuidado para que puedas disfrutar de productos saludables y sabrosos. Me gusta cantar y bailar, comprame",
    //Espacio / Productos
    tipoCaja:"Caja Grande",
    disponibilidad:"Martes",
    precio:"35€",
    envioRecogida:"Envío",
    tipoPago:"Tarjeta",
    zonaId: id
    },
]);
    zonasId = db.zonas.findOne({nombre: "Horta Sud"}).id;

    db.agricultores.insertMany([

    {
        // fotoPerfil: "url",
            nombre:"Pedro", 
             apellido:"Miravalls",
             direccion:"calle Luna, 7",
             telefono:"+34284692",
             email:"PedroyMaria@gmail.com",
             //Espacio / Huerta
             localizacion:"Horta Sud",
             horario:"8am - 1pm",
             descripcion:"Me llamo Pedro y cultivo frutas y verduras en la zona norte. Mi enfoque es ofrecer productos frescos y de calidad, y vendo mis cosechas en cajas llenas de productos de temporada, ideales para quienes buscan ingredientes frescos y locales",
            //Espacio / Productos
            tipoCaja:"Caja Grande",
            disponibilidad:"Jueves",
            precio:"25€",
            envioRecogida:"Recogida",
            tipoPago:"Efectivo",
            zonaId: id
            },
 ]);

 let zonaBusqueda = "Horta Nord";//duda si solo se hace de una zona o de todas

//let zonaId = db.zonas.findOne({ nombre: zonaBusqueda }).id;

//let agricultores = db.agricultores.find({ zonaId: zonaId }).toArray();


// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/

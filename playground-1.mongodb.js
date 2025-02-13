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
    },
    {nombre:"Horta Sur", 
    },
    {nombre:"Horta Est", 
    },
]);

let zona = db.zonas.findOne({nombre: "Horta Nord"});

db.agricultores.insertMany([
    {
    fotoPerfil: "../assets/paula_s.webp",
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
    imagenCaja: "../assets/caja_paula_s.webp",
    tipoCaja:"Caja Grande",
    disponibilidad:"Lunes",
    precio:"30€",
    envioRecogida:"Envío",
    tipoPago:"Tarjeta",
    zonaId: zona._id
    },

    {
      fotoPerfil: "../assets/sara_pep_s.webp",
      nombre: "Sara y Beppe",
      apellido: "Rossi",
      direccion: "Via Campestre, 12",
      telefono: "+393456789012",
      email: "saraybeppe@gmail.com",
      localizacion: "Horta sud",
      horario: "7am - 1pm",
      descripcion: "Somos Sara y Beppe, una pareja apasionada por la agricultura sostenible. Cultivamos frutas y verduras ecológicas en nuestra pequeña finca familiar, ofreciendo productos frescos y de temporada directamente a nuestros clientes.",
      imagenCaja: "../assets/horta_est_s.webp",
      tipoCaja: "Caja Degustación",
      disponibilidad: "Martes y Viernes",
      precio: "22€",
      envioRecogida: "Envío y Recogida",
      tipoPago: "Tarjeta y Efectivo",
      zonaId: zona._id
     },
]);
    zona = db.zonas.findOne({nombre: "Horta Est"});

    db.agricultores.insertMany([
    {
    fotoPerfil: "../assets/esther_s.webp",
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
    imagenCaja: "../assets/horta_sud_s.webp",
    tipoCaja:"Caja Grande",
    disponibilidad:"Martes",
    precio:"35€",
    envioRecogida:"Envío",
    tipoPago:"Tarjeta",
    zonaId: zona._id
    },
    
    {
    fotoPerfil: "../assets/xavi_s.webp",
    nombre: "Javier",
  apellido: "Torres",
  direccion: "Paseo del Río, 10",
  telefono: "tel:+34987654321",
  email: "mailto:javier.torres@outlook.com",
  localizacion: "Horta Este",
  horario: "8am - 3pm",
  descripcion: "Soy Javier y me especializo en el cultivo de legumbres y verduras ecológicas. Mi prioridad es ofrecer productos locales, frescos y llenos de sabor.",
  imagenCaja: "../assets/caja_paula_s.webp",
  tipoCaja: "Caja Familiar",
  disponibilidad: "Sábado",
  precio: "30€",
  envioRecogida: "Recogida",
  tipoPago: "Bizum y Efectivo",
  zonaId: zona._id
},

]);
    zona = db.zonas.findOne({nombre: "Horta Sur"});

    db.agricultores.insertMany([

    {
      fotoPerfil: "../assets/nico_s.webp",
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
            imagenCaja: "../assets/horta_nord_s.webp",
            tipoCaja:"Caja Grande",
            disponibilidad:"Jueves",
            precio:"25€",
            envioRecogida:"Recogida",
            tipoPago:"Efectivo",
            zonaId: zona._id
            },
            {
              fotoPerfil: "../assets/Carla_s.webp",        
  nombre: "Elena",
  apellido: "Gómez",
  direccion: "Avenida del Sol, 15",
  telefono: "tel:+34123456789",
  email: "mailto:elena.gomez@gmail.com",
  localizacion: "Horta Est",
  horario: "9am - 2pm",
  descripcion: "Soy Elena, una agricultora apasionada por la producción ecológica. Cultivo hortalizas y frutas sin pesticidas, garantizando productos saludables y sostenibles.",
  imagenCaja: "../assets/caja_paula_s.webp",
  tipoCaja: "Caja Mediana",
  disponibilidad: "Miércoles",
  precio: "20€",
  envioRecogida: "Envío",
  tipoPago: "Bizum",
  zonaId: zona._id
 },
 ]);

 let zonaBusqueda = "Horta Nord";//duda si solo se hace de una zona o de todas

zona = db.zonas.findOne({ nombre: zonaBusqueda });

let agricultores = db.agricultores.find({ zonaId: zona._id }).toArray();

//db.collection('agricultores').find({id: agricultorId})
//si quereis eliminar datos de una coleccion se hace así:

// db.getCollection("nombre_de_la_coleccion").drop();


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
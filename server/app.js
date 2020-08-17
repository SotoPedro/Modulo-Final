const express = require("express"), cors = require("cors");
var app = express();
app.use(express.json());
app.use(cors());
var PORT = 3000;

app.listen(PORT, () => console.log(`Server Runnin on port ${PORT}`));


var noticias = [
    "Literatura Paris", "Futbol Barcelona",
    "Futbol barrancilla", "Politica Montevideo",
    "Economia santiago de chile", "Cocina Mexico DF",
    "Finanzas Nueva York"
];

app.get("/get", (req,res,next) => {
    res.json(noticias.filter(c => c.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1 ))
});

var misFavoritos = [];
app.get("/Favs", (req,res,next) => res.json(misFavoritos));
app.post("/Favs", (req, res, next) => {
    console.log(req.body);
    misFavoritos.push(req.body.nuevo);
    res.json(misFavoritos);
});
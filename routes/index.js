var express = require('express');
var router = express.Router();

//Traigo TODAS las funciones de la API
const api = require("../api");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET /resultados page
router.get("/resultados", async (req, res) => {
  //Conseguir lo que el usuario tipeó en el "titulo"
  
  const { titulo } = req.query;

  //Enviar titulo a a llamada API
  const results = await api.searchByTitle(titulo);

  res.send(results);
});

//GET agregar page
router.get("/agregar", async (req, res) => {
  const authors = await api.getAuthors();

  console.log(authors);

  //Le envío los autores al EJS
  res.render("pages/agregar", { authors });
});

//Post agregar libro, proceso
router.post("/agregar-libro", (req, res) => {
  //Levantar los datos del formulario de agregar
  console.log(req.body);
  const { titulo, precio, portada, autor } = req.body;
  api.addBook(titulo, precio, portada, autor);

  res.send("Vas bien!");
});

/* GET nosotros page */
router.get('/nosotros', (req, res) => {
  res.render('pages/nosotros', { title: 'Nosotros' });
});

/* GET contacto page */
router.get('/contacto', (req, res) => {
  res.render('pages/contacto', { title: 'Contacto' });
});

// localhost:3000/libros
router.get("/libros", async (req, res) => {
  const books = await api.getBooks();
  res.render("pages/libros", { books });
});

router.get("/libro/:id", async (req, res) =>{
  //console.log("La ruta trajo:" + req.params.id)
  const book = await api.getBookById(req.params.id);
  res.render("pages/libro", { book });
});

module.exports = router;

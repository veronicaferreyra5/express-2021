const { Op } = require("sequelize");


//traer la DB
const db = require("../models");



// SELECT * FROM libro
const getBooks = async () => {
    //Llamo a la DB
    const books = await db.libro.findAll({
        include: db.autor
    }).then(result => {    
        return result;
    });
    return books;
}

const getBookById = async (id) => { 
    console.log("*-*-*-*-*-*-*-*-*-*-");
    console.log("El ID que llegó a /api es" + id);
    console.log("*-*-*-*-*-*-*-*-*-");
    const book = await db.libro.findByPk(id, {
        include: db.autor
    }).then(result => {
        return result;
    });

    return book;
}

const getAuthors = async () => {
    const authors = await db.autor.findAll().then(result => {
        return result
    });

    return authors;
}

const searchByTitle = async (titulo) => {
    //Op.substring toma una cadena y le agrega %
    const results = await db.libro.findAll({
        where: {
            titulo: {
                [Op.substring]: titulo
            }
        },
        include: db.autor
    }).then(result => {
        return result;
    });

    return results;
}

const addBook = async (titulo, precio, portada, autorId) => {
    //Acá vamos a devolver un libro
    console.log("Llegó:", titulo, precio, portada, autorId);

    //Tengo que armar el INSERT INTO libro..

    const newBook = await db.libro.create({
        titulo,
        precio,
        portada,
        autorIdAutor: autorId
    });

    return newBook;
}

const addAuthor = async (nombreCompleto) => {
    console.log("Recibí", nombreCompleto);
    
    const newAuthor = await db.autor.create({
        nombreCompleto
    });

    return newAuthor;
}

//Exportamos las funciones
module.exports = {
    getBooks,
    getBookById,
    searchByTitle,
    getAuthors,
    addBook,
    addAuthor
}
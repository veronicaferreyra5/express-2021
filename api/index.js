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

//Exportamos las funciones
module.exports = {
    getBooks,
    getBookById,
    searchByTitle
}
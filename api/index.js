//traer la DB
const db = require("../models");



// SELECT * FROM libro
const getBooks = async () => {
    //Llamo a la DB
    const books = await db.libro.findAll().then(res => {
        return result;
    });
    return books;
}

//Exportamos las funciones
module.exports = {
    getBooks
}
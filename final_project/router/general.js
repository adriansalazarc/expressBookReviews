//routes which a general user can access

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here

  return res.status(300).json({message: JSON.stringify(books)});
});//completado

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.status(300).json({message: books[isbn]});
 });

//TODO: Task 3
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let booksByAuthor = ['libro de prueba'];

  for(let i = 1; i <= books.length; i++){
    if(books[i].author === author) booksByAuthor.push(author)
  }

  return res.status(300).json({message: JSON.stringify(booksByAuthor)});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

  return res.status(300).json({message: "Ya se implementará la b;usqueda por título"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

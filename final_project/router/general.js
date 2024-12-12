//routes which a general user can access

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (usrnm) => {
	let usuariosCoincidentes = users.filter((usr) => usr.username == usrnm) 
	if(usuariosCoincidentes.length > 0)return true;
	return false;
}

public_users.post("/register", (req,res) => {
	const username = req.body.username;
    const password = req.body.password;

	if(username && password){
		if(doesExist(username)) return res.status(200).json({message: "User already exists!"});
		else{
			users.push({"username": username, "password": password});
			return res.status(200).json({message: "User successfully registered. Now you can login"});
		}
	}
	res.status(200).json({message: "Username or password not valid"});
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

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
	//Write your code here
	const author = req.params.author;
	let booksByAuthor = [];

	for(isbn in books){
		if(books[isbn].author === author){
		booksByAuthor.push(books[isbn]);
		}
	}
	if(booksByAuthor.length > 0) return res.status(300).json({message: JSON.stringify(booksByAuthor)});
	else return res.status(300).json({message: "No books found from that author"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
	const title = req.params.title;
	let booksByTitle = [];

	for(isbn in books){
		if(books[isbn].title === title){
		booksByTitle.push(books[isbn]);
		}
	}

	if(booksByTitle.length > 0) return res.status(300).json({message: JSON.stringify(booksByTitle)});
	else return res.status(300).json({message: "No books found with that title"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
	//Write your code here
	return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

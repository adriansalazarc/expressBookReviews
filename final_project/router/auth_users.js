	// routes which an authorized user can access

const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username": "Baguette", "password": "lavidaesunalenteja"}];

const isValid = (username)=>{ //returns boolean
	//write code to check is the username is valid
	let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{
	let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

regd_users.get("/", (req,res) => {
	return res.status(200).send("Hola " + req.session.authorization.username + "!");
})

//only registered users can login
regd_users.post("/login", (req,res) => {
	const username = req.body.username;
	const password = req.body.password;

	// Check if username or password is missing
	if (!username || !password) {
		return res.status(404).json({ message: "Error logging in" });
	}

	// Authenticate user
	if (authenticatedUser(username, password)) {
		// Generate JWT access token
		let accessToken = jwt.sign({
			data: password
		}, 'access', { expiresIn: 3600 });

		// Store access token and username in session
		req.session.authorization = {
			accessToken, username
		}
		return res.status(200).send("User successfully logged in");
	} else {
		return res.status(208).json({ message: "Invalid Login. Check username and password" });
	}
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
//Write your code here
	const i = req.params.isbn;
	const review = req.query.review;
	const activeUser = req.session.authorization.username;

	books[i].reviews[activeUser] = review;

	return res.status(300).json({message: books[i]});
});

//TODO delete a review
regd_users.delete("/auth/review/:isbn", (req, res) => {
	const i = req.params.isbn;
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

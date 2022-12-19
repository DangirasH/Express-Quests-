require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());
const { validateMovie, validateUser } = require("./validators.js");
const usersHandlers = require("./usersHandlers");
const movieHandlers = require("./movieHandlers");


const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

// Movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie)

// Users
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
app.post("/api/users", validateUser, usersHandlers.postUser);
app.put("/api/users/:id", usersHandlers.updateUser);
app.delete("/api/users", usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

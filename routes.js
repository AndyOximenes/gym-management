const express = require("express");
const routes = express.Router();

routes.get("/", (request, response) => {
  return response.redirect("/instructors");
});

routes.get("/instructors", (request, response) => {
  return response.render("instructors/index");
});

routes.get("/instructors/create", (request, response) => {
  return response.render("instructors/create");
});

routes.post("/instructors", (request, response) => {
  return response.send(request.body);
});

routes.get("/members", (request, response) => {
  return response.send("members");
});

module.exports = routes;

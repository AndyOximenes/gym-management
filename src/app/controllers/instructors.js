const Instructor = require("../models/Instructor");

module.exports = {
  index(request, response) {
    Instructor.all((instructors) => {
      return response.render("instructors/index", {
        instructors,
      });
    });
  },

  show(request, response) {
    return;
  },

  post(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Please, fill all the fields");
      }
    }

    Instructor.create(request.body, (instructor) => {
      return response.redirect(`/instructors/${instructor.id}`);
    });
  },

  create(request, response) {
    return response.render("instructors/create");
  },

  edit(request, response) {
    return;
  },

  put(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Please, fill all the fields");
      }
    }

    return;
  },

  delete(request, response) {
    return;
  },
};

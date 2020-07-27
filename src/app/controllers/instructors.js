const { age, date } = require("../../lib/utils");
const Instructor = require("../models/Instructor");

module.exports = {
  index(request, response) {
    let { filter, page, limit } = request.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(instructors) {
        return response.render("instructors/index", {
          instructors,
          filter,
        });
      },
    };

    Instructor.paginate(params);

    // if (filter) {
    //   Instructor.findBy(filter, (instructors) => {
    //     return response.render("instructors/index", {
    //       instructors,
    //       filter,
    //     });
    //   });
    // } else {
    //   Instructor.all((instructors) => {
    //     return response.render("instructors/index", {
    //       instructors,
    //     });
    //   });
    // }
  },

  show(request, response) {
    Instructor.find(request.params.id, (instructor) => {
      if (!instructor) return response.send("Instructor not found");

      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(",");

      instructor.created_at = date(instructor.created_at).format;

      return response.render("instructors/show", { instructor });
    });
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
    Instructor.find(request.params.id, (instructor) => {
      if (!instructor) return response.send("Instructor not found");

      instructor.birth = date(instructor.birth).iso;
      instructor.services = instructor.services.split(",");

      instructor.created_at = date(instructor.created_at).format;

      return response.render("instructors/edit", { instructor });
    });
  },

  put(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Please, fill all the fields");
      }
    }

    Instructor.update(request.body, () => {
      return response.redirect(`/instructors/${request.body.id}`);
    });
  },

  delete(request, response) {
    Instructor.delete(request.body.id, () => {
      return response.redirect(`/instructors`);
    });
  },
};

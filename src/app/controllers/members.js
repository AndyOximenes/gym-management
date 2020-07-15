const { age, date } = require("../../lib/utils");

module.exports = {
  index(request, response) {
    return response.render("members/index");
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

    return;
  },

  create(request, response) {
    return response.render("members/create");
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

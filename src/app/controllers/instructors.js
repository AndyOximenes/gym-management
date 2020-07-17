const { age, date } = require("../../lib/utils");
const db = require("../../app/config/db");

module.exports = {
  index(request, response) {
    db.query(`SELECT * FROM instructors`, (err, results) => {
      if (err) return response.send("Database error");

      return response.render("instructors/index", {
        instructors: results.rows,
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

    const query = `
      INSERT INTO instructors (
        name,
        avatar_url,
        gender,
        services,
        birth,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      request.body.name,
      request.body.avatar_url,
      request.body.gender,
      request.body.services,
      date(request.body.birth).iso,
      date(Date.now()).iso,
    ];

    db.query(query, values, (err, results) => {
      if (err) return response.send("Database error");

      return response.redirect(`/instructors/${results.rows[0].id}`);
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

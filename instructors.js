const fs = require("fs");
const data = require("./data.json");

// POST

exports.post = (request, response) => {
  const keys = Object.keys(request.body);

  for (key of keys) {
    if (request.body[key] == "") {
      return response.send("Please, fill all the fields");
    }
  }

  request.body.birth = Date.parse(request.body.birth);
  request.body.created_at = Date.now();

  data.instructors.push(request.body);

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send("Write file error!");

    return response.redirect("/instructors");
  });

  //   return response.send(request.body);
};

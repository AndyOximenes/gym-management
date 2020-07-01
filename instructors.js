const fs = require("fs");

// POST

exports.post = (request, response) => {
  const keys = Object.keys(request.body);

  for (key of keys) {
    if (request.body[key] == "") {
      return response.send("Please, fill all the fields");
    }
  }

  fs.writeFile("data.json", JSON.stringify(request.body), (err) => {
    if (err) return response.send("Write file error!");

    return response.redirect("/instructors");
  });

  //   return response.send(request.body);
};

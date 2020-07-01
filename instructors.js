const fs = require("fs");
const data = require("./data.json");

// POST

exports.post = (request, response) => {
  const keys = Object.keys(request.body);
  let { avatar_url, name, birth, gender, services } = request.body;

  for (key of keys) {
    if (request.body[key] == "") {
      return response.send("Please, fill all the fields");
    }
  }

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send("Write file error!");

    return response.redirect("/instructors");
  });

  //   return response.send(request.body);
};

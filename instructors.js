const fs = require("fs");
const data = require("./data.json");
const { age } = require("./utils");

// SHOW

exports.show = (request, response) => {
  const { id } = request.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return response.send("Instructor not found");
  }

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-br").format(
      foundInstructor.created_at
    ),
  };

  return response.render("instructors/show", { instructor });
};

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

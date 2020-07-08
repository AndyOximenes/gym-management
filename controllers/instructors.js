const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

exports.index = (request, response) => {
  return response.render("instructors/index", {
    instructors: data.instructors,
  });
};

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
    created_at: new Intl.DateTimeFormat("pt-BR").format(
      foundInstructor.created_at
    ),
  };

  return response.render("instructors/show", { instructor });
};

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

    return response.redirect(`/instructor/${id}`);
  });

  //   return response.send(request.body);
};

exports.create = (request, response) => {
  return response.render("instructors/create");
};

exports.edit = (request, response) => {
  const { id } = request.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return response.send("Instructor not found");
  }

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth).iso,
  };

  return response.render("instructors/edit", { instructor });
};

exports.put = (request, response) => {
  const { id } = request.body;

  let index = 0;

  const foundInstructor = data.instructors.find((instructor, foundIndex) => {
    if (instructor.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) {
    return response.send("Instructor not found");
  }

  const instructor = {
    ...foundInstructor,
    ...request.body,
    birth: Date.parse(request.body.birth),
    id: Number(request.body.id),
  };

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send("Write file error!");

    return response.redirect(`/instructors/${id}`);
  });
};

exports.delete = (request, response) => {
  const { id } = request.body;

  const filteredInstructor = data.instructors.filter((instructor) => {
    return instructor.id != id;
  });

  data.instructors = filteredInstructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send("Write file error!");

    return response.redirect("/instructors");
  });
};

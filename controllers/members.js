const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

exports.index = (request, response) => {
  return response.render("members/index", {
    members: data.members,
  });
};

exports.show = (request, response) => {
  const { id } = request.params;

  const foundMember = data.members.find((member) => {
    return member.id == id;
  });

  if (!foundMember) {
    return response.send("Member not found");
  }

  const member = {
    ...foundMember,
    age: age(foundMember.birth),
  };

  return response.render("members/show", { member });
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
  const id = Number(data.members.length + 1);

  data.members.push({
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

    return response.redirect("/members");
  });

  //   return response.send(request.body);
};

exports.create = (request, response) => {
  return response.render("members/create");
};

exports.edit = (request, response) => {
  const { id } = request.params;

  const foundMember = data.members.find((member) => {
    return member.id == id;
  });

  if (!foundMember) {
    return response.send("Member not found");
  }

  const member = {
    ...foundMember,
    birth: date(foundMember.birth),
  };

  return response.render("members/edit", { member });
};

exports.put = (request, response) => {
  const { id } = request.body;

  let index = 0;

  const foundMember = data.members.find((member, foundIndex) => {
    if (member.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) {
    return response.send("Member not found");
  }

  const member = {
    ...foundMember,
    ...request.body,
    birth: Date.parse(request.body.birth),
    id: Number(request.body.id),
  };

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send("Write file error!");

    return response.redirect(`/members/${id}`);
  });
};

exports.delete = (request, response) => {
  const { id } = request.body;

  const filteredMember = data.members.filter((member) => {
    return member.id != id;
  });

  data.members = filteredMember;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send("Write file error!");

    return response.redirect("/members");
  });
};

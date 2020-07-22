const { age, date } = require("../../lib/utils");
const Member = require("../models/Member");

module.exports = {
  index(request, response) {
    Member.all((members) => {
      return response.render("members/index", {
        members,
      });
    });
  },

  show(request, response) {
    Member.find(request.params.id, (member) => {
      if (!member) return response.send("Member not found");

      member.birth = date(member.birth).birthDay;

      return response.render("members/show", { member });
    });
  },

  post(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Please, fill all the fields");
      }
    }

    Member.create(request.body, (member) => {
      return response.redirect(`/members/${member.id}`);
    });
  },

  create(request, response) {
    Member.instructorsSelectOptions((options) => {
      return response.render("members/create", { InstructorOptions: options });
    });
  },

  edit(request, response) {
    Member.find(request.params.id, (member) => {
      if (!member) return response.send("Member not found");

      member.birth = date(member.birth).iso;

      Member.instructorsSelectOptions((options) => {
        return response.render("members/edit", {
          member,
          InstructorOptions: options,
        });
      });
    });
  },

  put(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Please, fill all the fields");
      }
    }

    Member.update(request.body, () => {
      return response.redirect(`/members/${request.body.id}`);
    });
  },

  delete(request, response) {
    Member.delete(request.body.id, () => {
      return response.redirect(`/members`);
    });
  },
};

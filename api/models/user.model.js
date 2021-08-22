const { json } = require("body-parser");
const sql = require("./db.js");

//constructor
const User = function(user) {
    this.login = user.login;
    this.name = user.name;
    this.email = user.email;
    this.passwd = user.passwd;
};

User.create = (newUser, result) => {
  var login = newUser.login;
  var name = newUser.name;
  var email = newUser.email;
  var passwd = newUser.passwd;
    sql.query(`INSERT INTO users (login, name, email, passwd)
      VALUES ('${login}', '${name}', '${email}', '${passwd}')`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("User created: ", {id: res.insertId, ...newUser});
        result(null, { id: res.insertId, ...newUser});
    });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // no User found with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET login = ?, name = ?, passwd = ? WHERE id = ?",
    [user.login, user.name, user.passwd, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

module.exports = User;
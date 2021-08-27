const { json } = require("body-parser");
const sql = require("./db.js");

// Constructor
const Tbill = function(tbill) {
    this.tnumber = tbill.tnumber;
    this.item = tbill.item;
    this.units = tbill.units;
    this.iprice = tbill.iprice;
    this.total = tbill.total;
};

Tbill.create = (newTbill, result) => {
    var tnumber = newTbill.tnumber;
    var item = newTbill.item;
    var units = newTbill.units;
    var iprice = newTbill.iprice;
    var total = newTbill.total;

    sql.query(`INSERT INTO tbills (tnumber, item, units, iprice, total)
    VALUES (${tnumber}, '${item}', ${units}, ${iprice}, ${total})
    ON DUPLICATE KEY UPDATE units = (units + 1), total = units*iprice`, (err, res) => {
        if (err) {    
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Tbill created: ", {id: res.insertId, ...newTbill});
        result(null, {id: res.insertId, ...newTbill});
    });
};

Tbill.findTableBill = (tableNumber, result) => {
    sql.query(`SELECT id, tnumber, item, units, FORMAT(iprice,2) AS iprice, FORMAT(total,2) AS total FROM tbills WHERE tnumber = ${tableNumber}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            result;
        }

        if (res.length) {
            console.log("found product(s): ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found"}, null);
    });
};

Tbill.getAll = result => {
    sql.query("SELECT id, tnumber, item, units, FORMAT(iprice,2) AS iprice, FORMAT(total,2) AS total FROM tbills", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("tbills: ", res);
        result(null, res);
      });
};

Tbill.updateById = (id, tbill, result) => {
    sql.query(
        "UPDATE tbills SET tnumber = ?, item = ?, units = ?, iprice = ?, total =?",
        [tbill.tnumber, tbill.item, tbill.units, tbill.iprice, tbill.total],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // no tbill found with that Id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Updated tbill: ", { id: id, ...tbill });
            result(null, {id: id, ...tbill});
        }
    );
};

Tbill.remove = (id, result) => {
    sql.query("DELETE FROM tbills WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tbill with id: ", id);
        result(null, res);
    });
};

module.exports = Tbill;
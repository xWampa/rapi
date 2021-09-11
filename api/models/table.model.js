const { json } = require("body-parser");
const sql = require("./db.js");

// Constructor
const Table = function(table) {
    this.number = table.number;
    this.total = table.total;
};

Table.create = (newTable, result) => {
    var number = newTable.number;

    sql.query(`INSERT INTO tables (number, total) VALUES (${number}, ${total})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Mesa creada: ", {id: res.insertId, ...newTable});
        result(null, {id: res.insertId, ...newTable});
    });
};

Table.findByNumber = (tableNumber, result) => {
    sql.query(`SELECT * FROM tables WHERE number = ${tableNumber}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found table: ", res[0]);
            result(null, res[0]);
            return;
        }

        // No Table found
        result({ kind: "not_found" }, null);
    });
};

Table.getAll = result => {
    sql.query("SELECT id, number, FORMAT(total,2) AS total FROM tables", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("tables: ", res);
        result(null, res);
    });
};

Table.updateByTableNumber = (newTable, result) => {
    sql.query(
        `UPDATE tables SET total = ? WHERE number = ?`,
        [newTable.total, newTable.number], 
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                //No Table count found with the number provided
                result({ kind: "not_found"}, null);
                return;
            }

            console.log("Table total updated: ", {id: res.insertId, total: newTable.total});
            result(null, {id: res.insertId, total: newTable.total});

        });
};

Table.remove = (number, result) => {
    sql.query("DELETE FROM tables WHERE number = ?", number, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // no table found with tat number
            result ({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted table with number: ", number);
        result(null, res);
    });
};

module.exports = Table
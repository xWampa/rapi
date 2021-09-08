const { json } = require("body-parser");
const sql = require("./db.js");

// Constructor
const CashCount = function(cashCount) {
    this.day = cashCount.day;
    this.netSale = cashCount.netSale;
    this.cardPayments = cashCount.cardPayments;
    this.cashPayments = cashCount.cashPayments;
    this.numberSales = cashCount.numberSales;
    this.averageTicket = cashCount.averageTicket;
    this.income = cashCount.income;
    this.outflow = cashCount.outflow;
};

CashCount.init = result => {
    sql.query(`INSERT INTO cash_counts (day, net_sale, card_payments, cash_payments, number_sales, average_ticket, income, outflow)
    VALUES (curdate(), 0, 0, 0, 0, 0, 0, 0)
    ON DUPLICATE KEY UPDATE id=id`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Cash count created: ", {id: res.insertId});
        result(null, {id: res.insertId});
    });
}

CashCount.findByDate = (cashCountDate, result) => {
        
    sql.query(`SELECT * FROM cash_counts WHERE day = ${cashCountDate}`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found product: ", res[0]);
            result(null, res[0]);
            return;
        }

        // No entry found
        result({ kind: "not_found" }, null);
    });
};

CashCount.getAll = result => {
    sql.query("SELECT * FROM cash_counts", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("cash_count: ", res);
        result(null, res);        
    });
};

CashCount.updateByDate = (cashCountDate, cashCount, result) => {
    sql.query(
        `UPDATE cash_counts SET
        net_sale = COALESCE(net_sale + ?, net_sale),
        card_payments = COALESCE(card_payments + ?, card_payments),
        cash_payments = COALESCE(cash_payments + ?, cash_payments),
        number_sales = COALESCE(number_sales + ?, number_sales),
        average_ticket = COALESCE(?, average_ticket),
        income = COALESCE(income + ?, income),
        outflow = COALESCE(outflow + ?, outflow)
        WHERE day = ?`,
        [cashCount.netSale, cashCount.cardPayments, cashCount.cashPayments, cashCount.numberSales, cashCount.averageTicket, cashCount.income, cashCount.outflow, cashCountDate],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                //No Cash count found with the id provided
                result({ kind: "not_found"}, null);
                return;
            }

            console.log("Cash count updated: ", {id: res.insertId, ...cashCount});
            result(null, {id: res.insertId, ...cashCount});

        });
};

CashCount.remove = (id, result) => {
    sql.query("DELETE FROM cash_counts WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // no Cash count found with that id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Cash count with id: ", id);
        result(null, res);
    });
};

module.exports = CashCount;
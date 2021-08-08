const express = require('express')
const router = new express.Router()
const db = require('../database/db')

function random_work_hrs() {
    return Math.floor(Math.random() * (10 - 5)) + 5;
}

function random_perhr_pay() {
    return Math.floor(Math.random() * (500 - 100)) + 100;
}

function random_index() {
    return Math.floor(Math.random() * (100 - 1)) + 1;
}


router.get("/database", (req, res) => {
    res.render('database');
});

var emp_result = "";

router.get("/emp_data", (req, res) => {
    var show_emp = `SELECT * FROM employee`

        db.query(show_emp, (err, result) => {
            if (err) throw err;

            else {
                emp_result = result;
            }
            res.render('database', { emp_data: emp_result });
        });
    
});

router.get("/delete_data", (req, res) => {
    var del_emp = `DELETE FROM employee`;


    db.query(del_emp, function (err, result) {
        if (err) throw err;
    });

    const table_names = ["apr2020", "may2020", "jun2020", "july2020", "aug2020", "sep2020", "oct2020", "nov2020",
        "dec2020", "jan2021", "feb2021", "march2021"]

    for (let table of table_names) {
        var del_all = `DELETE FROM ${table}`;

        db.query(del_all, function (err, result) {
            if (err) throw err;
        });
    }

    res.render('database');
});

router.get("/insert", (req, res) => {
    res.render('insert');
});

router.post("/insert", (req, res) => {
    const { emp_id, emp_name, emp_age, emp_gender } = req.body

    var emp_sql = `INSERT INTO employee VALUES ( ?, ?, ?, ?)`;

    db.query(emp_sql, [`${emp_id}`, `${emp_name}`, `${emp_age}`, `${emp_gender}`], function (err, result) {
        if (err) throw err;

    });


    var ind = []
    for (j = 1; j <= 100; j++) {
        ind[j] = random_index();
    }


    var perhr_pay = random_perhr_pay();

    var table_names = ["apr2020", "may2020", "jun2020", "july2020", "aug2020", "sep2020", "oct2020", "nov2020",
        "dec2020", "jan2021", "feb2021", "march2021"]

    for (let x of table_names) {

        var total_hrs = 0;
        var total_pay = 0;

        var All_month = []
        for (j = 1; j <= 30; j++) {
            All_month[j] = random_work_hrs();
        }

        All_month.forEach(calcTotal);

        function calcTotal(i) {
            total_hrs += i;
        }


        var total_pay = total_hrs * perhr_pay;


        var sal_sql = `INSERT INTO ${x} VALUES ( ${emp_id},
            ${All_month[1]},${All_month[2]},${All_month[3]},${All_month[4]},${All_month[5]},${All_month[6]},${All_month[7]},${All_month[8]},${All_month[9]},${All_month[10]},
            ${All_month[11]},${All_month[12]},${All_month[13]},${All_month[14]},${All_month[15]},${All_month[16]},${All_month[17]},${All_month[18]},${All_month[19]},${All_month[20]},
            ${All_month[21]},${All_month[22]},${All_month[23]},${All_month[24]},${All_month[25]},${All_month[26]},${All_month[27]},${All_month[28]},${All_month[29]},${All_month[30]},
            ${total_hrs}, ${perhr_pay}, ${total_pay})`;


        db.query(sal_sql, function (err, result) {
            if (err) throw err;
        });

    }

    res.render('database');
});

router.get("/search_data", (req, res) => {
    res.render('search');
})

var emp_search_data = [{'emp_id':'', 'emp_name':'', 'emp_age':'', 'emp_gender':''}]

router.post("/search_data", (req, res) => {
    try {
        const { emp_id, from_month, to_month, year, selectAll } = req.body;
        console.log(selectAll);

        var month_ind = {
            apr2020: 0, may2020: 1, jun2020: 2, july2020: 3, aug2020: 4, sep2020: 5, oct2020: 6, nov2020: 7,
            dec2020: 8, jan2021: 9, feb2021: 10, march2021: 11
        }

        var start = month_ind[from_month];
        var end = month_ind[to_month]

        var table_names = ["apr2020", "may2020", "jun2020", "july2020", "aug2020", "sep2020", "oct2020", "nov2020",
            "dec2020", "jan2021", "feb2021", "march2021"]


        var hrs_sum = 0;
        var ctc_sum = 0;
        for (let x of table_names.slice(start, end + 1)) {

            if (selectAll == undefined) {
                var hrs_sql = `SELECT SUM(Total_hrs) FROM ${x} WHERE emp_id = ?`;
                var ctc_sql = `SELECT SUM(Total_Pay) FROM ${x} WHERE emp_id = ?`;
            }
            else {
                var hrs_sql = `SELECT SUM(Total_hrs) FROM ${x}`;
                var ctc_sql = `SELECT SUM(Total_Pay) FROM ${x}`;
            }

            db.query(hrs_sql, [`${emp_id}`], (err, result) => {
                if (err) throw err;
                else {
                    hrs_sum += result[0]['SUM(Total_hrs)'];
                }

            });

            db.query(ctc_sql, [`${emp_id}`], (err, result) => {
                if (err) throw err;
                else {
                    ctc_sum += result[0]['SUM(Total_Pay)'];
                }

            });
        }

        if (selectAll == undefined) {
            var emp_sql = `SELECT * FROM employee WHERE emp_id = ${emp_id}`;


            db.query(emp_sql, (err, result) => {
                if (err)
                    throw err;
                else {
                    emp_search_data = result;

                    if (emp_search_data.length == 0) {
                        console.log("err")
                        return res.render('search', { err: "Record Not Found" });
                    }
                }
            });
        }else{
            emp_search_data = [{'emp_id':'All Emp', 'emp_name':'', 'emp_age':'', 'emp_gender':''}]
        }


        // Graph Part ****************
        var table_names = ["apr2020", "may2020", "jun2020", "july2020", "aug2020", "sep2020", "oct2020", "nov2020",
            "dec2020", "jan2021", "feb2021", "march2021"]

        var allMonthHrs = []
        var selected_tables = table_names.slice(start, end + 1);
        for (let x of table_names.slice(start, end + 1)) {
            if (selectAll == undefined) {
                var sumAllMonth = `SELECT SUM(Total_hrs) FROM ${x} WHERE emp_id = ${emp_id}`;
            } else {
                var sumAllMonth = `SELECT SUM(Total_hrs) FROM ${x}`;
            }
            db.query(sumAllMonth, (err, result) => {
                if (err) throw err;
                else {
                    allMonthHrs.push(result[0]['SUM(Total_hrs)']);
                }

            });
        }

        setTimeout(myFunction, 200);
        function myFunction() {
            res.render('search', {
                emp_search_data: emp_search_data[0], hrs_search_data: hrs_sum, ctc_search_data: ctc_sum,
                from_month: from_month, to_month: to_month, year: year, hrs: allMonthHrs, selected_months: selected_tables
            });
        }
    } catch (e) {
        res.render('search', { err: "Record Not Found" });
    }

})

router.get("/graph", (req, res) => {

    var table_names = ["apr2020", "may2020", "jun2020", "july2020", "aug2020", "sep2020", "oct2020", "nov2020",
        "dec2020", "jan2021", "feb2021", "march2021"]

    var allMonthHrs = []


    for (let x of table_names) {
        var sumAllMonth = `SELECT SUM(Total_hrs) FROM ${x}`
        db.query(sumAllMonth, (err, result) => {
            if (err) throw err;
            else {
                allMonthHrs.push(result[0]['SUM(Total_hrs)']);
            }

        });
    }

    setTimeout(myFunction, 100);
    function myFunction() {
        res.render('graph', { hrs: allMonthHrs });
    }


})

module.exports = router
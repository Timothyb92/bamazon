//requiring npm packets
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var chalk = require("chalk");
var table = require("table");

//connecting to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

// function start(){
//     connection.query("SELECT * FROM products", function(err, res){
//         if (err) throw err;
//         console.table(res);
//     })
// }

function viewProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res);
    })
}
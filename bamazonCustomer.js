var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.query("SELECT * FROM products", function(err, result){
    if (err) throw err;
    console.table(result);
    inquirer.prompt([
        {
            type: "input",
            name: "itemNum",
            message: "Enter the product ID number of the item you wish to purchase."
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?"
        }
    ]).then(function(answers){
        console.log(answers.itemNum);
        console.log(answers.quantity);
    })
})
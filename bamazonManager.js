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

//Functions that displays all products for sale
function viewProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res);
    })
}


//Function that displays products that have a stock quantity that is less than 15
function viewLowInv(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 15", function(err, res){
    if (err) throw err;
    console.table(res);
    })
}

function increaseStock(){
    connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    })
}

function addNewProduct(){
    connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    })
}

viewLowInv();
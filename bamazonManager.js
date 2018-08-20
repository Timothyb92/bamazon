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
    var chosenItem;
    connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    console.table(res);
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Which item would you like to adjust the stock qauntity of?"
        }
    ]).then(function(answer){
        for (var i = 0; i < res.length; i++){
            // console.log(res[i].id)
            if (res[i].id === parseInt(answer.item)){
                chosenItem = res[i];
            }
        }
        inquirer.prompt([
            {
                name: "newStock",
                type: "input",
                message: "What would you like the new quantity to be?"
            }
        ]).then(function(ans){
            connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: parseInt(ans.newStock)
            },
            {
                id: chosenItem.id
            }
        ])
        })
    })
    })
}

function addNewProduct(){
    connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    })
}

increaseStock();
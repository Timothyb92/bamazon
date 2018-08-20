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

function start(){
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View items for sale",
                "View low inventory",
                "Change stock quantity of an item",
                "Add a new product"
            ]
        }
    ]).then(function(ans){
        switch (ans.choice){
            case "View items for sale":
            viewProducts();
            break;

            case "View low inventory":
            viewLowInv();
            break;

            case "Change stock quantity of an item":
            increaseStock();
            break;

            case "Add a new product":
            addNewProduct();
            break;
        }
    })
}


//Functions that displays all products for sale
function viewProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res);
        start();
    })
}


//Function that displays products that have a stock quantity that is less than 15
function viewLowInv(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 15", function(err, res){
    if (err) throw err;
    console.table(res);
    start();
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
        console.log(chalk.green("================================================================"));
        console.log(chalk.green(chosenItem.product_name + " stock quantity changed to " + ans.newStock))
        console.log(chalk.green("================================================================"));
        }).then(function(){
            connection.query("SELECT * FROM products", function(err, result){
                if (err) throw err;
                start();
            })
        })
    })
    })
}

function addNewProduct(){
    connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    inquirer.prompt([
        {
            type: "input",
            name: "newItem",
            message: "What item would you like to add?"
        },
        {
            type: "input",
            name: "itemDpt",
            message: "What department is this item in?"
        },
        {
            type: "input",
            name: "itemQty",
            message: "How many of this item would you like to input?"
        },
        {
            type: "input",
            name: "itemPrice",
            message: "What is the price of the item?"
        }
    ]).then(function(answer){
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.newItem,
                department_name: answer.itemDpt,
                price: answer.itemPrice,
                stock_quantity: answer.itemQty
            });
        console.log(chalk.green("===================================================================================================="))
        console.log(chalk.green("Added " + answer.newItem + " to " + answer.itemDpt + " department with price of " + answer.itemPrice + " and a quantity of " + answer.itemQty));
        console.log(chalk.green("===================================================================================================="))
        start();
    })
    })
}

start();
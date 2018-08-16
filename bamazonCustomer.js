//requiring npm packets
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var chalk = require("chalk");

//connecting to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

//Function containing all the logic for the customer interaction
function buyItem(){
    //running a query on the database to grab all the items from the table so
    //that we may iterate upon them
    connection.query("SELECT * FROM products", function(err, result){
    
        //Throws errors if any exist
        if (err) throw err;
    
        //Displays all of the items in the database to the user formatted in a table
        console.table(result);
    
        //inquirer promp that gets vital information from the user
        inquirer.prompt([
    
            //Asks the user which item they would like to purchase
            {
                type: "input",
                name: "itemNum",
                message: "Enter the product ID number of the item you wish to purchase."
            },
    
            //After the user selects an item, this asks them how many of that item they would like to buy
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?"
            }
    
            //promise that runs after the questions are answered
        ]).then(function(answers){
    
            //Setting an empty variable that will store the item they chose
            var chosenItem;
    
            //Loops over each item in the table looking for the item the user chose
            for (var i = 0; i < result.length; i++){
                if (result[i].id === parseInt(answers.itemNum)){
    
                    //If the current item being iterated upon is the item the user chose, chosenItem now stores that item.
                    chosenItem = result[i];
                }
            }
    
            // console.log(chosenItem.price);
            // console.log(chosenItem.stock_quantity);
            // console.log(answers.quantity);
            
            //If the quantity the user wants to buy exceeds the quantity available, the user is told the store doesn't have enough of that item.
            if (parseInt(answers.quantity) > chosenItem.stock_quantity){
                console.log(chalk.red("============================================================================"))
                console.log(chalk.red("We do not have enough of that item to meet the quantity you have requested...\nPlease select a different item or change quantity requested."));
                console.log(chalk.red("============================================================================"))
                buyItem();

                //Otherwise, if the stock quantity can supply the quantity requested, the total of the order is calculated and displayed to the user.
            } else {
                console.log(chalk.green("======================="));
                console.log(chalk.green("Order fulfilled.\nYour total is " + (chosenItem.price * parseInt(answers.quantity))));
                console.log(chalk.green("======================="));
                buyItem();
            }
        })
    })
}
buyItem();
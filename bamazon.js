// requiring all modules

var mysql=require('mysql');
var inquirer=require('inquirer');
var request=require('request');
var chalk=require('chalk');
var fs=require('fs');

// set connection variable/estabish/test connection

var connection=mysql.createConnection({
    host:"localHost",
    port:8889,
    user:"root",
    password:"root",
    database:"bamazonDB"
});
/*
connection.connect(function(err){
    if(err){console.log(err)}
    else{console.log(connection.threadId)}
});
*/

// empty array for table list items

var inventory=[];

function buyItems(){

    start()

}; 
buyItems()


// finalize sale/change table Quant function
function makeSale(item,quant){
    connection.query("SELECT * FROM products WHERE product_name=?",[item],function(err,res){
        if(err){console.log(err)}
    
        for(var l in res){var quantityToChange=res[l].stock_quantity
                          var price=res[l].price;
                          var totalCost=price*quant;};
        var newQuant=(quantityToChange-quant);
        
        console.log(newQuant)
    connection.query("UPDATE products SET stock_quantity=? WHERE product_name=?",[newQuant,item],function(err){
        if(err){console.log(err)}
        else{console.log(chalk.green("Great! A sale of  $" + totalCost + " went thru after buying " + quant + " " +  item + "s!"))}
    })
    })

};

// if initial quantity is too high, ask customer quantity again, this time alerting of available quantity

function newQuantity(quant,item){
    inquirer.prompt([
    {
        type:"list",
        message:chalk.red("Sorry we only have " + quant + ". Please, select a different amount, or just forget it?"),
        choices:['new quantity','ahh, just forget it!'],
        name:"choice"
    }
    ]).then(function(answer){
        var choice=answer.choice;
        if(choice === 'new quantity'){
            inquirer.prompt([
                {
                    input:"input",
                    message:"Great! And sorry again! So..how many would you like?",
                    name:'amount'
                }
            ]).then(function(res){
                newAmount=res.amount;
                console.log("New amount is " + newAmount)
                makeSale(item,newAmount)
            })
        }
        else{console.log("sorry to hear that. Goodbye!")}
    })
};



//RE-UP INVENTORY

function reSupply(){
    var array=[];
    connection.query("SELECT stock_quantity FROM products",function(err,res){
        if(err){console.log(err)}
        else{console.log(chalk.yellow(JSON.stringify(res)))
        for(var x=0;x<res.length;x++){
              array.push(res[x].stock_quantity)
        }}
        console.log(array);
        var newStock=[];
        for(var l=0;l<array.length;l++){
            var reUp=Math.floor(Math.random()*15);
            array[l]
            newStock.push(array[l]+=reUp);
        }
        console.log("New Stock: " + newStock)
        for(var y=0;y<newStock.length;y++){
            connection.query("UPDATE products SET stock_quantity=? WHERE id=?",[newStock[y],y],function(err,res){
                if(err){console.log(err)}
            })
        }
    })
}




//reSupply()

// Initial Sign up/log-in function

function start(){
    inquirer.prompt([
        {
        type:'input',
        message:"Hello there shopper. Please sign in so we can see if its old friend or new",
        name:"customername"
    }

]).then(function(answer){
    //determing if old/new customer with for-loop to fill array with names and run it against and indexOf method
    var customerName=answer.customername;
    var nameArray=[];
    connection.query("SELECT name,balance FROM customers",function(err,res){
        if(err){console.log(err)}
        for(var i=0;i<res.length;i++){
              //putting the names into an array
            nameArray.push(res[i].name)}
            if(nameArray.indexOf(customerName) === -1){ newUser(customerName)}
            else{var customerIndex=nameArray.indexOf(customerName);
                var customerBalance=res[customerIndex].balance;
                console.log(res[customerIndex].name + " has $" + customerBalance)
                console.log('Ahh an friend, welcome back ' + customerName)
                 shop();}
        
    
        
    })
})
}
// function to add new user
function newUser(name){
    inquirer.prompt([
        {
            type:'input',
            message:'Welcome to our auction site ' + name + "!! What would you like to put down as your starting balance?",
            name:"balance"
        }
    ]).then(function(res){
    connection.query("INSERT INTO customers SET?",{
        name:name,
        balance:res.balance
    },function(err){
        if(err){console.log(err)}
        else{console.log("new customer added!")
    shop()}
    })
    })
}



//start()

// populate the customers table from Node
/*
connection.query("INSERT INTO customers SET?",[
    {
        name:"sarah",
        balance:3430,
    },
    {
        name:"chuck",
        balance:347,
    },
    {
        name:"sara",
        balance:2298,
    }],
function(err,res){
    if(err){console.log(err)}
    else{console.log('people added!!')}
})

*/

function shop(){
    // access table items and put into array for user of inquiry choice
    var query=connection.query("SELECT id, product_name, price FROM products",function(err,res){
        if(err){console.log(err)}
        else{for(var i=0;i<res.length;i++){
            inventory.push(res[i].product_name)
        }
        }
        inquirer.prompt([
            {
                type:"list",
                message:"See anything?",
                choices:inventory,
                name:"userChoice"
            }
        ]).then(function(choice){
           inquirer.prompt([
               {
                   type:"input",
                   message:"Great!!, how many " + choice.userChoice + " would you be interested in?",
                   name:"userQuant"
               }
           ]).then(function(quantity){
               var desiredQuantity=quantity.userQuant;

               //testing each variable for proper read of users input
               console.log("User asked for " + desiredQuantity + " of " + choice.userChoice)

               // access table to grab quantity data of user requested for item.
               connection.query(
                "SELECT * FROM products WHERE product_name=?",[choice.userChoice],function(err,res){
                   if(err){console.log(err)}
             
                 // run a object for-loop to grab stock_quantity value, check it for user
                for(var l in res){var actualQuantity=res[l].stock_quantity}
                console.log("The quantity is " + actualQuantity);

                // buy function(console.log a numerical total and alter table value)
                if(desiredQuantity > actualQuantity){
                   var newAmount="";
                   newQuantity(actualQuantity,choice.userChoice)
                   
                   console.log("too many. shoot!!");}
                
                 else
                 {console.log('alright, lets go ahead and make that happen!')
                  makeSale(choice.userChoice,desiredQuantity);
                }
              
               })
           })
        })
    })
 }


// adjust balance function

function adjustBalance(person,cost){
    connection.query("SELECT * customers ")
}









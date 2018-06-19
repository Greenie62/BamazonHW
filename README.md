# BamazonHW



Bamazon Auction Application. 

* first inquires users name to determine if it has record of buyer(and balance)
     -if not they are then asked to provide a starting balance. Both pieces of info go into customers Table
    
* next a itemlist of all the names from the products comes up. Customer picks what they want.

* customer next asked for the quantity. If its too much, we apologize and re-ask them.

* Transaction goes through, giving the total and adjusting the quantity accordingly(Total cost does not come off from the balance though. :(  Next time, I start with 2 tables and be better prepared to handle that. Same with function handling. I was pleased to start assigning things their own function but...still some work on efficiency/proper info at proper time sort of thing. lol)

* There is a resupply inventory function that resupplies items with a random generator. Mainly cause I was tired of resetting a single item and it was a nice 30 second breather from the rest of the stuff. lol
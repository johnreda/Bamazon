var mysql = require ('mysql');
var prompt = require ('prompt');


// CONNECTION SCHEMA
		var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		database: 'Bamazon'
		});

//GLOBAL VARIABLES (???)


	//CONNECTING TO DATABASE
	con.connect(function (err){
		if (err){
			console.log(err + "NOPE");
		}
		console.log ('YOU ARE NOW SIGNED IN AS MANAGER');
		//SHOW INITIAL MENU OPTIONS
			console.log(" ");
			console.log("PLEASE SELECT FROM THE FOLLOWING OPTIONS");
			console.log(" ");
			console.log("1) VIEW PRODUCTS FOR SALE");
			console.log("2) VIEW LOW INVENTORY");
			console.log("3) ADD TO CURRENT INVENTORY");
			console.log("4) ADD NEW PRODUCT");

prompt.start(); //START PROMPT TO GET MANAGER INPUPT
	
	prompt.get(["select_option"], function (err, result){
		managerOpt = result.select_option;
		console.log(managerOpt);

		if (managerOpt == 1){
			con.query("SELECT * FROM Products", function (err, rows){


			if (err) {
				return ("error");
			} else {
				//CREATES A LOOP TO RETURN FORMATTED DATA
			for (var i = 0; i < rows.length; i++) {
					console.log ("Item id: " + rows[i].ItemID +
								 ", Product: " + rows[i].ProductName +
								 ", Price: $" + rows[i].Price + ".00" +
								 ", Quantity: " + rows[i].StockQuantity);
					}
				}//<< CLOSES THE ELSE STATEMENT

			})//<< CLOSES OUT THE MYSQL QUERY

		}//<< CLOSES IF STATEMENT FOR OPTION 1, ADD OPTIONS 2-4 AFTER THIS CLOSING BRACE
			
			else if (managerOpt == 2){
			con.query("SELECT * FROM Products WHERE StockQuantity < 5", function (err, rows){
				for (var i = 0; i < rows.length; i++) {
					console.log (   "Item ID: "+ rows[i].ItemID +
									", Product: "+ rows[i].ProductName +
									", Price: $" + rows[i].Price + ".00" +
									"Quantity: " + rows[i].StockQuantity);
				}; //<< CLOSES FOR LOOP AND CONSOLE.LOG OF QUANTITIES
			}) //<< CLOSES QUERY STATEMENT
		}//<<CLOSES ELSE IF STATEMENT 1

		else if (managerOpt == 3){
		//SHOW MENU
		con.query("SELECT * FROM Products", function (err, rows){
			
			if (err) {
				return ("error");
			} else {
				//CREATES A LOOP TO RETURN FORMATTED DATA
			for (var i = 0; i < rows.length; i++) {
					console.log ("Item id: " + rows[i].ItemID +
								 ", Product: " + rows[i].ProductName +
								 ", Price: $" + rows[i].Price + ".00" +
								 ", Quantity: " + rows[i].StockQuantity);
					}
				}//<< CLOSES THE ELSE STATEMENT

			})//<< CLOSES OUT THE MYSQL QUERY		

			//GETS INFORMATION FOR UPDATING THE DATABASE
				
		//GETS ID OF PRODUCT TO UPDATE STOCK FOR
			console.log("Please select the Item ID for the product you wish to restock:")
			console.log(" ");
				prompt.get(['select_id'], function (err, result){
					updateID = result.select_id;
					console.log("UPDATE ID:" + updateID)
					console.log(" ");

		//GETS QUANTITY OF PRODUCT TO RESTOCK
			console.log("Please select how many items to add:")
				prompt.get(['add'], function (err, result){
					addToStock = result.add;
					console.log("ADD: " + addToStock + " to stock");

			//UPDATE TABLE WITH RESTOCK INFORMATION
					con.query("UPDATE Products SET StockQuantity = " + addToStock + 
						" WHERE StockQuantity = " + currentStock + " AND ItemID = " + updateID, 
					function (err, rows){
						console.log(rows);
						var currentStock = rows[0].StockQuantity;
					})
				})


			})

		} //<< CLOSES MENU OPTION 3

	});//<< CLOSES PROMPT

});//<< CLOSES ENTIRE CONNECTION OPTION




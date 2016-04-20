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
		console.log ('connected');
	});

		//CREATE THE QUERY	
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
				
				//SETS THE TABLE VALUES AS VARIABLES TO COMPARE WITH USER'S ORDER
				var itemId = rows[i].ItemID;
				var product = rows[i].ProductName;
				var price = rows[i].Price;
				var startQuant = rows[i].StockQuantity;

			}; //<< CLOSE DISPLAY MENU FOR LOOP
		} //<< CLOSE GET/DISPLAY MENU

		prompt.start() 

			prompt.get(['productid', 'quantity'], function (err, result){

				//TAKE THE USER'S ORDER
				var productid = result.productid;
					//console.log(productid);
				var quantity = result.quantity;
					//console.log(quantity); 

					//CHECK TO SEE IF THERE IS ENOUGH STOCK
					con.query("SELECT * FROM Products WHERE ItemID =" + productid, function (err, rows){
						
						var currentStock = rows[0].StockQuantity;
							console.log("Current Stock: " + currentStock);
							console.log("Quantity: " + quantity);
						var newStock = rows[0].StockQuantity - quantity;
							console.log("New Stock: " + newStock);

						//console.log(rows);
					
						if (quantity > rows[0].StockQuantity){
							console.log("Insufficient Stock");
						} else {
							console.log("You have ordered " + quantity + " " + '"' + rows[0].ProductName + 's"');
							console.log("Your total is: $" + (quantity * rows[0].Price));
						}
							//console.log("NEW STOCK:" + currentStock - quantity);
					
					//UPDATE TABLE AFTER AN ORDER IS PLACED
					con.query("UPDATE Products SET StockQuantity = " + newStock + "WHERE StockQuantity = " + rows[0].StockQuantity, function (err, rows){
						console.log("UPDATED TABLE");
					})

						});//<< CLOSE ORDER FUNCTION

			})//<< CLOSE PROMPT FUNCTION

	}) //<< CLOSE ORIGINAL QUERY


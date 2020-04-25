const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

//mysql connection
var connection = mysql.createConnection({
  host: 'backend-db',
  port: '3306',
  user: 'manager',
  password: 'Password',
  database: 'db'
});

//set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
    logger.error("Cannot connect to DB!");
  logger.info("Connected to the DB!");
});

//GET
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});

//GET PASSWORD FOR A USERNAME
app.get('/users', (req, res) => {
	var user = req.param('user');
	connection.query('SELECT passwd FROM `db`.`users` WHERE username = ?', user, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query again");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//CREATE A NEW USER
app.post('/users', (req, res) => {
  var username = req.param('username');
	var passwd = req.param('passwd');
	var email = req.param('email');
	var firstName = req.param('firstName');
	var lastName = req.param('lastName');

  connection.query("INSERT INTO `db`.`users` (username, passwd, email, firstName, lastName) VALUES (?,?,?,?,?)", [username, passwd, email, firstName, lastName], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into users table");
    }
    else {
      res.status(200).send(`added ${req.body.product} to the users table!`);
    }
  });
});

//ADD AN ITEM TO THE INVENTORY
app.post('/inventory', (req, res) => {
  var itemName = req.body.itemName;
	var itemDescription = req.body.itemDescription;
	var numInStock = req.body.numInStock;
	var price = req.body.price;
	var itemType = req.body.itemType;
	var familySafe = req.body.familySafe;
	var availableToPackage = req.body.availableToPackage;

  connection.query("INSERT INTO inventory(itemName, itemDescription, numInStock, price, itemType, familySafe, availableToPackage) VALUES (?,?,?,?,?,?,?)", [itemName, itemDescription, numInStock, price, itemType, familySafe, availableToPackage], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into inventory table");
    }
    else {
      res.status(200).send(`added ${req.body.product} to the inventory table!`);
    }
  });
});

//GET ENTIRE INVENTORY LIST
app.get('/inventory', (req, res) => {

	connection.query("select * from inventory", function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//UPDATE ITEM DETAILS
app.put('/inventory', function (req, res) {
  var itemID = req.param('itemID');
	var itemName = req.param('itemName');
	var itemDescription = req.param('itemDescription');
	var numInStock = req.param('numInStock');
	var price = req.param('price');
  var availableToPackage = req.param('availableToPackage');
  var familySafe = req.param('familySafe');

	connection.query("UPDATE inventory SET itemName=?, itemDescription=?, numInStock=?, price=?,availableToPackage=?,familySafe=? WHERE itemID=?", [itemName, itemDescription, numInStock, price, availableToPackage, familySafe, itemID], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//GET DETAILS ON SPECIFIC ITEM FROM THE INVENTORY
app.get('/item', (req, res) => {
  var itemID = req.param('itemID');
	connection.query("SELECT * FROM inventory WHERE itemID = ?", itemID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//UPDATE WAREHOUSE PROFILE
app.put('/warehouseprofile', function (req, res) {
	var warehouseName = req.param('warehouseName');
	var email = req.param('email');
	var phoneNumber = req.param('phoneNumber');
	var address = req.param('address');
	var city = req.param('city');
	var zipcode = req.param('zipcode');


	connection.query("UPDATE warehouseProfile SET warehouseName=?, email=?, phoneNumber=?, address=?, city=?, zipcode=? WHERE warehouseID=1", [warehouseName, email, phoneNumber, address, city, zipcode], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//GET WAREHOUSE PROFILE INFORMATION
app.get('/warehouseprofile', function (req, res) {
  connection.query("SELECT * FROM warehouseProfile", function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//RETURNS CUSTOMERS TABLE
app.get('/customers', function (req, res) {
  connection.query("SELECT * FROM customers", function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//RETURNS INFORMATION FOR A SPECIFIC CUSTOMER
app.get('/customer', (req, res) => {
  var customerID = req.param('customerID');
	connection.query("SELECT firstName, lastName, email, phoneNumber, address, city, zipcode, state FROM customers WHERE customerID = ?", customerID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//ROUTES FOR SEARCH FILTERS
//SEARCH FOR ITEM NAME
app.get('/search', (req, res) => {
  var search = req.param('search');
	connection.query("SELECT * FROM inventory WHERE itemName LIKE ? OR itemDescription LIKE ? OR itemType LIKE ?", ['%' + search + '%','%' + search + '%','%' + search + '%'], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//RETURNS ITEMS THAT NEED TO BE RESTOCKED
app.get('/restock', (req, res) => {

	connection.query("select * from inventory WHERE numInStock < 10", function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//RETURNS INVENTORY FROM PRICE:LOW TO HIGH
app.get('/priceasc', (req, res) => {

	connection.query("select * from inventory ORDER BY price", function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//RETURNS INVENTORY FROM PRICE:HIGH TO LOW
app.get('/pricedesc', (req, res) => {

	connection.query("select * from inventory ORDER BY price DESC", function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//RETURNS ALL FAMILY SAFE ITEMS
app.get('/familysafe', (req, res) => {

	connection.query("select * from inventory WHERE familySafe = 'yes'", function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//RETURNS ALL ITEMS THAT CAN BE PACKAGED
app.get('/package', (req, res) => {

	connection.query("select * from inventory WHERE availableToPackage = 'yes'", function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//RETURNS INVENTORY FROM A SPECIFIC CATEGORY
app.get('/category', (req, res) => {
  var itemType = req.param('itemType');
	connection.query("select * from inventory WHERE itemType = ?", itemType,function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//RETURNS A LIST OF ORDERS FROM MOST RECENT TO LEAST RECENT
app.get('/orders', (req, res) => {
	connection.query("select  o.orderID, LEFT(o.orderDate,10) as Date, o.customerID, concat(c.firstName,' ', c.lastName) as Name from orders o INNER JOIN customers c ON o.customerID=c.customerID ORDER BY o.orderDate DESC",function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//RETURNS ORDER DETAILS FOR A SPECIFIC ORDER
app.get('/orderDetails', (req, res) => {
  var orderID = req.param('orderID');
	connection.query("SELECT od.itemID, i.itemName as Item, od.quantity as Quantity FROM orderDetails od INNER JOIN inventory i ON od.itemID = i.itemID WHERE orderID = ?", orderID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query for inventory");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
	});
});

//ADD ORDER TO ORDERS TABLE
app.post('/orders', function (req, res) {
	var customerID = req.param('customerID');
	var orderDate = req.param('orderDate');

	connection.query("INSERT INTO orders(customerID, orderDate) VALUES (?,?)", [customerID,orderDate],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//ADD AN ITEM TO AN EXISTING ORDER
app.post('/orderdetails', function (req, res) {
	var orderID = req.param('orderID');
	var itemID = req.param('itemID');
	var quantity = req.param('quantity');

	connection.query("INSERT INTO orderDetails(orderID, itemID, quantity) VALUES (?,?,?)", [orderID,itemID,quantity],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});


//update the numInStock of the inventory after an order is placed
app.put('/subtractInventory', function (req, res) {
	var itemID = req.param('itemID');
	var subtracted = req.param('subtracted');
	connection.query("UPDATE inventory SET numInStock = numInStock - ? WHERE inventory.itemID = ?", [subtracted,itemID], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

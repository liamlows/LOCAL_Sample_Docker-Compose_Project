-- create table in DB
CREATE TABLE `db`.`test_table` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(45),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

-- insert sample entry
INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');

-- Users table, fix formatting
CREATE TABLE `db`.`users` (
`userID` int NOT NULL AUTO_INCREMENT,
`username` varchar(20) NOT NULL,
`passwd` varchar(20) NOT NULL,
`email` varchar(50),
`firstName` varchar(50),
`lastName` varchar(50),
PRIMARY KEY (`userid`)
);

INSERT INTO `db`.`users` (`username`, `passwd`, `email`, `firstName`, `lastName`) VALUES
('bsmith', 'password1', 'bsmith@gmail.com','Bob', 'Smith'),
('cmartin','password2','cmartin@gmail.com','Clare','Martin'),
('bbrown','password3','bbrown@gmail.com','Ben','Brown'),
('smorgan','password4','smorgan@gmail.com','Sam','Morgan')
;

-- Customers Table
CREATE table IF NOT EXISTS `db`.`customers` (
`customerID` int AUTO_INCREMENT PRIMARY KEY,
`firstName` varchar(50),
`lastName` varchar(50),
`email` varchar (100),
`phoneNumber` varchar(20),
`address` varchar(100),
`city` varchar(50),
`zipcode` int,
`state` varchar(20)
);

INSERT INTO `db`.`customers` (`firstName`,`lastName`,`email`,`phoneNumber`,`address`,`city`,`zipcode`,`state`) VALUES
('Erin','Brown','314-555-1234',	'ebrown@gmail.com','6425 Boaz Lane','Dallas',75205,'TX'),
('Mary','Cooper','314-555-1235','mcooper@gmail.com','1 Brookings Drive','St. Louis',62313,'MO'),
('George','Jones','314-555-1236','gjones@gmail.com','2201 West End Avenue','Nashville',37235,'Tennessee');

-- Warehouse Profile
CREATE table IF NOT EXISTS `db`.`warehouseProfile` (
`warehouseID` int AUTO_INCREMENT PRIMARY KEY,
`warehouseName` varchar(100) NOT NULL,
`email varchar` (100),
`phoneNumber` varchar(20),
`address` varchar(100),
`city` varchar(50),
`zipcode` int,
`state` varchar(20)
);

INSERT INTO `db`.`warehouseProfile` (`warehouseName`,`email`,`phoneNumber`,`address`,`city`,`zipcode`,`state`) VALUES
('Smith Warehouse','smith@smith.com','(313)-555-4822', '707 Oxford Rd.','Ann Arbor',48104,'MI');

-- Inventory Table
CREATE table IF NOT EXISTS `db`.`inventory` (
`itemID` int AUTO_INCREMENT PRIMARY KEY,
`itemName` varchar(100),
`itemDescription` varchar(1000),
`numInStock` int DEFAULT 0,
`price` decimal(10,2) DEFAULT 0,
`itemType` varchar(30) NOT NULL,
`familySafe` varchar(10),
`availableToPackage` varchar(10)
);

INSERT INTO `db`.`inventory` (`itemName`, `itemDescription`, `numInStock`, `price`, `itemType`, `familySafe`, `availableToPackage`) VALUES
('Kellway 3 Piece Sofa','White leather, includes 2 corner wedge pieces and one armless chair',10,804,'Living Room', 'yes','no'),
('Olsberg Sofa','Grey upholstery with reversible seat cushions',15,538,	'Living Room','yes','no'),
('Leather Power Recline Loveseat','Black leather with built in storage',2,638, 'Living Room','no','no'),
('Office Desk','Wood desk with drawers',10, 500, 'Office','yes','yes'),
('L-Shape Desk','With 2 drawers and built in USB port',20,339, 'Office','yes','no'),
('Upholstered Panel Headboard','Expandable from a twin to a king-size bed',10,115, 'Bedroom','yes','yes'),
('Upholstered Standard Bed','Queen size with button tufted headboard',5,122,'Bedroom','yes','no'),
('Olivia 3 piece Breakfast Nook Dining Set','Solid Pine wood with upholstery',2,600, 'Dining Room','yes','no'),
('Wooden Garden Bench','Curved arms and slatted seat',10,123, 'Outdoor','yes','yes'),
('5 Tier Shoe Rack','4 open shelves with dense steel mesh',10,109, 'Storage','yes','yes'),
('N95 Masks','Temporary Item',0,10000, 'COVID','yes','no')
;

-- Orders Table
CREATE table IF NOT EXISTS `db`.`orders` (
`orderID` int AUTO_INCREMENT PRIMARY KEY,
`customerID` int NOT NULL,
`orderDate` date NOT NULL,
FOREIGN KEY(`customerID`) REFERENCES `db`.`customers`(`customerID`)
);

INSERT INTO `db`.`orders` (`orderDate`, `customerID`) VALUES
('2020-03-31',	1),
('2020-02-20',	3),
('2020-02-18',	2)
;

-- Order Details Table
CREATE table `db`.`orderDetails` (
`orderID` int,
`itemID` int,
`quantity` int,
CONSTRAINT `compDetailID` PRIMARY KEY (`orderID`, `itemID`),
FOREIGN KEY(`orderID`) REFERENCES `db`.`orders`(`orderID`),
FOREIGN KEY(`itemID`) REFERENCES `db`.`inventory`(`itemID`)
);

INSERT INTO `db`.`orderDetails` VALUES
(1,1,1),
(1,8,1),
(2,12,1),
(2,5,2),
(3,6,2)
;

-- create user called `manager` with password `Password`
CREATE USER 'manager'@'%' IDENTIFIED BY 'Password';

-- give access to manager on db
GRANT ALL PRIVILEGES ON db.* TO 'manager'@'%';

-- set password method to native password for mysql workbench access (mysql 8 issue)
ALTER USER 'manager'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'Password';

-- flush them privileges
FLUSH PRIVILEGES;

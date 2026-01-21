CREATE TABLE USERS (
    EMAIL VARCHAR(100) PRIMARY KEY,
    passwords VARCHAR(255),
    First_name VARCHAR(100),
    Last_name VARCHAR(100),
    Phone VARCHAR(20),
    Language VARCHAR(25),
    role VARCHAR(20) DEFAULT 'customer',
    Date_Of_Birth DATE 
);

CREATE TABLE ADDRESS(
    ID int PRIMARY KEY,
    street VARCHAR(100),
    suburb VARCHAR(50),
    state VARCHAR(50),
    Country VARCHAR(50)
);

CREATE TABLE ORDERS(
    ID INT PRIMARY KEY,
    date DATE,
    shipping_price float,
    User_email VARCHAR(100) REFERENCES USERS(EMAIL),
    Address_ID INT REFERENCES ADDRESS(ID)
);

CREATE TABLE PRODUCT(
    ID INT PRIMARY KEY,
    name VARCHAR(100),
    price FLOAT,
    image VARCHAR(200),
    Weight float,
    description VARCHAR(500)
);

CREATE TABLE PRODUCT_OPTION(
    ID INT PRIMARY KEY,
    Product_ID INT REFERENCES PRODUCT(ID),
    image VARCHAR(200),
    Option_name VARCHAR(100),
    Additional_Cost float
);

CREATE TABLE Catagory (
    ID INT PRIMARY KEY,
    Name VARCHAR(100), 
    description VARCHAR(500)
);

CREATE TABLE PRODUCT_CATAGORY(
    Product_ID int REFERENCES PRODUCT(ID),
    Catagory_ID INT REFERENCES Catagory(ID),
    PRIMARY KEY (Product_ID, Catagory_ID)
);

CREATE TABLE ORDERS_PRODUCT(
    Product_ID int REFERENCES PRODUCT(ID),
    Orders_ID INT REFERENCES Orders(ID),
    PRIMARY KEY (Product_ID, Orders_ID)
);

ALTER TABLE Users
ADD CONSTRAINT CHK_Email_Format CHECK (Email LIKE '%_@__%.__%');

ALTER TABLE Users
ADD CONSTRAINT Input_Security_Email 
CHECK (
    Email NOT LIKE '%;%' AND 
    Email NOT LIKE '%)%' AND 
    Email NOT LIKE '%/%' AND 
    Email NOT LIKE '%!%'
);

ALTER TABLE Users
ADD CONSTRAINT Input_Security_First_name
CHECK (
    First_name NOT LIKE '%;%' AND 
    First_name NOT LIKE '%)%' AND 
    First_name NOT LIKE '%/%' AND 
    First_name NOT LIKE '%!%'
);

ALTER TABLE Users
ADD CONSTRAINT Input_Security_Last_name
CHECK (
    Last_name NOT LIKE '%;%' AND 
    Last_name NOT LIKE '%)%' AND 
    Last_name NOT LIKE '%/%' AND 
    Last_name NOT LIKE '%!%'
);

ALTER TABLE Users
ADD CONSTRAINT Input_Security_Phone
CHECK (
    Phone NOT LIKE '%;%' AND 
    Phone NOT LIKE '%)%' AND 
    Phone NOT LIKE '%/%' AND 
    Phone NOT LIKE '%!%'
);


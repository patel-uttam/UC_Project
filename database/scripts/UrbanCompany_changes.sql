USE UrbanCompany
GO

SELECT * FROM Customer
update AspNetUsers SET UserName='USer1' WHere UserName='user1';

sp_help AspNetUsers

ALTER TABLE AspNetUsers ALTER Column PhoneNumber nvarchar(10) NOT NULL
ALTER TABLE AspNetusers ADD Constraint Phone_Unique UNIQUE(PhoneNumber)
ALTER TABLE AspNetusers ADD Constraint Email_Unique UNIQUE(Email)

ALTER TABLE AspNetusers ALTER Column UserName nvarchar(256)

SELECT * From AspNetUsers

INSERT into AspNetUsers VALUES ('e9c69fc4-6b37-4555-8dca-c20ab943fa8e','Bhalu','BHALU','abc@xyz.com','ABC@XYZ.COM',0,'AQAAAAEAACcQAAAAEIxj/gPOCfsxvO43euUYT4w+KQHPTVUD+56OEQob1lHdFKBfbg2bYZhRNem9NPjCqw==','RNEQMQYB7W26C2BFGAYQTCIVMKOUYST2','9062d874-715d-449d-adef-bd0212258b1d','8585858585',0,0,NULL,22,0)


/**/

CREATE TABLE Customer
(
CustomerId int Primary Key Identity(1,1),
CustomerName varchar(50),
CustomerPhone nvarchar(20),
CustomerEmail nvarchar(256),
CustomerAddress1 varchar(50),
CustomerCity varchar(50),
CustomerDistrict varchar(50)
)

CREATE TABLE Provider
(
ProviderId int Primary Key Identity(1,1),
ProviderName varchar(50),
ProviderPhone nvarchar(20),
ProviderEmail nvarchar(256),
ProviderCity varchar(50),
ProviderDistrict varchar(50),
Rating float,
Category int CONSTRAINT FK_Provider_Service FOREIGN KEY REFERENCES Category(CategoryId)
)

/*DROP TABLE Provider*/

CREATE TABLE Category
(
CategoryId int Primary Key Identity(1,1),
CategoryName varchar(50) Not Null
)
ALTER TABLE Category ADD CONSTRAINT Unique_Category Unique(CategoryName)


CREATE TABLE Services
(
ServiceId int Primary Key Identity(1,1),
ServiceName varchar(256) Not Null,
CategoryId int CONSTRAINT Fk_Services_Category FOREIGN KEY REFERENCES Category(CategoryId)
)
ALTER TABLE Services ADD CONSTRAINT Unique_Service Unique(ServiceName)

/*ALTER TABLE Services_Category ALTER COLUMN ServiceName varchar(256) Not Null */
/* ALTER TABLE Services_Category ADD CONSTRAINT Service_Unique UNIQUE(ServiceName)
GO */

CREATE TABLE Sub_Service
(
SubServiceId int Primary Key Identity(1,1),
SubServiceName varchar(256) not null,
ServiceId int CONSTRAINT FK_subservice_service FOREIGN KEY REFERENCES Services(ServiceId),
Cost int not null,
)

ALTER TABLE Sub_Service ADD CONSTRAINT Unique_SubService Unique(SubServiceName)

/* ALTER TABLE Sub_Service ALTER COLUMN SubServiceName varchar(256) Not Null*/
/*ALTER TABLE Sub_Service ADD CONSTRAINT SubService_Unique UNIQUE(SubServiceName)*/

CREATE TABLE Cart
(
CartId int Primary Key Identity(1,1),
Customer int CONSTRAINT FK_Cart_Customer FOREIGN KEY REFERENCES Customer(CustomerId), /* Provider int CONSTRAINT FK_Cart_Provider FOREIGN KEY REFERENCES Provider(ProviderId) */
Service int CONSTRAINT FK_Cart_Service_category FOREIGN KEY REFERENCES Services(ServiceId),
SubService int CONSTRAINT FK_Cart_Service FOREIGN KEY REFERENCES Sub_Service(SubServiceId),
Cost int not null
)
/*ALTER TABLE Cart ALTER COLUMN Customer int Not Null*/
/*DROP TABLE Cart*/

CREATE TABLE Orders
(
OrderId int Primary Key Identity(1,1),
Customer int CONSTRAINT FK_Order_Customer FOREIGN KEY REFERENCES Customer(CustomerId),
Cart_Reference varchar(max) Not Null,
Total_Cost int Not Null
)



/*
DROP TABLE Services_Category

ALTER TABLE Services_Category ADD CONSTRAINT Service_Category_Unique UNIQUE(ServiceName)

*/


/* insert */

/*INSERT INTO Services_Category VALUES ('Sallon For Men'),('Sallon For Women'),('Applicants'),('Cleaning'),('Pest Control'),('Electricians'),('Plumbers'),('Carpenters')*/
/*INSERT INTO Services_Category VALUES ('Applicants Installation')*/

/*UPDATE Services_Category SET ServiceName = 'Applicants Repair' WHERE ServiceName='Applicants'*/

/*SELECT * FROM Sub_Service ORDER BY SubServiceId ASC */


/* INSERT INTO Sub_Service VALUES ('Hair Cutting For Men',1,100),('Clean Shave For Men',1,70),('Hair Color For Men',1,200),('Beard Grooming',1,90),('Face Care For Men',1,150) */

/* INSERT INTO Sub_Service VALUES ('Facial & CleanUp',2,350),('Low Contact Threading',2,149),('Honey Wax',2,359),('Chocolate Wax',2,459) */

/* INSERT INTO Sub_Service VALUES ('A/C Repair',3,699),('Microwave Repair',3,499),('Refrigerator Repair',3,599),('Water Purifier Repair',3,399),('Geyser Repair',3,449) */

/* INSERT INTO Sub_Service VALUES ('A/C Repair',3,699),('Microwave Repair',3,499),('Refrigerator Repair',3,599),('Water Purifier Repair',3,399),('Geyser Repair',3,449) */
/* INSERT INTO Sub_Service VALUES ('A/C Install',9,250),('Microwave Install',9,250),('Refrigerator Install',9,250),('Water Purifier Install',9,250),('Geyser Install',9,250) */

/*  */


/* SELECT * FROM Services_Category as sc
   JOIN Sub_Service as s
   ON sc.ServiceId=s.ServiceId
*/

CREATE TABLE Order_History
(
OrderHistoryId int Primary Key Identity(1,1),
OrderId int CONSTRAINT FK_OrderId FOREIGN KEY REFERENCES Orders(OrderId) Not Null,
Customer int CONSTRAINT FK_OrderHistory_Customer FOREIGN KEY REFERENCES Customer(CustomerId),/*Provider int CONSTRAINT FK_OrderHistory_Provider FOREIGN KEY REFERENCES Provider(ProviderId)*/
Service int CONSTRAINT FK_OrderHistory_Service_category FOREIGN KEY REFERENCES Services(ServiceId) ,
SubService int CONSTRAINT FK_OrderHistory_Service FOREIGN KEY REFERENCES Sub_Service(SubServiceId) ,
Cost int not null
)



/*     */

/*
Drop TABLE Sub_Service
GO

Drop TABLE Provider
GO

Drop TABLE Services_Category
GO

Drop TABLE Cart
GO

Drop TABLE Orders
GO

DROP TABLE Order_History
GO
*/

/* */

SELECT * FROM SubService

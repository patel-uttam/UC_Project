USE UrbanCompany
GO

CREATE TABLE Customer
(
CustomerId int Primary Key Identity(1,1),
CustomerName varchar(25) not null,
CustomerMobile varchar(10) not null,
CustomerAddress1 varchar(max),
CustomerAddress2 varchar(max)
)

CREATE TABLE Provider
(
ProviderId int Primary Key Identity(1,1),
ProviderName varchar(25) not null,
ProviderMobile varchar(10) not null,
ProviderEmail varchar(max) not null,
ServiceId int CONSTRAINT FK_provider_service FOREIGN KEY REFERENCES Services_Category(ServiceId)
)

ALTER TABLE Customer ADD CONSTRAINT Check_mobile_customer CHECK(ISNUMERIC(CustomerMobile) = 1)
ALTER TABLE Provider ADD CONSTRAINT Check_mobile CHECK(ISNUMERIC(ProviderMobile) = 1)

CREATE TABLE Services_Category
(
ServiceId int Primary Key Identity(1,1),
ServiceName varchar(25) not null,
)

CREATE TABLE Sub_Service
(
SubServiceId int Primary Key Identity(1,1),
SubServiceName varchar(25) not null,
ServiceId int CONSTRAINT FK_subservice_service FOREIGN KEY REFERENCES Services_Category(ServiceId),
Cost int not null,
)


/*                                                                                           */


CREATE TABLE Cart
(
Customer int CONSTRAINT FK_Cart_Customer FOREIGN KEY REFERENCES Customer(CustomerId),
Provider int CONSTRAINT FK_Cart_Provider FOREIGN KEY REFERENCES Provider(ProviderId),
Service_Category int CONSTRAINT FK_Cart_Service_category FOREIGN KEY REFERENCES Services_Category(ServiceId),
Service int CONSTRAINT FK_Cart_Service FOREIGN KEY REFERENCES Sub_Service(SubServiceId),
Cost int not null

)

CREATE TABLE Orders
(
OrderId int PRIMARY KEY IDENTITY(1,1),
Customer int CONSTRAINT FK_Order_Customer FOREIGN KEY REFERENCES Customer(CustomerId),
Provider int CONSTRAINT FK_Order_Provider FOREIGN KEY REFERENCES Provider(ProviderId),
Service_Category int CONSTRAINT FK_Order_Service_category FOREIGN KEY REFERENCES Services_Category(ServiceId),
Services varchar(max) not null,
Total_Cost int not null
)


SELECT * FROM AspNetUsers

/* DELETE FROM AspNetUsers where UserName = 'Kunj'; */


/* 21-12-21*/

USE UrbanCompany
GO

SELECT * FROM Customer

ALTER TABLE Customer Add City varchar(30)

ALTER TABLE Customer DROP COLUMN CustomerAddress2 

SELECT * FROM Provider

ALTER TABLE Provider Add Service_City varchar(30)


Insert Into Services_Category Values ('Sallon For Men'),('Sallon For Women'),('Cleaning & Pest-Control'),('Electrician'),('Applicants');

INSERT INTO Sub_Service Values ('Hair Cutting Men',1,100),('Hair Color Men',1,200),('Kid Hair Cutting Men',1,70),('Clean Shave Men',1,50);


/* 21-12-21*/

/* ********************************************************* */

/* 23-12-21 */

ALTER TABLE AspNetUsers ALTER Column PhoneNumber nvarchar(10) Not Null
/*ALTER TABLE AspNetUsers ADD Constraint Phone_Unique UNIQUE(PhoneNumber)*/



DROP TABLE Customer /*last*/
DROP TABLE Services_Category
DROP TABLE Provider
DROP TABLE Sub_Service
DROP TABLE Cart/*first*/

DROP TABLE Orders

/* 23-12-21 */


/*

ALTER TABLE AspNetUsers ALTER COLUMN PhoneNumber nvarchar(10)
ALTER TABLE AspNetUsers ADD CONSTRAINT Phone_Unique UNIQUE(PhoneNumber)
*/
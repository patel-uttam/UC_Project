USE UrbanCompany
GO

SELECT * FROM Review_Rating
GO

TRUNCATE TABLE Review_Rating

SELECT * FROM Cart
GO

SELECT * FROM Provider
GO

UPDATE Provider SET Rating = null WHERE ProviderId=5

SELECT * FROM Order_Ongoing
GO

SELECT * FROM Services

SELECT * FROM Sub_Service

SELECT * FROM Provider



/* new table for review and rating */

CREATE TABLE Review_Rating
(
ReviewId int Primary Key Identity(1,1),
Review varchar(612) Not Null,
Rating int Not Null,
SubService_Id int CONSTRAINT Fk_Review_SubService FOREIGN KEY REFERENCES Sub_Service(SubServiceId),
OrderHistory_Id int CONSTRAINT Fk_Review_Order FOREIGN KEY REFERENCES Order_History(OrderHistoryId),
Service_Id int CONSTRAINT Fk_Review_Service FOREIGN KEY REFERENCES Services(ServiceId),
Provider_Id int CONSTRAINT Fk_Review_Provider FOREIGN KEY REFERENCES Provider(ProviderId),
Customer_Id int CONSTRAINT Fk_Review_Customer FOREIGN KEY REFERENCES Customer(CustomerId)
)



/* Add new table Country,State,City,ServiceArea */

CREATE TABLE Country
(
CountryId int Primary Key Identity(1,1),
CountryName varchar(50) Not Null
)

CREATE TABLE State
(
StateId int Primary Key Identity(1,1),
StateName varchar(50) Not Null,
CountryId int CONSTRAINT Fk_State_Country FOREIGN KEY REFERENCES Country(CountryId),
)

CREATE TABLE City
(
CityId int Primary Key Identity(1,1),
CityName varchar(50) Not Null,
StateId int CONSTRAINT Fk_City_State FOREIGN KEY REFERENCES State(StateId),
)

CREATE TABLE Area
(
AreaId int Primary Key Identity(1,1),
AreaName varchar(50) Not Null,
PinCode int Not Null,
CityId int CONSTRAINT Fk_Area_City FOREIGN KEY REFERENCES City(CityId),
)


/**/

/* alter Category */

ALTER TABLE Category Add logo_img varchar(max)
ALTER TABLE Category Add bg_img varchar(max)
ALTER TABLE Category Add Description varchar(500)

ALTER TABLE Services Add Rating int


/* alter customer*/

alter table Customer DROP Column CustomerDistrict

SELECT * FROM Customer 
update Customer set CustomerCity1 = CustomerCity WHERE CustomerId = 22

alter table Customer alter Column CustomerAddress1 varchar(100)
alter table Customer Add CustomerArea1 varchar(50)
alter table Customer Add CustomerCity1 varchar(50)
alter table Customer Add CustomerState1 varchar(50)
alter table Customer Add CustomerCountry varchar(50)

alter table Customer Add CustomerAddress2 varchar(100)
alter table Customer Add CustomerArea2 varchar(50)
alter table Customer Add CustomerCity2 varchar(50)
alter table Customer Add CustomerState2 varchar(50)
/**/

/* alter Provider */
alter table Provider DROP Column ProviderDistrict

alter table Provider Add ProviderArea varchar(50)
alter table Provider Add ProviderState varchar(50)
alter table Provider Add ProviderCountry varchar(50)
alter table Provider Add IsAvailable bit
/**/


/* alter Order_Onoing and Order_History */
	
alter table Order_Ongoing Add DeliveryAddress varchar(100)
alter table Order_History Add DeliveryAddress varchar(100)



/* Alter Sub_Service,Provider Add Category , alter Cart , add Ongoing_Order , alert Order_History */


ALTER TABLE Sub_Service Add Discount int
ALTER TABLE Sub_Service Add ServiceTime int
ALTER TABLE Sub_Service Add Details varchar(500)
ALTER TABLE Sub_Service Add Img1 varchar(500)
ALTER TABLE Sub_Service Add Img2 varchar(500)
ALTER TABLE Sub_Service Add Img3 varchar(500)
ALTER TABLE Sub_Service Add Rating int



CREATE TABLE Provider
(
ProviderId int Primary Key Identity(1,1),
UserName varchar(50) Not Null,
FirstName varchar(25),
LastName varchar(25),
ProviderPhone nvarchar(20),
ProviderEmail nvarchar(256),
ProviderCity varchar(50),
ProviderDistrict varchar(50),
Rating float,
Category int CONSTRAINT FK_Provider_Service FOREIGN KEY REFERENCES Category(CategoryId)
)

ALTER TABLE Customer ADD CONSTRAINT Check_mobile_customer CHECK(ISNUMERIC(CustomerMobile) = 1)
ALTER TABLE Provider ADD CONSTRAINT Check_mobile CHECK(ISNUMERIC(ProviderMobile) = 1)

CREATE TABLE Category
(
CategoryId int Primary Key identity(1,1),
CategoryName varchar(50) Not Null
)


CREATE TABLE Cart
(
CartId int Primary Key Identity(1,1),
Customer int CONSTRAINT FK_Cart_Customer FOREIGN KEY REFERENCES Customer(CustomerId), /* Provider int CONSTRAINT FK_Cart_Provider FOREIGN KEY REFERENCES Provider(ProviderId) */
Service int CONSTRAINT FK_Cart_Service_category FOREIGN KEY REFERENCES Services(ServiceId),
SubService int CONSTRAINT FK_Cart_Service FOREIGN KEY REFERENCES Sub_Service(SubServiceId),
Cost int not null,
Qty int not null
)

CREATE TABLE Order_Ongoing
(
OrderOngoingId int Primary Key Identity(1,1),
OrderId int CONSTRAINT FK_OrderOngoing_OrderId FOREIGN KEY REFERENCES Orders(OrderId) Not Null,
Customer int CONSTRAINT FK_OrderOngoing_Customer FOREIGN KEY REFERENCES Customer(CustomerId),
Provider int CONSTRAINT FK_OrderOngoing_Provider FOREIGN KEY REFERENCES Provider(ProviderId),
Service int CONSTRAINT FK_OrderOngoing_Service_category FOREIGN KEY REFERENCES Services(ServiceId) ,
SubService int CONSTRAINT FK_OrderOngoing_Service FOREIGN KEY REFERENCES Sub_Service(SubServiceId) ,
service_date varchar(10) not null,
service_time varchar(5) not null,
Cost int not null,
Qty int not null
)


CREATE TABLE Order_History
(
OrderHistoryId int Primary Key Identity(1,1),
OrderId int CONSTRAINT FK_OrderId FOREIGN KEY REFERENCES Orders(OrderId) Not Null,
Customer int CONSTRAINT FK_OrderHistory_Customer FOREIGN KEY REFERENCES Customer(CustomerId),
Provider int CONSTRAINT FK_OrderHistory_Provider FOREIGN KEY REFERENCES Provider(ProviderId),
Service int CONSTRAINT FK_OrderHistory_Service_category FOREIGN KEY REFERENCES Services(ServiceId),
SubService int CONSTRAINT FK_OrderHistory_Service FOREIGN KEY REFERENCES Sub_Service(SubServiceId),
service_date varchar(10) not null,
Cost int not null,
Qty int not null
)



CREATE TABLE Orders
(
OrderId int Primary Key Identity(1,1),
Customer int CONSTRAINT FK_Order_Customer FOREIGN KEY REFERENCES Customer(CustomerId),
Total_Cost int Not Null,
Order_Status bit DEFAULT 0
)

/* */



/* trigger */




USE UrbanCompany
GO


sp_help Customer
ALTER TABLE Customer ALTER COLUMN CustomerPhone nvarchar(10) NOT NULL


SELECT * FROM Category
GO

SELECT * FROM Sub_Service
GO

SELECT * FROM Customer
GO

SELECT * FROM Provider
GO

/*
TRUNCATE TABLE Provider
GO
*/

SELECT * FROM AspNetUsers 
GO

/*
DELETE FROM AspNetUsers WHERE UserName = 'Provider5'
GO
*/

SELECT * FROM Cart
GO

/*sp_help Orders
GO*/	

SELECT * FROM Orders
GO

DELETE Orders
GO

SELECT * FROM Order_History
GO

TRUNCATE TABLE Order_History
GO

UPDATE Customer SET CustomerName='User2',CustomerAddress1='1,ChandraLok Society',CustomerCity='Ranip',CustomerDistrict='Ahmedabad' WHERE CustomerId=2
GO


UPDATE Provider SET ProviderName='Provider3',ProviderCity='Ranip',ProviderDistrict='Ahmedabad',Service=9 WHERE ProviderId=3
GO



SELECT * FROM Services_Category as sc
JOIN Provider as p
ON sc.ServiceId = p.Service
GO


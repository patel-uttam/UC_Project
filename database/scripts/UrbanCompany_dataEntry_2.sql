/* data entry */


/* Categroy */

/*	INSERT INTO Category VALUES ('Salon For Women'),('Hair Services For Women'),('Salon For Men'),('Spa For Women'),('Massage For Men'),('Applicants'),('Plumbers'),('Electricians'),('Carpenters'),('Pest Control'),('Cleaning') */

SELECT * FROM Category Order By CategoryId
GO

/**/


/* Service */

/*
INSERT into Services VALUES ('Packages',1),('Clean Up',1),('Facials',1),('Wax',1),('Bleach & Detan',1),('Hair Care',1),('Pedicure & Manicure',1),('Low Contact Threading',1)

INSERT into Services VALUES ('Hair Styling',2),('Haircut',2)

INSERT into Services VALUES ('Packages',3),('Haircut For Men',3),('Clean Shave',3),('Beard Grooming',3),('Face Care',3),('Haircut For Kids',3),('Hair Color',3)

INSERT into Services VALUES ('Stress Relief Therapy',4),('Pain Relief Therapy',4),('Beauty Retreat',4)

INSERT into Services VALUES ('Men Pain Relief Therapy',5),('Men Stress Relief',5),('Men Work Destress',5)

INSERT into Services VALUES ('Gyser',6),('Refrigerator',6),('AC',6),('Water Purifier',6),('Microwave',6) 

INSERT into Services VALUES ('Basin & Sink',7),('Bath Fitting',7),('Drainage Pipes',7),('Toilet',7),('Tap & Mixer',7),('Water Tank',7),('Motor',7),('Water Pipe-Connections',7),('Plumbing Consultation',7) 

INSERT into Services VALUES ('Switch & Socket',8),('Fan',8),('Light',8),('MCB & Fuse',8),('Inverter & Stabilizer',8),('Electrical Appliances',8),('Wiring',8),('Door Bell',8),('Electrical Consultation',8) 

INSERT into Services VALUES ('Balcony',9),('Bed',9),('Cupboard & Drawer',9),('Door',9),('Drill & Hang',9),('Furniture Assembly',9),('Furniture Repair',9),('Window & Curtain',9),('Carpentry Consultation',9) 

INSERT into Services VALUES ('Packages',1),('Clean Up',1),('Facials',1),('Wax',1),('Bleach & Detan',1),('Hair Care',1),('Pedicure & Manicure',1),('Low Contact Threading',1)

INSERT into Services VALUES ('Packages',1),('Clean Up',1),('Facials',1),('Wax',1),('Bleach & Detan',1),('Hair Care',1),('Pedicure & Manicure',1),('Low Contact Threading',1)
*/

SELECT * FROM Services


/**/


/*
Sub_Service

	/*
	Salon For Women Services

	CleanUp & Honey Waxing	1	349
	Facial & Bleach	1	809
	All In One	1	1249
	Papaya Nourishing Cleanup	2	349
	Crave Beauty Detan Cleanup	2	449
	Skin Brightening Facial	3	599
	Crave Beauty Nourishing Chocolate Facial	3	599
	Diamond Glow Facial	3	999
	Complete Chocolate Waxing	4	499
	Complete Honey Waxing	4	349
	Half Legs Waxing	4	149
	Full arms Waxing	4	149
	Half arms Waxing	4	99
	Face & Neck Bleach/Detan	5	299
	Full arms Bleach/Detan	5	299
	Full legs Bleach/Detan	5	149
	Full body Bleach/Detan	5	999
	Head Massage	6	199
	Henna(Mehendi) Application	6	249
	Hair Color Application	6	299
	Mani-Pedi Special	7	749
	Cut File & Polish-Feet	7	149
	Deluxe Pedicure	7	399
	Deluxe Manicure	7	349
	Eyebrows	8	29
	Upper Lip	8	19
	Chin	8	29
	Sidelocks	8	49

	insert into Sub_Service VALUES ('Eyebrows',8,29),('Upper Lip',8,19),('Chin',8,29),('Sidelocks',8,49)
	*/


	/* 
	Hair Service for Women

	insert into Sub_Service VALUES ('Haircut',9,549),('Fringe',9,249)
	insert into Sub_Service VALUES ('Blow Dry',10,299)

	*/



	/*
	Salon For Men

	11
	12
	13
	14
	15
	16
	17

	insert into Sub_Service VALUES ('Haircut + Massage',11,349,0,40,null,null,null,4,'HAIR CUT-Men''s Haircut#MASSAGE-10 min Head Massage'),('Haircut + Face care',11,499,50,50,null,null,null,0,'HAIR CUT-Men''s Haircut#SKIN CARE-Face & Neck Detan Pack'),('Haircut + Hair Color',11,749,0,70,null,null,null,0,'HAIR CUT-Men''s Haircut#HAIR COLOR WITH PRODUCT-L''Oreal Matrix color'),('Cleansing Essentials',11,849,0,65,null,null,null,0,'HAIR CUT-Men''s Haircut#SKIN CARE-Oil Reduction Cleanup')
	insert into Sub_Service VALUES ('Haircut For Men',12,249,0,30,null,null,null,0,'100% mess-free experience at the comfornt of your home#Hair cutting for one'),('Haircut For 2',12,449,0,60,null,null,null,0,'100% mess-free experience at the comfornt of your home#Hair cutting for two'),('Haircut For 3',12,749,0,90,null,null,null,0,'100% mess-free experience at the comfornt of your home#Hair cutting for three'),('Father & Kid''s Haircut',12,599,0,70,null,null,null,0,'HAIR CUT-Hair cutting for Men & Kids#MASSAGE-10 min free massage')
	insert into Sub_Service VALUES ('Clean Shave/Moustache Grooming',13,149,0,20,null,null,null,0,'Disposable blades,cape,towels & single use products'),('Clean Shave Essentials',13,399,0,50,null,null,null,0,'Disposable blades,cape,towels & single use products#SHAVE/BEARD TRIM-Clean Shave/Moustache Grooming#MASSAGE-5 min free massage')
	insert into Sub_Service VALUES ('Beard Shaping & Styling',14,199,0,25,null,null,null,0,''Get even beard shape#Get customized styles from our professionally trained stylists),('Haircut + Beard Grooming',14,49)
	insert into Sub_Service VALUES ('Eyebrows',15,29),('Upper Lip',15,19),('Chin',15,29),('Sidelocks',15,49)
	insert into Sub_Service VALUES ('Eyebrows',16,29),('Upper Lip',16,19),('Chin',16,29),('Sidelocks',16,49)
	insert into Sub_Service VALUES ('Eyebrows',17,29),('Upper Lip',17,19),('Chin',17,29),('Sidelocks',17,49)

	*/

	DELETE FROM Sub_Service WHERE SubServiceId=1032


*/

SELECT * FROM Sub_Service
GO
SELECt * FROM Services
GO

/* Data entry country , state , city , area */

INSERT INTO Country VALUES ('India')

INSERT INTO State VALUES ('Gujarat',1),('Maharashtra',1),('Delhi',1)

INSERT INTO City VALUES ('Ahmedabad',1),('Vadodara',1),('Surat',1),('New Delhi',3),('Old Delhi',3),('Delhi Cantonment',3),('Mumbai',2),('Pune',2)
INSERT INTO City VALUES ('Kadi',1),('Gandhinagar',1)

SELECT * FROM City

INSERT INTO Area VALUES ('Nirnaynagar,Ranip',382480,1),('New Ranip',382480,1),('Gota',382481,1),('Sabarmati',380005,1),('Satellite Area',380015,1),('Vandemataram City, New Sg Road Gota',382481,1)

INSERT INTO Area VALUES ('Kala Ghoda, Sayajigunj',390005,2),('Race Course,Vadodara',390007,2),('Gotri',390021,2),('Sayajigunj',390005,2)

INSERT INTO Area VALUES ('Varachha Surat',395006,3),('Bhatar Surat',395017,3),('Althan',395017,3),('New City Light,Surat',395007,3)

INSERT INTO Area VALUES ('Nani Kadi',382715,1002),('Karannagar Road',382715,1002),('Detroj Road',382715,1002)

INSERT INTO Area VALUES ('Kudasan',382421,1003),('Sargasan',382421,1003),('Gandhinagar-Sector',380016,1003)

SELECT * FROM Area
/**/
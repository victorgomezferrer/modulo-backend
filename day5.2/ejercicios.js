/*POKEMON*/ 
/*1*/ SELECT * FROM `pokemon`;  
/*2*/ SELECT 'Name',`Type 1`,`Type 2` FROM `pokemon`;
/*3*/ SELECT *  FROM `pokemon` WHERE `Type 1` LIKE 'Fire';
/*4*/ SELECT * FROM `pokemon` WHERE Speed > 90;
/*5*/ SELECT * FROM `pokemon` ORDER BY Total DESC;
/*6*/ SELECT * FROM `pokemon` WHERE Legendary LIKE 'True';
/*7*/ SELECT Name, Type 1,Type 2, FROM `pokemon` WHERE Generation = 2;
/*8*/ SELECT * FROM `pokemon` WHERE Defense >70 AND (`Type 1`LIKE 'Grass' OR `Type 2`LIKE 'Grass');
/*9*/ SELECT * FROM `pokemon` WHERE Attack BETWEEN 50 AND 70;
/*10*/ SELECT COUNT(*) as cantidad FROM `pokemon`;
/*11*/ SELECT AVG(Total) FROM `pokemon`;
/*12*/ SELECT * FROM `pokemon` WHERE Total> 400 AND (`Type 1`= 'Water' OR `Type 2` = 'Water');
/*13*/ SELECT * FROM `pokemon` WHERE name LIKE 'C%';
/*14*/ SELECT * FROM `pokemon` WHERE Generation= 3 AND Legendary!= 'True';
/*15*/ SELECT * FROM `pokemon` WHERE Name LIKE '%mega%';

º
/*MARVEL */
/*1*/ SELECT * FROM `marvel` WHERE ALIGN = 'Good Characters';
/*2*/ SELECT * FROM `marvel` WHERE EYE LIKE 'Brown Eyes' AND HAIR ='Brown Hair';
/*3*/ SELECT * FROM `marvel` WHERE SEX LIKE 'Male Characters' AND ALIVE LIKE'Living Characters';
/*4*/ SELECT * FROM `marvel` WHERE ID= 'Public Identity' AND APPEARANCES >=100;
/*5*/ SELECT * FROM `marvel` WHERE `FIRST APPEARANCE` LIKE '%-6%';
/*6*/ SELECT * FROM `marvel` WHERE `ALIGN` != 'Neutral Characters';
/*7*/ SELECT * FROM `marvel` WHERE GSM = '';
/*8*/ SELECT * FROM `marvel` WHERE `ALIVE`= 'Living Characters' AND APPEARANCES <=50;
/*9*/ SELECT * FROM `marvel` WHERE `EYE`NOT LIKE'Blue Eyes' AND `EYE` NOT LIKE'Brown Eyes';
/*10*/ SELECT * FROM `marvel` WHERE `APPEARANCES`>50 AND `APPEARANCES`<100;
/*11*/ SELECT * FROM `marvel` WHERE `SEX` = 'Female Characters' AND `ALIVE`= 'Deceased Characters';
/*12*/ SELECT * FROM `marvel` WHERE `FIRST APPEARANCE` LIKE '%-0%'
 


-- ================================== Database

USE wycgc3g4apmhrsf3;


-- ================================== Seeds

INSERT INTO `users` 
(`user_name`,`password`,`phone_number`,`email`,`is_admin`,`createdAt`,`updatedAt`) 
VALUES 
("Arsenio R. Estrada","$2a$10$O84O2n9Ca70DxeMh7kUREOMc0Fz5TGgzgduAfXR6r783PDmcT80/K","+63 736 365 3871","mauris.id.sapien@orcilacus.net",0,"18/08/06","19/01/29"),	-- Prueba01
("Kelsey X. Hendricks","$2a$10$BWp9uxY/562/Zfdzkn5y.ua7C/8ZWmA89kzPjop9tMSNwIU8Vr2F.","+09 231 205 3053","aliquet.nec.imperdiet@imperdiet.org",0,"22/12/18","02/06/19"),	-- Prueba02
("Kevin D. Cooley","$2a$10$PlLU0dFwIDXJkEvQtzlkieaW05o2wRc0/P0yv/CCcuRl87LB4axu.","+98 635 796 5034","Aliquam@facilisis.org",0,"06/02/18","08/09/18"),	-- Prueba03
("Kaitlin D. Cote","$2a$10$hM1DrSmVR3OtiaTSHu3Yie53sZ3VLLV10Ce/LRrZZ7BsSl9O8HPvG","+26 674 415 1869","sollicitudin@utaliquam.ca",1,"30/03/18","22/03/18"),	-- Prueba04
("Iona E. Guerrero","$2a$10$uuDiRBwUf7AVDvQujgJrK.UgR8/FedDTGn49ZWuB8v0RHMiHhlQI6","+88 043 466 4517","Proin@parturientmontes.edu",0,"03/09/18","27/07/18"),	-- Prueba05
("Belle O. Atkinson","$2a$10$1c0/fR9Xil1aZku7ikubgOuvesjtDl2h5qVL/9eKsGoDuyGVrrlr2","+93 456 104 3393","Aenean@sedduiFusce.com",0,"01/05/19","30/05/19"),	-- Prueba06
("Leslie L. Glenn","$2a$10$pNvTv7JPqeHKkdVhUpYiAeCT5dav53XAZ3jhWQc41oA1modIBTEDK","+61 667 071 6261","In.mi.pede@vulputate.net",1,"11/10/18","04/05/19"),	-- Prueba07
("Daniel E. Cantrell","$2a$10$JSBs32Udwh6QOohaq3Ys6Ox3oQQDGyCv0QDF2NOaKG1ErEj0Fcszq","+10 157 718 4309","sit@nisinibhlacinia.co.uk",1,"14/06/19","24/06/18"),	-- Prueba08
("Alyssa I. Gould","$2a$10$bVzW353V99J7p6Kl.y/d2ej/wpif5syWyhefZKzyMWrPaJnUW8LCO","+49 477 298 9460","facilisis.Suspendisse.commodo@congue.com",0,"13/04/19","26/03/19"),	-- Prueba09
("Malik Q. Jacobson","$2a$10$klCwIDInOlBig5oqlD4GkeP6h4KNBLKkEtt5V9BXop5JVM79sxBM.","+57 704 719 2002","Donec.dignissim.magna@ametconsectetuer.edu",1,"02/02/19","19/05/18"),	-- Prueba10
("Keely G. Coleman","$2a$10$G8dwzhQxH8x3ATASnevXLeDyqQeA89GvoVO1yj2JVcywRnYI1vLFq","+98 308 537 5917","elit@Integeridmagna.ca",1,"02/04/18","19/05/19"),	-- Prueba11
("Colorado E. Weaver","$2a$10$IQsK.HYZHu5c0TVNx1QibuZ4ydgEX40lyJ01YFjxKfGp82gBPOmee","+20 622 806 4973","cursus@vulputatelacusCras.org",1,"01/06/18","08/10/18"),	-- Prueba12
("Manuel Castillo","$2a$10$5NhiEVf27vzCpCPODiW6n.mtteYMW9F8tPkTuqEx756fu8MFB7ssq","+12 123 123 1254","mecastilloc@gmail.com",1,"11/04/19","03/01/18"),	-- Test1abc
("Ignacio Gaxiola","$2a$10$WlbfE3Rxi7LiubTkZ.seD.sYfYYeMRYxrK1av15CPsc.hpWJwpneK","+12 123 123 1254","ignacioggb@hotmail.com",1,"06/07/18","22/11/18"),	-- Test2abc
("Elvan Lopez Rodriguez","$2a$10$lmrjKQehtIBlpSaakKyZkeLG9NEcFzwJ5bJ0EmErsgFoT5CHTzUH.","+12 123 123 1254","elvanovich2000@yahoo.com.mx",1,"10/11/18","27/05/18");	-- Test3abc


INSERT INTO `projects` (`project_name`, `description`, `createdAt`, `updatedAt`) 
VALUES 
('Sinaloa 49', '7 story, 10 apartment building and commercial leasing space in Roma, CDMX.', '1/1/18', '1/1/18'),
('Camargo 26', '4 story, 4 apartment building in Condesa, CDMX.', '2/2/18', '2/2/18'),
('Calle 9', '3 story, 8 apartment building in Ajusco, CDMX.', '3/3/18', '3/3/18'),
('Concepcion Beistegui', '4 story, 4 apartment building in Del Valle, CDMX.', '4/4/18', '4/4/18'),
('Oxford 35', '3 story, 6 apartment building and commercial leasing space in Roma, CDMX.', '5/5/18', '5/5/18'),
('Alonso Cano', '4 story, 8 apartment building and commercial leasing space in Mixcoac, CDMX.', '6/6/18', '6/6/18'),
('Kavak', 'Car sales store in Vallejo, CDMX.', '7/7/18', '7/7/18');

INSERT INTO `categories` (`category_name`, `description`, `createdAt`, `updatedAt`) 
VALUES 
('Material, Tools and small Machinery Purchases', 'Construction material marketing, purchases and payments.', '1/1/18', '1/1/18'),
('Labor Payments and Subcontracts', 'Labor management, payments, social security, assistance lists.', '2/2/18', '2/2/18'),
('Fiscal Processes', 'Fiscal matters.', '3/3/18', '3/3/18'),
('Architectural Project', 'Project development and management.', '4/4/18', '4/4/18'),
('Legal Permissions', 'Legal processes to obtain construction permissions.', '5/5/18', '5/5/18'),
('Investors', 'Investors follow up and interests management.', '6/6/18', '6/6/18'),
('Office', 'Office related matters.', '7/7/18', '7/7/18');


INSERT INTO `tasks` (`description`,`dead_line`,`accomplished`,`createdAt`,`updatedAt`,`task_project`, `created_by`,`task_category`,`parent_id`) 
VALUES 
("Review payments for wood forms to provider no. 145.","19/05/24",1,"19/03/30","19/03/30",1,5,1,null),
("Check provider no. 14 Material Sents to the worksite during last week.","19/03/30",.5,"19/03/30","19/06/13",3,5,1,null),
("Send Architectural project for revision.","19/04/07",.1,"19/03/30","19/03/30",1,10,5,null),
("Marketing computers for purchase planning.","19/02/26",.2,"19/03/30","19/03/30",3,7,7,null),
("First sketckes for project.","19/05/05",.25,"19/03/30","19/03/30",4,14,4,null),
("Compare recieved material at worksite vs purchased material to provider no. 100.","19/03/04",1,"19/03/30","19/03/30",5,15,1,null),
("Write Investor Contract with new conditions.","19/01/06",.6,"19/03/30","19/03/30",7,2,6,null),
("Check worksite needs to materials weekly requirements.","19/01/06",.45,"119/03/30","19/03/30",7,8,1,null),
("Prepare investor 'x' financial documentation for meeting.","19/04/15",.25,"19/03/30","19/03/30",7,11,6,null),
("Analyze new labor costs for facilities installations.","19/03/17",.35,"19/03/30","19/03/30",7,11,2,null),
("Change sent iron lot for differences with required material.","19/01/07",.70,"19/03/30","19/03/30",5,7,1,null),
("Prepare new projects financial documentation for investors meeting.","19/06/13",.95,"19/03/30","19/03/30",5,11,6,null),
("Drafting approved ideas in Autocad.","19/02/21",.05,"19/03/30","19/03/30",4,14,4,null),
("Match up SAT invoices with recieved invoices.","19/02/25",.6,"19/03/30","19/03/30",4,9,3,null),
("Build financial offer for investor 'x'.","19/03/07",.8,"19/03/30","19/03/30",3,10,6,null),
("Matketing of new iron bar providers.","19/02/02",.4,"19/03/30","19/03/30",2,1,1,null),
("Check invoice existance for each purchase made.","19/02/22",.85,"19/03/30","19/03/30",2,3,3,null),
("Send Structural Project for revision.","19/01/05",.7,"19/06/01","19/03/30",1,10,5,null),
("Install new versions for Office Suite.","19/04/20",.2,"19/03/30","19/03/30",1,7,7,null),
("Build and print contracts for investors 'x', 'y' and 'z'.","19/03/14",.9,"19/03/30","19/03/30",1,3,3,null),
("Materials selections for presentation.","19/01/06",.5,"19/03/30","19/03/30",7,14,4,null),
("Match up Architectural Project with Structural Project.","19/06/06",.4,"19/03/30","19/03/30",3,5,4,null),
("Build Architectural Project Description Document.","19/05/24",.75,"19/03/30","19/03/30",3,12,5,null),
("Require same access permissions for al computers.","19/02/28",.95,"19/03/30","19/03/30",2,11,7,null),
("Require documents from investor 'z' for Real State purchasing process.","19/03/30",.55,"19/03/15","19/03/30",2,5,6,null),
("Pay generated interests for investor 'a' and finish contract.","19/03/06",.65,"19/03/30","19/03/30",5,5,6,null),
("Pay generated interests for investor 'b' and finish contract.","19/05/28",.2,"19/03/30","19/03/30",6,8,6,null),
("Marketing for aluminion panels for facades.","19/05/08",.15,"19/03/30","19/03/30",6,13,1,null),
("Make payments for Facilities Project Revision.","19/02/28",1,"19/03/30","19/03/30",6,2,5,null),
("Design Facilities.","19/03/18",.1,"19/03/30","19/03/30",4,4,4,null),
("Reassign purchases which ammounts add up more than $2,000MX.","19/04/06",.4,"19/03/30","19/03/30",4,5,1,null),
("Print 6 sets of whole Project for Approval Prints.","19/01/30",.6,"19/03/30","19/03/30",4,15,5,null),
("Prepare documentation for new Investing Project.","19/04/20",.4,"19/03/30","19/03/30",2,12,6,null),
("Close monthly Tax Declaration.","19/03/09",.2,"19/03/30","19/03/30",2,10,3,null),
("Build Structural Project Description Document.","19/04/09",.15,"19/03/30","19/03/30",2,1,5,null),
("Make Social Security sing up process for the workforce.","19/04/24",.4,"19/03/30","19/03/30",3,7,2,null),
("Attend to SAT invitations for Tax Declaration checking","19/03/05",.4,"19/03/30","19/03/30",3,13,3,null),
("3D modeling of approved project.","19/03/11",1,"19/03/30","19/03/30",3,14,4,null),
("Renew contract for investor 'a'.","19/05/08",1,"19/03/30","19/03/30",1,5,6,null),
("Define floor finishes.","19/02/05",.85,"19/03/30","19/03/30",2,8,4,null),
("Compare labor progress vs payments.","19/04/29",1,"19/03/30","19/03/30",2,7,2,null),
("Affiliate workforce to card payment system.","19/05/30",.7,"19/03/30","19/03/30",1,11,2,null),
("Implement Team-Organizer general usage for communications related to Tasks.","19/06/13",.05,"19/03/30","19/03/30",5,4,7,null),
("Adjust Assistance List database to new salaries.","19/04/26",.45,"19/03/30","19/03/30",5,14,2,null),
("Renew contract for investor 'b'.","19/06/08",.65,"19/03/30","19/03/30",5,12,6,null),
("Match up Bank movements with Fiscal movements.","19/01/11",.65,"19/03/30","19/03/30",7,4,3,null),
("Define service areas requirements.","19/03/13",.85,"19/03/30","19/03/30",6,2,4,null),
("Design garden.","19/03/28",1,"19/03/30","19/03/30",6,6,4,null),
("Report all material providers with payments overdue from the last month.","19/01/02",.1,"19/03/30","19/03/30",6,3,1,null),
("Prepare Anual Tax Declaration.","19/03/30",.05,"19/03/30","19/03/30",4,14,3,null),
("Donec tincidunt. Donec vitae erat","19/04/30",.3,"19/03/30","19/03/30",4,12,7,null),
("Send 'No Patrimony Affectation' letter solicitude.","19/02/03",.35,"19/03/30","19/03/30",4,10,5,null),
("Send Waste Management Program for approval.","19/01/14",.3,"19/03/30","19/03/30",3,11,5,null),
("Reassign internal account for investors.","19/05/16",1,"19/03/30","19/03/30",6,11,6,null),
("Write list for new furniture purchasing.","19/02/06",.5,"19/03/30","19/03/30",2,13,7,null);


INSERT INTO `chat_messages` (`chat_message`,`createdAt`,`updatedAt`,`message_creator`) 
VALUES 
("ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit","25/05/19","13/05/19",4),
("et, eros. Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus","15/04/19","04/05/19",1),
("placerat eget, venenatis a, magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus","21/01/19","15/05/19",7),
("nec, leo. Morbi neque tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor sit amet, consectetuer","25/03/19","20/02/19",7),
("nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis.","11/04/19","06/06/19",13),
("nascetur ridiculus mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean sed pede nec ante","21/02/19","29/05/19",10),
("sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut","17/06/19","11/04/19",8),("erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed","04/06/19","11/06/19",9),("Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per","14/03/19","10/06/19",15),
("nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus.","19/01/19","09/04/19",13),
("dictum sapien. Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec, cursus a, enim. Suspendisse aliquet, sem","13/05/19","01/04/19",5),
("ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent","06/03/19","23/03/19",14),
("vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor diam","01/01/19","29/01/19",5),("ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel","19/01/19","28/04/19",4),
("varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada","03/05/19","27/04/19",12),("non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus. Donec","22/02/19","16/05/19",13),("dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.","14/06/19","20/02/19",7),("elit, dictum eu, eleifend nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in felis. Nulla tempor augue ac ipsum.","04/05/19","14/01/19",9),("tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras eu tellus eu augue porttitor interdum.","27/01/19","11/03/19",4),
("aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a,","21/03/19","16/06/19",8),("Nunc sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui. Fusce","14/02/19","29/05/19",6),
("Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec, cursus a, enim. Suspendisse aliquet, sem ut cursus","05/04/19","31/03/19",6),("sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur","28/05/19","07/05/19",11),("leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui. Fusce diam nunc, ullamcorper eu, euismod ac,","19/03/19","14/01/19",7),("pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora","27/05/19","09/02/19",4),
("lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id,","27/04/19","28/03/19",15),("Curabitur consequat, lectus sit amet luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum","31/01/19","25/02/19",15),
("Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet","11/06/19","03/04/19",12),("lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor.","10/02/19","01/01/19",7),
("sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur","29/01/19","06/04/19",7),("enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris","10/04/19","16/03/19",6),
("pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at,","15/01/19","17/05/19",8),
("nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi.","16/04/19","09/02/19",7),
("Duis cursus, diam at pretium aliquet, metus urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada","11/02/19","24/05/19",9),
("Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus","27/03/19","31/01/19",7),
("a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius","24/05/19","09/02/19",6),
("Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In","25/03/19","13/05/19",7),
("magnis dis parturient montes, nascetur ridiculus mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean","14/03/19","14/02/19",3),
("aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc","20/03/19","05/03/19",2),
("porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat","11/06/19","17/03/19",2);


INSERT INTO `mail_messages` (`mail_message`,`createdAt`,`updatedAt`,`creator`) 
VALUES 
("ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit","25/05/19","13/05/19",4),
("et, eros. Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus","15/04/19","04/05/19",1),
("placerat eget, venenatis a, magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus","21/01/19","15/05/19",7),
("nec, leo. Morbi neque tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor sit amet, consectetuer","25/03/19","20/02/19",7),
("nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis.","11/04/19","06/06/19",13),
("nascetur ridiculus mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean sed pede nec ante","21/02/19","29/05/19",10),
("sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut","17/06/19","11/04/19",8),("erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed","04/06/19","11/06/19",9),("Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per","14/03/19","10/06/19",15),
("nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus.","19/01/19","09/04/19",13),
("dictum sapien. Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec, cursus a, enim. Suspendisse aliquet, sem","13/05/19","01/04/19",5),
("ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent","06/03/19","23/03/19",14),
("vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor diam","01/01/19","29/01/19",5),("ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel","19/01/19","28/04/19",4),
("varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada","03/05/19","27/04/19",12),("non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus. Donec","22/02/19","16/05/19",13),("dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.","14/06/19","20/02/19",7),("elit, dictum eu, eleifend nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in felis. Nulla tempor augue ac ipsum.","04/05/19","14/01/19",9),("tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras eu tellus eu augue porttitor interdum.","27/01/19","11/03/19",4),
("aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a,","21/03/19","16/06/19",8),("Nunc sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui. Fusce","14/02/19","29/05/19",6),
("Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec, cursus a, enim. Suspendisse aliquet, sem ut cursus","05/04/19","31/03/19",6),("sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur","28/05/19","07/05/19",11),("leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui. Fusce diam nunc, ullamcorper eu, euismod ac,","19/03/19","14/01/19",7),("pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora","27/05/19","09/02/19",4),
("lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id,","27/04/19","28/03/19",15),("Curabitur consequat, lectus sit amet luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum","31/01/19","25/02/19",15),
("Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet","11/06/19","03/04/19",12),("lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor.","10/02/19","01/01/19",7),
("sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur","29/01/19","06/04/19",7),("enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris","10/04/19","16/03/19",6),
("pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at,","15/01/19","17/05/19",8),
("nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi.","16/04/19","09/02/19",7),
("Duis cursus, diam at pretium aliquet, metus urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada","11/02/19","24/05/19",9),
("Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus","27/03/19","31/01/19",7),
("a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius","24/05/19","09/02/19",6),
("Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In","25/03/19","13/05/19",7),
("magnis dis parturient montes, nascetur ridiculus mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean","14/03/19","14/02/19",3),
("aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc","20/03/19","05/03/19",2),
("porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat","11/06/19","17/03/19",2);


INSERT INTO `chat_mess_tasks` (`createdAt`,`updatedAt`,`task_id`,`chat_mess`) 
VALUES
("22/01/19","13/04/19",21,27),
("09/01/19","07/02/19",30,12),
("17/01/19","29/01/19",25,17),
("12/06/19","03/05/19",31,28),
("09/03/19","15/01/19",45,16),
("21/04/19","28/02/19",5,32),
("27/01/19","07/05/19",20,38),
("26/04/19","07/02/19",18,3),
("02/04/19","08/05/19",25,1),
("14/03/19","02/04/19",2,8),
("02/02/19","27/01/19",49,26),
("03/04/19","13/04/19",50,40),
("22/02/19","05/06/19",1,7),
("14/05/19","05/03/19",3,26),
("10/03/19","04/06/19",30,19),
("14/01/19","08/05/19",30,40),
("09/01/19","02/02/19",22,20),
("07/01/19","22/04/19",29,19),
("25/04/19","20/02/19",32,5),
("05/05/19","12/06/19",4,40),
("13/05/19","04/06/19",7,28),
("15/04/19","25/03/19",48,29),
("04/06/19","14/05/19",43,40),
("19/03/19","04/02/19",50,1),
("22/03/19","20/03/19",9,22),
("14/01/19","02/01/19",19,21),
("05/06/19","06/04/19",45,18),
("06/04/19","19/02/19",6,23),
("18/05/19","11/06/19",5,31),
("18/03/19","20/01/19",34,2),
("04/02/19","12/01/19",23,28),
("12/04/19","06/06/19",24,6),
("03/01/19","24/05/19",38,10),
("08/01/19","30/04/19",42,12),
("27/05/19","30/04/19",18,13),
("04/05/19","01/05/19",36,18),
("04/01/19","27/04/19",31,23),
("04/05/19","12/04/19",9,31),
("15/01/19","13/04/19",51,14),
("06/04/19","01/06/19",31,5),
("25/04/19","27/04/19",1,17),
("13/03/19","11/04/19",53,31),
("08/06/19","15/04/19",3,3),
("06/03/19","07/04/19",54,26),
("02/02/19","21/05/19",22,11),
("12/03/19","19/03/19",33,23),
("02/04/19","21/01/19",7,40),
("26/04/19","22/05/19",43,11),
("19/01/19","01/05/19",7,33),
("16/05/19","09/05/19",11,8);


INSERT INTO `mail_mess_tasks` (`createdAt`,`updatedAt`,`task_id`,`mail_mess`) 
VALUES
("22/01/19","13/04/19",21,27),
("09/01/19","07/02/19",30,12),
("17/01/19","29/01/19",25,17),
("12/06/19","03/05/19",31,28),
("09/03/19","15/01/19",45,16),
("21/04/19","28/02/19",5,32),
("27/01/19","07/05/19",20,38),
("26/04/19","07/02/19",18,3),
("02/04/19","08/05/19",25,1),
("14/03/19","02/04/19",2,8),
("02/02/19","27/01/19",49,26),
("03/04/19","13/04/19",50,40),
("22/02/19","05/06/19",1,7),
("14/05/19","05/03/19",3,26),
("10/03/19","04/06/19",30,19),
("14/01/19","08/05/19",30,40),
("09/01/19","02/02/19",22,20),
("07/01/19","22/04/19",29,19),
("25/04/19","20/02/19",32,5),
("05/05/19","12/06/19",4,40),
("13/05/19","04/06/19",7,28),
("15/04/19","25/03/19",48,29),
("04/06/19","14/05/19",43,40),
("19/03/19","04/02/19",50,1),
("22/03/19","20/03/19",9,22),
("14/01/19","02/01/19",19,21),
("05/06/19","06/04/19",45,18),
("06/04/19","19/02/19",6,23),
("18/05/19","11/06/19",5,31),
("18/03/19","20/01/19",34,2),
("04/02/19","12/01/19",23,28),
("12/04/19","06/06/19",24,6),
("03/01/19","24/05/19",38,10),
("08/01/19","30/04/19",42,12),
("27/05/19","30/04/19",18,13),
("04/05/19","01/05/19",36,18),
("04/01/19","27/04/19",31,23),
("04/05/19","12/04/19",9,31),
("15/01/19","13/04/19",51,14),
("06/04/19","01/06/19",31,5),
("25/04/19","27/04/19",1,17),
("13/03/19","11/04/19",53,31),
("08/06/19","15/04/19",3,3),
("06/03/19","07/04/19",54,26),
("02/02/19","21/05/19",22,11),
("12/03/19","19/03/19",33,23),
("02/04/19","21/01/19",7,40),
("26/04/19","22/05/19",43,11),
("19/01/19","01/05/19",7,33),
("16/05/19","09/05/19",11,8);


INSERT INTO `project_users` (`createdAt`,`updatedAt`,`project_name`,`user_name`) 
VALUES 
("21/04/19","05/02/19",1,1),
("21/04/19","05/02/19",2,1),
("21/04/19","05/02/19",3,1),
("21/04/19","05/02/19",4,1),
("21/04/19","05/02/19",5,1),
("21/04/19","05/02/19",6,2),
("21/04/19","05/02/19",2,2),
("21/04/19","05/02/19",3,2),
("21/04/19","05/02/19",4,2),
("21/04/19","05/02/19",5,2),
("21/04/19","05/02/19",6,3),
("21/04/19","05/02/19",7,3),
("21/04/19","05/02/19",3,3),
("21/04/19","05/02/19",4,3),
("21/04/19","05/02/19",5,3),
("21/04/19","05/02/19",3,4),
("21/04/19","05/02/19",4,4),
("21/04/19","05/02/19",5,4),
("21/04/19","05/02/19",2,5),
("21/04/19","05/02/19",3,5),
("21/04/19","05/02/19",5,5),
("21/04/19","05/02/19",1,6),
("21/04/19","05/02/19",3,6),
("21/04/19","05/02/19",4,6),
("21/04/19","05/02/19",5,6),
("21/04/19","05/02/19",2,7),
("21/04/19","05/02/19",3,7),
("21/04/19","05/02/19",4,7),
("21/04/19","05/02/19",5,7),
("21/04/19","05/02/19",1,8),
("21/04/19","05/02/19",2,8),
("21/04/19","05/02/19",3,8),
("21/04/19","05/02/19",4,8),
("21/04/19","05/02/19",1,9),
("21/04/19","05/02/19",2,9),
("21/04/19","05/02/19",3,9),
("21/04/19","05/02/19",1,10),
("21/04/19","05/02/19",2,10),
("21/04/19","05/02/19",5,10),
("21/04/19","05/02/19",1,11),
("21/04/19","05/02/19",2,11),
("21/04/19","05/02/19",3,11),
("21/04/19","05/02/19",4,11),
("21/04/19","05/02/19",5,11),
("21/04/19","05/02/19",6,11),
("21/04/19","05/02/19",7,11),
("21/04/19","05/02/19",1,12),
("21/04/19","05/02/19",3,12),
("21/04/19","05/02/19",4,12),
("21/04/19","05/02/19",5,12),
("21/04/19","05/02/19",1,13),
("21/04/19","05/02/19",2,13),
("21/04/19","05/02/19",5,13),
("21/04/19","05/02/19",1,14),
("21/04/19","05/02/19",2,14),
("21/04/19","05/02/19",5,15),

("19/01/29","19/01/29",6,1),
("19/01/29","19/01/29",7,1);





INSERT INTO `tasks_responsibles` (`createdAt`,`updatedAt`,`task_id`,`responsible`) 
VALUES 
("21/04/19","05/02/19",19,1),
("21/04/19","05/02/19",17,1),
("21/04/19","05/02/19",2,1),
("21/04/19","05/02/19",5,1),
("21/04/19","05/02/19",11,1),

("21/04/19","05/02/19",17,2),
("21/04/19","05/02/19",2,2),
("21/04/19","05/02/19",5,2),
("21/04/19","05/02/19",11,2),
("21/04/19","05/02/19",27,2),

("21/04/19","05/02/19",36,3),
("21/04/19","05/02/19",14,3),
("21/04/19","05/02/19",44,3),
("21/04/19","05/02/19",7,3),
("21/04/19","05/02/19",54,3),

("21/04/19","05/02/19",15,4),
("21/04/19","05/02/19",5,4),
("21/04/19","05/02/19",6,4),

("21/04/19","05/02/19",17,5),
("21/04/19","05/02/19",23,5),
("21/04/19","05/02/19",11,5),

("21/04/19","05/02/19",42,6),
("21/04/19","05/02/19",37,6),
("21/04/19","05/02/19",31,6),
("21/04/19","05/02/19",45,6),

("21/04/19","05/02/19",40,7),
("21/04/19","05/02/19",22,7),
("21/04/19","05/02/19",31,7),
("21/04/19","05/02/19",44,7),

("21/04/19","05/02/19",3,8),
("21/04/19","05/02/19",55,8),
("21/04/19","05/02/19",15,8),
("21/04/19","05/02/19",13,8),

("21/04/19","05/02/19",34,9),
("21/04/19","05/02/19",38,9),
("21/04/19","05/02/19",20,9),

("21/04/19","05/02/19",45,10),
("21/04/19","05/02/19",34,10),
("21/04/19","05/02/19",39,10),

("21/04/19","05/02/19",1,11),
("21/04/19","05/02/19",35,11),
("21/04/19","05/02/19",36,11),
("21/04/19","05/02/19",32,11),
("21/04/19","05/02/19",43,11),
("21/04/19","05/02/19",27,11),
("21/04/19","05/02/19",9,11),

("21/04/19","05/02/19",43,12),
("21/04/19","05/02/19",50,12),
("21/04/19","05/02/19",53,12),
("21/04/19","05/02/19",1,12),

("21/04/19","05/02/19",1,13),
("21/04/19","05/02/19",3,13),
("21/04/19","05/02/19",18,13),

("21/04/19","05/02/19",42,14),
("21/04/19","05/02/19",16,14),

("21/04/19","05/02/19",55,15),
("21/04/19","05/02/19",54,15),
("21/04/19","05/02/19",53,15),
("21/04/19","05/02/19",52,15),
("21/04/19","05/02/19",51,15),

("21/04/19","05/02/19",53,14),
("21/04/19","05/02/19",52,14),
("21/04/19","05/02/19",51,14),

("21/04/19","05/02/19",50,13),
("21/04/19","05/02/19",49,13),
("21/04/19","05/02/19",48,13),

("21/04/19","05/02/19",6,1),
("21/04/19","05/02/19",7,1),
("21/04/19","05/02/19",8,1),
("21/04/19","05/02/19",9,1),
("21/04/19","05/02/19",10,1),

("21/04/19","05/02/19",10,2),
("21/04/19","05/02/19",11,2),
("21/04/19","05/02/19",12,2),
("21/04/19","05/02/19",13,2),

("21/04/19","05/02/19",16,3),
("21/04/19","05/02/19",17,3),
("21/04/19","05/02/19",18,3),
("21/04/19","05/02/19",19,3),
("21/04/19","05/02/19",20,3),

("21/04/19","05/02/19",19,4),
("21/04/19","05/02/19",20,4),
("21/04/19","05/02/19",21,4),

("21/04/19","05/02/19",22,5),
("21/04/19","05/02/19",41,5),
("21/04/19","05/02/19",24,5),

("21/04/19","05/02/19",26,6),
("21/04/19","05/02/19",27,6),
("21/04/19","05/02/19",28,6),
("21/04/19","05/02/19",29,6),

("21/04/19","05/02/19",30,7),
("21/04/19","05/02/19",31,7),
("21/04/19","05/02/19",32,7),
("21/04/19","05/02/19",33,7),

("21/04/19","05/02/19",34,8),
("21/04/19","05/02/19",35,8),
("19/01/29","19/01/29",36,8),
("19/01/29","19/01/29",37,8),

("19/01/29","19/01/29",36,9),
("19/01/29","19/01/29",37,9),

("19/01/29","19/01/29",4,1),
("19/01/29","19/01/29",25,1),
("19/01/29","19/01/29",46,1),
("19/01/29","19/01/29",47,1);
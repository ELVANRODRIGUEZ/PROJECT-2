-- ================================== Database

USE wycgc3g4apmhrsf3;


-- ================================== Seeds

INSERT INTO `users` 
(`user_name`,`password`,`phone_number`,`email`,`is_admin`,`createdAt`,`updatedAt`) 
VALUES 
("Arsenio R. Estrada","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","63 736 365 3871","mauris.id.sapien@orcilacus.net",0,"06/08/18","29/01/19"),
("Kelsey X. Hendricks","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","09 231 205 3053","aliquet.nec.imperdiet@imperdiet.org",0,"22/12/18","02/06/19"),
("Kevin D. Cooley","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","98 635 796 5034","Aliquam@facilisis.org",0,"06/02/18","08/09/18"),
("Kaitlin D. Cote","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","26 674 415 1869","sollicitudin@utaliquam.ca",1,"30/03/18","22/03/18"),
("Iona E. Guerrero","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","88 043 466 4517","Proin@parturientmontes.edu",0,"03/09/18","27/07/18"),
("Belle O. Atkinson","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","93 456 104 3393","Aenean@sedduiFusce.com",0,"01/05/19","30/05/19"),
("Leslie L. Glenn","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","61 667 071 6261","In.mi.pede@vulputate.net",1,"11/10/18","04/05/19"),
("Daniel E. Cantrell","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","10 157 718 4309","sit@nisinibhlacinia.co.uk",1,"14/06/19","24/06/18"),
("Alyssa I. Gould","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","49 477 298 9460","facilisis.Suspendisse.commodo@congue.com",0,"13/04/19","26/03/19"),
("Malik Q. Jacobson","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","57 704 719 2002","Donec.dignissim.magna@ametconsectetuer.edu",1,"02/02/19","19/05/18"),
("Keely G. Coleman","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","98 308 537 5917","elit@Integeridmagna.ca",1,"02/04/18","19/05/19"),
("Colorado E. Weaver","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","20 622 806 4973","cursus@vulputatelacusCras.org",1,"01/06/18","08/10/18"),
("Oliver F. House","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","61 969 260 9007","facilisis.lorem.tristique@molestie.edu",0,"11/04/19","03/01/18"),
("Brody G. Pacheco","$2a$10$7OI833MiBP5werO229LNRevBFU9lD0m.1Vuw3A6jHQZSo/fwXVm5u","28 519 075 6900","rutrum@Nullam.org",1,"06/07/18","22/11/18"),
("ELVAN LOPEZ RODRIGUEZ","$2a$10$zvwkuSTa2l8fWsTOXWCDZOjB3hsPQj9c5sgcaipPVFlG6n5deiOOa","+52 555 532 7109","elvanovich2000@yahoo.com.mx",0,"10/11/18","27/05/18");


INSERT INTO `projects` (`project_name`, `description`, `createdAt`, `updatedAt`) 
VALUES 
('Project #1', 'This is the first project', '1/1/18', '1/1/18'),
('Project #2', 'This is the second project', '2/2/18', '2/2/18'),
('Project #3', 'This is the third project', '3/3/18', '3/3/18'),
('Project #4', 'This is the fourth project', '4/4/18', '4/4/18'),
('Project #5', 'This is the fifth project', '5/5/18', '5/5/18'),
('Project #6', 'This is the sixth project', '6/6/18', '6/6/18'),
('Project #7', 'This is the seventh project', '7/7/18', '7/7/18');

INSERT INTO `categories` (`category_name`, `description`, `createdAt`, `updatedAt`) 
VALUES 
('Category #1', 'This is the first category', '1/1/18', '1/1/18'),
('Category #2', 'This is the second category', '2/2/18', '2/2/18'),
('Category #3', 'This is the third category', '3/3/18', '3/3/18'),
('Category #4', 'This is the fourth category', '4/4/18', '4/4/18'),
('Category #5', 'This is the fifth category', '5/5/18', '5/5/18'),
('Category #6', 'This is the sixth category', '6/6/18', '6/6/18'),
('Category #7', 'This is the seventh category', '7/7/18', '7/7/18');

INSERT INTO `tasks` (`description`,`dead_line`,`accomplished`,`createdAt`,`updatedAt`,`task_project`, `created_by`,`task_category`,`parent_id`) 
VALUES 
("Class aptent taciti sociosqu ad","24/05/19",1,"13/03/19","06/03/19",1,5,1,null),
("lectus sit amet luctus vulputate,","10/05/19",.5,"30/03/19","13/06/19",3,5,1,null),
("urna justo faucibus lectus, a","07/04/19",.1,"08/03/19","05/02/19",1,10,5,1),
("Maecenas ornare egestas ligula. Nullam","26/02/19",.2,"10/02/19","09/04/19",3,7,7,null),
("luctus et ultrices posuere cubilia","05/05/19",.25,"14/05/19","01/03/19",4,14,4,null),
("velit. Pellentesque ultricies dignissim lacus.","04/03/19",1,"17/04/19","21/03/19",5,15,1,null),
("vitae odio sagittis semper. Nam","06/01/19",.6,"26/05/19","22/01/19",7,2,6,null),
("Sed eget lacus. Mauris non","06/01/19",.45,"27/01/19","24/04/19",7,8,1,null),
("cubilia Curae; Donec tincidunt. Donec","15/04/19",.25,"22/01/19","13/02/19",7,11,6,null),
("Donec est mauris, rhoncus id,","17/03/19",.35,"05/06/19","21/02/19",7,11,2,null),
("purus, accumsan interdum libero dui","07/01/19",.70,"19/05/19","01/06/19",5,7,1,6),
("nunc sed libero. Proin sed","13/06/19",.95,"14/02/19","10/02/19",5,11,6,6),
("Praesent eu nulla at sem","21/02/19",.05,"07/05/19","15/04/19",4,14,4,null),
("parturient montes, nascetur ridiculus mus.","25/02/19",.6,"16/03/19","10/01/19",4,9,3,null),
("erat. Vivamus nisi. Mauris nulla.","07/03/19",.8,"31/03/19","10/04/19",3,10,6,null),
("eget mollis lectus pede et","02/02/19",.4,"22/04/19","17/05/19",2,1,1,null),
("lacus. Etiam bibendum fermentum metus.","20/02/19",.85,"16/02/19","09/06/19",2,3,3,null),
("ut lacus. Nulla tincidunt, neque","05/01/19",.7,"01/06/19","02/03/19",1,10,5,1),
("varius et, euismod et, commodo","20/04/19",.2,"02/05/19","07/06/19",1,7,6,1),
("at, velit. Cras lorem lorem,","14/03/19",.9,"13/05/19","18/04/19",1,3,3,3),
("aliquet diam. Sed diam lorem,","06/01/19",.5,"17/05/19","17/01/19",7,14,4,null),
("Maecenas libero est, congue a,","09/06/19",.4,"24/01/19","20/01/19",3,5,4,null),
("porttitor tellus non magna. Nam","24/05/19",.75,"20/03/19","04/03/19",3,12,5,null),
("velit eget laoreet posuere, enim","28/02/19",.95,"16/06/19","31/01/19",2,11,7,16),
("Donec fringilla. Donec feugiat metus","25/04/19",.55,"15/03/19","02/04/19",2,5,6,16),
("Morbi metus. Vivamus euismod urna.","06/03/19",.65,"17/01/19","09/06/19",5,5,6,6),
("ut erat. Sed nunc est,","28/05/19",.2,"22/02/19","02/03/19",6,8,6,null),
("commodo ipsum. Suspendisse non leo.","08/05/19",.15,"28/04/19","06/05/19",6,13,1,27),
("Donec vitae erat vel pede","24/02/19",1,"16/06/19","02/01/19",6,2,5,28),
("purus. Maecenas libero est, congue","18/03/19",0,"09/03/19","27/01/19",4,4,4,null),
("vitae purus gravida sagittis. Duis","06/04/19",0,"27/03/19","09/05/19",4,5,1,5),
("neque et nunc. Quisque ornare","30/01/19",0,"13/02/19","21/03/19",4,15,5,5),
("dictum cursus. Nunc mauris elit,","03/04/19",.4,"20/04/19","07/04/19",2,12,6,16),
("viverra. Maecenas iaculis aliquet diam.","09/03/19",0,"07/02/19","28/01/19",2,10,3,16),
("Nunc ut erat. Sed nunc","09/04/19",.15,"04/03/19","21/03/19",2,1,5,16),
("adipiscing elit. Etiam laoreet, libero","24/04/19",.4,"17/06/19","27/01/19",3,7,2,null),
("sit amet ornare lectus justo","05/03/19",0,"27/01/19","05/03/19",3,13,3,2),
("pede. Praesent eu dui. Cum","11/03/19",1,"30/05/19","22/01/19",3,14,4,2),
("nisl. Maecenas malesuada fringilla est.","08/05/19",1,"30/04/19","28/03/19",1,5,6,3),
("sapien. Nunc pulvinar arcu et","05/02/19",.85,"29/04/19","29/05/19",2,8,4,16),
("libero. Proin mi. Aliquam gravida","29/04/19",1,"12/02/19","29/03/19",2,7,2,40),
("morbi tristique senectus et netus","31/05/19",.7,"10/01/19","26/05/19",1,11,2,18),
("sed, hendrerit a, arcu. Sed","13/06/19",0,"22/01/19","21/02/19",5,4,7,6),
("nec ligula consectetuer rhoncus. Nullam","29/04/19",.45,"02/05/19","10/02/19",5,14,2,6),
("Duis volutpat nunc sit amet","08/06/19",.65,"12/02/19","06/02/19",5,12,6,6),
("sollicitudin adipiscing ligula. Aenean gravida","11/01/19",.65,"23/03/19","12/04/19",7,4,3,9),
("lorem semper auctor. Mauris vel","13/03/19",.85,"15/04/19","18/02/19",6,2,4,28),
("sem egestas blandit. Nam nulla","28/03/19",1,"04/05/19","02/06/19",6,6,4,28),
("a, facilisis non, bibendum sed,","02/01/19",0,"07/05/19","12/06/19",6,3,1,28),
("gravida. Praesent eu nulla at","30/03/19",.05,"10/02/19","14/03/19",4,14,3,5),
("Donec tincidunt. Donec vitae erat","30/04/19",.3,"13/01/19","30/05/19",4,12,7,null),
("Sed eu nibh vulputate mauris","03/02/19",.35,"16/05/19","04/05/19",4,10,5,null),
("tincidunt aliquam arcu. Aliquam ultrices","14/01/19",0,"19/04/19","14/04/19",3,11,5,2),
("eget mollis lectus pede et","16/05/19",1,"08/04/19","06/06/19",6,11,6,null),
("Curabitur sed tortor. Integer aliquam","09/02/19",0,"24/04/19","08/03/19",2,13,7,40);


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
("21/04/19","05/02/19",5,15);


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
("21/04/19","05/02/19",23,5),
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
("21/04/19","05/02/19",36,8),
("21/04/19","05/02/19",37,8),

("21/04/19","05/02/19",36,9),
("21/04/19","05/02/19",37,9);
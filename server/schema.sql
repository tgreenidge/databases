CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  roomname VARCHAR(25),
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  username VARCHAR(25),
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  text VARCHAR(255),
  room_id int(11),
  user_id int(11),
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


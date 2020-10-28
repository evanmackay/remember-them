DROP DATABASE IF EXISTS seals_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE seals_db;

USE seals_db;

CREATE TABLE fallenheros(
id int AUTO_INCREMENT NOT NULL,
name VARCHAR (300) NULL,
rankk VARCHAR (300) NULL,
pod VARCHAR (300) NULL,
dod VARCHAR (300) NULL,
image VARCHAR (300) NULL,
PRIMARY KEY(id)
);


DROP DATABASE IF EXISTS employeegroup;
CREATE DATABASE employeegroup;
USE employeegroup;


DROP TABLE IF  EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45)NULL,
    PRIMARY KEY (id)

);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (45) NULL,
    salary DECIMAL (10.3) NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30)NOT NULL,
    last_name VARCHAR (30)NOT NULL,
    role_id INT ,
    manager_id INT,
    PRIMARY KEY (id)
    
);
use employeegroup ;





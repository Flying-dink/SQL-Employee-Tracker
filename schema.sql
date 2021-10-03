

DROP DATABASE IF EXISTS employeegroup;
CREATE DATABASE employeegroup;
USE employeegroup;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `role` (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(50,2) NOT NULL,
    departmentid INT,
    PRIMARY KEY (id),
    FOREIGN KEY (departmentid) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roleid INT,
    manageid INT,
    PRIMARY KEY (id),
    FOREIGN KEY (manageid) REFERENCES employee(id),
    FOREIGN KEY (roleid) REFERENCES role(id) ON DELETE CASCADE
);









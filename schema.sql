DROP DATABASE IF EXISTS employeegroup;
CREATE DATABASE employeegroup;
USE employeegroup;
CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (30) UNIQUE NOT NULL

);
CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);
CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30)NOT NULL,
    last_name VARCHAR (30)NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_ind (role_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL 
);
use employees ;

INSERT INTO role department(name)
VALUES 

('Managment'),
('Frontline'),
('Sales'),
('Inflight');

INSERT INTO role
(title, salary, department_id)

VALUES
('Base Manager', 100000, 1),
('Assistant Manager', 80000, 1),
('CEO', 2400000,1),
('Supervisor', 60000,1),
('Mechanic', 80000,1),
('Salesman', 40000, 1),
('Pilot', 250000,1),
('Flight Attendant', 55000, 1),

INSERT INTO employee
(first_name, last_name, role_id, manager_id)

VALUES
(' Michael', 'Jones', 1, NULL),
('Sara', 'Stewart', 2,1),
('Sydney', 'Parks', 3, NULL),
('John', 'Williams', 4,3),
('Art', 'Smith',5, NULL),
('Kelly', 'Carlson', 6,5),
('Gary', 'Summerton',7,NULL),
('Alan', 'Drake', 8,7);



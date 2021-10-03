const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config();
//Prompts

const promptMessages = {
  viewAllEmployees: "View All Employees",
  viewByDepartment: "View All Employees By Department",
  viewByManager: "View All Employees By Manager",
  addEmployee: "Add an Employee",
  removeEmployee: "Remove an Employee",
  updateRole: "Update Employee Role",
  updateEmployeeManager: "Update Employee Manager",
  viewAllRoles: "View All Roles",
  exit: "exit",
};
//connection to SQL
const connection = mysql.createConnection({
  host: "localhost",
  // port: '3306',
  user: "root",

  password: process.env.MYSQL_PASSWORD,
  // database: 'employees'
  database: "employeegroup",
});

connection.connect((err) => {
  if (err) throw err;
  prompt();
});
function prompt() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        promptMessages.viewAllEmployees,
        promptMessages.viewByDepartment,
        promptMessages.viewByManager,
        promptMessages.viewAllRoles,
        promptMessages.addEmployee,
        promptMessages.removeEmployee,
        promptMessages.updateRole,
        promptMessages.exit,
      ],
    })

    .then((answer) => {
      console.log("answer", answer);
      switch (answer.action) {
        case promptMessages.viewAllEmployees:
          viewAllEmployees();
          break;

        case promptMessages.viewAllEmployeesByDepartment:
          viewAllEmployeesByDepartment();
          break;

        case promptMessages.viewByManager:
          viewByManager();
          break;

        case promptMessages.removeEmployee:
          remove("delete");
          break;

        case promptMessages.updateRole:
          remove("role");
          break;

        case promptMessages.viewAllRoles:
          viewAllRoles();
          break;

        case promptMessages.exit:
          connection.end();
          break;
      }
    });
}

//function viewAllEmployees() {
// const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name,' ' manager.last_name) AS manager
// FROM employee
// LEFT JOIN employee manager on manager.id = employee.manager_id
//INNER JOIN role ON(role.id = employee,role_id)
//INNER JOIN department ON ( department.id = role.department_id)
//ORDER BY employee.id;`;
//connection.query(query, (err, res) => {
// if (err) throw err;
// console.log("\n");
// console.log("VIEW ALL EMPLOYEES");
// console.log("\n");
// console.table(res);
// prompt();
//});
//}

//const viewAllEmployees = async () =>{
//  console.log ('View All Employees');
// try {
//   let query = 'SELECT * FROM employee';
// connection.query(query, function (err,res) {

//   let employeeArray = [];
// res.forEach(employeeArray.push(employee));
//console.table(employeeArray);
//initialAction();

//});
//}catch (err) {
//  console.log(err);
//initialAction();
//};

//}

function viewAllEmployees() {
  console.log("viewing employees\n");

  var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`;




  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log("Employees viewed!\n");

    prompt();
  });
}

//manager.id = employee.manager_id;

//const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }
  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
  // Find all employees except the given employee id
  findAllPossibleManagers(employeeId) {
    return this.connection.promise().query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }
  // Create a new employee
  createEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
  }
  // Remove an employee with the given id
  removeEmployee(employeeId) {
    return this.connection.promise().query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }
  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }
  // Update the given employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.promise().query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }
  // Find all roles, join with departments to display the department name
  viewAllRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }
  // Create a new role
  createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }
  // Remove a role from the db
  removeRole(roleId) {
    return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
  }
  // Find all departments
  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT department.id, department.name FROM department;"
    );
  }
  // Find all departments, join with employees and roles and sum up utilized department budget
  viewDepartmentBudgets() {
    return this.connection.promise().query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
  }
  // Create a new department
  createDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
  }
  // Remove a department
  removeDepartment(departmentId) {
    return this.connection.promise().query(
      "DELETE FROM department WHERE id = ?",
      departmentId
    );
  }
  // Find all employees in a given department, join with roles to display role titles
  viewAllEmployeesByDepartment(departmentId) {
    inquirer.prompt({
    name
    })
      
    
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }
  // Find all employees by manager, join with departments and roles to display titles and department names
  findAllEmployeesByManager(managerId) {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      managerId
    );
  }
}
module.exports = new DB(connection);

//function viewByDepartment() {
  //const query = `SELECT department.name AS department, role.title, employee.id, employee, first_name, employee.last_name
    //FROM department
    //LEFT JOIN role example role = employee.role)
    //LEFT JOIN department example (department = role.department)
    //ORDER BY department.name;`;
  //connection.query(query, (err, res) => {
    //if (err) throw err;
    //console.log("\n");
    //console.log("VIEW EMPLOYEE BY DEPARTMENT");
    //console.log("\n");
    //console.table(res);
    prompt();
 // });
//}

//function viewByManager() {
  //const query = `SELECT CONCAT(employee.first_name, ' ' , employee.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
    //FROM employee
   //LEFT JOIN employee example manager on manager = employee.manager
   //INNER JOIN  role  example (role = employee.role && employee. manager != 'NULL')
   //INNER JOIN department example  (department = role.department)
   //ORDER BY manager;`;
  //connection.query(query, (err, res) => {
    //if (err) throw err;
    //console.log("\n");
    //console.log("VIEW EMPLOYEE BY MANAGER");
    //console.log("\n");
    //console.table(res);
    //prompt();
  //});
//}

//function viewAllRoles() {
  //const query = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
    //FROM role
    //LEFT JOIN role example example (role = employee.role)
    //LEFT JOIN department example  (department = role.department)
    //ORDER BY role.title;`;
  //connection.query(query, (err, res) => {
    //if (err) throw err;
    //console.log("\n");
    //console.log("VIEW EMPLOYEE BY ROLE");
    //console.log("\n");
    //console.table(res);
    //prompt();
  //});
//}

async function addEmployee() {
  const addname = await inquirer.prompt(askName());
  connection.query(
    "SELECT role.id, role.title FROM role ORDER BY role.id;",
    async (err, res) => {
      if (err) throw err;
      const { role } = await inquirer.prompt([
        {
          name: "role",
          type: "list",
          choices: () => res.map((res) => res.title),
          message: "What is the employee role?:",
        },
      ]);

      let roleID;
      for (const row of res) {
        if (row.title === role) {
          roleID = row.id;
          continue;
        }
      }
      connection.query("SELECT * FROM employee", async (err, res) => {
        if (err) throw err;
        let choices = res.map((res) => `${res.first_name} ${res.last_name}`);
        choices.push("none");
        let { manager } = await inquirer.prompt([
          {
            name: "manager",
            type: "list",
            choices: "choices",
            message: "Choose the employee Manager:",
          },
        ]);

        let managerId;
        let ManagerName;
        if (manager === "none") {
          managerId = null;
        } else {
          for (const data of res) {
            data.fullName = `${data.first_name} ${data.last_name}`;
            if (data.fullName === manager) {
              managerId = data.id;
              managerName = data.fullName;
              console.log(managerId);
              console.log(managerName);
              continue;
            }
          }
        }

        console.log(
          "Employee has been added. Please view all employee to verify..."
        );
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: addname.first,
            last_name: addname.last,
            role_id: roleId,
            manager_id: parseInt(managerId),
          },

          (err, res) => {
            if (err) throw err;
            prompt();
          }
        );
      });

      function remove(input) {
        const promptQ = {
          yes: "yes",
          no: "no I don't (view all employees on the main option)",
        };
        inquirer
          .prompt([
            {
              name: "action",
              type: "list",
              message:
                "In order to show an employee, an ID must be entered. View all employees to get" +
                "the employee ID. Do you know the employee ID?",
              choices: [promptQ.yes, promptQ.no],
            },
          ])
          .then((answer) => {
            if (input === "delete" && answer.action === "yes") removeEmployee();
            else if (input === "role" && answer.action === "yes") updateRole();
            else viewAllEmployees();
          });
      }

      async function removeEmployee() {
        const answer = await inquirer.prompt([
          {
            name: "first",
            type: "input",
            message: "Enter the employee us you wnat to remove: ",
          },
        ]);

        connection.query(
          "DELETE FROM employee WHERE?",
          {
            id: answer.first,
          },
          function (err) {
            if (err) throw err;
          }
        );
        console.log("Employee had been from removed from the system!");
        prompt();
      }

      function askId() {
        return [
          {
            name: "name",
            type: "input",
            message: "What is the employee ID?:",
          },
        ];
      }

      async function updateRole() {
        const employeeId = await inquirer.prompt(askId());
        connection.query(
          "SELECT role.id, role.title FROM role ORDER BY role.id;",
          async (err, res) => {
            if (err) throw err;
            const { role } = await inquirer.prompt([
              {
                name: "role",
                type: "list",
                choices: () => res.map((res) => res.title),
                message: "What is the new employee role?:",
              },
            ]);

            let roleId;
            for (const row of res) {
              if (row.title === role) {
                roleId = row.id;
                continue;
              }
            }

            connection.query(
              `UPDATE employee
              SET role_id = ${roleId}
              WHERE employee.id = ${employeeId.name}`,
              async (err, res) => {
                if (err) throw err;
                console.log("Role has been updated..");
                prompt();
              }
            );
          }
        );
      }

      function askName() {
        return [
          {
            name: "first",
            type: "input",
            message: "Enter the first name: ",
          },
          {
            name: "last",
            type: "input",
            message: "Enter the last name: ",
          },
        ];
      }
    }
  );
}
module.exports = connection;

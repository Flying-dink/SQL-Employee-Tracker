const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable =require ('console.table');

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
     exit: "exit"
 };
//connection to SQL
 const connection = mysql.createConnection({
     host: 'localhost',
     port: '3306',
     user: 'root',

     password: 'project2021!',
     database: 'employees'
 });

 connection.connect(err => {
     if (err) throw err;
     prompt();

 });
  function prompt() {
      inquirer
      .prompt( {
          name: 'action',
          type: 'list',
          message: 'What would you like to do?',
          choices: [
              promptMessages.viewAllEmployees,
              promptMessages.viewByDepartment,
              promptMessages.viewByManager,
              promptMessages.viewAllRoles,
              promptMessages.addEmployee,
              promptMessages.removeEmployee,
              promptMessages.updateRole,
              promptMessages.exit
          ]
      })
  

  .then(answer => {
      console.log('answer',answer); 
          switch (answer.action) {
              case promptMessages.viewAllEmployees:
                  viewAllEmployees();
                  break;

                  case promptMessages.viewByDepartment:
                      viewByDepartment();
                      break;
                      
                      case promptMessages.viewByManager:
                          viewByManager();

          }
      
  })
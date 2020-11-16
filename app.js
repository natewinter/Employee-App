const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");

const teamArray = [];
const idArray = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function employeePicker() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Manager name?",
        validate: (name) => {
          if (!name) {
            return "please enter a name";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the Manager id?",
        validate: (id) => {
          if (idArray.includes(id)) {
            return "id already taken";
          } else if (isNaN(id)) {
            return "id needs to be a number!";
          } else if (!id) {
            return "please insert an id";
          } else return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the email??",
        validate: (email) => {
          if (!email) {
            return "please enter an email";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the Office Number?",
        validate: (number) => {
          if (!number) {
            return "please enter an office number";
          }
          return true;
        },
      },
    ])
    .then(function (data) {
      const manager = new Manager(
        data.name,
        data.id,
        data.email,
        data.officeNumber
      );
      teamArray.push(manager);
      idArray.push(data.id);
      addEmployee();
    });
}

function addEmployee() {
  inquirer
    .prompt({
      type: "list",
      name: "role",
      message: "who do you want to add?",
      choices: ["engineer", "intern", "none"],
    })
    .then(function (data) {
      if (data.role === "engineer") {
        addEngineer();
      } else if (data.role === "intern") {
        addIntern();
      } else if (data.role === "none") {
        renderEmployees();
      }
    });
}
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Engineer name?",
        validate: (name) => {
          if (!name) {
            return "please enter a name";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the Engineer id?",
        validate: (id) => {
          if (idArray.includes(id)) {
            return "id already taken";
          } else if (isNaN(id)) {
            return "id needs to be a number!";
          } else if (!id) {
            return "please insert an id";
          } else return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the email??",
        validate: (email) => {
          if (!email) {
            return "please enter an email";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "github",
        message: "What is their github?",
        validate: (github) => {
          if (!github) {
            return "please enter an office github";
          }
          return true;
        },
      },
    ])
    .then(function (data) {
      const engineer = new Engineer(
        data.name,
        data.id,
        data.email,
        data.github
      );
      teamArray.push(engineer);
      idArray.push(data.id);
      addEmployee();
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Intern name?",
        validate: (name) => {
          if (!name) {
            return "please enter a name";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the Intern id?",
        validate: (id) => {
          if (idArray.includes(id)) {
            return "id already taken";
          } else if (isNaN(id)) {
            return "id needs to be a number!";
          } else if (!id) {
            return "please insert an id";
          } else return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the email??",
        validate: (email) => {
          if (!email) {
            return "please enter an email";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "school",
        message: "What is their school?",
        validate: (school) => {
          if (!school) {
            return "please enter an office school";
          }
          return true;
        },
      },
    ])
    .then(function (data) {
      const intern = new Intern(data.name, data.id, data.email, data.school);
      teamArray.push(intern);
      idArray.push(data.id);
      addEmployee();
    });
}

function renderEmployees() {
  //   var filename = data.name.toLowerCase().split(" ").join("") + ".json";

  //   fs.writeFile(filename, JSON.stringify(data, null, "\t"), function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }

  //     console.log("Success!");
  //   });
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(teamArray), "utf8");
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

employeePicker();

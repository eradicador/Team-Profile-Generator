const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const teamMembers = [];
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "what is your name",
    },
    {
        type: "input",
        name: "id",
        message: "what is your id"
    },
    {
        type: "input",
        name: "email",
        message: "enter your email",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "whats your office number"
    }];
function createManager() {
    inquirer.prompt(managerQuestions).then(function (answers) {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        teamMembers.push(manager);
        newEmployee();
    });
}
//call a function to create a new employee
function newEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "None"
            ]
        }
        // create a switch statement
    ]).then(function (answers) {
        switch (answers.type) {
            case "Engineer":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "what is your engineer's name",
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "what is your engineer's id"
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "enter your engineer's email",
                    },
                    {
                        type: "input",
                        message: "What is your Engineer's GitHub?",
                        name: "gitHub"
                    }
                ]).then(answers => {
                    const engineer = new Engineer (answers.name, answers.id, answers.email, answers.gitHub)
                    console.log(engineer)
                    teamMembers.push(engineer);
                    newEmployee()
                })
                break;
            case "Intern":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "what is your intern's name",
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "what is your intern's id"
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "enter your intern's email",
                    },
                    {
                        type: "input",
                        message: "What school do you go to?",
                        name: "school"
                    }
                ]).then(answers => {
                    const intern = new Intern (answers.name, answers.id, answers.email, answers.school)
                    teamMembers.push(intern);
                    newEmployee()
                })
                break;
            default:
                writeToFile("output/team.html",render(teamMembers))
        };
    })
};

// function to write team.html file
function writeToFile(fileName, data) {
    console.log("writeToFile")
    fs.writeFile(fileName, data, function(err,response){
    process.exit()
    })
}
// function to initialize program
function init() {
    createManager()
    // inquirer.prompt(managerQuestions).then(answers => {
    //     writeToFile("output/team.html",render(answers))
    //   })
}
// function call to initialize program
init();

//if they select none you need a function to write to file with fs.
// createManager();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the render function (required
// above) and pass in an array containing all employee objects; the render function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the render function. Now write it to a file named team.html in the
// output folder. You can use the variable outputPath above target this location.
// Hint: you may need to check if the output folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided render function to work!






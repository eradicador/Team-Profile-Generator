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
        validate: answer => {
            if (answer !== "") {
                return true  
            }
         return "name cannot be blank"
        }
    },
    {
        type: "input",
        name: "id",
        message: "what is your id",
        validate: answer => {
            const pass = answer.match(/^[0-9]*$/)
            if(pass && answer !== "") {
                return true
            }
            return "must be a number code"
        }
    },
    {
        type: "input",
        name: "email",
        message: "enter your email",
        validate: answer => {
            const pass = answer.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
            if(pass && answer !== "") {
                return true
            }
            return "must be a valid email address"
        }
    },
    {
        type: "input",
        name: "officeNumber",
        message: "whats your office number",
        validate: answer => {
            const pass = answer.match(/^[0-9]*$/)
            if(pass && answer !== "") {
                return true
            }
            return "must be a number code"
        }

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
                        validate: answer => {
                            if (answer !== "") {
                                return true  
                            }
                         return "name cannot be blank"
                        }
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "what is your engineer's id",
                        validate: answer => {
                            const pass = answer.match(/^[0-9]*$/)
                            if(pass && answer !== "") {
                                return true
                            }
                            return "must be a number code"
                        }
                
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "enter your engineer's email",
                        validate: answer => {
                            const pass = answer.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
                            if(pass && answer !== "") {
                                return true
                            }
                            return "must be a valid email address"
                        }
                    },
                    {
                        type: "input",
                        message: "What is your Engineer's GitHub?",
                        name: "gitHub",
                        validate: answer => {
                            if (answer !== "") {
                                return true  
                            }
                         return "name cannot be blank"
                        }
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
                        validate: answer => {
                            if (answer !== "") {
                                return true  
                            }
                         return "name cannot be blank"
                        }
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "what is your intern's id",
                        validate: answer => {
                            const pass = answer.match(/^[0-9]*$/)
                            if(pass && answer !== "") {
                                return true
                            }
                            return "must be a number code"
                        }
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "enter your intern's email",
                        validate: answer => {
                            const pass = answer.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
                            if(pass && answer !== "") {
                                return true
                            }
                            return "must be a valid email address"
                        }
                    },
                    {
                        type: "input",
                        message: "What school do you go to?",
                        name: "school",
                        validate: answer => {
                            if (answer !== "") {
                                return true  
                            }
                         return "name cannot be blank"
                        }
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






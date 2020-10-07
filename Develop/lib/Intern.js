// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Intern extends Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
}

module.exports = Intern
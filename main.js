import inquirer from "inquirer";
import chalk from "chalk";
//Define the Student clss
class Student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //Initialize an empty erraty for conveneence
        this.balance = 1000;
    }
    //Method to enroLL A student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    //Mehtod to view a student balance 
    view_balance() {
        console.log(chalk.blackBright(` \n Balance for ${this.name} : $${this.balance}`));
    }
    //Mehtod to pay student fees 
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.yellowBright(` \n $${amount}fees paid successfull for $${this.name} \n `));
        console.log(chalk.yellow(`\n Remainig Balance is: $${this.balance} \n `));
    }
    //Method to disply student fees
    show_status() {
        console.log(chalk.blueBright(`ID:                      ${this.id}`));
        console.log(chalk.yellow(`Name:                  ${this.name}`));
        console.log(chalk.blueBright(`Courses:                ${this.courses}`));
        console.log(chalk.yellow(`Balance:                ${this.balance}`));
    }
} //Defining a student_Manager class to manage students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.greenBright(` \n Student: ${name} added Successfully. Student ID (${student.id}) \n `));
    } //method to enroll a student in a course 
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.cyanBright(` \n ${student.name} enrolled in ${course} Successfuly \n`));
        }
        else {
            console.log(`\n Student with ID ${student_id} not found.Please enter a correct student ID`);
        }
    }
    //Mehtod to view a student balance 
    view_Student_Balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.red(` \n Student not found. Please enter a correct student ID) \n`));
        }
    }
    //Method to pay student by student_ID
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.red(` \n  Student with ID ${student_id} not found. Please enter a correct student ID\n `));
        }
    }
    //Method to dsiply student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log(`\n Student with ID ${student_id} not found. Please enter a correct student ID \n`);
        }
    }
    //method to  find a student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//Main function to run the program
async function main() {
    console.log(chalk.underline.yellow(" \n Well come to My Project, Student Management System\n"));
    console.log(`=`.repeat(50));
    let student_manager = new Student_manager();
    //while to keep programing running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellow("\n Select an Opition:  "),
                choices: [
                    "Add Students",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        //Using switch case to handle user Choice
        switch (choice.choice) {
            case "Add Students":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.yellowBright("\n Enter a Student Name: ")
                    }
                ]);
                student_manager.add_student(name_input.name);
                console.log("=".repeat(60));
                break;
            case "Enroll Student":
                let enroll_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.blueBright("\n Enter a student ID: ")
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.yellowBright("\n Enter a Course Name: ")
                    }
                ]);
                student_manager.enroll_student(enroll_input.student_id, enroll_input.course);
                console.log("=".repeat(60));
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.yellowBright("\n Enter a student ID:  ")
                    }
                ]);
                student_manager.view_Student_Balance(balance_input.student_id);
                console.log("=".repeat(60));
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID: "
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay: "
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                console.log("=".repeat(60));
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a students ID: " + "\n",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                console.log("=".repeat(60));
                break;
            case "Exit":
                console.log(chalk.redBright("Exiting..."));
                console.log("-".repeat(50));
                process.exit();
        }
    }
}
//calling a main function
main();

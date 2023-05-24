export const adminDetails = {
    username: "admin",
    password: process.env.ADMIN_PASSWORD,
}

//environment variable - passed from outside into the program
//ADMIN_PASSWORD
// process is node.js keyword, process is an object, also is env. 

//KOMENDA W TERMINALU: ADMIN_PASSWORD=Admin123 npm test - run the npm test command provided with the following environment variable with the environment variable admin assword 
//tylko że ta komenda nie dziala!!! 

//blad: 
//The term 'ADMIN_PASSWORD=Admin123' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the na
//me, or if a path was included, verify that the path is correct and try again.//
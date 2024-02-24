const { createServer } = require("./WSNET_Framework/_server/index.js");
const { randomBytes } = require("crypto");
const { log } = require("console");
const fs = require("fs");
const port = 8080;


createServer({ port }, async client => {
    //create the user and aut value
    var user = false;
    //on auth
    client.onGet("auth", data => {
        //check if the user is auth
        if (auth(data)) {
            //set the user to the sended username
            if (!user)
                user = data.u
            //return sucsess
            return true;
        }
        //return error
        else return false;
    });
    //on create user
    client.onGet("create_new_user", name => {
        if (!user) return createUser(name)
        else return false
    });

})

//menage authentication
function auth(data) {
    //check if the user and password is set
    if (!data?.u || !data?.p) return false;
    //create the file path
    const userPath = `data/user/${securifyPath(data.u)}.txt`
    //check if the user exists
    if (!fs.existsSync(userPath)) return false;
    //get the password from the user-file
    const password = fs.readFileSync(userPath, "utf-8");
    //return the user-password is equalt to the sended password
    return password == (data?.p + "");

}
//create user
function createUser(name) {
    //create random userdata
    const userData = {
        u: securifyPath(randomBytes(20).toString("base64url")),
        p: randomBytes(40).toString("base64url")
    }
    //create the userfile path
    const userPath = `data/user/${userData.u}.txt`
    //check if the user not exists
    if (fs.existsSync(userPath)) return false;
    //store the password
    fs.writeFileSync(userPath, userData.p, "utf-8");
    //create an new user dir
    fs.mkdirSync(`data/user-data/${userData.u}`, { recursive: true })
    //store the name
    fs.writeFileSync(`data/user-data/${userData.u}/name.txt`, name + "", "utf-8");

    return userData;

}
//securify paths
function securifyPath(str) {
    return (str + "").split("/").join("_").split("\\").join("_");
}

process.on("uncaughtException", err => log(err))

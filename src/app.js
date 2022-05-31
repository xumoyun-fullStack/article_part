const express = require("express");
const app = new express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const CookieParser = require("cookie-parser");
const { PORT } = require("../config");
const postgres = require("./modules/postgres");

async function server() {
    try{
        app.listen(PORT,() => console.log("Server ready..." + PORT));

        //middlewares

        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(cors());
        app.use(CookieParser());
        app.use(async (req, res, next) => {
            const psql = postgres();
            req.psql = psql;
            next();
        })

        fs.readdir(path.join(__dirname,  "routes"), (err, files) => {
            if(!err){
                files.forEach(file => {
                    const routePath = path.join(__dirname, "routes", file);
                    const Route = require(routePath);
                    
                    if(Route.path && Route.router) app.use(Route.path,Route.router)
                    else console.log("######################")
                })
            }else{
                console.log(err)
            }
        })

    }catch(e){
        console.log(e);
    }
}

server();
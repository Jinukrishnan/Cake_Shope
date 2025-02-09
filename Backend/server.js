const express=require("express");
const app=express()
const router=require("./router.js")
const env=require("dotenv");
const { connection } = require("./connection.js");
const cors=require("cors")
env.config();
app.use(cors());
app.use(express.json())
app.use("/api",router)

connection().then(()=>{
    app.listen(3000,()=>{
        console.log(`server started at http://localhost:3000`);
        
    })
}).catch((error)=>{
    console.log(error);
    
})
const { default: mongoose } = require("mongoose")

exports.connection=async()=>{
    const db=await mongoose.connect(process.env.DB_URL+process.env.DB_NAME);
    console.log("database connected");
    
    return db;
}
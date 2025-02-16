const pkg =require('jsonwebtoken');

const {verify}=pkg;

async function Auth(req,res,next){
    // console.log("auth");
    try {
        console.log(req.headers.authorization);
        const key=req.headers.authorization;
        if(!key) return res.status(403).json({msg:"unAutherised access"});
        const token=key.split(" ")[1];
        console.log(token);
        const auth=await verify(token,process.env.JWT_KEY);
        console.log(auth);
        req.user=auth;
        next();
    } catch (error) {
        res.status(403).json({msg:"invalid authentication"});
    }
}

module.exports=Auth
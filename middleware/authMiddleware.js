const jwt=require("jsonwebtoken")

function auth(req,res,next){
    const Token = req.headers.authorization

    if(Token){
        try {
            const decoded=jwt.verify(Token.split(' ')[1],"fazu")

            if(decoded){
                req.body.authorID=decoded.authorID
                next()
            }else{
                res.status(400).send({"msg":"please login first!"})
            }


        } catch (error) {
            res.status(400).send({"err":error.message})
        }

    }else{
        res.status(400).send({"msg":"please login first!"})
    }


}

module.exports=auth
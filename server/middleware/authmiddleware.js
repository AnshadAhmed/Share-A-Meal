const jwt =require('jsonwebtoken');
function verifyToken(req,res,next) {
    const token=req.header('Authorization')  //take the token from the header

    if(!token){return res.status(401).json({error:"Access Denied"})}
    try {
        const decode=jwt.verify(token,process.env.SECRET_KEY)  // Verify the token and extract the hidden data, handling potential errors and invalid tokens.
        console.log(decode);

        req.userId=decode.userId  //add the decoded user id to the request object
        next()
        
        
    } catch (error) {
        res.status(401).json({error:"invalid tocken"})
        
    }
    
}

module.exports=verifyToken
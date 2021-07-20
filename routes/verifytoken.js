const jwt = require('jsonwebtoken');

 module.exports = function(req,res,next){
    const token = req.header('authENTICATE');
    if(!token) return res.status(401).send('ACCESS DENIED');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err){
        es.status(401).send('INVALID TOKEN');
    }
}
import jwt from 'jsonwebtoken';


const authSeller = (req, res, next) => {
    const { sellerToken } = req.cookies;

    if(!sellerToken) {
            return res.json({
                success : false,
                message : "Unauthorized Access" 
            })
    }

    try{
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if(tokenDecode.email === process.env.SELLER_EMAIL){
            // req.body.userId = tokenDecode.id;
            next();
        }
        else{
            return res.json({
                success : false,
                message : "Unauthorized Access" 
            });
        }
        // next();
    }
    catch(error){
        return res.json({
            success : false,
            message : error.message
        });
    }

}

export default authSeller;
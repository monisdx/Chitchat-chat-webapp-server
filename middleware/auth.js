import jwt from 'jsonwebtoken'

const auth = async(req, res, next) => {
    try{
        const token  = req.headers.authorization.split(" ")[1];

        let decodedata;

        if(token){
            decodedata = jwt.verify(token, 'test');

            req.userId = decodedata?.id;
        }
        else{
            console.log("token not found");
        }
        next();

    }
    catch(error){
        console.log(error);

    }

}

export default auth;
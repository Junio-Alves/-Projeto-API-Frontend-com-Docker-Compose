require("dotenv").config();
import User from "../models/User";
import jwt from "jsonwebtoken";
export default async (req,res,next) => {
    const { authorization } = req.headers;

    if( !authorization){
        return res.status(401).json({
            errors: ["Login required"],
        });
    }

    const[ ,token] = authorization.split(" ");
    try{
        const dados = jwt.verify(token,process.env.TOKEN_SECRET);
        const { id,email } = dados;
        const user = await User.findOne({
            where: {
                id,
                email
            }
        });
        if(!user){
            return res.status(401).json({
                errors: ["usuario invalido."],
            });
        }
        req.userId = id;
        req.email = email;
        return next();
    }catch(e){
        return res.status(401).json({
            errors: ["Token expirado ou inválido"],
            e,
        });
    }
}
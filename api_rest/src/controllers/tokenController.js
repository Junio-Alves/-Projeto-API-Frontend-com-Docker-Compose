import User from "../models/User";
import jwt from "jsonwebtoken";
require("dotenv").config();
class TokenController {
    async store(req,res){
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                errors: ["Invalid credentials"],
            })
        }

        const user = await User.findOne({where: { email }});

        if(!user){
            return res.status(400).json({
                errors: ["Usuário não existe"],
            })
        }

        if(!(await user.passwordIsValid(password))){
            return res.status(400).json({
                errors: ["Senha Invalida"],
            })
        }
        const { id } = user;
        const token = jwt.sign({id,email},process.env.TOKEN_SECRET,{
            expiresIn: process.env.TOKEN_EXPIRATION,
        })

        res.json({token, user:{nome:user.nome,id,email}});
    }
}

export default new TokenController();
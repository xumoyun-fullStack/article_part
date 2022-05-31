const Sendmail = require("../modules/email");
const { PORT } = require("../../config");
const { generateHash, compareHash } = require("../modules/bcrypt");
const { generateToken } = require("../modules/jwt");

module.exports = class UsersController{
    static async Signup(req,res){
        try{
            const { username, email, password } = req.body;
            const psql = await req.psql;

            let user = await psql.users.findOne({
                where: {
                    username,
                },
                raw: true,
            })

            if(user) throw new Error("This username already used!");

            const pass = await generateHash(password);

            user = await psql.users.create({
                username,
                password: pass,
                email
            },{
                raw: true,
            })

            let token = await generateToken(user.id); 

            let verificationMail = await Sendmail(
                email,
                "Verification link",
                null,
                `<p><a href="http://localhost:${PORT}/verify/${user.id}">Click here</a> to activate your account<?p>`
            )

            res.cookie("token", token);

            res.status(201).json({
                ok: true,
                user,
                token
            })

        }catch(e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
            console.log(e);
        }
    }

    static async VerifyMail(req, res){
        try{
            const { id } = req.params;
            const psql = await req.psql;

            await psql.users.update({
                isVerified: true,
            },{
                where:{
                    id,
                }
            })

            res.redirect("/")
        }catch(e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async Login(req, res){
        try{
            const { username, password } = req.body;
            const psql = await req.psql;
            let user = await psql.users.findOne({
                where: {
                    username,
                },
                raw: true,
            });

            if(!user) throw new Error("user not found!");

            let isTrue = await compareHash(password, user.password);
            
            if(!isTrue) throw new Error("Incorrect password!");
            if(!user.isVerified) throw new Error("This user does not verified!");

            let token = generateToken(user.id);
            
            res.cookie("token", token);

            res.status(200).json({
                ok: true,
                token,
            })

        }catch(e){
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }
}
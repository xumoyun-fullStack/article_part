const { checkToken } = require("../modules/jwt");

module.exports = class CommentController{
    static async AddComment(req, res){
        try{
            
            let { article_id, token, text } = req.body;
            const psql = await req.psql;

            let isTrue = checkToken(token);

            if(!isTrue) throw new Error("user did not registered!");
            let user = await psql.users.findOne({
                where:{
                    id: req.user_id,
                },
                raw: true
            });

            if(!user) throw new Error("This user didn't registered!")

            let comment = await psql.comments.create({
                user_id: user.id,
                article_id,
                author: user.username,
                text,
            })

            res.status(201).json({
                ok: true,
                comment,
            })

        }catch(e){
            console.log(e);
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }
}
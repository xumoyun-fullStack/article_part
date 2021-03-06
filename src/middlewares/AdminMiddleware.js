const { checkToken } = require("../modules/jwt");

module.exports = async function (req, res, next){
    let token = req?.cookies.token.split("=")[1] || req.headers["authorization"];

    token = checkToken(token);

    if(!token){
        res.redirect("/login");
        return;
    }

    const psql = await req.psql;
    let user = await psql.users.findOne({
        where: {
            id:  token,
        },
        raw: true
    });

   if(!user.isAdmin){
     res.redirect("/");
     return
   }

    req.user_id = token;

    next();
}
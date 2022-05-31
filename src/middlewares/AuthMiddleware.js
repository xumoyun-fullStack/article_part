const { checkToken } = require("../modules/jwt");

module.exports = async function (req, res, next){
    let token = req?.cookies.token || req.headers["authorization"];

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

   

    req.user_id = token;

    next();
}
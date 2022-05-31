module.exports = class AdminController{
    static async AddArticle(req, res){
        try{
            const psql = await req.psql;
            let { title, text, author } = req.body;

            let article = await psql.articles.create({
                title,
                text,
                author
            })            

            res.status(201).json({
                ok: true,
                article
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
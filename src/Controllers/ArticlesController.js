module.exports = class ArticlesController{
    static async GetArticles(req, res){
        try{
            const psql = await req.psql;
            const articles = await psql.articles.findAll();

            res.status(200).json({
                ok: true,
                articles,
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
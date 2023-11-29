const express = require('express');
const router = express.Router();
const db = require('../db/models');

/* 
{
  "nome": "Caixa de Bombons",
  "mercado": "Mercado 1",
  "preco": 20.00,
  "validade": "2024-07-20",
  "quantidade": 100
}
*/

router.post("/produto", async (req, res) =>{
    var dados = req.body;
    console.log(dados);
    await db.produto.create(dados).then((dadosProduto)=>{
        return res.json({
            mensagem: "produto cadastrado",
            dadosProduto
        });
    }).catch((error)=>{
        return res.json({
            mensagem: "deu erro",
            erro: error
        });
    });
    
});
router.get("/produto/:id", async(req, res)=>{
    const {id} = req.params;
    const prod = await db.produto.findOne({
        attributes: ['id', 'nome', 'mercado', 'preco', 'validade', 'data_inclusao', 'quantidade', 'imagem'],
        where:{id},
    });
    if(prod){
        return res.json({
            produto: prod.dataValues
        });
        
    }else{
        return res.status(400).json({
            mensagem: "Erro: nenhum produto encontrado"
        });
    }
    
});
router.get("/produtosMercado/:id", async(req, res)=>{
    const {id} = req.params;
    const prod = await db.produto.findAll({
        attributes: ['id', 'nome', 'preco', 'validade', 'data_inclusao', 'quantidade', 'imagem'],
        where:{mercado: id},
    });
    const mer = await db.mercado.findOne({
        attributes: ['nome'],
        where:{id},
    });
    
    if(prod){
        return res.json({
            mercado: mer.dataValues,
            produto: prod
        });
        
    }else{
        return res.status(400).json({
            mensagem: "Erro: nenhum produto encontrado"
        });
    }
    
});
router.delete("/produto/:id", async(req, res)=>{
    const {id} = req.params;
    await db.produto.destroy({
        where: {id}
    }).then(() => {
        return res.json({
            mensagem: " Produto apagado com sucesso" 
        });
    }).catch(() => {
        return res.status(400).json({
            mensagem: "Erro: Não apagou "
        });
    });
    
   
    
});
router.put("/produto", async(req, res)=>{
    const dados = req.body;
    await db.produto.update(dados, {where: {id: dados.id}}).then(()=>{
        return res.json({
            mensagem: " Produto Alterado com sucesso"
        });
    }).catch(()=>{
        return res.status(400).json({
            mensagem: "Erro: Produto não alterado"
        });
    })
    
    
});
router.get("/produtos",async(req, res)=>{

    const{page = 1} = req.query;

    const limit = 10;


    var lastPage = 1;

    const countProd = await db.produto.count();
    if(countProd !== 0){
        lastPage = Math.ceil(countProd / limit);
    }else{
        return res.status(400).json({
            mensagem: "Erro: nenhum produto encontrado"
        });
    }


    const prods = await db.produto.findAll({
        attributes: ['id', 'nome', 'mercado', 'preco', 'validade', 'data_inclusao', 'quantidade', 'imagem'],
        order:[['id', 'DESC']],
        offset: Number((page * limit) - limit),
        limit: limit
    });

    if(prods){
        var pagination = {
            path: '/produtos',
            page,
            prev_page_url: page -1 >= 1 ? page -1: false,
            next_page_url: Number(page) + Number(1) > lastPage? lastPage: Number(page) + Number(1),
            lastPage,
            total: countProd

        }
        return res.json({
            prods,
            pagination
        });
    }else{
        return res.status(400).json({
            mensagem: "Erro: nenhum produto encontrado"
        });
    }
});

module.exports = router;
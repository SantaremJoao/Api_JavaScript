const express = require('express');
const router = express.Router();
const db = require('../db/models');

/* 
{
    "nome": "Superbom",
    "senha": "123",
    "cnpj": "000.000.000-00",
    "cep": "12345-678",
    "usuario": 3
  }
*/

router.post("/mercado", async (req, res) =>{
    var dados = req.body;
    
    await db.mercado.create(dados).then((dadosMercado)=>{
        return res.json({
            mensagem: "mercado cadastrado",
            dadosMercado
        });
    }).catch((error)=>{
        return res.json({
            mensagem: "deu erro",
            erro: error
        });
    });
    
});
router.get("/mercado/:id", async(req, res)=>{
    const {id} = req.params;
    const mer = await db.mercado.findOne({
        attributes: ['id', 'nome', 'cnpj', 'cep', 'usuario', 'data_criacao'],
        where:{id},
    });
    if(mer){
        return res.json({
            mercado: mer.dataValues
        });
        
    }else{
        return res.status(400).json({
            mensagem: "Erro: nenhum mercado encontrado"
        });
    }
    
});
router.delete("/mercado/:id", async(req, res)=>{
    const {id} = req.params;
    await db.mercado.destroy({
        where: {id}
    }).then(() => {
        return res.json({
            mensagem: " Mercado apagado com sucesso" 
        });
    }).catch(() => {
        return res.status(400).json({
            mensagem: "Erro: Não apagou "
        });
    });
    
   
    
});
router.put("/mercado", async(req, res)=>{
    const dados = req.body;
    await db.mercado.update(dados, {where: {id: dados.id}}).then(()=>{
        return res.json({
            mensagem: "Mercado Alterado com sucesso"
        });
    }).catch(()=>{
        return res.status(400).json({
            mensagem: "Erro: Mercado não alterado"
        });
    })
    
    
});
router.get("/mercados",async(req, res)=>{

    const{page = 1} = req.query;

    const limit = 10;


    var lastPage = 1;

    const countMercado = await db.mercado.count();
    if(countMercado !== 0){
        lastPage = Math.ceil(countMercado / limit);
    }else{
        return res.status(400).json({
            mensagem: "Erro: nenhum mercado encontrado"
        });
    }


    const mer = await db.mercado.findAll({
        attributes: ['id', 'nome', 'cnpj', 'cep', 'usuario', 'data_criacao'],
        order:[['id', 'DESC']],
        offset: Number((page * limit) - limit),
        limit: limit
    });

    if(mer){
        var pagination = {
            path: '/mercados',
            page,
            prev_page_url: page -1 >= 1 ? page -1: false,
            next_page_url: Number(page) + Number(1) > lastPage? lastPage: Number(page) + Number(1),
            lastPage,
            total: countMercado

        }
        return res.json({
            mer,
            pagination
        });
    }else{
        return res.status(400).json({
            mensagem: "Erro: nenhum mercado encontrado"
        });
    }
});

module.exports = router;
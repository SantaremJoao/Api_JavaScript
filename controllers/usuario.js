const express = require('express');
const router = express.Router();
const db = require('../db/models');

/*
{
    "nome": "Fulano de Tal",
    "senha": "123456",
    "cpf_cnpj": "123.456.789-00",
    "cep": "12345-678",
    "email": "fulano@example.com",
    "data_nascimento": "1980-01-01"
  }
*/
router.post("/usuario", async (req, res) =>{
    var dados = req.body;
    await db.usuario.create(dados).then((dadosUsuario)=>{
        return res.json({
            mensagem: "Usuario cadastrado",
            dadosUsuario
        });
    }).catch((error)=>{
        return res.json({
            mensagem: "deu erro",
            erro: error
        });
    });
    
});
router.get("/usuario/:id", async(req, res)=>{
    const {id} = req.params;
    const user = await db.usuario.findOne({
        attributes: ['id', 'nome', 'cpf_cnpj', 'cep', 'email', 'data_nascimento', 'login', 'tipo_usuario'],
        where:{id},
    });
    if(user){
        return res.json({
            usuario: user.dataValues
        });
        
    }else{
        return res.status(400).json({
            mensagem: "Erro: Nenhum usuario encontrado"
        });
    }
    
});
router.delete("/usuario/:id", async(req, res)=>{
    const {id} = req.params;
    await db.usuario.destroy({
        where: {id}
    }).then(() => {
        return res.json({
            mensagem: "Usuario apagado com sucesso" 
        });
    }).catch(() => {
        return res.status(400).json({
            mensagem: "Erro: Não apagou "
        });
    });
    
});
router.put("/usuario", async(req, res)=>{
    const dados = req.body;
    await db.usuario.update(dados, {where: {id: dados.id}}).then(()=>{
        return res.json({
            mensagem: " Usuario Alterado com sucesso"
        });
    }).catch(()=>{
        return res.status(400).json({
            mensagem: "Erro: Usuario não alterado"
        });
    })
    
    
});
router.get("/usuarios",async(req, res)=>{

    const{page = 1} = req.query;

    const limit = 10;


    var lastPage = 1;

    const countUser = await db.usuario.count();
    if(countUser !== 0){
        lastPage = Math.ceil(countUser / limit);
    }else{
        return res.status(400).json({
            mensagem: "Erro: nenhum usuario encontrado"
        });
    }


    const users = await db.usuario.findAll({
        attributes: ['id', 'nome', 'cpf_cnpj', 'cep', 'email', 'data_nascimento', 'login', 'tipo_usuario'],
        order:[['id', 'DESC']],
        offset: Number((page * limit) - limit),
        limit: limit
    });

    if(users){
        var pagination = {
            path: '/usuario',
            page,
            prev_page_url: page -1 >= 1 ? page -1: false,
            next_page_url: Number(page) + Number(1) > lastPage? lastPage: Number(page) + Number(1),
            lastPage,
            total: countUser

        }
        return res.json({
            users,
            pagination
        });
    }else{
        return res.status(400).json({
            mensagem: "Erro: nenhum produto encontrado"
        });
    }
});



module.exports = router;
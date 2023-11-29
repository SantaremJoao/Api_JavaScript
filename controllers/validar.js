const express = require('express');
const router = express.Router();
const db = require('../db/models');
const difflib = require("difflib");

router.get("/validar", async (req, res)=>{
    const { login, senha } = req.body;

    const user = await db.usuario.findOne({
        attributes: ['id', 'nome', 'cpf_cnpj', 'cep', 'email', 'data_nascimento', 'login', 'senha', 'tipo_usuario'],
        where:{login},
    });
    
    if(user){
        const senhaHash = user.dataValues.senha;
        const diff = difflib.unifiedDiff(
            senhaHash,
            senha
          );
        
          for (const line of diff) {
            if (line[0] === "+" || line[0] === "-") {
               return res.json({
                validacao: false,
            });
            }
          }
          return res.json({
            validacao:true,
            Usuario: user.dataValues,
        });
    }
      
});



module.exports = router;
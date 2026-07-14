const { pool } = require("../database/connection");

async function login(req,res){

    try{

        const {email,senha} = req.body;

        const [usuario] = await pool.query(
        `
        SELECT *
        FROM usuarios
        WHERE email=?
        AND senha=?
        `,
        [email,senha]);

        if(usuario.length==0){

            return res.status(401).json({

                success:false,
                message:"Usuário ou senha inválidos"

            });

        }

        return res.status(200).json({

            success:true,
            usuario:usuario[0]

        });

    }catch(err){

        console.log(err);

        return res.status(500).json({

            success:false,
            message:"Erro interno"

        });

    }

}

module.exports={
login
};
const { pool } = require("../database/connection");

async function login(req,res){

    try{

        const {email, senha} = req.body;

        const [clientes] = await pool.query(
        `
        SELECT *
        FROM clientes
        WHERE email=? AND
        senha=?
        `,
        [email, senha]);

        if(clientes.length==0){

            return res.status(401).json({

                success:false,
                message:"Usuário ou senha inválidos"

            });

        }

        return res.status(200).json({

            success:true,
            usuario:clientes[0]

        });

    }catch(err){

        console.log(err);

        return res.status(500).json({

            success:false,
            message:"Erro interno"

        });

    }

}

async function register(req, res) {

    try {

        const { nome_usuario, email, senha } = req.body;

        await pool.query(
            `INSERT INTO clientes
            (nome_usuario, email, senha)
            VALUES (?, ?, ?)`,
            [nome_usuario, email, senha]
        );

        return res.status(201).json({

            success: true,
            message: "Usuário cadastrado com sucesso."

        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,
            message: "Erro interno."

        });

    }

}

module.exports={
login,
register
};
const mysql = require('../mysql');

exports.getCow = async (req,res,next) => {
    try {
        const response = {
            cow:"cow 1"
        }
        return res.status(200).send(response);
        
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getIdCow = async (req, res, next) => {
    
    try {
        console.log("oi");

        const query = "SELECT * FROM cow_tbl WHERE cow_id = ?;";
        const result = await mysql.execute(query,[req.params.cow_id]);
        console.log(result.length);
        if (result.length === 0) {
            return res.status(404).send({
                mensagem: "Não foi encontrado nenhuma vaca com este ID"
            });
        }
        const response = {
            cow: {
                cow_id: result[0].cow_id,
                code: result[0].cow_code,
                cow_name: result[0].cow_name,
                cow_birth: result[0].cow_birth,
                cow_mother: result[0].cow_mother,
                cow_dad: result[0].cow_dad,
                request: {
                    tipo: 'GET',
                    description: 'Retorna uma vaca',
                    url: process.env.URL_API + 'vacas'
                }
            }
        }

        return res.status(200).send(response);

        
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

// *********************************************************************************************

// INSERE PRODUTO - USANDO ASYNC / AWAIT - FUNCTION SÓ PARA ACESSAR MYSQL
exports.postCow = async (req, res, next) => {
    try {
        const query = "INSERT INTO produtos (nome, preco,imagem_produto) VALUES (?,?,?);";
        const result = await mysql.execute(query, [
            req.body.nome,
            req.body.preco,
            req.file.path
        ]);
        console.log(result);

        const response = {
            mensagem: 'Produto inserido com sucesso!',
            produtoCriado: {
                id_produto: result.insertId,
                nome: req.body.nome,
                preco: req.body.preco,
                imagem_produto: process.env.URL_IMAGE_PROD+req.file.path,
                request: {
                    tipo: 'POST',
                    description: 'Insere um produto',
                    url: process.env.URL_API + 'produtos'
                }
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({error:error});
    }
}

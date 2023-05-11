const express = require('express')
const exphbs = require('express-handlebars')

const pool = require('./db/conn')

console.log(pool)

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/addcliente', function (req, res) {
  res.render('addcliente')
})

app.get('/addprescricao', function (req, res) {
  res.render('addprescricao')
})

app.get('/addestoque', function (req, res) {
  res.render('addestoque')
})

app.get('/addvenda', function (req, res) {
  res.render('addvenda')
})


const handlebars = require('handlebars');

// Definindo o helper dateFormat
handlebars.registerHelper('dateFormat', function(date) {
  const formattedDate = new Date(date).toLocaleDateString('pt-BR');
  return formattedDate;
});


// --{Clientes}-- \\

app.post('/clientes/insertcliente', function (req, res) {
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const DataNasc = req.body.DataNasc;
  const endereco = req.body.endereco;
  const fone = req.body.fone;
  const email = req.body.email;
  

  const query = `INSERT INTO clientes (nome, cpf, DataNasc, endereco, fone, email) 
               VALUES ('${nome}', '${cpf}', '${DataNasc}', '${endereco}', '${fone}', '${email}')`;


  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

app.get('/clientes', function (req, res) {
  const query = `SELECT * FROM clientes`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const clientes = data

    console.log(data)

    res.render('clientes', { clientes })
  })
})

app.get('/clientes/:cpf', function (req, res) {
  const cpf = req.params.cpf

  const query = `SELECT * FROM clientes WHERE cpf = ${cpf}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const cliente = data[0]

    console.log(data[0])

    res.render('cliente', { cliente })
  })
})

app.get('/clientes/edit/:cpf', function (req, res) {
  const cpf = req.params.cpf

  const query = `SELECT * FROM clientes WHERE cpf = ${cpf}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const cliente = data[0]

    console.log(data[0])

    res.render('editcliente', { cliente })
  })
})

app.post('/clientes/updatecliente', function (req, res) {
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const DataNasc = req.body.DataNasc;
  const endereco = req.body.endereco;
  const fone = req.body.fone;
  const email = req.body.email;


  const query = `UPDATE clientes SET 
                nome = '${nome}', 
                DataNasc = '${DataNasc}', 
                endereco = '${endereco}', 
                fone = '${fone}', 
                email = '${email}'
              WHERE cpf = '${cpf}'`
  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect(`/clientes/edit/${cpf}`)
  })
})

app.post('/clientes/remove/:cpf', function (req, res) {
  const cpf = req.params.cpf
  const query = `DELETE FROM clientes WHERE cpf = ${cpf}`
  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect(`/clientes`)
  })
})

// --{Clientes}-- \\

// --{Prescrição}-- \\

    app.post('/prescricoes/insertprescricao', function (req, res) {

    const nome_cliente = req.body.nome_cliente;
    const cpf = req.body.cpf;
    const data_prescricao = req.body.data_prescricao;
    const grau_esferico_od_longe = req.body.grau_esferico_od_longe;
    const grau_cilindrico_od_longe = req.body.grau_cilindrico_od_longe;
    const eixo_od_longe = req.body.eixo_od_longe;
    const grau_esferico_oe_longe = req.body.grau_esferico_oe_longe;
    const grau_cilindrico_oe_longe = req.body.grau_cilindrico_oe_longe;
    const eixo_oe_longe = req.body.eixo_oe_longe;
    const adicao_od_perto = req.body.adicao_od_perto;
    const adicao_oe_perto = req.body.adicao_oe_perto;
    const grau_esferico_od_perto = req.body.grau_esferico_od_perto;
    const grau_cilindrico_od_perto = req.body.grau_cilindrico_od_perto;
    const eixo_od_perto = req.body.eixo_od_perto;
    const grau_esferico_oe_perto = req.body.grau_esferico_oe_perto;
    const grau_cilindrico_oe_perto = req.body.grau_cilindrico_oe_perto;
    const eixo_oe_perto = req.body.eixo_oe_perto;
    const tipo_lente = req.body.tipo_lente;
    const marca_lente = req.body.marca_lente;
  

      const query = `INSERT INTO prescricao (nome_cliente, cpf, data_prescricao, grau_esferico_od_longe, grau_cilindrico_od_longe, eixo_od_longe, grau_esferico_oe_longe, grau_cilindrico_oe_longe, eixo_oe_longe, adicao_od_perto, adicao_oe_perto, grau_esferico_od_perto, grau_cilindrico_od_perto, eixo_od_perto, grau_esferico_oe_perto, grau_cilindrico_oe_perto, eixo_oe_perto, tipo_lente, marca_lente) 
          VALUES ('${nome_cliente}', '${cpf}', '${data_prescricao}', '${grau_esferico_od_longe}', '${grau_cilindrico_od_longe}', '${eixo_od_longe}', '${grau_esferico_oe_longe}', '${grau_cilindrico_oe_longe}', '${eixo_oe_longe}', '${adicao_od_perto}', '${adicao_oe_perto}', '${grau_esferico_od_perto}', '${grau_cilindrico_od_perto}', '${eixo_od_perto}', '${grau_esferico_oe_perto}', '${grau_cilindrico_oe_perto}', '${eixo_oe_perto}', '${tipo_lente}', '${marca_lente}')`;

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})


app.get('/prescricoes', function (req, res) {
  const query = `SELECT * FROM prescricao`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const prescricoes = data

    console.log(data)

    res.render('prescricoes', { prescricoes })
  })
})

app.get('/prescricoes/:cpf', function (req, res) {
  const cpf = req.params.cpf

  const query = `SELECT * FROM prescricao WHERE cpf = ${cpf}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const prescricao = data[0]

    console.log(data[0])

    res.render('prescricao', { prescricao })
  })
})

app.get('/prescricoes/edit/:cpf', function (req, res) {
  const cpf = req.params.cpf

  const query = `SELECT * FROM prescricao WHERE cpf = ${cpf}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const prescricao = data[0]

    console.log(data[0])

    res.render('editprescricao', { prescricao })
  })
})

app.post('/prescricoes/updateprescricao', function (req, res) {
  const nome_cliente = req.body.nome_cliente;
    const cpf = req.body.cpf;
    const data_prescricao = req.body.data_prescricao;
    const grau_esferico_od_longe = req.body.grau_esferico_od_longe;
    const grau_cilindrico_od_longe = req.body.grau_cilindrico_od_longe;
    const eixo_od_longe = req.body.eixo_od_longe;
    const grau_esferico_oe_longe = req.body.grau_esferico_oe_longe;
    const grau_cilindrico_oe_longe = req.body.grau_cilindrico_oe_longe;
    const eixo_oe_longe = req.body.eixo_oe_longe;
    const adicao_od_perto = req.body.adicao_od_perto;
    const adicao_oe_perto = req.body.adicao_oe_perto;
    const grau_esferico_od_perto = req.body.grau_esferico_od_perto;
    const grau_cilindrico_od_perto = req.body.grau_cilindrico_od_perto;
    const eixo_od_perto = req.body.eixo_od_perto;
    const grau_esferico_oe_perto = req.body.grau_esferico_oe_perto;
    const grau_cilindrico_oe_perto = req.body.grau_cilindrico_oe_perto;
    const eixo_oe_perto = req.body.eixo_oe_perto;
    const tipo_lente = req.body.tipo_lente;
    const marca_lente = req.body.marca_lente;


    const query = `UPDATE prescricao SET
    nome_cliente = '${nome_cliente}',
    data_prescricao = '${data_prescricao}',
    grau_esferico_od_longe = '${grau_esferico_od_longe}',
    grau_cilindrico_od_longe = '${grau_cilindrico_od_longe}',
    eixo_od_longe = '${eixo_od_longe}',
    grau_esferico_oe_longe = '${grau_esferico_oe_longe}',
    grau_cilindrico_oe_longe = '${grau_cilindrico_oe_longe}',
    eixo_oe_longe = '${eixo_oe_longe}',
    adicao_od_perto = '${adicao_od_perto}',
    adicao_oe_perto = '${adicao_oe_perto}',
    grau_esferico_od_perto = '${grau_esferico_od_perto}',
    grau_cilindrico_od_perto = '${grau_cilindrico_od_perto}',
    eixo_od_perto = '${eixo_od_perto}',
    grau_esferico_oe_perto = '${grau_esferico_oe_perto}',
    grau_cilindrico_oe_perto = '${grau_cilindrico_oe_perto}',
    eixo_oe_perto = '${eixo_oe_perto}',
    tipo_lente = '${tipo_lente}',
    marca_lente = '${marca_lente}'
  WHERE cpf = ${cpf}`
  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect(`/prescricoes/edit/${cpf}`)
  })
})

app.post('/prescricoes/remove/:cpf', function (req, res) {
  const cpf = req.params.cpf
  const query = `DELETE FROM prescricao WHERE cpf = ${cpf}`
  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect(`/prescricoes`)
  })
})

// --{Prescrição}-- \\

// --{Estoque}-- \\

app.post('/estoques/insertestoque', function (req, res) {
  const descricao_produto = req.body.descricao_produto
  const tipo_lente = req.body.tipo_lente
  const marca_lente = req.body.marca_lente
  const quantidade = req.body.quantidade
  const preco_unitario = req.body.preco_unitario
  const data_entrada = req.body.data_entrada
  const data_validade = req.body.data_validade

  const query = `INSERT INTO estoque (descricao_produto, tipo_lente, marca_lente, quantidade, preco_unitario, data_entrada, data_validade) VALUES ('${descricao_produto}', '${tipo_lente}', '${marca_lente}', '${quantidade}', '${preco_unitario}', '${data_entrada}', '${data_validade}')`

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

app.get('/estoques', function (req, res) {
  const query = `SELECT * FROM estoque`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const estoques = data

    console.log(data)

    res.render('estoques', { estoques })
  })
})

app.get('/estoques/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM estoque WHERE id = ${id}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const estoque = data[0]

    console.log(data[0])

    res.render('estoque', { estoque })
  })
})

app.get('/estoques/edit/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM estoque WHERE id = ${id}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const estoque = data[0]

    console.log(data[0])

    res.render('editestoque', { estoque })
  })
})

app.post('/estoques/updateestoque', function (req, res) {
  const id = req.body.id
  const descricao_produto = req.body.descricao_produto
  const tipo_lente = req.body.tipo_lente
  const marca_lente = req.body.marca_lente
  const quantidade = req.body.quantidade
  const preco_unitario = req.body.preco_unitario
  const data_entrada = req.body.data_entrada
  const data_validade = req.body.data_validade


  const query = `UPDATE estoque SET 
  descricao_produto = '${descricao_produto}', 
  tipo_lente = '${tipo_lente}',
  marca_lente = '${marca_lente}',
  quantidade = '${quantidade}',
  preco_unitario = '${preco_unitario}',
  data_entrada = '${data_entrada}',
  data_validade = '${data_validade}'
   WHERE id = ${id}`
  
  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect(`/estoques/edit/${id}`)
  })
})

app.post('/estoques/remove/:id', function (req, res) {
  const id = req.params.id
  const query = `DELETE FROM estoque WHERE id = ${id}`
  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect(`/estoques`)
  })
})

// --{Estoque}-- \\

// --{Venda}-- \\

app.post('/vendas/insertvenda', function (req, res) {
  const cpf = req.body.cpf
  const id_prescricao = req.body.id_prescricao
  const id_produto = req.body.id_produto
  const quantidade = req.body.quantidade
  const preco_unitario = req.body.preco_unitario
  const data_venda = req.body.data_venda

  const query = `INSERT INTO venda (cpf, id_prescricao, id_produto, quantidade, preco_unitario, data_venda) VALUES ('${cpf}', '${id_prescricao}', '${id_produto}', '${quantidade}', '${preco_unitario}', '${data_venda}')`

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

app.get('/vendas', function (req, res) {
  const query = `SELECT * FROM venda`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const vendas = data

    console.log(data)

    res.render('vendas', { vendas })
  })
})

app.get('/vendas/:cpf', function (req, res) {
  const cpf = req.params.cpf

  const query = `SELECT * FROM venda WHERE cpf = ${cpf}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const venda = data[0]

    console.log(data[0])

    res.render('venda', { venda })
  })
})

app.get('/vendas/edit/:cpf', function (req, res) {
  const cpf = req.params.cpf

  const query = `SELECT * FROM venda WHERE cpf = ${cpf}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const venda = data[0]

    console.log(data[0])

    res.render('editvenda', { venda })
  })
})

app.post('/vendas/updatevenda', function (req, res) {
  const cpf = req.body.cpf
  const id_prescricao = req.body.id_prescricao
  const id_produto = req.body.id_produto
  const quantidade = req.body.quantidade
  const preco_unitario = req.body.preco_unitario
  const data_venda = req.body.data_venda

  const query = `UPDATE venda SET 
  id_prescricao = '${id_prescricao}', 
  id_produto = '${id_produto}',
  quantidade = '${quantidade}',
  preco_unitario = '${preco_unitario}',
  data_venda = '${data_venda}'
  WHERE cpf = '${cpf}'`
  
  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect(`/vendas/edit/${cpf}`)
  })
})

app.post('/vendas/remove/:cpf', function (req, res) {
  const cpf = req.params.cpf
  const query = `DELETE FROM venda WHERE cpf = ${cpf}`
  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect(`/vendas`)
  })
})

// --{Venda}-- \\

app.listen(3000)

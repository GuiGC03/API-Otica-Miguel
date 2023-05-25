create database otica;
use otica;

CREATE TABLE clientes(
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) PRIMARY KEY UNIQUE NOT NULL,
    DataNasc DATE NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    fone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE prescricao (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome_cliente VARCHAR(100) NOT NULL,
  cpf VARCHAR(11),
  data_prescricao DATE NOT NULL,
  grau_esferico_od_longe DECIMAL(5,2) NOT NULL,
  grau_cilindrico_od_longe DECIMAL(5,2) NOT NULL,
  eixo_od_longe INT NOT NULL,
  grau_esferico_oe_longe DECIMAL(5,2) NOT NULL,
  grau_cilindrico_oe_longe DECIMAL(5,2) NOT NULL,
  eixo_oe_longe INT NOT NULL,
  grau_esferico_od_perto DECIMAL(5,2) NOT NULL,
  grau_cilindrico_od_perto DECIMAL(5,2) NOT NULL,
  eixo_od_perto INT NOT NULL,
  grau_esferico_oe_perto DECIMAL(5,2) NOT NULL,
  grau_cilindrico_oe_perto DECIMAL(5,2) NOT NULL,
  eixo_oe_perto INT NOT NULL,
  tipo_lente VARCHAR(50) NOT NULL,
  marca_lente VARCHAR(50) NOT NULL,
  FOREIGN KEY (cpf) REFERENCES clientes(cpf)
);

CREATE TABLE estoque (
  id INT PRIMARY KEY AUTO_INCREMENT,
  descricao_produto VARCHAR(100) NOT NULL,
  tipo_lente VARCHAR(50) NOT NULL,
  marca_lente VARCHAR(50) NOT NULL,
  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  data_entrada DATE NOT NULL,
  data_validade DATE NOT NULL
);

CREATE TABLE venda (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cpf VARCHAR(11),
  id_prescricao INT NOT NULL,
  id_produto INT NOT NULL,
  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  data_venda DATE NOT NULL,
  FOREIGN KEY (cpf) REFERENCES clientes(cpf),
  FOREIGN KEY (id_prescricao) REFERENCES prescricao(id),
  FOREIGN KEY (id_produto) REFERENCES estoque(id)
);

select * from estoque_oculos;


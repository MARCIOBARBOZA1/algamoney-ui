export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Contato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export class Pessoa {
    id: string;
    nome: string;
    endereco = new Endereco;
    ativo = true;
    contatos = new Array<Contato>();
}

export class Categoria {
    id: string;
}

export class Lancamento {
    id: string;
    tipo: string = 'RECEITA';
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    observacao: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
}
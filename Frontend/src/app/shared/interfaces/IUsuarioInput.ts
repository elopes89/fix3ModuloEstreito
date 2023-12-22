export interface IUsuarioInput {

  nome: string,
  genero: string,
  cpf: string,
  telefone: string,
  email: string,
  senha: string,
  tipo: string,
  status_sistema: boolean,
  matricula_Aluno?: string,
  codigo_Registro_Professor?: number,
  cep: string,
  uf: string,
  logradouro: string,
  localidade: string,
  numero: string,
  complemento: string,
  bairro: string,
  empresa_Id: number
}

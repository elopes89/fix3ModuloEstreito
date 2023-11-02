import { IEndereco } from "./IEndereco";
import { IEnderecoInput } from "./IEnderecoInput";

export interface IUsuarioInput {
  nome: string;
  cpf: string;
  tipo: string;
  email: string;
  telefone: string;
  genero: string;
  senha: string;
  status_sistema: boolean;
  matricula_Aluno: string;
  codigo_Registro_Professor: number;
  empresa_Id: number;
  Endereco: IEndereco;
}

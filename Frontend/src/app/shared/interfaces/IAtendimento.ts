export interface IAtendimento {
  id?: number,
  data: string,
  descricao: string,
  aluno_id: number,
  pedagogo_id: number,
  pedagogo_nome?: { nome: string},
  aluno_nome?: {nome: string}
}

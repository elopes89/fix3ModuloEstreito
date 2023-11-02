export interface IExercicio {
    id?: number,
    titulo: string,
    descricao: string,
    materia: string,
    data_Conclusao: string,
    professor_id: number,
    aluno_id: number,
    professor_nome?: { nome: string }
    aluno_nome?: { nome: string }
}
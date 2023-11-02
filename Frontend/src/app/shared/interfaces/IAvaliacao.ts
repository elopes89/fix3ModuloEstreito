import { NumberValueAccessor } from "@angular/forms";

export interface IAvaliacao {
    id: number, 
    titulo: string,
    descricao: string, 
    materia: string,
    data: string, 
    pontuacao_maxima: number,
    nota: number,
    professor_id: number,
    aluno_id: number,
    professor_nome: { nome: string }
}
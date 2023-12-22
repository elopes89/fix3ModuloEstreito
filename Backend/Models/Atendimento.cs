using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
	public class Atendimento
	{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(TypeName = "VARCHAR"), Required, StringLength(10)]
        public string Data { get; set; }

        [Column(TypeName = "VARCHAR"), Required, StringLength(40)]
        public string Descricao { get; set; }

        [Required]
        public int Aluno_Id { get; set; }

        [Required]
        public int Pedagogo_Id { get; set; }

        [ForeignKey("Aluno_Id")]
        public virtual Usuario Aluno { get; set; }

        [ForeignKey("Pedagogo_Id")]
        public virtual Usuario Pedagogo { get; set; }
    }
}


using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Log
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("Usuario")]
        public int Usuario_Id { get; set; }
        [Column(TypeName = "VARCHAR"), StringLength(50)]
        public string Tipo { get; set; }

        [Column(TypeName = "VARCHAR"), StringLength(50)]
        public string Nome { get; set; }

        [Column(TypeName = "VARCHAR"), StringLength(30)]
        public string Acao { get; set; }

        [Column(TypeName = "VARCHAR"), StringLength(20)]
        public string Data { get; set; }

        public virtual Usuario Usuario { get; set; }
    }
}


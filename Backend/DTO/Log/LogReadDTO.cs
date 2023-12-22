using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTO.Log
{
    public class LogReadDTO
    {
        public int Id { get; set; }
        public int Usuario_Id { get; set; }
        public string Tipo { get; set; }
        public string Nome { get; set; }
        public string Acao { get; set; }
        public string Data { get; set; }
    }
}
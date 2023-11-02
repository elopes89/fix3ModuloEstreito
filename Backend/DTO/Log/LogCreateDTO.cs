using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTO.Log
{
    public class LogCreateDTO
    {
        public int Usuario_Id { get; set; }
        public string Acao { get; set; }  
        public DateTime Data { get; set; }
        public string Detalhes { get; set; }
    }
}
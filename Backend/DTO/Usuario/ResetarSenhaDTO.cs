using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTO.Usuario
{
    public class ResetarSenhaDTO
    {    
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}
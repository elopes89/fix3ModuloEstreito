
using Backend.Context;
using Backend.Models;
using Backend.Repositories.Interfaces;

namespace Backend.Repositories
{
    public class EmpresaRepository : IEmpresaRepository
	{
        private readonly LabSchoolContext _context;

        public EmpresaRepository (LabSchoolContext context)
        {
            _context = context;
        }
       
        public List<Empresa>? Obter(){
            return _context.Empresas.ToList();
        }

        public Empresa? ObterPorId (int id)
        {
             return _context.Empresas.FirstOrDefault(x => x.Id.Equals(id));;
        }
        public void Adicionar(Empresa empresa)
        {
            _context.Empresas.Add(empresa);
            _context.SaveChanges();
        }
        public void Atualizar(Empresa empresa)
        {
            _context.Empresas.Update(empresa);
            _context.SaveChanges();
        }

        
    }
}
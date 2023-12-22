using System.Net;
using AutoMapper;
using Backend.DTO.Empresa;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Validators;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/whitelabel")]
    public class EmpresaController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IEmpresaRepository _empresaRepository;

        public EmpresaController(IEmpresaRepository empresaRepository, IMapper mapper)
        {
            _empresaRepository = empresaRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Show()
        {
            var enterprises = _empresaRepository.Obter();
            if (enterprises != null)
                return Ok(enterprises.ToList());
            else
                return BadRequest();
        }
        [HttpGet("{id}")]
        public ActionResult<EmpresaReadDTO> GetById(int id)
        {
            try
            {
                var retorno = _empresaRepository.ObterPorId(id);

                if (retorno == null)
                {
                    return NotFound("Nenhum registro encontrado no banco de dados.");
                }

                var retornoDTO = _mapper.Map<EmpresaReadDTO>(retorno);

                return Ok(retornoDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }


        [HttpPost]
        public ActionResult<EmpresaReadDTO> Post([FromBody] EmpresaCreateDTO empresaCreateDTO)
        {
            try
            {
                var novaEmpresa = _mapper.Map<Empresa>(empresaCreateDTO);

                var empresaValidator = new EmpresaValidator();
                var validatorResult = empresaValidator.Validate(novaEmpresa);

                if (validatorResult.IsValid == false)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, validatorResult.Errors);
                }

                _empresaRepository.Adicionar(novaEmpresa);

                var novaEmpresaRead = _mapper.Map<EmpresaReadDTO>(novaEmpresa);

                return Created("Empresa criada com sucesso!", novaEmpresaRead);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }


        [HttpPut("{id}")]
        public ActionResult<EmpresaReadDTO> Put(int id, [FromBody] EmpresaUpdateDTO empresaUpdateDTO)
        {
            try
            {
                var empresa = _empresaRepository.ObterPorId(id);

                if (empresa == null)
                {
                    return NotFound("Nenhum registro encontrado no banco de dados.");
                }

                empresa = _mapper.Map(empresaUpdateDTO, empresa);

                var empresaValidator = new EmpresaValidator();
                var validatorResult = empresaValidator.Validate(empresa);

                if (validatorResult.IsValid == false)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, validatorResult.Errors);
                }

                _empresaRepository.Atualizar(empresa);

                var empresaAtualizadaRead = _mapper.Map<EmpresaReadDTO>(empresa);

                return Ok(new
                {
                    Mensagem = "Empresa atualizada com sucesso",
                    Empresa = empresaAtualizadaRead
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}

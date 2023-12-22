using System;
using Backend.Context;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Authorization;
using Backend.Service;
using Backend.DTO.Login;
using Backend.Repositories.Interfaces;
using Backend.DTO.Usuario;
using Backend.Validators;
using System.Net;
using System.ComponentModel.DataAnnotations;
using Backend.DTO.Log;

namespace Backend.Controllers;

[ApiController]
[Route("api/usuarios")]
public class UsuarioController : ControllerBase
{

    private readonly IMapper _mapper;
    private readonly LabSchoolContext _context;

    private readonly IUsuarioRepository _usuarioRepository;

    public UsuarioController(IUsuarioRepository usuarioRepository, IMapper mapper)
    {
        _mapper = mapper;
        _usuarioRepository = usuarioRepository;
    }


    // Endpoints
    [HttpGet]
    public ActionResult<IEnumerable<UsuarioReadDTO>> GetAll([Required] int empresaId, string? tipo, string? nome, string? telefone, string? cpf)
    {
        try
        {
            List<Usuario> retorno;

            retorno = _usuarioRepository.ObterTodos(empresaId, tipo, nome, telefone, cpf);

            if (retorno.Count() == 0)
            {
                return NotFound("Nenhum registro encontrado no banco de dados.");
            }

            var retornoDTO = _mapper.Map<List<UsuarioReadDTO>>(retorno);

            return Ok(retornoDTO);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpGet("/ListarUsuarios")]
    public IActionResult Show()
    {
        var user = _usuarioRepository.Listar();
        return Ok(user);
    }

    [HttpGet("{id}")]
    public ActionResult<UsuarioReadDTO> GetById(int id)
    {
        try
        {
            var retorno = _usuarioRepository.ObterPorId(id);

            if (retorno == null)
            {
                return NotFound("Nenhum registro encontrado no banco de dados.");
            }

            var retornoDTO = _mapper.Map<UsuarioReadDTO>(retorno);

            return Ok(retornoDTO);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpPost]
    public ActionResult<UsuarioReadDTO> Post([FromBody] UsuarioCreateDTO usuarioCreateDTO)
    {
        try
        {
            var novoUsuario = _mapper.Map<Usuario>(usuarioCreateDTO);

            var usuarioValidator = new UsuarioValidator();
            var validatorResult = usuarioValidator.Validate(novoUsuario);

            if (validatorResult.IsValid == false)
            {
                return StatusCode(StatusCodes.Status400BadRequest, validatorResult.Errors);
            }

            _usuarioRepository.Adicionar(novoUsuario);

            var novoUsuarioRead = _mapper.Map<UsuarioReadDTO>(novoUsuario);

            return Created("Usuario criado com sucesso!", novoUsuarioRead);

        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        try
        {
            var usuario = _usuarioRepository.ObterPorId(id);

            if (usuario == null)
            {
                return NotFound("Nenhum registro encontrado no banco de dados.");
            }

            _usuarioRepository.Delete(id);
            return StatusCode(204);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpPut("{id}")]
    public ActionResult<UsuarioReadDTO> Put(int id, [FromBody] UsuarioUpdateDTO usuarioUpdateDTO)
    {
        try
        {
            var usuario = _usuarioRepository.ObterPorId(id);

            if (usuario == null)
            {
                return NotFound("Nenhum registro encontrado no banco de dados.");
            }

            usuario = _mapper.Map(usuarioUpdateDTO, usuario);

            var usuarioValidator = new UsuarioValidator();
            var validatorResult = usuarioValidator.Validate(usuario);

            if (validatorResult.IsValid == false)
            {
                return StatusCode(StatusCodes.Status400BadRequest, validatorResult.Errors);
            }

            _usuarioRepository.Atualizar(usuario);
            var usuarioAtualizadoRead = _mapper.Map<UsuarioReadDTO>(usuario);
            return Ok(new
            {
                Mensagem = "Usuario atualizado com sucesso",
                Usuario = usuarioAtualizadoRead
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpPut("/resetar")]
    public ActionResult PutSenha([FromBody] ResetarSenhaDTO email)
    {
        try
        {
            var usuario = _usuarioRepository.ObterPorEmail(email.Email);

            if (usuario == null)
            {
                return Unauthorized("Nenhum registro encontrado no banco de dados.");
            }
                usuario.Senha = email.Senha;
            _usuarioRepository.ResetarSenha(usuario);

            return Ok("Senha resetada!");

        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpPost("/login")]
    public IActionResult signup([FromBody] LoginCreateDTO login)
    {
        var dados = _mapper.Map<Login>(login);
        var logado = _usuarioRepository.Logar(dados);

        if (logado == true)
        {
            var token = TokenService.GerarTokem(dados);
            return Ok(token);
        }
        else
            return BadRequest("e-mail e/ou senha incorretos. entrada negada!");
    }
}


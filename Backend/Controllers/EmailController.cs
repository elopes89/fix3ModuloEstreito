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


[Route("api/email")]
[ApiController]
public class EmailController : ControllerBase
{

    private readonly IMalService _mailService;
    public EmailController(IMalService mailService)
    {
        _mailService = mailService;
    }

[HttpPost]
public IActionResult SendEMail([FromBody] SendEmailViewModel email){
    // _mailService.SendMail(email.Emails, email.Subject, email.Body, email.isHtml);
    _mailService.SendMail(email.Emails, email.Subject, email.Body, email.isHtml);

    return Ok();
}


}
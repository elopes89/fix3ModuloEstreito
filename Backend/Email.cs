using System;
using System.Text;
using System.Net.Mail;
using System.Net;


class Email
{
    static void Main(string[] args)
    {

        Console.WriteLine("Digite o Email do destinatário");
        string emailDestinatario = Console.ReadLine();

        Console.WriteLine("Digite o Título");
        string emailTitulo = Console.ReadLine();


        Console.WriteLine("Digite sua mensagem");
        string mensagemEmail = Console.ReadLine();


        Console.WriteLine("Digite sua senha:");
        string emailSenha = Console.ReadLine();


        Console.WriteLine("Aperte ENTER para enviar:");
        Console.ReadLine();


        try
        {
            MailMessage mailMessage = new MailMessage("emanuel_lopes1@estudante.sesisenai.org", emailDestinatario);
            mailMessage.Subject = $"{emailTitulo}";
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = $"<p> {mensagemEmail} </p>";
            mailMessage.SubjectEncoding = Encoding.GetEncoding("UTF-8");
            mailMessage.BodyEncoding = Encoding.GetEncoding("UTF-8");

            SmtpClient smtpClient = new SmtpClient("smt.gmail.com", 587);

            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("", "");
            smtpClient.EnableSsl = true;

            smtpClient.Send(mailMessage);

            Console.WriteLine("Houve êxito na sua tentativa");
            Console.ReadLine();
        }
        catch (Exception)
        {
            Console.WriteLine("Houve um erro na sua tentativa");
            Console.ReadLine();
        }
    }
}
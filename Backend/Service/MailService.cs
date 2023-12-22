
using System.Net;
using System.Net.Mail;

namespace Backend.Service;

public class MailService : IMalService
{

    private string smtpAddress => "smtp.gmail.com";
    private int portNumber => 587;

    private string emailFromAddress => "emanuel_lopes1@estudante.sesisenai.org.br";
    private string password => "$Anavrin000";

    public void AddEmailToMailMessage(MailMessage mailMessage, string[] emails)
    {

        foreach (var email in emails)
        {
            mailMessage.To.Add(email);
        }
    }

    public void SendMail(string[] emails, string subject, string body, bool isHtml = false)
    {
        using (MailMessage mailMessage = new MailMessage())
        {
            mailMessage.From = new MailAddress(emailFromAddress);
            AddEmailToMailMessage(mailMessage, emails);
            mailMessage.Subject = subject;
            mailMessage.Body = body;
            mailMessage.IsBodyHtml = isHtml;
            using(SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
            {
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(emailFromAddress, password);
                smtp.Send(mailMessage);
            }


        }
    }
}

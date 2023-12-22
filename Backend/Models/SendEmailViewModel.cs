namespace Backend.Models;


public class SendEmailViewModel {
    public string[] Emails {get; set;}
    public string Subject {get; set;}
    public string Body { get; set; }
    public bool isHtml { get; set; }
}
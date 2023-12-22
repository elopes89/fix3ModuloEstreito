
namespace Backend.Service;
public interface IMalService{

     void SendMail(string[] emails, string subject, string body, bool isHtml = false){}

}
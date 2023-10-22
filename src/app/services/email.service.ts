import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  public sendSupportEmail(senderName:any, senderMessage: any){
    emailjs.init('QMqS3JWJkw_d8BIhW')
    let response = emailjs.send("service_1lpoy4r", "template_60thg0f",{
      to_name: senderName,
      reply_to: senderMessage,
    });

    alert('Solicitud enviada')
  }

}

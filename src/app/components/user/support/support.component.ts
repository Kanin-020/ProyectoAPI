import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionGuard } from 'src/app/guards/session.guard';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  providers: [SessionGuard, EmailService]
})
export class SupportComponent implements OnInit {

  sendRequest: any;
  formItem!: FormGroup;

  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.formItem = new FormGroup({
      validatedSendRequest: new FormControl(this.sendRequest, Validators.required),
    });
  }

  /**
   * Realiza la llamada al servicio de correo para enviar una petición.
   */
  callMailService(){
    this.emailService.sendSupportEmail("NombreEjemplo", this.sendRequest);
  }
}

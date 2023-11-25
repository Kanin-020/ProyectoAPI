import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionGuard } from 'src/app/guards/session.guard';
import { EmailService } from 'src/app/services/email/email.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  providers: [SessionGuard, EmailService],
})
export class SupportComponent implements OnInit {
  sendRequest: string = '';
  form!: FormGroup;

  constructor(private emailService: EmailService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      sendRequest: [this.sendRequest, Validators.required],
    });
  }

  /**
   * Realiza la llamada al servicio de correo para enviar una petición.
   */
  callMailService() {
    if (this.form.valid) {
      this.emailService.sendSupportEmail('NombreEjemplo', this.sendRequest);
    }
  }
}

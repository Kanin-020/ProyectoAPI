import { Component, OnInit, } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';
import { UserService } from 'src/app/services/api/user.service';
import * as QRCode from 'qrcode';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SessionGuard]
})
export class LoginComponent implements OnInit {

  imgSrc: string = '';

  secretKey: string = '';

  popupVisualization: string = 'none';

  userData: any = {};
  qrData: any = {};

  formItem!: FormGroup;
  qrItem!: FormGroup;

  invalidSessionCounter: number = 0;
  blockedFormFlag: boolean = false;
  QRCode = QRCode;

  constructor(private router: Router, private userService: UserService) { }

  /**
   * Elimina las llaves de acceso al iniciar.
   */
  ngOnInit() {

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');

    this.formItem = new FormGroup({
      email: new FormControl(this.userData.email, Validators.required),
      password: new FormControl(this.userData.password, Validators.required),
    });

    this.qrItem = new FormGroup({
      key: new FormControl(this.qrData.key, Validators.required)
    });



  }

  /**
   * Función de login.
   * 123 = Iniciar sesión como usuario.
   * 456 = Iniciar sesión como administrador.
   */
  async login() {

    const { email, password } = this.userData;

    this.userService.login(email, password).subscribe(
      async (response: any) => {

        if (response.ok == true) {

          const role = response.role;
          const userId = response.userId;
          const token = response.token;

          localStorage.setItem('userId', userId);
          localStorage.setItem('role', role);
          localStorage.setItem('token', token);

          this.showQRPopup();

          this.invalidSessionCounter = 0;

        } else if (response.ok == false) {

          this.invalidSessionCounter++;

        }

        this.setBlockedFormFlag();

      }

    );

  }

  async startSession(role: string) {
    if (role == 'trabajador') {
      this.router.navigate(['/user-landpage']);

    } else if (role == 'administrador') {
      this.router.navigate(['/admin-landpage']);
    }
  }

  setBlockedFormFlag() {

    if (this.invalidSessionCounter != 3) {
      this.blockedFormFlag = false;
    }

    if (this.invalidSessionCounter == 3) {
      this.restartForm();
    }

  }

  async restartForm() {

    alert("Esperar 5s para volver a intentar");

    this.blockedFormFlag = true;
    this.invalidSessionCounter = 0;

    setTimeout(() => this.enableForm(), 5000);

    await new Promise(resolve => setTimeout(resolve, 5000));

  }

  enableForm() {
    this.blockedFormFlag = false;
  }



  showQRPopup() {

    this.generateQR();
    this.popupVisualization = 'flex';
  }

  generateQR() {

    const key = this.generateQRKey();

    this.secretKey = key;

    this.QRCode.toDataURL(key, (error: any, url: any) => {
      if (error) {
        console.error(error);
      } else {
        this.imgSrc = url;
      }
    });

  }

  generateQRKey() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const length = 4;
    let word = '';

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * alphabet.length);
      word += alphabet.charAt(index);
    }

    return word;
  }

  validateSecretKey() {

    const { key } = this.qrData;

    if (key == this.secretKey) {
      const role = localStorage.getItem('role') || '';
      this.startSession(role);
    } else {
      this.generateQR();
    }

  }

}

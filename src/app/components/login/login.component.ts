import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';
import { UserService } from 'src/app/services/api/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SessionGuard]
})
export class LoginComponent implements OnInit {

  userData: any = {};
  formItem!: FormGroup;

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

  }

  /**
   * Función de login.
   * 123 = Iniciar sesión como usuario.
   * 456 = Iniciar sesión como administrador.
   */
  login() {

    const { email, password } = this.userData;

    this.userService.login(email, password).subscribe(
      (response: any) => {

        localStorage.setItem('userId', response.userId);
        localStorage.setItem('role', response.role);
        localStorage.setItem('token', response.token);

        if (response.role == 'trabajador') {
          this.router.navigate(['/user-landpage']);

        } else if (response.role == 'administrador') {
          this.router.navigate(['/admin-landpage']);
        }

      }
    );

  }

}

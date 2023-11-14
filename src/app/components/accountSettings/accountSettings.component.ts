import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-accountSettings',
  templateUrl: './accountSettings.component.html',
  styleUrls: ['./accountSettings.component.scss'],
})
export class AccountSettingsComponent {
  userId: number = parseInt(localStorage.getItem('userId')!);

  userData: User = {
    userId: 0,
    name: '',
    email: '',
    oldPassword: '',
    password: '',
    role: '',
  };

  form!: FormGroup;
  passwordMismatchError: boolean = false;

  constructor(private UserService: UserService, private fb: FormBuilder) {}

  async ngOnInit() {
    this.UserService.getUserById(this.userId).subscribe(
      async (response: any) => {
        const userData = await response.user;

        this.userData.userId = userData.userId;
        this.userData.name = userData.name;
        this.userData.email = userData.email;
        this.userData.role = userData.role;
      }
    );

    this.form = this.fb.group({
      userId: [
        { value: this.userData.userId, disabled: true },
        Validators.required,
      ],
      name: [
        this.userData.name,
        [Validators.required, Validators.minLength(2)],
      ],
      email: [this.userData.email, [Validators.required, Validators.email]],
      oldPassword: [this.userData.oldPassword, Validators.required],
      password: [
        this.userData.password,
        [
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/),
        ],
      ],
    });
  }

  /**
   * Revisa si la contraseña es correcta y envía los cambios al servicio correspondiente.
   */
  editAccountData() {
    const { userId, name, email, password, role } = this.userData;

    this.UserService.getUserById(this.userId).subscribe(
      async (response: any) => {
        const userData = await response.user;

        const actualPassword = userData.password;

        if (this.userData.oldPassword == actualPassword) {
          if (this.userData.password != '') {
            this.UserService.editUser(
              userId,
              name,
              email,
              password,
              role
            ).subscribe(async (response: any) => {
              alert(response.response || response.error);
              this.passwordMismatchError = false;
            });
          } else {
            this.UserService.editUser(
              userId,
              name,
              email,
              actualPassword,
              role
            ).subscribe(async (response: any) => {
              alert(response.response || response.error);
              this.passwordMismatchError = false;
            });
          }
        } else {
          this.passwordMismatchError = true;
        }
      }
    );
  }

  /**
   * Envía un mensaje al servicio correspondiente.
   */
  deleteAccount() {
    this.UserService.deleteUser(this.userId).subscribe(
      async (response: any) => {
        alert(response.response || response.error);
      }
    );
  }
}

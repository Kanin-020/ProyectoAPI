import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-accountSettings',
  templateUrl: './accountSettings.component.html',
  styleUrls: ['./accountSettings.component.scss']
})
export class AccountSettingsComponent {

  userId: number = parseInt(localStorage.getItem('userId')!);

  userData: User = {
    userId: 0,
    name: '',
    email: '',
    password: '',
    oldPassword: '',
    role: '',
  };

  formItem!: FormGroup;

  constructor(private UserService: UserService) { }

  async ngOnInit() {

    this.UserService.getUserById(this.userId).subscribe(async (response: any) => {

      const userData = await response.user;

      this.userData.userId = userData.userId;
      this.userData.name = userData.name;
      this.userData.email = userData.email;
      this.userData.oldPassword = userData.password;
      this.userData.password = userData.password;
      this.userData.role = userData.role;

    });


    this.formItem = new FormGroup({
      userId: new FormControl(this.userData.userId),
      name: new FormControl(this.userData.name, Validators.required),
      email: new FormControl(this.userData.email, Validators.required),
      oldPassword: new FormControl(this.userData.oldPassword, Validators.required),
      password: new FormControl(this.userData.password),
    });

  }

  editAccountData() {

    const { userId, name, email, password, role } = this.userData;

    this.UserService.editUser(userId, name, email, password, role).subscribe(async (response: any) => {
      alert(response.response || response.error);
    });
  }

  deleteAccount() {
    this.UserService.deleteUser(this.userId).subscribe(async (response: any) => {
      alert(response.response || response.error);
    });
  }

}

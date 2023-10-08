import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData: any = {};
  formItem!: FormGroup;


  constructor() { }

  ngOnInit() {
    this.formItem = new FormGroup({
      username: new FormControl(this.userData.username, Validators.required),
      password: new FormControl(this.userData.password, Validators.required),
    });


  }

  login() {
    const { username, password } = this.userData;
    // this.userService.login(username, password).subscribe(
    //   (response: any) => {

    //     localStorage.setItem('token', response.token.token);
    //     localStorage.setItem('secretKey', response.token.secretKey);

    //     this.router.navigate(['/menu']);
    //   }
    // );
  }

}

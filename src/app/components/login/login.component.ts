import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SessionGuard]
})
export class LoginComponent implements OnInit {

  userData: any = {};
  formItem!: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {

    localStorage.removeItem('token');
    localStorage.removeItem('secretKey');
    localStorage.removeItem('role');

    this.formItem = new FormGroup({
      username: new FormControl(this.userData.username, Validators.required),
      password: new FormControl(this.userData.password, Validators.required),
    });

  }

  login() {
    const { username, password } = this.userData;

    //*Mock login
    if (username && password == 123) {
      localStorage.setItem('token', 'token');
      localStorage.setItem('secretKey', 'secretKey');
      localStorage.setItem('role', 'admin');
    }

    if (username && password == 456) {
      localStorage.setItem('token', 'token');
      localStorage.setItem('secretKey', 'secretKey');
      localStorage.setItem('role', 'user');
    }


    if (localStorage.getItem('role') == 'user') {
      this.router.navigate(['user-landpage']);
    } else if (localStorage.getItem('role') == 'admin') {
      this.router.navigate(['admin-landpage']);
    }

    //TODO Real component
    // this.userService.login(username, password).subscribe(
    //   (response: any) => {

    //     localStorage.setItem('token', response.token.token);
    //     localStorage.setItem('secretKey', response.token.secretKey);

    //     this.router.navigate(['/menu']);
    //   }
    // );
  }

}

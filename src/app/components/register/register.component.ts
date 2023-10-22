import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userData: any = {};
  formItem!: FormGroup;


  constructor() { }

  /**
   * Generación del formulario.
   */
  ngOnInit() {
    this.formItem = new FormGroup({
      email: new FormControl(this.userData.email, [Validators.required, Validators.email]),
      username: new FormControl(this.userData.username, Validators.required),
      password: new FormControl(this.userData.password, Validators.required),
    });

  }

  register(){

  }

}

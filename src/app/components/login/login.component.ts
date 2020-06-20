import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = 'Incorrect Login Details';
  controls     = {
    emailOrPhone: new FormControl(null, [Validators.required]),
    password    : new FormControl(null, [Validators.required])
  };

  form = new FormGroup(this.controls);
  loading: boolean;

  constructor(private adminService: AdminService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {

    if (this.form.invalid) {
      return;
    }

    const data = this.form.value;

    this.adminService.login(data)
      .subscribe(res => {
        localStorage.setItem('auth_token', res.token);
        this.router.navigate(['/dashboard']);
      }, error1 => {
        alert(this.errorMessage);
      });
  }

}

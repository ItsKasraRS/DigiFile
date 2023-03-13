import { RegisterDTO } from './../../DTOs/Account/registerDTO';
import { AccountService } from './../../services/account/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: FormGroup = null;
  isSuccess: boolean = false;
  usernamePattern = '^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$';
  constructor(private account: AccountService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.user = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.minLength(5)]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(16), Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.minLength(8)]),
      rePassword: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.minLength(8)])
    })
    this.user.setValidators(this.comparisonValidator());
  }

  comparisonValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const password = this.user.controls['password'];
      const rePassword = this.user.controls['rePassword'];
      if (password.value !== rePassword.value) {
        rePassword.setErrors({ passwordNotMatch: true });
      } else {
        rePassword.setErrors(null);
      }
      return null;
    }
  };
  register() {
    if (this.user.invalid) {
      this.user.markAllAsTouched();
    }
    else {
      const model = new RegisterDTO(this.user.controls.username.value, this.user.controls.mobile.value, this.user.controls.email.value, this.user.controls.password.value, this.user.controls.rePassword.value);
      this.account.register(model).subscribe(res => {
        if (res.status = "success") {
          this.user.reset();
          this.toastr.success(res.message, 'Success');
          this.route.navigate(['/']);
          
        }
      }, error => {
        if(error.error.status = "Invalid") {
          this.toastr.error(error.error.message, 'Error');
        }
        else if(error.error.status = "Email exists") {
          this.toastr.error(error.error.message, 'Error');
        }
        else if(error.error.status = "Mobile exists") {
          this.toastr.error(error.error.message, "Error");
        }
      });
    }
  }
}

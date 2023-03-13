import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordDTO } from 'src/app/DTOs/Account/UserPanelDTO';
import { AccountService } from 'src/app/services/account/account.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userData: FormGroup;
  constructor(private api: AccountService, private toast: ToastrService, private router: Router) { 
    this.userData = new FormGroup({
      currentPassword: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      newPassword: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      confirmNewPassword: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
    });
    this.userData.setValidators(this.comparisonValidator());
  }

  comparisonValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const password = this.userData.controls['newPassword'];
      const rePassword = this.userData.controls['confirmNewPassword'];
      if (password.value !== rePassword.value) {
        rePassword.setErrors({ passwordNotMatch: true });
      } else {
        rePassword.setErrors(null);
      }
      return null;
    }
  };

  ngOnInit() {
  }

  changePassword() {
    if(this.userData.valid) {
      const model = new ChangePasswordDTO(this.userData.controls.currentPassword.value, this.userData.controls.newPassword.value);
      this.api.changePassword(model).subscribe(res=> {
        if(res.status === 'Success') {
          this.toast.success('Password successfully changed!');
          this.router.navigate(['/user/dashboard']);
        }
        if(res.status === 'Error') {
          this.toast.error('Current password is wrong');
        }
      })
    }
  }
}

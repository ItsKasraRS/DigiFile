import { UserCreds, UserData } from './../../DTOs/Account/UserCreds';
import { AccountService } from './../../services/account/account.service';
import { LoginDTO } from './../../DTOs/Account/loginDTO';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cred: FormGroup = null;
  constructor(private dialogRef: MatDialogRef<LoginComponent>, private router: Router, private toastr: ToastrService, private dialog: MatDialog, private api: AccountService) { }

  ngOnInit(): void {
    this.cred = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.minLength(8)]),
      isRemember: new FormControl(null)
    })
  }
  CloseDialog(): void {
    this.dialogRef.close();
  }
  login() {
    if (this.cred.valid) {
      const model = new LoginDTO(this.cred.controls.email.value, this.cred.controls.password.value, this.cred.controls.isRemember.value)

      this.api.login(model).subscribe(res => {
        if (res.status === "Success") {
          localStorage.setItem("token", res.token);
          this.api.setAuth(true);
          this.router.navigate(['/']);
          this.toastr.success('you are successfully logged in', '');
          this.CloseDialog();
        }
        else if (res.status === "Deactivated") {
          this.toastr.error(res.description, 'Error');
        }
        else if (res.status === "NotFound") {
          this.toastr.error(res.description, 'Error');
        }
      });
    }
    else {
      this.cred.markAllAsTouched();
    }
  }
}

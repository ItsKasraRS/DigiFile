import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { EditProfileDTO } from 'src/app/DTOs/Account/UserCreds';
import { AccountService } from 'src/app/services/account/account.service';

const helper = new JwtHelperService();

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  token = localStorage.getItem('token');
  userData: FormGroup;
  email;
  constructor(private accountService: AccountService, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    const decodedToken = helper.decodeToken(this.token);
    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']

    this.accountService.getSidebarInfo(userId).subscribe(user => {
      this.email = user.data.email;
      this.userData = new FormGroup({
        userName: new FormControl(user.data.username, [Validators.required, Validators.maxLength(200)]),
        phoneNumber: new FormControl(user.data.mobile, [Validators.required]),
        imageAvatar: new FormControl(user.data.image),
        selectedImage: new FormControl(null),
      })
    });

    this.userData = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      phoneNumber: new FormControl(null, [Validators.required]),
      imageAvatar: new FormControl(null),
      selectedImage: new FormControl(null),
    })
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = <File>event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userData.patchValue({
          selectedImage: event.target.files[0]
        });
      };
    }
  }

  editProfile() {
    if(this.userData.valid) {
      let formData = new FormData();
      formData.append('username', this.userData.controls.userName.value);
      formData.append('mobile', this.userData.controls.phoneNumber.value);
      formData.append('imageAvatar', this.userData.controls.imageAvatar.value);
      formData.append('selectedImage', this.userData.controls.selectedImage.value);

      const user = new EditProfileDTO(this.userData.controls.userName.value, this.userData.controls.phoneNumber.value, this.userData.controls.imageAvatar.value, this.userData.controls.selectedImage.value);
      this.accountService.editProfile(formData).subscribe(res=> {
        this.toast.success('User information has been changed successfully');
        this.router.navigate(['/user/dashboard']);
      })
    }
  }
}

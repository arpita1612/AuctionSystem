import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/providers/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fgLogin: FormGroup; showError: string = ''; hide = true;
  constructor(private fb: FormBuilder, private cs: CommonService, private router: Router) {
    this.fgLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  submit() {
    this.cs.loginUser(this.fgLogin.value).subscribe((res: any) => {
      if (res.length != 0) {
        if (res.role == 'auctioner') {
          if (res.isVerified === "true" || res.isVerified === true) {
            this.cs.alert('Success', 'Login Successful!');
            this.router.navigate(['/user/auctioner']);
            localStorage.setItem('userData', JSON.stringify(res));
          } else {
            this.showError = 'Sorry, You are not varified user.Please contact to admin';
            this.cs.alert('Error', this.showError);
          }
        } else if (res.role == 'bidder') {
          this.cs.alert('Success', 'Login Successful!');
          this.router.navigateByUrl('/user/biddar');
          localStorage.setItem('userData', JSON.stringify(res));
        } else {
          this.cs.alert('Success', 'Login Successful!');
          this.router.navigateByUrl('/admin');
          localStorage.setItem('userData', JSON.stringify(res));
        }
        localStorage.setItem('key', res._id);
        localStorage.setItem('role', res.role);
      } else {
        this.showError = 'Login Failed!';
        this.cs.alert('Error', 'Invalid login details!');
      }
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  isUsing2FA = false;
  errorMessage = '';
  qrCodeImage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log("sign up success ");
        console.log(data);
        if(data.using2FA){
        	this.isUsing2FA = true;
        	this.qrCodeImage = data.qrCodeImage;
          console.log("sign up success with 2fa");
        }
	      this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        console.log("sign up failed ");
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }



}

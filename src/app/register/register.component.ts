import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';


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
  // Autres propriétés existantes...
  passwordVisible: boolean = false;
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }



  // Autres méthodes existantes...

   // Méthode pour basculer la visibilité du mot de passe
   togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log("sign up success ");
        Swal.fire('Success', 'acoount activated successfully', 'success');
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
        console.error('Error activation account :', err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }



}

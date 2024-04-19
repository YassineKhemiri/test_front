import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

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
    this.authService.findUserByEmailAndCin(this.form).subscribe(
      data => {
        console.log("user found with success ");
        Swal.fire('Success', 'email sent successfully', 'success');
        console.log(data);
	      this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        console.log("user not found ");
        console.error('verification failed :', err);
        Swal.fire('Error', 'verification failed', 'error');
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}

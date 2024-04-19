import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
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
    // Initialize the form group
    this.registerForm = new FormGroup({
      num: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cin: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      matchingPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      using2FA: new FormControl(false)
    });
  }



  // Autres méthodes existantes...

   // Méthode pour basculer la visibilité du mot de passe
   togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
<<<<<<< HEAD
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        data => {
          console.log("sign up success");
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          if (data.using2FA) {
            this.isUsing2FA = true;
            this.qrCodeImage = data.qrCodeImage;
            console.log("sign up success with 2fa");
          }
        },
        err => {
          console.log("sign up failed");
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          if (err.error.message.includes('num adherent non existant')) {
            alert("Num adhérent non existant"); // Show an alert dialog
          }
        }
      );
    } else {
      this.registerForm.markAllAsTouched(); // Ensure all fields are touched to show errors
    }
=======
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
>>>>>>> 07aec3e4f09434ca36af325b8152e8ff55dbe588
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../confirmPwd/confirmPwd';




@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {



  user:any={};
  form !: FormGroup;
  //form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  // Ajoutez une variable pour suivre l'état de visibilité du mot de passe
passwordVisible: boolean = false;


  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      num: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required] // Ajout de confirmPassword avec Validators.required
    }, {
      validator: MustMatch('password', 'confirmPassword') // Utilisation de MustMatch
    });
  }



ngOnInit(): void {
}



   // Méthode pour basculer la visibilité du mot de passe
   togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

onSubmit(): void {
  this.authService.changePassword(this.user).subscribe(
    data => {
      console.log("password chnaged with success ");
      Swal.fire('Success', 'password changed successfully', 'success');
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      this.router.navigate(['/login']);

    },
    err => {
      console.log("change password failed ");
      Swal.fire('Error', 'change password failed', 'error');
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    }
  );
}

	
}




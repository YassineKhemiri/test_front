import { Component } from '@angular/core';
import { AppConstants } from '../common/app.constants';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
	const token: string = this.route.snapshot.queryParamMap.get('token')!;
	const error: string = this.route.snapshot.queryParamMap.get('error')!;
  	if (this.tokenStorage.getUser()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
  	else if(token){
  		this.tokenStorage.saveToken(token);
  		this.userService.getCurrentUser().subscribe(
  		      data => {
  		        this.login(data);
  		      },
  		      err => {
              console.log("error here ")
  		        this.errorMessage = err.error.message;
  		        this.isLoginFailed = true;
  		      }
  		  );
  	}
  	else if(error){
  		this.errorMessage = error;
	    this.isLoginFailed = true;
  	}
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        if(data.authenticated){
	        this.login(data.user);
        } else {
        	this.router.navigate(['/totp']);
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  login(user:any): void {
	this.tokenStorage.saveUser(user);
	this.isLoginFailed = false;
	this.isLoggedIn = true;
	this.currentUser = this.tokenStorage.getUser();
    window.location.reload();
  }
}

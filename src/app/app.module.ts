import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { TotpComponent } from './totp/totp.component';
import { TokenComponent } from './register/token.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule , HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    TotpComponent,
    TokenComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

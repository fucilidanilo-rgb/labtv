import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginData = { email: '', password: '' };

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: () => {
        alert('Login successo!');
        this.router.navigate(['/']); // Torna alla home dopo il login
      },
      error: () => alert('Email o password errati!')
    });
  }
}
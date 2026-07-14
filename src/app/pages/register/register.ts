import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerData = {
    name: '',
    email: '',
    password: ''
  };

  onSubmit() {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        alert('Registrazione completata!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Errore durante la registrazione');
      }
    });
  }
}
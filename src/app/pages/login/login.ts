
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  inject
} from '@angular/core';

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
export class LoginComponent implements OnDestroy {

  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  loginData = {
    email: '',
    password: ''
  };

  loading = false;

  // NOTIFICHE TOAST
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'success';
  toastVisible = false;

  private toastTimer?: ReturnType<typeof setTimeout>;
  private navigationTimer?: ReturnType<typeof setTimeout>;

  // MOSTRA NOTIFICA
  showToast(
    message: string,
    type: 'success' | 'error' | 'info' = 'success'
  ): void {

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;

    this.cdr.detectChanges();

    this.toastTimer = setTimeout(() => {
      this.closeToast();
    }, 4000);
  }

  // CHIUDE NOTIFICA
  closeToast(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
      this.toastTimer = undefined;
    }

    this.toastVisible = false;
    this.cdr.detectChanges();
  }

  // LOGIN
  onSubmit(): void {

    if (this.loading) {
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.authService.login(this.loginData).subscribe({

      next: () => {
        this.loading = false;

        this.showToast(
          'Login effettuato con successo! 🎬',
          'success'
        );

        // Mostra il toast prima di tornare alla Home
        this.navigationTimer = setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },

      error: (err) => {
        console.error('Errore login:', err);

        this.loading = false;

        if (err.status === 401 || err.status === 403) {
          this.showToast(
            'Email o password non corretti.',
            'error'
          );
        } else {
          this.showToast(
            'Impossibile collegarsi al server. Riprova tra poco.',
            'error'
          );
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    if (this.navigationTimer) {
      clearTimeout(this.navigationTimer);
    }
  }
}

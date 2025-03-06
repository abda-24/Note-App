import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSService } from '../../Shared/Services/auth-s.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly _AuthSService = inject(AuthSService);
  isLoading: boolean = false;
  errMsg: string = '';

  loginForm: FormGroup = this.fb.group({
    email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
    password: [
      null,
      [
        RxwebValidators.required(),
        RxwebValidators.pattern({ expression: { pattern: /^\w{6,}$/ } }),
      ],
    ],
  });

  LoginFromValue(): void {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Form Invalid',
        text: 'Please fill in all required fields correctly.',
      });
      return;
    }

    this.isLoading = true;

    this._AuthSService.setLoginFrom(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        localStorage.setItem('token', res.token);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          timer: 2000, // Auto-close after 2 seconds
          showConfirmButton: false,
        }).then(() => {
          this._AuthSService.sharedUserData();
          this.router.navigate(['/home']);
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.message || 'An error occurred during login. Please try again.',
        });
      },
    });
  }


 
}

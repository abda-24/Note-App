import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Shared/environment/enviroment';
import { AuthSService } from '../../Shared/Services/auth-s.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading: boolean = false;
  errMsg:string = '';

  private readonly _AuthSService = inject(AuthSService);
  private readonly Fb = inject(FormBuilder);
  private readonly router = inject(Router);

  RegisterFrom:FormGroup = this.Fb.group({

    name: [
      null,
      [
        RxwebValidators.required(),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 50 }),
      ],
    ],
    email: [

      null,
       [RxwebValidators.required(), RxwebValidators.email()]
      ],
    password: [
      null,
      [
        RxwebValidators.required(),
        RxwebValidators.pattern({ expression: { pattern: /^\w{6,}$/ } }),
      ],
    ],
    rePassword: [
      null,
      [
        RxwebValidators.required(),
        RxwebValidators.compare({ fieldName: 'password' }),
      ],
    ],
    phone: [
      null,
      [
        RxwebValidators.required(),
        RxwebValidators.pattern({
          expression: { pattern: /^01[0125][0-9]{8}$/ },
        }),
      ],
    ],
    age:[null,
      RxwebValidators.required(),

    ]

  })

  SubmitRegister(): void {
    console.log(this.RegisterFrom.value);
    this.isLoading = true;

    this._AuthSService.SetRegisterFrom(this.RegisterFrom.value).subscribe({
      next: (res) => {
        console.log(res);
        this.RegisterFrom.reset();
        this.isLoading = false;
        this.router.navigate(['/login']);

        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'Your registration was successful.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.RegisterFrom.reset();
        this.errMsg = err.error.msg;

        // Show error alert
        Swal.fire({
          title: 'Error!',
          text: this.errMsg || 'An unexpected error occurred.',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        // Mark all form controls as touched if the form exists
        if (this.RegisterFrom) {
          this.RegisterFrom.markAllAsTouched();
        }
      }
    });
  }


}


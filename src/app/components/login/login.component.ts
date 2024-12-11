import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, AngularMaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;

    this._userService.login(credentials).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Login Exitoso',
          text: 'Bienvenido al sistema.',
        });

        this._authService.setToken(response.accessToken)

        this._router.navigate(['/listado']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al Iniciar Sesión',
          text: 'Usuario o contraseña incorrectos. Intenta nuevamente.',
        });
      },
    });
  }

  irARegistro() {
    this._router.navigate(['/registro']);
  }
}

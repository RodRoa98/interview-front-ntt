import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { noBlankSpacesValidator } from '../../validators/no-blank-spaces.validator';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule, AngularMaterialModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  registroForm: FormGroup;
  submitted = false;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {
    this.registroForm = this._formBuilder.group({
      name: ['', Validators.required, noBlankSpacesValidator()],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]
      ],
      phone: ['', [Validators.pattern(/^[0-9]{9}$/)]],
    });
  }

  get f() {
    return this.registroForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.registroForm.invalid) {
      return;
    }

    const user = this.registroForm.value;

    this._userService.registrarUsuario(user).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Usuario registrado correctamente.',
        });

        this._router.navigate(['/login']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al Registrar',
          text: 'Hubo un problema al registrar al usuario. Intenta nuevamente.',
        });
      },
    });
  }

  irALogin() {
    this._router.navigate(['/login']);
  }
}

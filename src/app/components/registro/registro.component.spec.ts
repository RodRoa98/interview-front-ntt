import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let userService: UserService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistroComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule, 
        RouterTestingModule
      ],
      providers: [
        UserService, 
        AuthService
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('Validar la creación del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Validar la creación de formulario', () => {
    expect(component.registroForm).toBeTruthy();
    expect(component.registroForm.controls['email']).toBeTruthy();
    expect(component.registroForm.controls['name']).toBeTruthy();
    expect(component.registroForm.controls['phone']).toBeTruthy();
    expect(component.registroForm.controls['password']).toBeTruthy();
  });

  it('Validar que no intente registrar usuario cuando el formulario es inválido', () => {
    spyOn(userService, 'registrarUsuario');
    
    component.registroForm.setValue({
      email: '',
      password: '',
      name: '',
      phone: '',
    });
  
    component.onSubmit();
  
    expect(userService.registrarUsuario).not.toHaveBeenCalled();
  });

  it('Validar consumo de API registro exitosa', () => {
    spyOn(userService, 'registrarUsuario').and.returnValue(of({ email: "roasgo3@hotmail.com", name: "Gonzalo", phone: "950347255" }));
    spyOn(router, 'navigate');

    component.registroForm.controls['email'].setValue('roasgo3@hotmail.com');
    component.registroForm.controls['password'].setValue('NttData756');
    component.registroForm.controls['name'].setValue('Rodrigo');
    component.registroForm.controls['phone'].setValue('987654321');

    component.onSubmit();
  
    expect(userService.registrarUsuario).toHaveBeenCalledWith({
      email: 'roasgo3@hotmail.com',
      password: 'NttData756',
      name: 'Rodrigo',
      phone: '987654321'
    });

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('Validar consumo de API registro incorrecta', () => {
    spyOn(userService, 'registrarUsuario').and.returnValue(throwError(() => new Error('Login failed')));
    spyOn(router, 'navigate');
    
    component.registroForm.setValue({
      email: '',
      password: '',
      name: '',
      phone: ''
    });
  
    component.onSubmit();
    
    expect(router.navigate).not.toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
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

    fixture = TestBed.createComponent(LoginComponent);
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
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.controls['email']).toBeTruthy();
    expect(component.loginForm.controls['password']).toBeTruthy();
  });

  it('Validar que no intente loguearse cuando el formulario es inválido', () => {
    spyOn(userService, 'login');
    
    component.loginForm.setValue({
      email: '',
      password: '',
    });
  
    component.onSubmit();
  
    expect(userService.login).not.toHaveBeenCalled();
  });
  
  it('Validar consumo de API login exitosa', () => {
    const mockResponse = {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    };

    spyOn(userService, 'login').and.returnValue(of(mockResponse));
    spyOn(authService, 'setToken');
    spyOn(router, 'navigate');
  
    component.loginForm.controls['email'].setValue('roasgo2@hotmail.com');
    component.loginForm.controls['password'].setValue('NttData756');

    component.onSubmit();
  
    expect(userService.login).toHaveBeenCalledWith({
      email: 'roasgo2@hotmail.com',
      password: 'NttData756',
    });
    expect(authService.setToken).toHaveBeenCalledWith(mockResponse.accessToken);
    expect(router.navigate).toHaveBeenCalledWith(['/listado']);
  });

  it('Validar consumo de API login incorrecta', () => {
    spyOn(userService, 'login').and.returnValue(throwError(() => new Error('Login failed')));
    spyOn(authService, 'setToken');
    spyOn(router, 'navigate');
    
    component.loginForm.setValue({
      email: 'test@example.com',
      password: '123456',
    });
  
    component.onSubmit();
    
    expect(authService.setToken).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
  
});

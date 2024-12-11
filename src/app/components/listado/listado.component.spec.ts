import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoComponent } from './listado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('ListadoComponent', () => {
  let component: ListadoComponent;
  let fixture: ComponentFixture<ListadoComponent>;
  let userService: UserService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListadoComponent,
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

    fixture = TestBed.createComponent(ListadoComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('Validar la creación del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Validar renderizar las columnas correctas', () => {
    component.displayedColumns = ['name', 'email', 'phone'];
    fixture.detectChanges();

    const tableHeaders = fixture.nativeElement.querySelectorAll('th');
    const headerTexts = Array.from(tableHeaders).map((th) =>
      (th as HTMLTableHeaderCellElement).textContent?.trim()
    );
    expect(headerTexts).toEqual(['Nombre', 'Correo', 'Teléfono']);
  });

  it('Validar cerrar sesión', () => {
    spyOn(authService, 'clearToken');
    spyOn(router, 'navigate');

    component.cerrarSesion();

    expect(authService.clearToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

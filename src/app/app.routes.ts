import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ListadoComponent } from './components/listado/listado.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'listado', component: ListadoComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/registro', pathMatch: 'full' },
    { path: '**', redirectTo: '/registro', pathMatch: 'full' },
];

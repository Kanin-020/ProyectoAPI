import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivityManagerComponent } from './components/admin/activityManager/activityManager.component';
import { LandpageComponent } from './components/admin/landpage/landpage.component';
import { UserManagerComponent } from './components/admin/userManager/userManager.component';
import { SupportComponent } from './components/user/support/support.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-activityManager', component: ActivityManagerComponent},
  { path: 'admin-landpage', component: LandpageComponent},
  { path: 'user-manager', component: UserManagerComponent},
  { path: 'support', component: SupportComponent},
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto para manejar rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

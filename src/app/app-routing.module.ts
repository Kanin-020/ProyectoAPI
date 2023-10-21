import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminLandpageComponent } from './components/admin/adminLandpage/adminLandpage.component';
import { ActivityCreatorComponent } from './components/admin/activityCreator/activityCreator.component';
import { ActivityModificatorComponent } from './components/admin/activityModificator/activityModificator.component';
import { ActivityManagerComponent } from './components/admin/activityManager/activityManager.component';
import { UserLandpageComponent } from './components/user/userLandpage/userLandpage.component';
import { UserManagerComponent } from './components/admin/userManager/userManager.component';
import { SupportComponent } from './components/user/support/support.component';
import { TaskManagerComponent } from './components/user/taskManager/taskManager.component';
import { AboutUsComponent } from './components/scrap/aboutUs/aboutUs.component';
import { UserLandpageComponent } from './components/user/userLandpage/userLandpage.component';
import { SessionGuard } from './guards/session.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-landpage', canActivate: [SessionGuard, RoleGuard], component: AdminLandpageComponent },
  { path: 'admin-activity-creator', component: ActivityCreatorComponent },
  { path: 'admin-activity-modificator', component: ActivityModificatorComponent },
  { path: 'admin-activity-manager', component: ActivityManagerComponent },
  { path: 'admin-activity-manager', canActivate: [SessionGuard, RoleGuard], component: ActivityManagerComponent },
  { path: 'admin-user-manager', canActivate: [SessionGuard, RoleGuard], component: UserManagerComponent },
  { path: 'user-landpage', canActivate: [SessionGuard, RoleGuard], component: UserLandpageComponent },
  { path: 'user-task-manager', canActivate: [SessionGuard, RoleGuard], component: TaskManagerComponent },
  { path: 'user-support', canActivate: [SessionGuard, RoleGuard], component: SupportComponent },
  { path: 'user-aboutUs', component: AboutUsComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto para manejar rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

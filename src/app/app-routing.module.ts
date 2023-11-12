import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountSettingsComponent } from './components/accountSettings/accountSettings.component';
import { AboutUsComponent } from './components/scrap/aboutUs/aboutUs.component';
import { AdminLandpageComponent } from './components/admin/adminLandpage/adminLandpage.component';
import { ProjectCreatorComponent } from './components/admin/projectCreator/projectCreator.component';
import { ProjectModifierComponent } from './components/admin/projectModifier/projectModifier.component';
import { TaskCreatorComponent } from './components/admin/taskCreator/taskCreator.component';
import { TaskModifierComponent } from './components/admin/taskModifier/taskModifier.component';
import { TaskManagerComponent } from './components/admin/taskManager/taskManager.component';
import { UserManagerComponent } from './components/admin/userManager/userManager.component';
import { UserLandpageComponent } from './components/user/userLandpage/userLandpage.component';
import { TaskArchiveComponent } from './components/user/taskArchive/taskArchive.component';
import { TaskDetailsComponent } from './components/user/taskDetails/taskDetails.component';
import { SupportComponent } from './components/user/support/support.component';
import { SessionGuard } from './guards/session.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account-settings', component: AccountSettingsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'admin-landpage', canActivate: [SessionGuard, RoleGuard], component: AdminLandpageComponent },
  { path: 'admin-project-creator', canActivate: [SessionGuard, RoleGuard], component: ProjectCreatorComponent },
  { path: 'admin-project-modifier/:projectId', canActivate: [SessionGuard, RoleGuard], component: ProjectModifierComponent },
  { path: 'admin-task-creator', canActivate: [SessionGuard, RoleGuard], component: TaskCreatorComponent },
  { path: 'admin-task-modifier', canActivate: [SessionGuard, RoleGuard], component: TaskModifierComponent },
  { path: 'admin-task-manager/:projectId', canActivate: [SessionGuard, RoleGuard], component: TaskManagerComponent },
  { path: 'admin-user-manager/:projectId', canActivate: [SessionGuard, RoleGuard], component: UserManagerComponent },
  { path: 'user-landpage', canActivate: [SessionGuard, RoleGuard], component: UserLandpageComponent },
  { path: 'user-task-details/:taskId', canActivate: [SessionGuard, RoleGuard], component: TaskDetailsComponent},
  { path: 'user-task-archive', canActivate: [SessionGuard, RoleGuard], component: TaskArchiveComponent},
  { path: 'user-support', canActivate: [SessionGuard, RoleGuard], component: SupportComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto para manejar rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

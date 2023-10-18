import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminLandpageComponent } from './components/admin/adminLandpage/adminLandpage.component';
import { ActivityManagerComponent } from './components/admin/activityManager/activityManager.component';
import { UserManagerComponent } from './components/admin/userManager/userManager.component';
import { TaskManagerComponent } from './components/user/taskManager/taskManager.component';
import { SupportComponent } from './components/user/support/support.component';
import { UserLandpageComponent } from './components/user/userLandpage/userLandpage.component';
import { TaskItemComponent } from './partials/task-item/task-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-landpage', component: AdminLandpageComponent },
  { path: 'admin-activity-manager', component: ActivityManagerComponent },
  { path: 'admin-user-manager', component: UserManagerComponent },
  { path: 'user-landpage', component: UserLandpageComponent },
  { path: 'user-task-manager', component: TaskManagerComponent },
  { path: 'user-support', component: SupportComponent },
  { path: 'task-item', component: TaskItemComponent},
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto para manejar rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

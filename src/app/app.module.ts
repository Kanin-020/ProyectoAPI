import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { TaskArchiveComponent } from './components/user/taskArchive/taskArchive.component';
import { UserManagerComponent } from './components/admin/userManager/userManager.component';
import { UserLandpageComponent } from './components/user/userLandpage/userLandpage.component';
import { SupportComponent } from './components/user/support/support.component';
import { TaskDetailsComponent } from './components/user/taskDetails/taskDetails.component';
import { TaskItemComponent } from './partials/taskItem/taskItem.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { SessionGuard } from './guards/session.guard';
import { RoleGuard } from './guards/role.guard';
import { ProjectItemComponent } from './partials/projectItem/projectItem.component';

import { EmailService } from './services/email.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountSettingsComponent,
    AboutUsComponent,
    AdminLandpageComponent,
    ProjectCreatorComponent,
    ProjectModifierComponent,
    TaskCreatorComponent,
    TaskModifierComponent,
    TaskManagerComponent,
    UserManagerComponent,
    UserLandpageComponent,
    TaskArchiveComponent,
    TaskDetailsComponent,
    SupportComponent,
    HeaderComponent,
    FooterComponent,
    TaskItemComponent,
    ProjectItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [SessionGuard, RoleGuard, EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }

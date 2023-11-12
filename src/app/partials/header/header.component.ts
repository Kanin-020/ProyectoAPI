import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [SessionGuard]
})
export class HeaderComponent implements OnInit {

  userRole: string | null = localStorage.getItem('role');

  actualRoute: string = '';

  adminRouteFlag: boolean = false;

  projectId: number = 0;

  constructor(private sessionGuard: SessionGuard, private router: Router, private route: ActivatedRoute) {
    /**
     * Obtiene la bandera de rol para mostrar el contenido adecuado en el header.
    */
    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {

        this.userRole = localStorage.getItem('role');

        this.actualRoute =  this.router.url;

        if ((this.actualRoute == '/admin-landpage' && this.userRole == 'administrador') || this.actualRoute == '/account-settings') {

          this.adminRouteFlag = true;

        } else {

          this.adminRouteFlag = false;

          this.getProjectId(this.actualRoute);
        }

      }
    });
  }

  ngOnInit() {

  }

  closeSession() {
    this.sessionGuard.logout();
  }

  getProjectId(actualRoute: string) {

    let match = actualRoute.match(/\d+$/);

    if (match) {
      this.projectId = parseInt(match[0]);
    } else {
      this.projectId = 0;
    }

  }

  navigateProjectModifier(){
    const projectId = this.projectId;
    this.router.navigate(['/admin-project-modifier', projectId]);
  }

  navigateTaskManger(){
    const projectId = this.projectId;
    this.router.navigate(['/admin-task-manager', projectId]);
  }

  navigateUserManger(){
    const projectId = this.projectId;
    this.router.navigate(['/admin-user-manager', projectId]);
  }

}

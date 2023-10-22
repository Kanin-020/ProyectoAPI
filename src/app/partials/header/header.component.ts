import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [SessionGuard]
})
export class HeaderComponent implements OnInit {

  userRole = localStorage.getItem('role');

  constructor(private sessionGuard: SessionGuard, private router: Router) {
    /**
     * Obtiene la bandera de rol para mostrar el contenido adecuado en el header.
     */
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {

        this.userRole = localStorage.getItem('role');
        console.log(this.userRole);
      }
    });
  }

  ngOnInit() {

  }

  closeSession() {
    this.sessionGuard.logout();
  }



}

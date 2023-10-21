import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// Define un tipo para las rutas permitidas por rol
type AllowedRoutes = {
    [key: string]: string[];
};

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const userRole = localStorage.getItem('role');

        // Define las rutas permitidas para cada rol
        const allowedRoutesByRole: AllowedRoutes = {
            'admin': ['admin-landpage', 'admin-activity-manager', 'admin-user-manager'],
            'user': ['user-landpage', 'user-task-manager', 'user-support'],
        };

        // Verifica si el rol actual tiene acceso a la ruta actual
        if (userRole && allowedRoutesByRole[userRole]?.includes(route.routeConfig?.path as string)) {
            return true;
        } else {
            alert('Ruta inaccesible');
            this.router.navigate(['/login']);
            return false;
        }
    }
}

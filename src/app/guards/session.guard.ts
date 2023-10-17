import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        // Verifica la sesión del usuario aquí
        const token = localStorage.getItem('token');

        if (token) {

            console.log('Autenticado');
            return true;
        } else {
            // No hay un token en el localStorage, el usuario no está autenticado
            alert('No hay una sesión válida');
            this.router.navigate(['/login']);
            return false;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}

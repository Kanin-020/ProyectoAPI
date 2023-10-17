import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        // Verifica la sesión del usuario aquí
        const token = localStorage.getItem('token');

        if (token) {
            // Token presente en el localStorage
            console.log('Autenticado');
            return true; // Permite el acceso a la ruta
        } else {
            // No hay un token en el localStorage, el usuario no está autenticado
            alert('No hay una sesión válida');
            this.router.navigate(['/login']); // Redirecciona a la página de inicio de sesión
            return false; // Bloquea el acceso a la ruta
        }
    }

    logout(): void {
        // Agrega una función para cerrar sesión que elimine el token del localStorage
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}

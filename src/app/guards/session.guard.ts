import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private router: Router) { }

    /**
     *
     * @returns false
     */
    canActivate(): boolean {
        // Verifica la sesión del usuario aquí
        const token = localStorage.getItem('token');
        let isValid;

        if (token) {
            console.log('Autenticado');
            isValid = true;
        } else {
            // No hay un token en el localStorage, el usuario no está autenticado
            alert('No hay una sesión válida');
            this.router.navigate(['/login']);
            isValid = false;
        }
        return isValid;
    }

    /**
     * Cierra le sesión y borra las llaves almacenadas.
     */
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('secretKey');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');

        this.router.navigate(['/login']);
    }

}

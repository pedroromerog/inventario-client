// src/app/guards/auth.guard.ts
import { AuthService } from '@/pages/auth/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.me().pipe(
        map(() => true), // si responde OK -> autenticado
        catchError(() => {
            router.navigate(['/auth/login']);
            return of(false);
        }),
    );
};

import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;

    constructor(private http: HttpClient) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        console.log('🚀>>> ~ req.url:', req.url);
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (
                    error.status === 401 &&
                    !this.isRefreshing &&
                    !req.url.endsWith('/auth/login')
                ) {
                    this.isRefreshing = true;

                    return this.http
                        .post(
                            `${environment.api}/auth/refresh`,
                            {},
                            { withCredentials: true },
                        )
                        .pipe(
                            switchMap(() => {
                                this.isRefreshing = false;
                                // reintenta la petición original
                                return next.handle(req);
                            }),
                            catchError((err) => {
                                this.isRefreshing = false;
                                return throwError(() => err);
                            }),
                        );
                }

                return throwError(() => error);
            }),
        );
    }
}

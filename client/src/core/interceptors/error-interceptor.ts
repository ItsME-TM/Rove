import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast-service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  return next(req).pipe(
    catchError(error => {
      if(error){
        switch (error.status){
          case 400:
            toast.error(error.error || 'Bad Request');
            break;
          case 401:
            toast.error('Unauthorized');
            router.navigate(['/login']);
            break;
          case 404:
            toast.error('Not Found');
            break;
          case 500:
            toast.error('Internal Server Error');
            break;
          default:
            toast.error('An error occurred');
            break;
        }
      }
      throw error;
    })
  )
};

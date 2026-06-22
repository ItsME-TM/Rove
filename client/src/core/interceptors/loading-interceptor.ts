import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { inject } from '@angular/core/primitives/di';
import { delay } from 'rxjs/internal/operators/delay';
import { finalize } from 'rxjs/internal/operators/finalize';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';

const cache = new Map<string, HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);
  if(req.method === 'GET'){
    const cachedResponse = cache.get(req.urlWithParams);
    if(cachedResponse){
      return of(cachedResponse);
    }
  }
  busyService.busy();
  return next(req).pipe(
    delay(500),
    tap(response => {
      cache.set(req.url, response);
    }),
    finalize(() => {
      busyService.idle();
    }),
  );
};

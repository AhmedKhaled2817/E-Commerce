import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { errorInterceptor } from './error.interceptor';
import { ToastService } from '../services/toast.service';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let toastService: any;

  beforeEach(() => {
    const toastSpy = {
      error: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: ToastService, useValue: toastSpy },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call toastService.error on 404 error', () => {
    httpClient.get('/test').subscribe({
      error: (err) => {
        expect(err.message).toBe('Not Found: Resource does not exist');
      },
    });

    const req = httpTestingController.expectOne('/test');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });

    expect(toastService.error).toHaveBeenCalledWith('Not Found: Resource does not exist');
  });

  it('should call toastService.error on 500 error', () => {
    httpClient.get('/test').subscribe({
      error: (err) => {
        expect(err.message).toBe('Internal Server Error: Please try again later');
      },
    });

    const req = httpTestingController.expectOne('/test');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

    expect(toastService.error).toHaveBeenCalledWith(
      'Internal Server Error: Please try again later',
    );
  });
});

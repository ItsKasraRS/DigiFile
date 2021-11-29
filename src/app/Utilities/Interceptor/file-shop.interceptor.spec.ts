import { TestBed } from '@angular/core/testing';

import { FileShopInterceptor } from './file-shop.interceptor';

describe('FileShopInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FileShopInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FileShopInterceptor = TestBed.inject(FileShopInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

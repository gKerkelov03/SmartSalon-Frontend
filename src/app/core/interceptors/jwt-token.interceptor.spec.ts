import { TestBed } from '@angular/core/testing';

import { JwtTokenInterceptor } from './jwt-token.interceptor';

describe('TokenInterceptor', () => {
	let service: JwtTokenInterceptor;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(JwtTokenInterceptor);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

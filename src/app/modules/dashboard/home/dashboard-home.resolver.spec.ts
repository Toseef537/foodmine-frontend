import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { dashboardHomeResolver } from './dashboard-home.resolver';
import { IFood } from 'src/app/shared/models/food';

describe('dashboardHomeResolver', () => {
  const executeResolver: ResolveFn<IFood[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => dashboardHomeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

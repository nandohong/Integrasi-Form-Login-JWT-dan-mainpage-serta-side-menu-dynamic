import { TestBed } from '@angular/core/testing';
import { Telephone } from './telephone';

describe('Telephone', () => {
  let service: Telephone;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Telephone);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ListShipsService } from './list-ships.service';

describe('ListShipsService', () => {
  let service: ListShipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListShipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListShipsService } from './list-ships.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('ListShipsService', () => {
  let service: ListShipsService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,​​​​​MatDialogModule],

    });
    service = TestBed.inject(ListShipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRequestsComponent } from './list-of-requests.component';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ListOfRequestsComponent', () => {
  let component: ListOfRequestsComponent;
  let fixture: ComponentFixture<ListOfRequestsComponent>;

  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfRequestsComponent],
      providers: [
        provideToastr(), 
        provideHttpClient()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfRequestsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show list of requests', () => {
    component.requests = [
      { id: 1, currency: 'USD', name: 'John', date: new Date(), value: 100 },
      { id: 2, currency: 'EUR', name: 'Jane', date: new Date(), value: 200 }
    ];
    fixture.detectChanges();

    const listOfRquests = de.queryAll(By.css('.table-name'));
    
    expect(listOfRquests.length).toBe(2);
  });
});

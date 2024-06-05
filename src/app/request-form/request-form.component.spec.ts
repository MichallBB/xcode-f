import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormComponent } from './request-form.component';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RequestService } from '../service/request.service';
import { of } from 'rxjs';

describe('RequestFormComponent', () => {
  let component: RequestFormComponent;
  let fixture: ComponentFixture<RequestFormComponent>;
  let de: DebugElement;
  let requestServiceSpy: jasmine.SpyObj<RequestService>;

  beforeEach(async () => {
    requestServiceSpy = jasmine.createSpyObj('RequestService', ['getCurrencyValue']);
    await TestBed.configureTestingModule({
      imports: [RequestFormComponent],
      providers: [
        FormBuilder,
        provideToastr(), 
        provideHttpClient(), 
        provideAnimationsAsync(),
        { provide: RequestService, useValue: requestServiceSpy }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestFormComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    requestServiceSpy = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should call onSubmit on submitting form', () => {
    spyOn(component, 'onSubmit');

    const value = 43;
    requestServiceSpy.getCurrencyValue.and.returnValue(of(value)); 

    const form = de.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
  });

});

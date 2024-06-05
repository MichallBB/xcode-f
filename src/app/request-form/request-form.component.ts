import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss'
})
export class RequestFormComponent {
  toastr = inject(ToastrService);
  requestService = inject(RequestService);

  value!: number;
  currencyCodeName!: string;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    currencyCode: new FormControl('', Validators.required)
  });

  
  onSubmit() {
    if (this.form.valid) {
      const currencyCode = this.form.value.currencyCode || '';
      const name = this.form.value.name || '';

      this.requestService.getCurrencyValue(currencyCode, name).subscribe({
        next: (currency: any) => {
          this.value = currency;
          this.currencyCodeName = `${this.form.value.currencyCode}`;
          this.requestService.formSubmitted.next();
        },
        error: (error) => {
          if (error.status === 404) {
            this.toastr.warning('Podaj prawidłowy kod waluty');
          } else if (error.status === 500) {
            this.toastr.error('Błąd z połączeniem', 'Błąd');
          }
        }
      });
    }
  }
}

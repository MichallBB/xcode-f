import { Component, LOCALE_ID, inject } from '@angular/core';
import { RequestService } from '../service/request.service';
import { RequestModel } from '../models/request.model';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-of-requests',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './list-of-requests.component.html',
  styleUrl: './list-of-requests.component.scss'
})
export class ListOfRequestsComponent {

  requestService = inject(RequestService);
  requests: RequestModel[] = [];

  ngOnInit(): void {
    this.refreshRequests();
    this.requestService.formSubmitted.subscribe(() => {
      setTimeout(() => {
        this.refreshRequests();
      }, 700);
    });
  }

  refreshRequests(): void {
    console.log('refreshRequests');
    this.requestService.getRequests().subscribe({
      next: (requests: any) => {
        this.requests = requests;
      }
    });
  }
}

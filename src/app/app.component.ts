import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ListOfRequestsComponent } from './list-of-requests/list-of-requests.component';
import { RequestFormComponent } from './request-form/request-form.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListOfRequestsComponent, RequestFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'xcode';
}

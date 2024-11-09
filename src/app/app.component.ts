import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'spending-tracker';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTestMessage().subscribe(data => {
      console.log(data);
    });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HubConnectionService } from '../../services/hub-connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  readonly hubService = inject(HubConnectionService);
  totalUsers$: Observable<number>;

  ngOnInit(): void {
    this.totalUsers$ = this.hubService.totalUsers$.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HubConnectionService {
  private hubUrl = 'https://localhost:7150/connect4';
  connection: HubConnection;
  totalUsers$: Subject<number>;
  public async initiateSignalrConnection(): Promise<void>{
    try{
      this.connection = new HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .withAutomaticReconnect()
      .build();

      this.setSignalrClientMethods();
      await this.connection.start();
    } catch(error){
      console.log(error);
    }
  }

  private setSignalrClientMethods(){
    this.setTotalUsers();
  }

  private setTotalUsers(){
    this.totalUsers$ = new Subject<number>();
    this.connection.on('ReceiveTotalUsers', totalUsers => this.totalUsers$.next(totalUsers));
  }
}

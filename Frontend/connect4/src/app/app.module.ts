import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { Connect4LocalComponent } from './components/connect4-local/connect4-local.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { HubConnectionService } from './services/hub-connection.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Connect4LocalComponent,
    GameOverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    HubConnectionService,
    {
      provide: APP_INITIALIZER,
      useFactory: (hubService: HubConnectionService) => () => hubService.initiateSignalrConnection(),
      deps: [HubConnectionService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss'
})
export class GameOverComponent {
  @Input() gameOver: boolean;
  @Input() draw: boolean;
  @Input() local: boolean;

}

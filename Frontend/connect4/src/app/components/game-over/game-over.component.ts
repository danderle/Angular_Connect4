import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerEnum } from '../../enums/player-enum';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss'
})
export class GameOverComponent {
  @Input() gameOver: boolean;
  @Input() draw: boolean;
  @Input() local: boolean;
  @Input() winner = PlayerEnum.Player1;
  @Output() playAgain = new EventEmitter();
}

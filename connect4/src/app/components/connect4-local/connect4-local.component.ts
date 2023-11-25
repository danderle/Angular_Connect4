import { Component } from '@angular/core';

@Component({
  selector: 'app-connect4-local',
  templateUrl: './connect4-local.component.html',
  styleUrl: './connect4-local.component.scss'
})
export class Connect4LocalComponent {
  chipArray = new Array(42).fill('player2');
  gameOver = false;
  draw = true;
}

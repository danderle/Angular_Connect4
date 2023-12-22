import { Component } from '@angular/core';
import { GameModel } from '../../models/game-model';
import { ChipModel } from '../../models/chip-model';
import { ChipTypeEnum } from '../../enums/chip-type-enum';
import { PlayerEnum } from '../../enums/player-enum';

@Component({
  selector: 'app-connect4-local',
  templateUrl: './connect4-local.component.html',
  styleUrl: './connect4-local.component.scss'
})
export class Connect4LocalComponent {
  game = new GameModel();

  get currentPlayer(){
    return this.game.currentPlayer;
  }

  get chipArray(){
    return this.game.chipArray;
  }

  get draw(){
    return this.game.draw;
  }

  get gameOver(){
    return this.game.gameOver;
  }

  drop(chip: ChipModel){
    this.game.drop(chip);
  }

  restart(){
    this.game = new GameModel();
  }

  isNotWinningChip(chip: ChipModel, index: number){
    if(!this.gameOver || chip.type === ChipTypeEnum.Empty){
      return false;
    }

    if(this.currentPlayer === PlayerEnum.Player1 && chip.type === ChipTypeEnum.Player2){
      return true;
    }

    if(this.currentPlayer === PlayerEnum.Player2 && chip.type === ChipTypeEnum.Player1){
      return true;
    }

    return !this.game.winningChipsArray.some(chipIndex => chipIndex === index);
  }
}

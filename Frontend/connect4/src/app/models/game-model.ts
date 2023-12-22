import { ChipTypeEnum } from "../enums/chip-type-enum";
import { PlayerEnum } from "../enums/player-enum";
import { ChipModel } from "./chip-model";

export class GameModel {
    private maxCol = 7;
    private maxRow = 6;
    private connect4Win = 4;
    currentPlayer = PlayerEnum.Player1;
    chipArray = new Array<ChipModel>();
    winningChipsArray = new Array<number>();
    gameOver = false;
    draw = false;

    constructor(){
        let index = 0;
        for(index; index < this.maxCol * this.maxRow; index++){
            const chip = new ChipModel(index % this.maxCol);
            this.chipArray.push(chip);
        }
    }

    drop(chip: ChipModel){
        const col = chip.column;
        const lastEmptyRow = this.findLastEmptyRow(col, this.maxRow - 1);
        if(lastEmptyRow === -1){
            return;
        }

        this.setPlayerMove(col, lastEmptyRow);
        this.gameOver = this.checkForWinner(col, lastEmptyRow);
        if(this.gameOver){
            return;
        }
        this.draw = this.checkForDraw();
        if(this.draw){
            return;
        }

        this.switchPlayer();
    }

    private checkForWinner(col: number, row: number){
        return this.checkRow(row) ||
        this.checkColumn(col) ||
        this.checkDiagonalUp(col, row) ||
        this.checkDiagonalDown(col, row);
    }

    private checkRow(row: number){
        let col = 0;
        let winCount = 0;
        for(col; col < this.maxCol; col++){
            const index = this.calcChipArrayIndex(col, row);
            const chipType = this.getChipType(index);
            if(chipType === this.getPlayerChipType()){
                winCount++;
                this.winningChipsArray.push(index);
                if(winCount === this.connect4Win){
                    return true;
                }
            } else {
                winCount = 0;
                this.winningChipsArray = [];
            }
        }
        return winCount === this.connect4Win;
    }
    
    private checkColumn(col: number){
        let row = 0;
        let winCount = 0;
        for(row; row < this.maxRow; row++){
            const index = this.calcChipArrayIndex(col, row);
            const chipType = this.getChipType(index);
            if(chipType === this.getPlayerChipType()){
                winCount++;
                this.winningChipsArray.push(index);
                if(winCount === this.connect4Win){
                    return true;
                }
            } else {
                winCount = 0;
                this.winningChipsArray = [];
            }
        }
        
        return winCount === this.connect4Win;
    }

    private checkDiagonalUp(col: number, row: number){
        let minCol = col;
        let maxRow = row;
        let winCount = 0;
        while(minCol > 0 && maxRow < this.maxRow - 1){
            minCol--;
            maxRow++;
        }

        while(minCol < this.maxCol && maxRow >= 0){
            const index = this.calcChipArrayIndex(minCol, maxRow);
            const chipType = this.getChipType(index);
            if(chipType === this.getPlayerChipType()){
                winCount++;
                this.winningChipsArray.push(index);
                if(winCount === this.connect4Win){
                    return true;
                }
            } else {
                winCount = 0;
                this.winningChipsArray = [];
            }
            minCol++;
            maxRow--;
        }
        
        return winCount === this.connect4Win;
    }


    private checkDiagonalDown(col: number, row: number){
        let minCol = col;
        let maxRow = row;
        let winCount = 0;
        while(minCol < this.maxCol - 1 && maxRow < this.maxRow - 1){
            minCol++;
            maxRow++;
        }

        while(minCol >= 0 && maxRow >= 0){
            const index = this.calcChipArrayIndex(minCol, maxRow);
            const chipType = this.getChipType(index);
            if(chipType === this.getPlayerChipType()){
                winCount++;
                this.winningChipsArray.push(index);
                if(winCount === this.connect4Win){
                    return true;
                }
            } else {
                winCount = 0;
                this.winningChipsArray = [];
            }
            minCol--;
            maxRow--;
        }
        
        return winCount === this.connect4Win;
    }

    private setPlayerMove(col: number, row: number){
        const arrayIndex = this.calcChipArrayIndex(col, row);
        this.setPlayerChipType(arrayIndex);
    }

    private checkForDraw(){
        return !this.chipArray.some(chip => chip.type === ChipTypeEnum.Empty);
    }

    private switchPlayer(){
        if(this.currentPlayer === PlayerEnum.Player1){
            this.currentPlayer = PlayerEnum.Player2;
        } else {
            this.currentPlayer = PlayerEnum.Player1;
        }
    }

    private getPlayerChipType(){
        if(this.currentPlayer === PlayerEnum.Player1){
            return ChipTypeEnum.Player1;
        } 

        return ChipTypeEnum.Player2;
    }

    private setPlayerChipType(index: number){
        if(this.currentPlayer === PlayerEnum.Player1){
            this.chipArray[index].type = ChipTypeEnum.Player1;
        } else {
            this.chipArray[index].type = ChipTypeEnum.Player2;
        }
    }

    private findLastEmptyRow(col: number, row: number): number{
        const arrayIndex = this.calcChipArrayIndex(col, row);
        const chipType = this.getChipType(arrayIndex);
        if(chipType === ChipTypeEnum.Empty){
            return row;
        }

        if(row === 0){
            return -1;
        }

        return this.findLastEmptyRow(col, row - 1);
    }

    private getChipType(index: number){
        return this.chipArray[index].type;
    }

    private calcChipArrayIndex(col: number, row: number){
        return col + (row * this.maxCol);
    }
}

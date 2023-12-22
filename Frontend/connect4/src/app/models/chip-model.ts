import { ChipTypeEnum } from "../enums/chip-type-enum";

export class ChipModel {
    type = ChipTypeEnum.Empty;

    get column(){
        return this._colIndex;
    }
    constructor(private _colIndex: number){}
}

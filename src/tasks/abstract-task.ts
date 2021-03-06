import {Board, BoardChanges} from "../board";

export abstract class AbstractTask {
    abstract readonly name;
    constructor(protected board: Board) {

    }

    abstract onNextTurn(boardChanges: BoardChanges);

    abstract getTaskPriority(): number;

    abstract doMove(): boolean;
}

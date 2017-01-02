import {AbstractKnowledgeSource} from "./abstract-knowledge-source";
import {BoardChanges, Board} from "../board";
import {Target, PriorityMap, DistanceTarget} from "../priority-map";
import {PointHelpers, Point} from "../tile";


export class GeneralDistanceKnowledgeSource extends AbstractKnowledgeSource {

    private generalLocation: Point;
    private priorityMap: PriorityMap;
    private target: DistanceTarget;


    constructor(board: Board) {
        super(board);
        this.priorityMap = new PriorityMap(this.board);
    }

    onNextTurn(boardChanges: BoardChanges) {
        if(!this.generalLocation) {
            this.generalLocation = this.board.getMyGeneralLocation();
            this.target = new DistanceTarget(this.generalLocation);
            this.priorityMap.addTarget(this.target);
            console.log('addGeneral', this.generalLocation);
        }

        for(let pNum in boardChanges.mapChanges) {
            let p = this.board.toPoint(+pNum);
            let tp = this.board.getTileProperties(p);
            if(tp.isCity) {
                this.target.priorityMap.clear();
                this.priorityMap.computeMap();
            }
        }
        //this.board.debug.displayPriorityMap(this.board, this.priorityMap);
    }

    getGeneralDistance(point: Point): number {
        let prio = this.priorityMap.getPriorityIn(point);

        return prio === 0 ? Infinity : prio;
    }
}



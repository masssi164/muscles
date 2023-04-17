import ServerCommunication from "./ServerCommunication";
import { Card } from "./stacks.types";

export type System ={
  name:string,
  cards:Card[]
  isArtificial:boolean
}

export type PlayerType =System & {
  index: number;
  informationsOfLastPlay?:string[] | string,
  currentPlayer?:boolean
  finished:boolean
}

export type User =PlayerType & {
    settings:string[]
}


export type Props ={
    player: PlayerType | User,
    communication: ServerCommunication;
    drawCard: (index: number) => void;
    playCard: (index: number, card: string) => void;
    starterCards: () => void;
    indexOfCurrentPlayer:number
}
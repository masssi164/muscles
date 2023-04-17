import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Player } from "./Player";
import { Props, PlayerType, User } from "./player.interfaces";
import ServerCommunication from "./ServerCommunication";
import { ModuleKind } from "typescript";
import FinishedDialog from "./FinishedDialog";

const mockProps: Props = {
    player: {
      name: "Test Player",
      finished:false,
      cards: [],
      index: 0,
      settings:[],
      isArtificial:false
    } as User,
    communication: {} as ServerCommunication,
    drawCard: jest.fn(),
    playCard: jest.fn(),
    starterCards: jest.fn(),
    indexOfCurrentPlayer:0
  };
const userPropsWithCards:Props ={...mockProps, player:{...mockProps.player,cards:["card_1","card_2","card_3"]}}
  
describe("User",() => {
    it("renders start button and calls starterCards on click", () => {
        const { getByTestId } = render(<Player {...mockProps} />);
    
        const startButton = getByTestId("start-button");
        fireEvent.click(startButton);
    
        expect(mockProps.starterCards).toHaveBeenCalled();
      });

      it("renders card select and calls playCard on click", () => {
        const { getByTestId } = render(<Player {...userPropsWithCards} />);
    
        const cardSelect = getByTestId("card-select");
        fireEvent.change(cardSelect, { target: { value: "card_2" } });
    
        const playButton = getByTestId("play-button");
        fireEvent.click(playButton);
    
        expect(userPropsWithCards.playCard).toHaveBeenCalledWith(0, "card_2");
      });

      it("is finishedDialog rendered after finished =true",() => {
        let customProps =mockProps
        customProps.player.finished =true
        const {findByLabelText} =render(<Player {...customProps} />)
        expect(findByLabelText("FinishDialog")).toBeInTheDocument()
      })
      

  /* 
      it("renders draw button and calls drawCard on click", () => {
        const { getByTestId } = render(<Player {...userPropsWithCards} />);
        const cardSelect = getByTestId("card-select");
        fireEvent.change(cardSelect, { target: { value: "card_2" } });
    
        const drawButton = getByTestId("draw-button");
        fireEvent.click(drawButton);
        expect(userPropsWithCards.drawCard).toHaveBeenCalledWith(0);
     });*/
   
})
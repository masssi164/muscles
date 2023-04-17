import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Player } from "./Player";
import { Props, PlayerType, User } from "./player.interfaces";
import ServerCommunication from "./ServerCommunication";

// Mock props for Player component
const mockProps: Props = {
  player: {
    name: "Test Player",
    cards: ["Card 1", "Card 2", "Card 3"],
    index: 0,
    isArtificial:true,
    finished:false
  } as PlayerType,
  communication: {} as ServerCommunication,
  drawCard: jest.fn(),
  playCard: jest.fn(),
  starterCards: jest.fn(),
  indexOfCurrentPlayer:0
};

// Test Player component
describe("Player", () => {
  it("renders player name and card count correctly", () => {
    const { getByTestId, queryByText } = render(<Player {...mockProps} />);

    const playerName = getByTestId("player-name");
    expect(playerName).toHaveTextContent("Test Player");

    const cardCount = getByTestId("number-of-cards");
    expect(cardCount).toHaveTextContent("Noch 3 Karten auf der Hand");

    expect(queryByText("Warte auf deine Karten...")).toBeNull();
  });
})

  
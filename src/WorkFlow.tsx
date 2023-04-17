import React, {useEffect, useState } from "react";
import ServerCommunication, { MuscleComparisonResult } from "./ServerCommunication";
import {Player} from "./Player";
import { PlayerType, System } from "./player.interfaces";
import { DrawStack, Card, DiscardStack } from "./stacks.types";
import Report, { addEntryToReport } from "./report.types";
import NameDialog from "./NameDialog";
import { PlayReport } from "./PlayReport";
import DiscardStackComponent from "./DisCardStackComponent";
import { playFlipSound, playPoundingSound, playShuffleAndCardFlipSound } from "./SoundPlayer";


type GameMode = "singleplayer" | "multiplayer";

interface props {
    mode:GameMode
}

export const WorkFlow: React.FC<props> = ({ mode }) => {
    const [currentRound, setCurrentRound] = useState<number>(0);
    
    const [playReport, setPlayReport] = useState<Report>({ entries:[]})
    const apiUrl:string =process.env.REACT_APP_API_URL
    const apiPort:number =process.env.REACT_APP_API_PORT
    const communication:ServerCommunication = new ServerCommunication(apiUrl,apiPort)
  const [system, setSystem] = useState<System>({
    name:"System",
    cards:[],
    isArtificial:true,
  })

  const putStarterCard =() => {
    let newSystem =system
    const card =system.cards.pop()
    if(card) {
      setPlayReport(addEntryToReport(playReport,{
        action:"play",
        explanation:"Die Starterkarte",
        isCorrect:true,
        playerName:system.name
      }))
      discardStack.put(card)
      setSystem(newSystem)
    }
  }
  

  const [players, setPlayers] = useState<PlayerType[]>(() => {
    switch (mode) {
      case "singleplayer":
        return [
          {
            name: "User",
            index: 0,
            cards: [],
            settings:[],
            isArtificial:false,
            finished:false
          },
          {
            name: "Computer",
            index: 1,
            cards: [],
            isArtificial:true,
            finished:false
          },
        ];
      default:
        return [];
    }
  });

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const increasePlayerIndex = () => {
    // Erhöhen des Index um 1
    const newIndex = currentPlayerIndex + 1;
    
    // Wenn der neue Index den maximalen Index der Spieler übersteigt,
    // wird er auf 0 zurückgesetzt, um von vorne zu beginnen
    if (newIndex >= players.length) {
      setCurrentPlayerIndex(0);
      setCurrentRound(currentRound+1)
    } else {
      setCurrentPlayerIndex(newIndex);
    }
  };
  

    // Initialisierung des Draw-Stacks mit useState
    const [drawStack, setDrawStack] = useState<DrawStack>({
      cards: [],
      shuffle: (cards:Card[]) => {
        for (let i = cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
      },
      draw: () => {
        let newStack:DrawStack =drawStack
        const drawnCard:Card | undefined =newStack.cards.pop()
        setDrawStack(newStack)
        return drawnCard
      }
    });
  
    // Funktion zum Kartenziehen aus dem Draw-Stack
    const handleDrawCard = (playerIndex:number) => {
      const drawnCard = drawStack.draw();
      if (drawnCard) {
        // Karte wurde gezogen, hier kannst du die Karte verwenden
        console.log("Gezogene Karte:", drawnCard);
        const newPlayers =players
        const newPlayer = newPlayers[playerIndex]
        newPlayer.cards.push(drawnCard); // Update the cards of the newPlayer with the drawnCard
        newPlayers[playerIndex] = newPlayer; // Update the player at playerIndex in the newPlayers array
        setPlayers(newPlayers)
        setPlayReport(addEntryToReport(playReport,{
          action:"draw",
          explanation:"Karte gezogen",
          playerName:newPlayer.name,
          isCorrect:null
        }))
        increasePlayerIndex()
      } else {
        // Draw-Stack ist leer, hier kannst du eine entsprechende Aktion durchführen
        let shuffledCards:string[] =drawStack.shuffle(discardStack.cards)
        let emptyDisCardStack:DiscardStack =discardStack
        emptyDisCardStack.cards =[]
        setDiscardStack(emptyDisCardStack)
        let newDrawStack:DrawStack =drawStack
        newDrawStack.cards =shuffledCards
        setDrawStack(newDrawStack)
        handleDrawCard(playerIndex)
      }
      playFlipSound()
    };

    const [discardStack, setDiscardStack] = useState<DiscardStack>({
      cards: [], // Initialer leerer Stapel
      put: (card: Card) => {
        // Logic für das Ablegen der Karte auf den DiscardStack
        // ...
        setDiscardStack(prevStack => {
          const newStack ={...prevStack}
          newStack.cards.push(card)
          return newStack
        }); // Update des DiscardStacks mit dem neuen Zustand
      }
    });
  
    // Define die handlePut Funktion
    const handlePut = async (playerIndex:number,card: Card) => {
      await communication.compareTwoCards(card,discardStack.cards[discardStack.cards.length-1],(data,error) => {
        if(error) {
          alert(error.message)
        }
        try {
          if (data) {
            const righties: MuscleComparisonResult[] = data.filter(muscle => muscle.isEqual);
            if (righties.length > 0) {
              const newStack = { ...discardStack };
              newStack.cards.push(card);
              setDiscardStack(newStack);
      
              const newPlayers = [...players];
              const currentPlayer = { ...newPlayers[playerIndex] };
              const indexToRemove: number = currentPlayer.cards.indexOf(card);
              currentPlayer.cards = currentPlayer.cards.filter((card, i) => i !== indexToRemove);
              if (currentPlayer.cards.length < 1) {
                alert("finished")
                currentPlayer.finished = true;
              }
              newPlayers[playerIndex] = currentPlayer;
              setPlayReport(addEntryToReport(playReport, {
                action: "play",
                explanation: righties.map(muscle => muscle.explanation).join(";"),
                isCorrect: true,
                playerName: currentPlayer.name
              }));
      
              setPlayers(newPlayers);
              increasePlayerIndex();
            } else {
              const newPlayers = [...players];
              const currentPlayer = { ...newPlayers[playerIndex] };
              setPlayReport(addEntryToReport(playReport, {
                isCorrect: false,
                playerName: currentPlayer.name,
                explanation: `weder Fixpunkte noch Gelenke sind gleich ebenso wenig wie die Innervation von ${card} und ${discardStack.cards[discardStack.cards.length - 1]}`,
                action: "play"
              }));
              newPlayers[playerIndex] = currentPlayer;
              setPlayers(newPlayers);
              increasePlayerIndex();
            }
          }
        } catch(error) {
          if(error instanceof Error) {
            alert(error.message)
          }
        }
      })
      playPoundingSound()
    };
    
  
  function starterCards() {
    // Implementieren Sie hier die Verteilung der Startkarten
    switch (mode) {
      case "singleplayer":
        if(drawStack.cards.length >0) {
          putStarterCard()
          let newPlayers = [...players];
          let i = 0;
          const iterableCards:string[] =drawStack.shuffle(drawStack.cards)
          while (i < 8) {
            if (i < 4) {
              newPlayers[0].cards.push(iterableCards[i]);
            } else {
              newPlayers[1].cards.push(iterableCards[i]);
            }
            i++;
          }
          setPlayers(newPlayers);
          playShuffleAndCardFlipSound()
        }
          break;
      default:
        break;
    }
  }

  useEffect(() => {
    if(drawStack.cards.length ===0) {
      try {
        communication.getAllCards(cards => {
          const randomIndex: number = Math.floor(Math.random() * cards.length); // Zufälliger Index in der Liste
          let newSystem =system
          newSystem.cards.push(cards[randomIndex])
          setSystem(newSystem)          
          
          let newCardsForDrawStack =drawStack
          cards.forEach((card,index) => {
(index !== randomIndex && card !== cards[randomIndex])  && newCardsForDrawStack.cards.push(card)
          })
          setDrawStack(newCardsForDrawStack)
          
        })
      } catch (error:any) {
        if(error.message) {
          console.log(error.message)
        }
      }
    } 
})
  

  // Singleplayer-Modus
  if (mode === "singleplayer") {
    return (
      <div className="container">
        <NameDialog
          name={players[0].name}
          onSubmittedChange={(name) => {
            setPlayers((prevPlayers) => {
              const updatedPlayers = [...prevPlayers];
              updatedPlayers[0] = { ...updatedPlayers[0], name: name };
              return updatedPlayers;
            });
          }}
        />
        <h1 className="round-title">Runde {currentRound}</h1>
        <DiscardStackComponent
          communication={communication}
          discardStack={discardStack}
        />
        <PlayReport
          mode="lastEntry"
          report={playReport}
        />
        {players.map((player) => (
          <Player
            key={player.index}
            player={player}
            communication={communication}
            drawCard={handleDrawCard}
            playCard={handlePut}
            starterCards={starterCards}
            indexOfCurrentPlayer={currentPlayerIndex}
          />
        ))}
      </div>
    )
  } else {
    return null
  }
}
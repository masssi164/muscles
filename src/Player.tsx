import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { Props } from "./player.interfaces";
import workAsComputer, { Computer } from "./Computer";
import FinishedDialog from "./FinishedDialog";
import "./Player.css"

export const Player: React.FC<Props> = ({ player, communication, drawCard, playCard, starterCards, indexOfCurrentPlayer }) => {
  const { name, cards, index } = player;
  const [currentCard, setCurrentCard] = useState<string | undefined>(cards.length >0?cards[0]:undefined);
  
  const jumpToCurrentPlayer = useRef<HTMLDivElement | null>(null)
  const [wasFocused, setWasFocused] = useState(false)
  const pullButton = useRef<HTMLButtonElement |null>(null)
  const putButton = useRef<HTMLButtonElement |null>(null)
  function isCurrentPlayer(): boolean {
    if(index === indexOfCurrentPlayer) {
      return true
    }
    return false
  }
  
  useEffect(() => {
    if(jumpToCurrentPlayer.current &&  document.activeElement !== jumpToCurrentPlayer.current && !wasFocused) {
      jumpToCurrentPlayer.current.focus()
      setWasFocused(true)
    }
    if(!isCurrentPlayer() && pullButton.current && putButton.current) {
      pullButton.current.disabled =true;
      putButton.current.disabled =true
    }
    if(isCurrentPlayer() && pullButton.current && putButton.current) {
      pullButton.current.disabled =false
      putButton.current.disabled =false
    }
    !currentCard && setCurrentCard(cards[0])
  player.isArtificial && isCurrentPlayer() && workAsComputer(() => {
    console.log("computer plays")
    const random =Math.floor(Math.random()*cards.length)
    playCard(index,cards[random])
  },() => {
    console.log("computer draws")
    drawCard(index)
  })
  },[player,indexOfCurrentPlayer,cards,currentCard])

  const [noInfoOfCurrentCard, setNoInfoOfCurrentCard] =useState<boolean>(false)
  
  return (
    <div>
      <h2 data-testid="player-name" className="player-name">{name}</h2>
      {isCurrentPlayer() && (<div tabIndex={-1} ref={jumpToCurrentPlayer} className="current-player">
        {"settings" in player?<p>du bist dran</p>:<p>{name} ist dran</p>}
      </div>)}
      {cards.length >0 && (<div className="NumberOfCards" data-testid="number-of-cards">
        Noch {cards.length} Karten auf der Hand</div>)}
      
      {"settings" in player && (
        <div>
          {cards.length < 1 && (
          <div>
            <button data-testid="start-button" className="start-button" onClick={() => {
                starterCards()
                setCurrentCard(cards[0])
                // showMeCards()
                setWasFocused(false)
            }}>Karten austeilen</button>
        </div>
    )  }
          {cards.length > 0 ? (
            
            <div>
              <h3 className="current-cards-heading">Deine Karten:</h3>
              <select value={currentCard} onChange={(e) => {
                setCurrentCard(e.target.value)
              }} data-testid="card-select" className="card-select">
                {cards.map((card, index) => (
                  <option key={index} value={card}>
                    {card}
                  </option>
                ))}
              </select>
              {currentCard && (
                <div className="Card">
                  <Card name={currentCard} connection={communication}  noInformation={noInfoOfCurrentCard} />
                </div>
              )}
              {currentCard && (
                <div className="Actions">
                <button ref={putButton} className="Putter"  onClick={() => {
                  setNoInfoOfCurrentCard(true)

                  playCard(index, currentCard)
                  cards.length >1?setCurrentCard(undefined):cards.filter(card => card !== currentCard).length >0?setCurrentCard(cards.filter(card => card !== currentCard)[0]):setCurrentCard(cards[0])
                  setNoInfoOfCurrentCard(false)
                }} data-testid="put-button">
Ablegen
</button>
<button ref={pullButton} className="Puller" onClick={() => {
             setNoInfoOfCurrentCard(true)

                  playCard(index, currentCard)
                  cards.length >1?setCurrentCard(undefined):cards.filter(card => card !== currentCard).length >0?setCurrentCard(cards.filter(card => card !== currentCard)[0]):setCurrentCard(cards[0])
                  setNoInfoOfCurrentCard(false)
                }} data-testid="put-button">
Ablegen
</button>
<button ref={pullButton} className="Puller" onClick={() => {
  setNoInfoOfCurrentCard(true)
  drawCard(index)
  setNoInfoOfCurrentCard(false)
}} data-testid="pull-button">
Ziehen

</button>
</div>
)}
</div>
) : (
<div>
<p className="no-cards-message">Du hast keine Karten mehr auf der Hand.</p>
</div>
)}
</div>
)}
{player.finished && <FinishedDialog finished={player.finished} isUser={"settings" in player} />}
</div>
);
};

export default Player;
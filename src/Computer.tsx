import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { Props } from "./player.interfaces";

export default function workAsComputer (callback_put:() => void,callback_draw:() => void) {
  const randomInt:number =Math.floor(Math.random()*2)
  console.log("computer",randomInt)
  switch (randomInt) {
    case 0:
      console.log("computer puts card")
      callback_put()
      break;
    case 1:
      console.log("computer plays card")
      callback_draw()
      break;
    default:
      break;
  }
}

export const Computer: React.FC<Props> = ({ player, communication, drawCard, playCard, starterCards, indexOfCurrentPlayer }) => {
    const {index} =player
    
    player.cards.map((card,i) => {
        console.log("computer",i,card)
        return card
    })

    useEffect(() => {
      drawCard(player.index)
    }, [player])
    
    return null
}

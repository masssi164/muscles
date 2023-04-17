import React, {FC} from "react";
import { DiscardStack } from "./stacks.types";
import ServerCommunication from "./ServerCommunication";
import Card from "./Card";

interface Props {
    discardStack:DiscardStack,
    communication:ServerCommunication
}
 
const DiscardStackComponent:FC<Props> = ({ discardStack, communication}) => {
    if(discardStack.cards.length <1) {
        return null
    } else {
        return (  
            <div className="DiscardStack">
                <h2>Es liegt</h2>
                <Card connection={communication} name={discardStack.cards[discardStack.cards.length-1]} />
            </div>
        );
    }
}


export default DiscardStackComponent
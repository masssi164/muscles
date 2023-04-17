import React, { useState } from "react";
import "./Card.css"
import { Funcs } from "./funcs";
import ServerCommunication from "./ServerCommunication";

export interface Joints {
    bez:string
    funcs:string[]
}

export interface ICard extends CardStruct {
    points:number,
    setPoints(currentPoints:number):void,
}

export interface CardStruct {
    oregines:string[],
    insertiones:string[],
    name:string,
    innervation:string,
    joints:Joints[]
}

interface IProps {
    name:string,
    connection:ServerCommunication
}




function Card (props:IProps) {
    const [oregines, setOregines] = useState<null | Array<string>>(null)

    const [insertiones, setInsertiones] = useState<null | Array<string>>(null)
    const [innervation, setInnervation] = useState<null | string>(null)
    const [joints, setJoints] = useState<null | Array<Joints>>(null)
    return(
        <div className="Card" aria-label={props.name}>
            <div className="FirstRow">
                <h1 className="MuskelName">{props.name}</h1>
            </div>
            <div className="SecondRow">
                <div className="Orego">
                    <button  className="Orego_button" onClick={e => props.connection.getOreginesOf(props.name,(oregines) => {
                        setOregines(oregines)
                    }) } data-testid="oregines-button">
                        Ursprung/Ursprünge
                    </button>
                    {oregines &&( <ul aria-label="Ursprünge">
                        {oregines.map((value,index) => <li key={index}>{value}</li>)}
                        </ul>)}
                </div>
                <div className="Innervation">
                    <button className="Innervationbutton" onClick={e => {
                        props.connection.getInnervationOf(props.name,innerv => {
                            setInnervation(innerv)
                        })
                    }} data-testid="innervation-button">Innervation</button>
                    {innervation &&(<p className="BlendedInnervation" aria-label="Innervation">{innervation}</p>)}
                </div>
                <div className="Functions">
                    <button onClick={e => props.connection.getJointsOf(props.name,(joints) => {

                        setJoints(joints)
                        })} className="FunctionsButton" data-testid="joints-button">
                        Joints
                    </button>
                    <Funcs joints={joints} />                    
                </div>
                <div className="Insertion">
                    <button className="Insertio_button" onClick={e => props.connection.getInsertionesOf(props.name,(insertiones) => {
                        setInsertiones(insertiones)
                    })} data-testid="insertiones-button">
                        Ansatz bzw. Ansätze
                    </button>
                    {insertiones && (
                        <ul aria-label="Liste der Ansätze">
                            {insertiones.map((value,index) => <li key={index}>{value}</li>)}
                        </ul>)}
                </div>
            </div>
        </div>
    )
}

export default Card
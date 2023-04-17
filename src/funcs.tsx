import React from "react";
import { Joints } from "./Card";

interface Shower {
    joints:Joints[]|null
}

export function Funcs (props:Shower) {
    if(props.joints) {
        return(
            <div className="Funcs">
                {props.joints.map(joint => {
                    return(
                        <div>
                            <h2 className="FuncsTitel">{joint.bez}</h2>
                            {joint.funcs.map(func => <li>{func}</li>)}
                        </div>
                    )
                })}
            </div>
        )
    }
    return null
}
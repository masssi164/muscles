import { CardStruct, Joints } from "./Card"


export interface MuscleComparisonResult {
    isEqual: boolean;
    explanation: string;
  }



interface GetCardsCallback {
    (namesList:string[]):void
}

interface GetInformationOfTwoCardsCallBack {
    (bothCards:CardStruct[]):void
}

interface GetOreginesCallback {
    (oregines:string[]):void
}

interface GetInsertionesCallback {
    (insertiones:string[]):void
}

interface GetJointsCallback {
    (joints:Joints[]):void
}

interface GetInnervationCallback {
    (innervation:string):void
}


export default class ServerCommunication {
    addresse:string
    port:number

    constructor(ADRESSE:string,PORT:number) {
        this.addresse =ADRESSE
        this.port =PORT
    }

    async fetchGetSructure(route:string) {
        return await fetch(this.addresse+":"+this.port.toString()+"/"+route,{
            headers:{
                "Content-Type": "application/json",
            },
            method:"GET"
        })
    }

    async getAllCards(callback:GetCardsCallback)  {
        const res =await this.fetchGetSructure("allCards")
        const data =await res.json()
        if(data) {
            callback(data)
        }
    }

    async fetchPostSructure(route:string,data:any) {
        return await fetch(this.addresse+":"+this.port.toString()+"/"+route,{
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data),
            method:"POST"
        })
    }

    

    async getInformationOfTwoCards(name_1:string,name_2:string,callback:GetInformationOfTwoCardsCallBack) {
        const res =await this.fetchPostSructure("GetInformationOfBothCards",{
            name1:name_1,
            name2:name_2
        })
        const data = await res.json()
        if(data) {
            callback(data.bothCards)
        }
    }
    
    async getOreginesOf(name:string,callback:GetOreginesCallback) {
        const res =await this.fetchPostSructure("oreginesOf",{
            name:name
        })
        const data =await res.json()
        if(data) {
            callback(data.oregines.split(";"))           
        }
    }

    async getInsertionesOf(name:string,callback:GetInsertionesCallback) {
        const res =await this.fetchPostSructure("insertionesOf",{
            name:name
        })
        const data =await res.json()
        if(data) {
            callback(data.insertiones.split(";"))
        }
    }

    
    async getJointsOf(name:string,callback:GetJointsCallback) {
        const res =await this.fetchPostSructure("jointsOf",{
            name:name
        })
        const data =await res.json()
        if(data) {
            callback(JSON.parse(data.joints))
        }
    }
    
    async getInnervationOf(name:string,callback:GetInnervationCallback) {
        const res =await this.fetchPostSructure("innervationOf",{
            name:name
        })
        const data =await res.json()
        if(data) {
            console.log(JSON.stringify(data))
            callback(data.innervation)
        }
    }

    async compareTwoCards(currentCard: string, lastCard: string, callback: (data: MuscleComparisonResult[] | null, error: Error | null) => void) {
        try {
          const res = await this.fetchPostSructure("compareTwoCards", {
            currentCard: currentCard,
            lastCard: lastCard
          });
          if (!res.ok) {
            throw new Error(`Fehler bei der Anfrage: ${res.status} ${res.statusText}`);
          }
          const data = await res.json();
          if (data instanceof Error) {
            // Überprüfen, ob data ein Error-Objekt ist
            callback(null, data); // Fehler an den Callback übergeben
          } else if (Array.isArray(data)) {
            // Überprüfen, ob data ein Array von MuscleComparisonResult-Objekten ist
            callback(data, null); // Erfolgreiches Ergebnis an den Callback übergeben
          } else {
            callback(null, new Error("Ungültige Daten erhalten")); // Fehler an den Callback übergeben
          }
        } catch (error) {
          callback(null, error as Error | null); // Fehler an den Callback übergeben
        }
      }
      


    
}
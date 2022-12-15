import React from "react";
import { useState } from "react";
const Card = ({ cards }) => {
const [currentNumber, setCurrentNumber] = useState(1)
// const [currentButton,setCurrentButton]= useState("")
const ColorMana = () => {
  let manaArray = [];
  for (let i = 0; i < cards.colors.length; i++) {
    switch (cards.colors[i]) {
      case "W":
        manaArray.push("./img/white.gif");
        break;
      case "B":
        manaArray.push("./img/black.gif");
        break;
      case "R":
        manaArray.push("./img/red.gif");
        break;
      case "G":
        manaArray.push("./img/green.gif");
        break;
      case "U":
        manaArray.push("./img/blue.gif");
        break;
      default:
        break;
    }
    }
    return manaArray.map((mana) => <img src={mana} key={mana} alt="link"/>);
  };
  // const changeButton = (newBtn) => {
  //   setCurrentButton(newBtn)
  // }
    const addStorage = () => {
    let storedData = window.localStorage.card
      ? window.localStorage.card.split(",")
      : [];
      for(let i=0;i<currentNumber;i++){
        storedData.push(cards.id);
      }
      window.localStorage.card = storedData; 
  };
  // const updateStorage=()=>{
    
  //   if(currentButton=="Ajouter au deck")
  //   {
  //     addStorage()
  //     changeButton("Supprimer du deck")
  //   }
  //   else{
  //     deleteStorage()
  //     changeButton("Ajouter au deck")
  //   }
  // }
  const deleteStorage = () => {
    
    let storedData = window.localStorage.card.split(",");
    let newData = storedData.filter((id) => id !== cards.id);

    window.localStorage.card = newData;
  };
  const inStorage =()=>{
    if(window.localStorage.card){
    return !window.localStorage.card.includes(cards.id.toString())
    }else{
      return cards.id
    }
  };

  
  const changeNumber = (newNumber) => {
    setCurrentNumber(newNumber)
  }
  const getNumberOfCardIndex=()=>{
    let count=0;
    let storedData = window.localStorage.card.split(",");
    for(let i=0;i<storedData.length;i++){
      if(storedData[i]===cards.id){
        count++
      }
    }
    
    return count
  }
  return (
    <div className="card">
    {inStorage() ?(
      <form>
        <select className="liste"
        onChange={(event) => changeNumber(event.target.value)}
        value={currentNumber}
        >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        </select>
      </form>

    ):(
      <h3>{getNumberOfCardIndex()} carte(s) dans le deck</h3>
    )
    }
    {cards.imageUrl?(
      <img className="main_card"
        src={
          cards.imageUrl
        }
        alt={`affiche ${cards.name}`}
      />):(
        <img className="main_card"
        src="./img/magic.png"
        alt={`affiche ${cards.name}`}
        />
      )
    }
      <h2>{cards.name}</h2>
      {cards.rarity ? (
        <h5>Edition : {cards.setName}</h5>
      ) : null}
      <h4>
        {cards.type}
      </h4>
      
      <h5>Cost: {cards.cmc}</h5>
      <ul>
      <h5>Type de mana :</h5>
      {cards.colors
          ? ColorMana()
          : cards.text}
 
      </ul>
    {inStorage() ? (
        <div className="btn" onClick={() =>{addStorage();window.location.reload();}}>
          {/* {currentButton} */}
          Ajouter au deck
        </div>
      ) : (
        <div className="btn" onClick={() =>{deleteStorage();window.location.reload();}}>
        {/* {currentButton} */}
        Supprimer du deck
      </div>
      )}
    </div>
  );
};

export default Card;

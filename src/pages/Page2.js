import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Carte from "../components/Carte";


const Page2 = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let cardsId = window.localStorage.card
      ? window.localStorage.card.split(",").join("|")
      : [];
        if(cardsId.length !==0)
        {
        axios
        .get(
          `https://api.magicthegathering.io/v1/cards?id=${cardsId}`
        )
        .then((res) => setListData(res.data.cards));
      }
  }, []);
  return (
    <div className="user-list-page">
      <Header/>
      <h2>
        Deck 
      </h2>
      <div className="result">
        {listData.length > 0 ? (
          listData.map((cards) => <Carte cards={cards} key={cards.id}/>)
        ) : (
          <h2>Aucune carte dans le deck</h2>
        )}
      </div>
    </div>
  );
};

export default Page2;

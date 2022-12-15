import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./Carte";

const Form = () => {
  const [cardsData, setCardsData] = useState([]);
  const [search, setSearch] = useState("Ajani, Strength of the Pride");
  useEffect(() => {
    axios
      .get(
        `https://api.magicthegathering.io/v1/cards?name=${search}`
      )
      .then((res) => setCardsData(res.data.cards));
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Entrez le nom d'une carte"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
         
        </form>
      </div>
      <div className="result">
        
        {cardsData
          .slice(0, 12)
          .map((cards) => (
            
            <Card cards={cards} key={cards.id} />
          ))}
      </div>
    </div>
  );
};

export default Form;

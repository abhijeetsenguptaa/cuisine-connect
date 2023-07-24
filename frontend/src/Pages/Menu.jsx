import React from "react";
import Card from "../Components/Card";
import axios from "axios";


export default function Menu() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
    .get("http://localhost:8080/menu/")
    .then((res)=> setData(res.data.menu_items))
  }, []);
  return (
    <div>
      <h1>Menu</h1>
      <div className="card-container">
        {data.map((card, index) => (
          <Card
            key={index}
            img={card.img}
            name={card.name}
            price={card.price}
            availability={card.availability}
          />
        ))}
      </div>
    </div>
  );
}

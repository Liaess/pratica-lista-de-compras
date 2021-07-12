import { useEffect, useState } from "react";
import styled from "styled-components";
import InsertForm from "./InsertForm";
import axios from "axios";

export default function ShoppingList() {
  const [items, setItems] = useState([]);

  useEffect(loadItems, []);

  function loadItems() {
    const req = axios.get("http://localhost:4000/list");
    req.then(({data})=>{
      setItems(data);
    });
    req.catch((err)=>{
      if(err.response.status === 400){
        alert("O campo não pode ser vázio ou conter apenas números.");
      }
      if(err.response.status === 500){
        alert("Ocorreu um error tente novamente!");
      }
    });
  }

  return (
    <>
      <InsertForm onAddItem={loadItems} />
      <List>
        {items.map((item) => (
          <li key={item.id}>{item.list}</li>
        ))}
      </List>
    </>
  );
}

const List = styled.ul`
  margin-top: 40px;
  background: #fff;
  width: 600px;
  padding: 20px;
  border-radius: 10px;
  font-size: 25px;
  padding-left: 50px;
  line-height: 40px;
  list-style-type: disc;
`;

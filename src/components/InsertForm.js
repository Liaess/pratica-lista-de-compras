import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function InsertForm({ onAddItem }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { text };
    const req = axios.post("http://localhost:4000/list", newItem);
    req.then(()=>{
      setText("");
      onAddItem();
    });
    req.catch((err)=>{
      setText("");
      onAddItem();
      if(err.response.status === 400){
        alert("O campo não pode ser vázio ou conter apenas números.");
      }
      if(err.response.status === 500){
        alert("Ocorreu um error tente novamente!");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Insert a new item..."
      />
    </form>
  );
}

const Input = styled.input`
  width: 400px;
  line-height: 40px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  padding: 0 10px;
  outline: none;
`;

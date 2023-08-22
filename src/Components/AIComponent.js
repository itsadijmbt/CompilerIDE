import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import classes from "../UI/CodeContainer.module.css";
import axios from "axios";

const API_KEY = "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";

export default function AIComponent() {
  const [aioutput, setoutput] = useState("how can i help you?");
  const [modal, setmodal] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const inputHandler = (event) => {
    setInput(event.target.value);
  };

  const submit =  async () => {
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
    try {
      const apiResponse = await fetch(PROXY_URL + OPENAI_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`, // Replace with your key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        }),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! Status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      setResponse('Error fetching response.');
    }
  };
  const AiModal = () => {
    setmodal((prev) => !prev);
  };

  return (
    <>
      {modal && (
        <div className={classes.aimodal}>
          <div className={classes.display}>{JSON.stringify(response)}</div>
          <input type="text" onChange={inputHandler}   placeholder="Type something..."></input>
          <button onClick={submit}>Submit</button>
        </div>
      )}

      <button className={classes.ai} onClick={AiModal}>
        AI
      </button>
    </>
  );
}

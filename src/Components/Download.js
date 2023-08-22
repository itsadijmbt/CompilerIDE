import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import classes from "../UI/CodeContainer.module.css";
import { useDispatch } from "react-redux";
import { CodeActions } from "../Store/Store";

export default function Download() {
  const code = useSelector((state) => state.CodeSlice.download);
  const dispatch = useDispatch();
  const display = useSelector((state) => state.CodeSlice.modal);

  console.log(display);

  const [fileName, setFileName] = useState("code_snippet");
  const [modal, setmodal] = useState(true);

  const name = (event) => {
    setFileName(event.target.value);
  };
  const submitName = () => {
    console.log(fileName);
    dispatch(CodeActions.modalDisplay(false));
    handleDownload();
  
  };
 

  const cancel =()=>{
    dispatch(CodeActions.modalDisplay(false));
  }

  const handleDownload = () => {
    //blob object {text type}
    const blob = new Blob([code], { type: "text/plain" });
    // create blob url
    const url = window.URL.createObjectURL(blob);

    // creating a temporary anchor to facilitat the download

    const a=document.createElement('a');
     a.href=url;
      a.download=`${fileName}`;
    // creating a click event
      a.click();

    //clean up of the blob or revoke the older link
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      {display && (
        <div className={classes.backdrop}>
          <div className={classes.modal}>
            <h1>Enter File Name</h1>
            <input placeholder="Enter Name" onChange={name} className={classes.fileName}></input>
            <div  className={classes.btnHolder}>
  
            
            

            <button className={classes.ok} onClick={submitName}>
              Ok
            </button>
            <button className={classes.ok} onClick={cancel}>
              Cancel
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState } from "react";
import classes from "../UI/CodeContainer.module.css";
import { useRef } from "react";
export default function Uploader(props) {
  const fileInputRef = useRef(null);
  const [switchMode , setSwitch]=useState(true);
  const [fileExtension, setFileExtension] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      setSwitch(false)
      setSelectedFile(file.name);
      const fileName = file.name;
      const extension = fileName.slice(
        ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
      );
      setFileExtension(extension);

      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
        console.log("File Content:", e.target.result);
        props.data(e.target.result, extension);

        console.log(extension);
      };
       
      reader.readAsText(file);

    
    }
  };

  const deleteFile =()=>{
   
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSelectedFile("");
      setSwitch(true);

  }

  return (
    <div className={classes.fileContainer}>
      <input
        id="fileInput"
        ref={fileInputRef}
        style={{ backgroundColor: "red", display: "none" }}
        type="file"
        accept=".c, .cpp, .h, .java, .py, .js, .ts, .cs, .m, .swift, .rb, .php, .html, .css, .go, .rust, .r, .sh, .kts, .kt, .scala"
        onChange={handleFileChange}
      />
      <div className={classes.fileinputlabel}>
       { switchMode && <label htmlFor="fileInput" style={{ color: "#3794ff" }}>
          Choose File
        </label>
        }
        {
          !switchMode && <label   style={{ color: "#3794ff" }} onClick={deleteFile}>
          Remove File
        </label>
        }

        {selectedFile && (
          <span className={classes.fileNameS}>:{selectedFile}</span>
        )}
      </div>
    </div>
  );
}

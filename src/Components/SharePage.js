import React from "react";
import { useState } from "react";
import classes from "../UI/SharePage.module.css";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useSelector } from "react-redux";
import { createRef } from "react";
import { createFileName, useScreenshot } from "use-react-screenshot";
import { useNavigate } from "react-router-dom";
import { BlockPicker, ChromePicker, SketchPicker } from "react-color";
import style from '../UI/Multipages.module.css'
import Multipages from "./Multipages";
import proactivist from '../MediaKit/dark_Background_worlds no 1.png'
function SharePage() {
  
  const navigate = useNavigate();
  const [image1, takeScreenshot] = useScreenshot({
    type: "image1/jpeg",
    quality: 1.0,
  });

  const [font , setfont]=useState(false)

  
  const download = (image1, { name = "snippet", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image1;
    a.download = createFileName(extension, name);
    a.click();
  };
  const [selected, setSelectedColor] = useState("#ffffff");

  const [selected1, setSelectedColor1] = useState("000");
  const [selected2, setSelectedColor2] = useState("fff");
  const getImage = () => takeScreenshot(ref.current).then(download);

  const Home = () => {
    navigate('/');
    
  };
  const menuClose=()=>{
    setMenu(false);
  }


  const switchF=(option)=>{

    if(option==='font')
    setfont(true)
  else
  setfont(false)

  }
  const menuBTN=()=>{
    setMenu(true)
  }
  

  const [menu , setMenu]=useState(false);


  const ref = createRef(null);
  const code = useSelector((state) => state.CodeSlice.download);

  const language=useSelector((state)=>state.CodeSlice.language)


  return (
    <>
 
       <div className={style.header}>
        <div className={style.logo}><img  src={proactivist} height={50} width={150} className={style.mainImage}></img></div>
        { !menu && <button onClick={menuBTN} className={classes.ham}>Menu</button>}
      </div>
    
    

  
   
    <div className={classes.main}>
     
      {menu && (<div className={classes.part1}>
        <div className={classes.btn}>
          <button className={classes.sc} onClick={getImage}>
            Screenshot
          </button>
          <button className={classes.sc} onClick={menuClose}>
           Close
          </button>
          <button className={classes.sc} onClick={Home}>
            Home
          </button>
          

        </div>
        <h1 className={classes.textHead}>Choose Background Style </h1>
        <div className={classes.color}>
          <div className={classes.pal1}>
            <SketchPicker
              width="95%"
              color={selected}
              onChange={(color) => {
                setSelectedColor(color.hex);
              }}
            />
          </div>
        </div>
        <h1 className={classes.textHead}>Choose Text Area Style</h1>

        <div className={classes.btn}>
          <button className={classes.sc} onClick={()=>{switchF('font')}}>
            Area Color 
          </button>
          <button className={classes.sc} onClick={()=>{switchF('area')}}>
            Text Color
          </button>
        </div>
        <div className={classes.color}>
        <div className={classes.pal1}>
        {font && <SketchPicker
              width="90%"
              color={selected1}
              onChange={(color) => {
                setSelectedColor1(color.hex);
              }}
            />}
            {
              !font && <ChromePicker
              width="100%"
              disableAlpha='true'
              color={selected2}
              onChange={(color) => {
                setSelectedColor2(color.hex);
              }}
            />
            }
          </div>
          </div>


      </div>)}

      <div className={classes.part2} style={{ backgroundColor: `${selected}` }}>
        <div
          className={classes.mainHolder}
          style={{ backgroundColor: `${selected}` }}
          ref={ref}
        >
          <CodeEditor
            className={classes.holder}
            style={{ backgroundColor: `${selected1}` , color:`${selected2}`}}
            placeholder="your code will be here..."
            value={code}
            
            language={language}
          >
            {code}
          </CodeEditor>
        </div>
      </div>
    </div>
    </>
  );
}

export default SharePage;

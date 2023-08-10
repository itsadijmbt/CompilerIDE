import { useDispatch, useSelector } from "react-redux";
import classes from "../UI/CodeContainer.module.css";
import { useState } from "react";
import { CodeActions } from "../Store/Store";
import copy from "copy-to-clipboard";
function CodeContainer(options) {
  
  const dispatch = useDispatch();
  const [oc, setoc] = useState(true);
  const [dd, sdd] = useState(false);
  const [claz1, setClaz1] = useState(classes.tabs);
  const [claz2, setClaz2] = useState(classes.tabs);
  const [ccname, setccName] = useState("Choose Compiler");
  const [modal, setmodal] = useState(false);
  const [input, setInput] = useState("");
  const [name,setName]=useState("cpp14");
  const [userCase, setUserCase] = useState("");  
  const [f,sf]=useState('');
  const [clip,saveclip]=useState('No Commands');

  const showOutput = useSelector(state=>state.CodeSlice.output)
  
  const drop = () => {
    sdd((prev) => !prev);
  };
  const setClass = (name) => {
   // console.log("compilerName", name);
    setccName(name);
  }
  const code = (event) => {
    sf(event.target.value);
    setInput(event.target.value);
  };
  const changeOC = (condition) => {
    if (condition === "i") {
      setClaz1(classes.tabsActive);
      setClaz2(classes.tabs);
      setoc(true);
    } else {
      setClaz1(classes.tabs);
      setClaz2(classes.tabsActive);
      setoc(false);
    }
  };

  const removeModal = () => {
    setmodal(false);
  };
    
  const runIt = () => {

   console.log(userCase)
    if (ccname === "Choose Compiler") setmodal(true);
    else {
      const dataSet = {
        language: name,
        version: ccname,
        code: input,
        input: userCase,
      };
      saveclip('No Commands')
      setUserCase('');
      dispatch(CodeActions.codeSubmission(dataSet));
      console.log(dataSet);
      
    } 
  };

   const inputFeeder=(event)=>{
setUserCase(event.target.value)
   }
   
 // console.log(showOutput);
  console.log((JSON.parse(showOutput[0])).output);

 
  const reset=()=>{
   sf('');
   setInput('');
   saveclip('No Commands');
  }
  const fullscreen=()=>{
    document.body.requestFullscreen();
  }
  const save=()=>{
  copy(input);
  if(input==='')
  saveclip('Nothing to copy');
else
  saveclip('Copy to clipboard');
  }
 
  return (
    <div className={classes.holder}>
      <div className={classes.headBTN}>
        <div className={classes.currentCompiler} onClick={drop}>
          <button className={classes.name}>{ccname}</button>

          {dd && (
            <div className={classes.menu}>
              <button
                className={classes.name}
                onClick={() => {
                  setClass("g++ 14 GCC 9.1.0");
                  setName("cpp14")
                }}
              >
                C++ 14 GCC 9.1.0
              </button>
              <button
                className={classes.name}
                onClick={() => {
                  setClass("JDK 17.0.1");
                  setName("java")
                }}
              >
                Java JDK 17.0.1
              </button>
              <button
                className={classes.name}
                onClick={() => {
                  setClass("GCC 11.1.0");
                  setName("c")
                }}
              >
                C 11.1.0
              </button>

              <button
                className={classes.name}
                onClick={() => {
                  setName("nodejs");
                  setClass("17.1.0")
                }}
              >
                Node js 17.1.0
              </button>

              <button
                className={classes.name}
                onClick={() => {
                  setName("python3");
                  setClass("3.9.9")
                }}
              >
                Python-3
              </button>
              
              <button
                className={classes.name}
                onClick={() => {
                  setName("swift");
                  setClass("5.5")
                }}
              >
                Swift-5.5
              </button>
              
            </div>
          )}
        </div>
      </div>
      <div className={classes.Feilds}>
        <div className={classes.feild1}>
          <div className={classes.btnContainer}>
          <button className={classes.btnbtn} onClick={save}>Save</button>
          <button className={classes.btnbtn} onClick={reset}>Reset</button>
         

          </div>

          <textarea
            type="text"
            className={classes.container}
            onChange={code}
            placeholder="
            // dummy code write your code
            #include <iostream>
            int main() 
            {
              std::cout << 'Hello World!';
                return 0;
            }"
            value={f}
          ></textarea>

          <button className={classes.run} onClick={runIt}>
            Run
          </button>
          <div className={classes.bottomBar}>Message : {clip}</div>
          
          
        </div>

        <div className={classes.feild2}>
          <div className={classes.btnContainer}>
            <button className={claz1} onClick={() => changeOC("i")}>
              Custom Input
            </button>
            <button className={claz2} onClick={() => changeOC("o")}>
              Custom Output
            </button>
          </div>

          {oc && (
            <textarea
              type="text"
              className={classes.container_input}
              placeholder="Your Input"
              onChange={inputFeeder}
            ></textarea>
          )}

          {!oc && (
           <div className={classes.main}>
          <textarea
              type="text"
              className={classes.container_output}
              placeholder="Your Output"
              value={(JSON.parse(showOutput[0])).output}
            ></textarea>
          
          <div className={classes.bottomBar}>CPU Time: {(JSON.parse(showOutput[0])).cpuTime} s</div>
          </div>)
          }
        </div>
      </div>
      {modal && (
        <div className={classes.backdrop}>
          <div className={classes.modal}>
            <h1>Choose a Language type</h1>
            <button className={classes.ok} onClick={removeModal}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeContainer;

/* <div className={classes.MainContainer}>
    <div className={classes.btnContainer}> 
   <button  className={classes.btn}>Run</button>
   <button className={classes.btn}>Reset</button>
   <button className={classes.btn}>Copy</button>
  

    </div>

   <div className={classes.Feilds}>
  
    <div className={classes.feild1}>
      
    </div>

   <textarea type="text" className={classes.container}  onChange={code}placeholder='Enter Your Code Here'></textarea>

    <div className={classes.container_IO}>
        <textarea type='text' className={classes.container_input} placeholder='Custom Input'></textarea >
        <textarea type='text'  className={classes.container_input} placeholder='Custom Output'></textarea>
        
    </div>
    </div>
    </div>*/

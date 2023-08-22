import { useDispatch, useSelector } from "react-redux";
import classes from "../UI/CodeContainer.module.css";
import { useState } from "react";
import { CodeActions } from "../Store/Store";
import Editor from "@monaco-editor/react";
import copy from "copy-to-clipboard";
import { NavLink } from "react-router-dom";
import Uploader from "./Uploader";
import AIComponent from "./AIComponent";
function CodeContainer(options) {
  const dispatch = useDispatch();

  const codeR = useSelector((state) => state.CodeSlice.download);
  const [oc, setoc] = useState(true);
  const [dd, sdd] = useState(false);
  const [claz1, setClaz1] = useState(classes.tabs);
  const [claz2, setClaz2] = useState(classes.tabs);
  const [ccname, setccName] = useState("Compiler");
  const [modal, setmodal] = useState(false);
  const [input, setInput] = useState("");
  const [name, setName] = useState("cpp14");
  const [userCase, setUserCase] = useState("");
  const [f, sf] = useState("");
  const [clip, saveclip] = useState("No Commands");
  const [highlighterName, sh] = useState("cpp");
  const [resetmodal, setresetModal] = useState(false);
  const showOutput = useSelector((state) => state.CodeSlice.output);

  const drop = () => {
    sdd((prev) => !prev);
  };
  const setClass = (name) => {
    // console.log("compilerName", name);
    setccName(name);
  };
  const code = (value) => {
    sf(value);
    setInput(value);
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
    setresetModal(false);
  };

  const runIt = () => {
    console.log(userCase);
    if (ccname === "Compiler") {
      setmodal(true);
    } else {
      const dataSet = {
        language: name,
        version: ccname,
        code: input,
        input: userCase,
      };
      saveclip("No Commands");
      setUserCase("");
      dispatch(CodeActions.codeSubmission(dataSet));
      dispatch(CodeActions.codelanguage(highlighterName));

      console.log(dataSet);
    }
    setClaz1(classes.tabs);
    setClaz2(classes.tabsActive);
    setoc(false);
  };

  const inputFeeder = (event) => {
    setUserCase(event.target.value);
  };

  // console.log(showOutput);
  console.log(JSON.parse(showOutput[0]).output);

  const reset = () => {
    setresetModal(true);
  };

  const removeResetModalNReset = () => {
    setresetModal(false);
    sf("");
    setInput("");
  };

  const save = () => {
    copy(input);
    if (input === "") saveclip("Nothing to copy");
    else saveclip("Copy to clipboard");
  };

  const downloadHandler = () => {
    dispatch(CodeActions.modalDisplay(true));
    dispatch(CodeActions.codeDownload(f));
  };

  const ScreenHandler = () => {
    dispatch(CodeActions.codeDownload(f));
    dispatch(CodeActions.codelanguage(highlighterName));
  };

  const displayFile = (e, ext) => {
    /*this is editor area*/

    if (ext === "cpp") {
      setClass("g++ 14 GCC 9.1.0");
      setName("cpp14");
      sh("cpp");
    } else if (ext === "c") {
      sh("c");
      setClass("GCC 11.1.0");
      setName("c");
    } else if (ext === "js") {
      sh("js");
      setName("nodejs");
      setClass("17.1.0");
    } else if (ext === "py") {
      sh("python");
      setName("python");
      setClass("3.9.9");
    } else if (ext === "java") {
      setClass("JDK 17.0.1");
      setName("java");
      sh("java");
    } else if (ext === "swift") {
      setName("swift");
      setClass("5.5");
      sh("swift");
    }

    console.log(ext);
    sf("");
    setInput("");
    //console.log('in main fs ', e);
    sf(e);
  };

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
                  setName("cpp14");
                  sh("cpp");
                }}
              >
                C++ 14 GCC 9.1.0
              </button>
              <button
                className={classes.name}
                onClick={() => {
                  setClass("JDK 17.0.1");
                  setName("java");
                  sh("java");
                }}
              >
                Java JDK 17.0.1
              </button>
              <button
                className={classes.name}
                onClick={() => {
                  sh("c");
                  setClass("GCC 11.1.0");
                  setName("c");
                }}
              >
                C 11.1.0
              </button>

              <button
                className={classes.name}
                onClick={() => {
                  sh("js");
                  setName("nodejs");
                  setClass("17.1.0");
                }}
              >
                Node js 17.1.0
              </button>

              <button
                className={classes.name}
                onClick={() => {
                  sh("python");
                  setName("python");
                  setClass("3.9.9");
                }}
              >
                Python-3
              </button>

              <button
                className={classes.name}
                onClick={() => {
                  setName("swift");
                  setClass("5.5");
                  sh("swift");
                }}
              >
                Swift-5.5
              </button>
            </div>
          )}
        </div>
        <Uploader data={displayFile}></Uploader>
      </div>

      <div className={classes.Feilds}>
        <div className={classes.feild1}>
          <div className={classes.btnContainer}>
            <button className={classes.btnbtn} onClick={save}>
              Save
            </button>

            <button className={classes.btnbtn} onClick={downloadHandler}>
              Download
            </button>

            <NavLink
              to="/screenshot"
              className={(isActive) =>
                isActive ? classes.btnbtn : classes.btnbtn
              }
              onClick={ScreenHandler}
            >
              Image
            </NavLink>
          </div>

          <div className={classes.container}>
            <Editor
              onChange={code}
              theme="vs-dark"
              height="100%"
              language={highlighterName || "cpp"}
              value={f}
            ></Editor>
          </div>
          
          <AIComponent></AIComponent>
          <button className={classes.run} onClick={runIt}>
            Run
          </button>
          <button className={classes.reset} onClick={reset}>
            Reset
          </button>
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
                value={JSON.parse(showOutput[0]).output}
              ></textarea>

              <div className={classes.bottomBar}>
                CPU Time: {JSON.parse(showOutput[0]).cpuTime} s
              </div>
            </div>
          )}
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
      {resetmodal && (
        <div className={classes.backdrop}>
          <div className={classes.modal}>
            <h1>Your entire code will be deleted</h1>

            <div className={classes.btnHolder}>
              <button className={classes.ok} onClick={removeResetModalNReset}>
                Ok
              </button>
              <button className={classes.ok} onClick={removeModal}>
                Cancel
              </button>
            </div>
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

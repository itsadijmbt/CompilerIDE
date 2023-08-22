import { configureStore, createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  modal:false,
  code: {

  },
  output:[
    
"{\"cpuTime\":\"0.00\",\"memory\":\"3472\",\"output\":\"Hello World!\",\"language\":{\"id\":\"cpp14\",\"version\":4,\"version_name\":\"GCC 11.1.0\"}}"
  ],
  download:{

  },
  language:{},
  dcode:{}
};
const CodeSlice = createSlice({
  name: "code",
  initialState: initialState,
  reducers: {
    codeSubmission: (state, action) => {
      state.code = action.payload;
    },
    codeResult: (state, action) => {
      
  
      state.output.splice(0,state.output.length);
      state.output.push(action.payload)
      
    },
    codeDownload:(state , action)=>{

       state.download=action.payload;
    }, 
    modalDisplay:(state , action)=>{
      state.modal=action.payload;
    }, 
    codelanguage:(state, action)=>{
      state.language=action.payload
    },
    importedCode:(state,action)=>{
      state.dcode = action.payload;
    }

  },
});

const Store = configureStore({
  reducer: {
    CodeSlice: CodeSlice.reducer,
  },
});
export const CodeActions = CodeSlice.actions;
export default Store;

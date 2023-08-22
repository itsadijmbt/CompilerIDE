import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CodeActions } from "../Store/Store";
export default function Compiler() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CodeSlice.code);

  console.log("code in api mains..\n", data);

  async function executeRemoteCode() {
    const url = "https://online-code-compiler.p.rapidapi.com/v1";
    const options = {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '10a9b01b41mshc43ddf9dac7100dp1517fbjsn554c737e92bd',
        'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
      },
      body: JSON.stringify({
        language: data.language,
        version: data.version,
        code: data.code,
        input: data.input,
      }),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`API returned status code ${response.status}`);
      }

      const result = await response.text();

      console.log(result);

      dispatch(CodeActions.codeResult(result));
    } catch (error) {
      console.error(error);
    }
  }
  // Call the function
  executeRemoteCode();

  /*
async function fetchLanguages() {
  const url = 'https://online-code-compiler.p.rapidapi.com/v1/languages/';
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '2ec5c298afmsh02824d43749d7aep15920djsn554dddf4ea1f',
          'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
      }
  };

  try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
          throw new Error(`API returned status code ${response.status}`);
      }

      const result = await response.text();
      console.log(result);
  } catch (error) {
      console.error(error);
  }
}

// Call the function
fetchLanguages();
*/
}

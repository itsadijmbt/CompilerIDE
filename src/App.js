import logo from './logo.svg';
import './App.css';
import CodeContainer from './Components/CodeContainer';
import Compiler from './Compiler/Compiler';
import Multipages from './Components/Multipages';
import User from './Components/User';
function App() {
  return (
 <>

 <Multipages></Multipages>
 <CodeContainer></CodeContainer>
 <Compiler></Compiler>
 <User></User>
 </>
  );
}

export default App;

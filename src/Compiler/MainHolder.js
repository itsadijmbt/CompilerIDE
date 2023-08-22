
import Multipages from '../Components/Multipages';
import CodeContainer from '../Components/CodeContainer';
import Download from '../Components/Download';
import Compiler from './Compiler';
import AIComponent from '../Components/AIComponent';
export default function MainHolder() {
  return (
    <>
      <Multipages></Multipages>

      <CodeContainer></CodeContainer>
      <Download></Download>
      <Compiler></Compiler>
      
    </>
  );
}

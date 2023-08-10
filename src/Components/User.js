

import classes from '../UI/Multipages.module.css';
export default function User()
{

   return(
    <>
    <div className={classes.user}>
      <h1 className={classes.feature}>Features</h1>
     <ul className={classes.list}></ul>
      <li>This project is able to compile code in many languages to browse supported languages click<strong>choose compiler</strong></li>
    
     
      <li>Have your test cases to test with built in<strong>Custom Input</strong></li>
     
      

      <li>This project boasts a <strong>Reset</strong>functionality</li>
      
      <li>Just a click on button <strong>Save</strong> to get functionality of saving the code to clipboard</li>


    </div>

    </>
   )
  

}
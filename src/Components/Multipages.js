import classes from '../UI/Multipages.module.css'
import proactivist from '../MediaKit/dark_Background_worlds no 1.png'
export default function Multipages() {
  return (
    <>
      <div className={classes.header}>
        <div className={classes.logo}><img src={proactivist} height={50} width={150} className={classes.mainImage}></img></div>
        
      </div>
    </>
  );
}

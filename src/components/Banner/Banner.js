import {Fragment} from 'react';
import classes from './Banner.module.css';

const Banner = (props) => {
  return (
    <Fragment>
      <div className={classes.banner}>
        <img src={props.img} alt="Banner"/>
        <div className={classes.bannerTextWrapper} >
          <h1 className={classes.title}>{props.title}</h1>
          <span className={classes.subText}>{props.subText}</span>
        </div>
      </div>
    </Fragment>
  )
}

export default Banner;

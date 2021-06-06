import {Fragment, forwardRef} from 'react';
import classes from './Input.module.css';

const Input = forwardRef((props, ref) => {
  return (
    <Fragment>
      <div className={classes.inputWrapper}>
        <label className={classes.label} htmlFor={props.input.id}>{props.label} <span className={classes.labelSuffix}>{`(in ${props.suffix})`}</span></label>
        <input ref={ref} {...props.input} ></input>
      </div>
    </Fragment>
  )
})

export default Input;

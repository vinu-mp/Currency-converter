import classes from './Select.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * @Objective Select component which handles from and to currency data dropdown list
 * @param {props} Object component props values
 */
const Select = (props) => {
  const [isDropDownActive, toggleDropDown] =  useState(false);

  const { currencyList } = useSelector(state => state.select);

  /**
   * @Objective Triggers dropdown close
   */
  const hideDropDown = () => {
    toggleDropDown(false);
    document.removeEventListener('click', hideDropDown)
  }
  
  /**
   * @Objective Triggers when dropdown list item is clicked
   * @param {label} String Field label is passed as identifier
   * @param {currency} String Represents currency shortnote
   */
  const onListItemClick = (label, currency) => {
    toggleDropDown((activeState) => !activeState);
    props.onchange(label, currency);
  }

  /**
   * @Objective Triggers when dropdown filed is clicked
   */
  const showDropDownList = (event) => {
    event.stopPropagation();
    toggleDropDown((activeState) => {
      if(!activeState) {
        document.addEventListener('click', hideDropDown)
      }
      return !activeState
    });
  }

  return (
    <div className={classes.selectWrapper}>
      <label className={classes.label} htmlFor={props.label}>{props.label}</label>
      <div tabIndex="0" onClick={showDropDownList} className={classes.select}>{props.value}</div>
      {
      isDropDownActive && 
        <div className={classes.selectList}>
          {
            currencyList.map((item) => {
            return <div key={item.short} onClick={() => onListItemClick(props.label, item.short)} className={classes.selectItem} role="listitem">{`${item.country} - ${item.short}`}</div>
            })
          }
        </div>
      }
    </div>
  )
}

export default Select;

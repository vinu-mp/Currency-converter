import classes from './CurrencyCard.module.css'
import Card from '../UI/Card';
import Select from '../UI/Select';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectAction } from '../../store/select-change-slice';
import { useRef, useState, useEffect } from 'react';

/**
 * @Objective Method which will capture the lookup value
 * @param {lookUpObj} Object Object which includes the next lookup value for traversal
 * @param {lookUpKey} String item to be used to compare and capture the next key from lookUpObj
 */
const lookUpHandler = (lookUpObj, lookUpKey) => {
  let objKeys = Object.keys(lookUpObj);
  return objKeys.find(key => lookUpObj[key].includes(lookUpKey))
}

/**
 * @Objective Card component reponsible for laying out exchange rate information
 */
const CurrencyCard = () => {

  const { from, to } = useSelector(state => state.select);
  const { currencyMap } = useSelector(state => state.currency);

  const [ conversionRate, setConversionRate ] = useState(0);
  const [ inputAmount, setInputAmount ] =  useState(0);
  const [ errorState, setErrorState ] =  useState(false);

  const exchangeRate = [];
  const inputRef = useRef();
  const dispatch = useDispatch();

  /**
   * @Objective Recursively caclulate the currency rate, returns the final exchange rate
   * @param {amount} String Amount data from the input field. This will have accumulated value in futher iterations
   * @param {curFrom} String From currency value
   * @param {curTo} String To currency value
   */
  const recurseCheck = (amount, curFrom, curTo) => {
    // 1: Unity check
    if (curFrom === curTo) return +amount;
    const directEntryValue = currencyMap[curFrom] && (currencyMap[curFrom].direct[curTo] || '');

    // 2: Direct entry available (inverse is also resolved here)
    if (directEntryValue) return amount * directEntryValue;

    // 3: Recursive reference
    else {
      let lookUpKey = lookUpHandler(currencyMap[curFrom].lookUp, curTo);
      if (lookUpKey) {
        let accAmount = recurseCheck(amount, curFrom, lookUpKey);
        accAmount = recurseCheck(accAmount, lookUpKey, to);
        exchangeRate.push(accAmount);
        return exchangeRate[0]
      } else return false;
    }
  }

  /**
   * @Objective Executes once calculate button is clicked
   */
  const convertCurrencyHandler = () => {
    const inputAmount = inputRef.current.value;
    let exchangeRate = recurseCheck(inputAmount, from, to);
    if(!exchangeRate) {
      setErrorState(true)
    } else {
      setConversionRate(to === 'JPY' ? exchangeRate.toFixed(0) : exchangeRate.toFixed(2));
    } 
  }

  useEffect(() => {
    convertCurrencyHandler();
    setInputAmount(inputRef.current.value);
  },[])
  
  /**
   * @Objective Executes when either of the select field value changes. This will dispatch an action
   */
  const onValueChangeHandler = (type, currency) => {
    const fieldType = type.toLowerCase();
    dispatch(selectAction.selectChange({
      fieldType,
      currency
    }))
  }

  return (
    <div className={classes.currencyCardWrapper}>
      <Card classes={classes.currencyCard}>
        {/* Not passing dropdown list array here as we have only one type(currency) throughout the app */}
        <div className={classes.flexWrapper}>
          <Input ref={inputRef} label="Amount" suffix={from} input={{id: 'amount', type: 'number', defaultValue: '1'}} />
          <Select onchange={onValueChangeHandler} value={from} label="From"/>
          <Select onchange={onValueChangeHandler} value={to} label="To"/>
        </div>
        {
          errorState ? 
          (<p className={classes.error}><em>Couldn't fetch conversion rate. Please try again later</em></p>) :
          (
            <div className={classes.resultWrapper}>
            <div className={classes.resultDim}>{`${inputAmount} ${from} = `}</div>
            <div className={classes.resultStrong}>{`${conversionRate} ${to}`}</div>
          </div>
          )
        }
        <div className={classes.blockFooter}>
          <Button onClick={convertCurrencyHandler} type='button'>Calculate</Button>
        </div>
        <p className={classes.note}>Note: Change in dropdown won't trigger an auto computation. Please click calculate</p>
      </Card>
    </div>
  )
}

export default CurrencyCard;

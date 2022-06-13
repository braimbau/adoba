//@ts-check

import { useEffect, useState } from "react";
import IndicatorAPI from "../api/IndicatorAPI";
import './../styles/manager.css'
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FixedField from "./fixedField";

function Manager() {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [mandatory, setMandatory] = useState(false);
  const [indicators, setIndicators] = useState([]);


  const onSubmit = async () => {
    const submitedStatus = await IndicatorAPI.createIndicator({name, unit, mandatory});
    if (submitedStatus) //if indicator can't be submeted
    {
      const display = ['Cant be submited because : \n']
      console.log(submitedStatus);
    }
    getIndicators();
  }

  const onDelete = async (id) => {
    //remove from back
    const deleteStatus = await IndicatorAPI.deleteIndicator(id);
    if (deleteStatus) //if indicator can't be deleted
    { 
      console.log(`Can't delete indicator because : ${deleteStatus}`);
      return;
    }

    //remove from front
    console.log('mdr')
    console.log(id)
    const newIndicators = indicators.filter((indicator) => {return indicator.id != id});
    console.log('new indicators:');
    console.log(indicators);
    setIndicators(newIndicators);
  }

  const getIndicators = async () => {
    const indicators = await IndicatorAPI.getIndicators();
    setIndicators(indicators);
  }

  useEffect(() => {
    //mount
    getIndicators();
    return () => {
        //unmount
    }
  }, [])

  const renderIndicators = (list) => {
		const listItems = list.map((indicator) =>
		<div className="Field" key={indicator.id}>
      <div className="IndicatorName">{`${indicator.name} (${indicator.unit})`}</div>
      <div className="IndicatorOptions">
        <div className="IndicatorMandatory">{(indicator.mandatory) ? '*' : ''}</div>
        <div className="IndicatorDelete" onClick={() => {onDelete(indicator.id)}} >
          <DeleteIcon></DeleteIcon>
        </div>
      </div>
    </div>
		);
		
		return listItems;
  }

  return (
    <div className="Card">

      <FixedField name={'name'}/>
      <FixedField name= {'date'}/>
      {renderIndicators(indicators)}
      <div className="Field">        
        <input className="IndicatorInput" placeholder="name" onChange={(e) => {setName(e.target.value)}}></input>
        <input className="IndicatorInput" placeholder="unit" onChange={(e) => {setUnit(e.target.value)}}></input>
        <div className={`IndicatorMandatory ${(mandatory == true ? 'Red' : 'Grey')}`} onClick={() => {console.log('trigger');setMandatory(prev => !prev); console.log(mandatory)}} >*</div>
        <div className="SubmitButton" onClick={onSubmit}>
          <AddCircleIcon></AddCircleIcon>
        </div>
      </div>
    </div>
  );
}
export default Manager
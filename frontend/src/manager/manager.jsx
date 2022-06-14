//@ts-check

import { useEffect, useState } from "react";
import IndicatorAPI from "../api/IndicatorAPI";
import './../styles/manager.css'
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FixedField from "./fixedField";
import History from '../history'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Manager() {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [mandatory, setMandatory] = useState(false);
  const [indicators, setIndicators] = useState([]);


  const onSubmit = async () => {
    const submitedStatus = await IndicatorAPI.createIndicator({name, unit, mandatory});
    if (submitedStatus) //if indicator can't be submeted
    {
      toast.error(`can't be submited because ${submitedStatus}`)
      return;
    }
    getIndicators();
    document.getElementById("create-form").reset();
  }

  const onDelete = async (id) => {
    //remove from back
    const deleteStatus = await IndicatorAPI.deleteIndicator(id);
    if (deleteStatus) //if indicator can't be deleted
    { 
      toast.error(`can't be deleted because ${deleteStatus}`)
      return;
    }

    //remove from front
    const newIndicators = indicators.filter((indicator) => {return indicator.id != id});
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
    <div className="Frame">
      <div className="Card">
        <FixedField name={'name'}/>
        <FixedField name= {'date'}/>
        {renderIndicators(indicators)}
        <form className="Field" id="create-form">        
          <input className="IndicatorInput" placeholder="name" onChange={(e) => {setName(e.target.value)}}></input>
          <input className="IndicatorInput" placeholder="unit" onChange={(e) => {setUnit(e.target.value)}}></input>
          <div className={`IndicatorMandatory ${(mandatory == true ? 'Red' : 'Grey')}`} onClick={() => {setMandatory(prev => !prev)}} >*</div>
          <div className="SubmitButton" onClick={onSubmit}>
            <AddCircleIcon></AddCircleIcon>
          </div>
        </form>
      </div>
      <History/>
      <ToastContainer />
    </div>
  );
}
export default Manager
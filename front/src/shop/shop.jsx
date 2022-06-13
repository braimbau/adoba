//@ts-check

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import collectionAPI from "../api/api";
import IndicatorAPI from "../api/IndicatorAPI";

import './../styles/shop.css'

function Shop() {
    const [date, setDate] = useState(new Date());
    const [organizationName, setOrganizationName] = useState('');
    const [indicators, setIndicators] = useState([]);

    let map = new Map();

    const onSubmit = () => {
        console.log(map);
    }

    const onFieldChange = (name, value) => {
        map[name] = value;
    }

    const getIndicators = async () => {
        const indicators = await IndicatorAPI.getIndicators();
        setIndicators(indicators);
    }

    useEffect(() => {
        //mount
        getIndicators();
        console.log(indicators)
        return () => {
            //unmount
        }
      }, [])

    const renderIndicators = (list) => {
		const listItems = list.map((indicator) =>
        <div className="Field" key={indicator.id}>
            <input className="IndicatorInput" placeholder={indicator.name} onChange={(e) => {onFieldChange(indicator.name, e.target.value)}}></input>
            <div>{indicator.unit}</div>
            <div className="IndicatorOptions">
                <div className="IndicatorMandatory">{(indicator.mandatory) ? '*' : ''}</div>
            </div>
        </div>
		);
		
		return listItems;
  }

    return (
        <div className="Card">
            <div className="Field">
                <input className="IndicatorInput" placeholder='Organization name' onChange={(e) => {setOrganizationName(e.target.value)}}></input>
                <div className="IndicatorOptions">
                    <div className="IndicatorMandatory">*</div>
                </div>
            </div>
            <div className="Field">
                <DatePicker className="IndicatorInput" onChange={(e) => {setDate(e)}} selected={date}></DatePicker>
                <div className="IndicatorOptions">
                    <div className="IndicatorMandatory">*</div>
                </div>
            </div>
            {renderIndicators(indicators)}
            <div className="ButtonsRow">
                <div className="Button">CANCEL</div>
                <div className="Button" onClick={onSubmit}>SEND</div>
            </div>
        </div>
    );
  }
export default Shop
//@ts-check

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import collectionAPI from "../api/CollectionAPI";
import IndicatorAPI from "../api/IndicatorAPI";
import History from "../history";

import './../styles/shop.css'

function Shop() {
    const [date, setDate] = useState(new Date());
    const [organization, setOrganization] = useState('');
    const [indicators, setIndicators] = useState([]);

    let map = new Map();

    const checkMandatoryIndicators = (mandatory, present) => {
        mandatory.forEach(element => {
            
        });
    }

    const onSubmit = async () => {
        const indicators = [];
        map.forEach((indicator) => {
            indicators.push(JSON.stringify(indicator));
        });
        let ret = await collectionAPI.createCollection({organization, date, indicators});
        console.group(ret);
    }

    const onFieldChange = (name, value, unit) => {
        map.set(name, {name, value, unit})
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
            <input className="IndicatorInput" placeholder={indicator.name} onChange={(e) => {onFieldChange(indicator.name, e.target.value, indicator.unit)}}></input>
            <div>{indicator.unit}</div>
            <div className="IndicatorOptions">
                <div className="IndicatorMandatory">{(indicator.mandatory) ? '*' : ''}</div>
            </div>
        </div>
		);
		
		return listItems;
  }

    return (
        <div>
            <div className="Card">
                <div className="Field">
                    <input className="IndicatorInput" placeholder='Organization name' onChange={(e) => {setOrganization(e.target.value)}}></input>
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
            <History/>
        </div>
    );
  }
export default Shop
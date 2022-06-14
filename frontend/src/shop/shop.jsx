//@ts-check

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import collectionAPI from "../api/CollectionAPI";
import IndicatorAPI from "../api/IndicatorAPI";
import History from "../history";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './../styles/shop.css'

function Shop() {
    const [date, setDate] = useState(new Date());
    const [organization, setOrganization] = useState('');
    const [indicators, setIndicators] = useState([]);
    const [collections, setCollections] = useState(0);

    let map = new Map();

    const checkMandatoryIndicators = (mandatory, present) => {
        let check = true;
        mandatory.forEach(field => {
            if (field.mandatory)
                if (!(present.has(field.name) && present.get(field.name).value != '')){
                    check = false;
                }
        });
        console.log(`check = ${check}`)
        return check;
    }

    const onSubmit = async () => {
        if (!checkMandatoryIndicators(indicators, map)) {
            toast.error('You have to fill all mandatory fields (*)');
            return;
        }
        const indicatorPresent = [];
        map.forEach((indicator) => {
            indicatorPresent.push(JSON.stringify(indicator));
        });
        let status = await collectionAPI.createCollection({organization, date, indicators: indicatorPresent});
        if (status)
            toast.error('An error occured')
        else
            reset();
        setCollections(collections + 1)
    }

    const reset = () => {
        document.getElementById("submit-form").reset();
        map = new Map();
        setOrganization('');
        setDate(new Date());
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
            <div className="ValueField">
                <input className="IndicatorInput" placeholder={indicator.name} onChange={(e) => {onFieldChange(indicator.name, e.target.value, indicator.unit)}}></input>
                <div>{indicator.unit}</div>
            </div>
            <div className="IndicatorMandatory">{(indicator.mandatory) ? '*' : ''}</div>
        </div>
		);
		
		return listItems;
  }

    return (
        <div className="Frame">
            <form className="Card" id="submit-form">
                <div className="Field">
                    <input className="IndicatorInput" placeholder='Organization name' onChange={(e) => {setOrganization(e.target.value)}}></input>
                    <div className="IndicatorMandatory">*</div>
                </div>
                <div className="Field">
                    <DatePicker className="IndicatorInput" onChange={(e) => {setDate(e)}} selected={date}></DatePicker>
                    <div className="IndicatorMandatory">*</div>
                </div>
                {renderIndicators(indicators)}
                <div className="ButtonsRow">
                    <div className="Button" onClick={reset}>CANCEL</div>
                    <div className="Button" onClick={onSubmit}>SEND</div>
                </div>
            </form>
            <History key={collections} />
            <ToastContainer />
        </div>
    );
  }
export default Shop
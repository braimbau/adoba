//@ts-check

import { useEffect, useState } from "react";
import CollectionAPI from "./api/CollectionAPI";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import './styles/history.css'

function HistoryElement(params) {
    const [open, setOpen] = useState(false);
    const indicators = params.element?.indicators.map(element => {
        return JSON.parse(element)
    });
    return (
        <div className="Element">
            <div className="Overview">
                <div>{`Collection for ${params.element.organization} (${params.element.date})`}</div>
                {indicators.length > 0 && <div className="Button" onClick={() => {setOpen(!open)}}>
                    {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
                </div>}
            </div>

            <div>
            {open && indicators?.map((indicator) => {
                return <div key={indicator.name}>{`${indicator.name}: ${indicator.value} ${indicator.unit ? indicator.unit : ''}`}</div>
            })}
            </div>
        </div>

    )
}

function History() {
    const [collections, setCollections] = useState([]);

    const getIndicators = async () => {
        const collections = await CollectionAPI.getCollections();
        setCollections(collections);
    }

    const renderHistory = (list) => {
		const listItems = list.map((element) =>
            <div key={element.id}>
                <HistoryElement element={element}/>
            </div>
		);
		
		return listItems;
  }

    useEffect(() => {
        //mount
        getIndicators();
        return () => {
            //unmount
        }
      }, [])

    return (
        <div className="Card">
            <div>History</div>
            {renderHistory(collections)}
        </div>
    )
}

export default History
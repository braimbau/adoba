//@ts-check

import { useEffect, useState } from "react";
import CollectionAPI from "./api/CollectionAPI";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import './styles/history.css'

function HistoryElement(params) {
    const [open, setOpen] = useState(false);
    const indicators = params.element?.collection_indicators;
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
                return <div key={indicator.id}>{indicator.indicator_id}</div>
            })}
            </div>
        </div>

    )
}

function History() {
    const [collections, setCollections] = useState([]);

    const getCollections = async () => {
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
        getCollections();
        return () => {
            //unmount
        }
      }, [])

    return (
        <div className="Card">
            <div className="Title">History</div>
            {renderHistory(collections)}
        </div>
    )
}

export default History
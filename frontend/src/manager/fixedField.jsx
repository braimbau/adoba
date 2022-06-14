//@ts-check
import DeleteIcon from '@mui/icons-material/Delete';

import './../styles/manager.css'


function FixedField(props) {
    return (
        <div className="Field">
            <div className="IndicatorName">{props.name}</div>
            <div className="IndicatorOptions">
                <div className="IndicatorMandatory">*</div>
                <div className="IndicatorDelete Invisible">
                    <DeleteIcon></DeleteIcon>
                </div>
            </div>
        </div>
    )
}

export default FixedField
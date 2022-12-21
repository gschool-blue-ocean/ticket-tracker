import { useState } from 'react';

const AdminSingle = ({ elem, key }) => {
console.log("elem", elem)
 const [isClicked, setIsClicked] = useState(false);

    // const handleMouseOver = () => {
    //     setIsHovering(true);
    // }
    // const handleMouseOut = () => {
    //     setIsHovering(false);
    // }
    const handleClick = () => {
        setIsClicked(!isClicked);
    }
    // onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
    // {isHovering && <div className="info-email">Click to edit. Press enter when done.</div>}
    return (
        <div className='single-ticket'>
            <div className="ticket-div-num" onClick={handleClick}>{elem.ticket_id}
                {isClicked && 
                <div className="ticket-info">
                    <div id="assigned-by">Submitted by:</div> {elem.assigned}<br /><br />
                    <div id="ticket-descrip">Ticket description:</div>{elem.descrip}
                </div>}
            
        </div>
            <div className="ticket-div">{elem.name}</div>
            <div className="ticket-div">{elem.category}</div>
            <div className={elem.priority === 'Urgent' ? "ticket-pri-red" 
                : elem.priority === 'Priority' ? "ticket-pri-orange" 
                : elem.priority === 'Routine' ? "ticket-pri-yellow" 
                : elem.priority === 'Minor' ? "ticket-pri-green" : null}>
                    {elem.priority}
            </div>
            <div className="ticket-div">{elem.status}</div>
            <div className="ticket-div">{elem.eta}</div>
        </div>
    )
}


export default AdminSingle
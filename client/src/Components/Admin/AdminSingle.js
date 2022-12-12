

const AdminSingle = ({ elem, key }) => {
    return (
        <div className='single-ticket'>
            <div className="ticket-div">{elem.ticket_id}</div>
            <div className="ticket-div">{elem.name}</div>
            <div className="ticket-div">{elem.category}</div>
            <div className={elem.priority === '1' ? "ticket-pri-red" 
                : elem.priority === '2' ? "ticket-pri-orange" 
                : elem.priority === '3' ? "ticket-pri-yellow" 
                : elem.priority === '4' ? "ticket-pri-green" : null}>
                    {elem.priority === "1" ? 'Urgent' 
                        : elem.priority === "2" ? 'Priority'
                        : elem.priority === "3" ? 'Routine'
                        : elem.priority === "4" ? 'Minor'
                    : null}</div>
            <div className="ticket-div">{elem.status}</div>
            <div className="ticket-div">{elem.eta}</div>
        </div>
    )
}


export default AdminSingle
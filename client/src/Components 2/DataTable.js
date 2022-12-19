import axios from "axios"
import { useState } from "react"
import { BsTrash } from "react-icons/bs"
import { FaPencilAlt, FaRegWindowClose } from "react-icons/fa"
// import Manage from "../Portals/ManageInput"
// import EditableLabel from 'react-inline-edit';

const DataTable = ({ data, reRender }) => {
    console.table('id', data.user_id)
    // const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userName, setUserName] = useState(data.username);
    const [emailInfo, setEmailInfo] = useState(data.email);
    const [accessRole, setAccessRole] = useState(data.accessrole);
    const [campusName, setCampusName] = useState(data.campus_name);

    // const [isHovering, setIsHovering] = useState(false);

    // const handleMouseOver = () => {
    //     setIsHovering(true);
    // }
    // const handleMouseOut = () => {
    //     setIsHovering(false);
    // }
    // onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
    // {isHovering && <div className="info-email">Click to edit. Press enter when done.</div>}

    const editModeClick = () => {
        setEditMode(true);
    }


    const handledelete = async (id) => {
        await axios.delete(`http://localhost:6001/admin/Account/delete/${id}`);
        reRender()
        // console.log(id)
        // console.log(data.user_id)
    };
    const editAccount = async (e) => {
        // if(e.code === "Enter" || e.code === "NumpadEnter"){
        
        await axios.patch(
          `http://localhost:6001/admin/Accounts/edit/${data.user_id}`,
          { userName, emailInfo, accessRole, campusName }
        );
        // setUserName("");
        // setEmailInfo("");
        reRender()
        e.target.blur()
        setEditMode(false);
        
      };
      const setPatchInfo = (e) => {
            if(e.target.name === "usernameInfo"){
                setUserName(e.target.value);
            } else if (e.target.name === "email"){
                setEmailInfo(e.target.value);
            } else if (e.target.name === "role"){
                setAccessRole(e.target.value);
            } else if (e.target.name === "campus"){
                setCampusName(e.target.value);
            }

        console.log(userName, emailInfo)    
      }
    return (
        <>
            <div id={data.user_id} className="Data_Table">

                <table className="AccountTable">
                    <thead>
                        <tr>
                            <div className="UserNameData" scope="col"></div>
                            <div className="EmailData" scope="col"></div>
                            <div className="RoleData" scope="col"></div>
                            <div className="CampusData" scope="col"></div>
                            <div className="EditAndDelete" scope="col"></div>
                            <div className="EditAndDelete" scope="col"></div>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="AccountContainer">
                          
                            
                            <div><input id={editMode === false ? "test-input" : "test-input-edit"} type="text" 
                                value={userName} name="usernameInfo" onChange={setPatchInfo}/>
                            </div>
                            <div><input id={editMode === false ? "test-input" : "test-input-edit"} type="text" 
                               value={emailInfo} name="email" onChange={setPatchInfo}/>
                            </div>
                            <div><input id={editMode === false ? "test-input" : "test-input-edit"} type="text" 
                               value={accessRole} name="role" onChange={setPatchInfo}/>
                            </div>
                            <div><input id={editMode === false ? "test-input" : "test-input-edit"} type="text" 
                               value={campusName} name="campus" onChange={setPatchInfo}/>
                            </div>
                            {/* <div className="AccountTableCells">{data.username}</div>
                            <div className="AccountTableCells4">{data.email}</div> */}
                            {/* <div className="AccountTableCells3">{data.accessrole}</div>
                            <div className="AccountTableCells2">{data.campus_name}</div> */}
                            <div className="AccountTableCell5">
                                {/* <div className="editBTN" onClick={() => setOpen(true)}><FaPencilAlt /></div> */}
                                {!editMode && <div className="editBTN" onClick={editModeClick}><FaPencilAlt 
                                    className="green-pencil"/></div>}
                                {editMode && <div className="editBTN" ><FaRegWindowClose 
                                    className="red-pencil" onClick={editAccount}/></div>}
                                {/* <Manage open={open} close={() => setOpen(false)} data={data} reRender={reRender} /> */}
                                <div className='deleteBTN' onClick={() => { handledelete(data.user_id) }} ><BsTrash 
                                    className="trash"/></div>
                            </div>
                        </tr>
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default DataTable
// /admin/Accounts
// onClick={handleEdit(data.user_id)

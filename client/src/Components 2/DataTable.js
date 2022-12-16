import axios from "axios"
import { useState } from "react"
import { BsTrash } from "react-icons/bs"
import { FaPencilAlt } from "react-icons/fa"
import Manage from "../Portals/ManageInput"
// import EditableLabel from 'react-inline-edit';

const DataTable = ({ data, reRender }) => {
    console.table('id', data.user_id)
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState(data.username);
    const [emailInfo, setEmailInfo] = useState(data.email);


    const handledelete = async (id) => {
        await axios.delete(`http://localhost:6001/admin/Account/delete/${id}`);
        reRender()
        // console.log(id)
        // console.log(data.user_id)
    };
    const editAccount = (e) => {
        if(e.code === "Enter" || e.code === "NumpadEnter"){
        
        axios.patch(
          `http://localhost:6001/admin/Accounts/edit/${data.user_id}`,
          { userName, emailInfo }
        );
        // setUserName("");
        // setEmailInfo("");
        reRender()
        e.target.blur()
        }
      };
      const setPatchInfo = (e) => {
            if(e.target.name === "usernameInfo"){
                setUserName(e.target.value);
            } else {
                setEmailInfo(e.target.value);
            }
            
            // editAccount(data.user_id);
            
        
        console.log(userName, emailInfo)
        
      }
    return (
        <>
            <div id={data.user_id} className="Data_Table">

                <table className="AccountTable" title="table1">
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
                          
                            
                            <div><input id="test-input" type="text" 
                                value={userName} name="usernameInfo" onChange={setPatchInfo} onKeyDown={editAccount}/>
                            </div>
                            <div><input id="test-input" type="text" 
                               value={emailInfo} name="email" onChange={setPatchInfo} onKeyDown={editAccount}/>
                            </div>
                            {/* <div className="AccountTableCells">{data.username}</div>
                            <div className="AccountTableCells4">{data.email}</div> */}
                            <div className="AccountTableCells3">{data.accessrole}</div>
                            <div className="AccountTableCells2">{data.campus_name}</div>
                            <div className="AccountTableCell5">
                                <div className="editBTN" onClick={() => setOpen(true)}><FaPencilAlt /></div>
                                <Manage open={open} close={() => setOpen(false)} data={data} reRender={reRender} />
                                <div className='deleteBTN' onClick={() => { handledelete(data.user_id) }} ><BsTrash /></div>
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

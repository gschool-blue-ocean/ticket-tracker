import { Dialog } from "primereact/dialog";
import { useState, useEffect, useContext } from "react";
import PicContext from "../Contexts/UserPContext";
import LoginContext from "../Contexts/loginContext";
import { BiLogOut } from 'react-icons/bi'

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import axios from "axios";

import { Button } from 'primereact/button';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Link } from "react-router-dom";
const User = () => {
  const { fetchReq, fileState, pic, setPic } = useContext(PicContext);
  const { handleLogOut } = useContext(LoginContext)

  const [imageCrop, setImageCrop] = useState(false);
  const [category, setCategory] = useState([]);
  const [urgency, setUrgency] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [date, setDate] = useState(null);
  const [inputBox, setInputBox] = useState('');
  const [updatePic, setUpdatePic] = useState(null)


  //access token through sessionStorage
  const testToken = sessionStorage.getItem("testToken");
  //set the payload portion into a variable
  const getPayload = testToken.split(".")[1];
  //parse the decoded payload to access obj
  const payloadObj = JSON.parse(atob(getPayload));

  const { iat, email, userName, user_id, profilePic, campus_id } = payloadObj;


  //This allows us to re-render the page //
  const [submitTicket, setSubmitTicket] = useState(false);
  const [err, setErr] = useState({})

  useEffect(() => {
    //set the photo initially from databse
    setUpdatePic(profilePic)

    const renderTickets = async (e) => {
      const response = await axios.get(`http://localhost:6001/user/${user_id}`);
      // console.log(response.data);
      setSubmitTicket(false);
      setTickets(response.data);
      //   await ticketService.getTicketsSmall().then(data => setTickets(data));
    };
    renderTickets();
  }, [submitTicket]);

  const columns = [
    { field: "ticket_id", header: "Ticket #" },
    { field: "to_char", header: "Submission" },
    { field: "category", header: "Category" },
    { field: "priority", header: "Urgency" },
    { field: "status", header: "Status" },
    { field: "assigned", header: "Tech" },
    { field: "descrip", header: "Details" }
  ];


  useEffect(() => {
    //once imaage is uploaded on s3 bucket
    //reassign pic to pfp
    let pfp = pic
    if (pfp === '') return
    const renderPFP = async () => {
      const { data } = await axios.patch(`http://localhost:6001/user/${user_id}`, { pfp })
      //setUpdatePic state to new photo once updated on db
      const newPhoto = data[0].profilepic
      setUpdatePic(newPhoto)
      //reset pic to entry string
      setPic('')
    }
    renderPFP()
  }, [pic])


  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      // console.log(inputBox)
      const response = await axios.post(
        "http://localhost:6001/User/ticket/create",
        {
          user_id: user_id,
          category,
          descrip: inputBox,
          assigned: "Pending",
          priority: urgency,
          eta: null,
          email: email,
          status: "in progress",
          campus_id: campus_id,
          create_date: date,
          resolved: null,
        }
      );

      setSubmitTicket(true);
      setCategory([])
      setUrgency([])
      setDate(null)
      setInputBox('')
      setErr({})
      console.log(response);
    } catch (error) {
      console.log(error.response.data.error)
      if (error.response.data.error) return setErr(error.response.data.error)
    }
  };

  const dynamicColumns = columns.map((col, i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  const categorySelectItems = [
    { label: "Hardware", value: "Hardware" },
    { label: "Software", value: "Software" },
    { label: "Infrastructure", value: "Infrastructure" },
    { label: "Wi-Fi", value: "Wi-Fi" },
    { label: "Other", value: "Other" },
  ];

  const urgencyItems = [
    { label: "1 - Urgent", value: "Urgent" },
    { label: "2 - Priority", value: "Priority" },
    { label: "3 - Routine", value: "Routine" },
    { label: "4 - Minor", value: "Minor" },
  ];

  return (
    <>
      <div className="user-main">
        <div className="main-header-container">
          <h1 className="main-header">Welcome, {userName}!</h1>
          <Link to="/">
            <button className="logout-btn-user" onClick={handleLogOut}> <BiLogOut /> Sign Out</button>
          </Link>
        </div>

        <div className="profile_img text-center p-4">
          <div className="flex flex-column justify-content-center align-items-center">
            <img
              className="avatar-image"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid green",
              }}
              onClick={() => setImageCrop(true)}
              src={updatePic}
              alt=''
            />
            {/* <label htmlFor='' className='mt-3 font-semibold text-5x1'>placeHolder</label> */}
            <Dialog
              visible={imageCrop}
              header={() => (
                <p htmlFor="" className="text-2x1 font-semibold textColor">
                  Update Profile Picture
                </p>
              )}
              onHide={() => setImageCrop(false)}
            >
              <div>
                <form onSubmit={fetchReq}>
                  <label className='file-box'>
                    <input type="file" onChange={fileState}></input>
                    Choose Image
                  </label>
                  <input className="upload" type="submit" />
                </form>
              </div>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="ticket-card">
        <div className="ticket-Creation-Container">
          <h2 className="create-Ticket">Create a Ticket</h2>
          <span id="rtr-s-Paragraph_2_0" className="span-category">
            Please select a category.
          </span>
          <div className="Ticket-Creation">
            <Dropdown
              className="category-Drop"
              value={category}
              options={categorySelectItems}
              onChange={(e) => setCategory(e.value)}
              placeholder="Select a Category"
            />
            {err.category && <p className="error-userPage">{err.category}</p>}
          </div>
          <span id="urgency-Span">Please select an urgency.</span>
          <div className="ticket-Urgency">
            <Dropdown
              className="urgency-Drop"
              value={urgency}
              options={urgencyItems}
              onChange={(e) => setUrgency(e.value)}
              placeholder="Select Urgency"
            />
            {err.priorty && <p className="error-userPage">{err.priorty}</p>}
          </div>
          <span className="date-Span">Please select Date</span>
          <div className="ticket-Date">
            <Calendar
              className="date-Drop"
              dateFormat="mm/dd/yy"
              value={date}
              onChange={(e) => setDate(e.value)}
            ></Calendar>
            {err.create_date && <p className="error-userPage">{err.create_date}</p>}
          </div>
          <span className="span-Input">Please provide specific details.</span>
          <div className="paddingLayer">
            <textarea tabIndex="-1" placeholder="" className="input-Box" value={inputBox} onChange={(e) => setInputBox(e.target.value)}></textarea>
            {err.descrip && <p className="error-userPage">{err.descrip}</p>}
          </div>
          <button className="ticket-submit" onClick={onSubmitForm}>
            Submit
          </button>

        </div>

        <div className="card"
          style={{ height: 'calc(80vh - 145px)' }}>
          <h2 style={{ fontFamily: "'Primeform Pro','sans- serif'" }}>Your Tickets</h2>

          <DataTable
            value={tickets}
            className="ticket-Table"
            responsiveLayout="scroll"
            scrollable scrollHeight="flex"
          >
            {dynamicColumns}
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default User;
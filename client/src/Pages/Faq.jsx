import React from "react";
import { ReactDOM } from "react";
import ReactMarkdown from 'react-markdown';
import Fuse from "fuse.js";
import LoginContext from "../Contexts/loginContext";
import Header from "../Components/Admin/header";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import "../CssFiles/faq.css";
import { FaSearch, FaPencilAlt, FaTrash, FaPlusSquare } from "react-icons/fa";
//import { BsTrash } from "react-icons/bs"
const Faq = () => {
  const { user } = useContext(LoginContext)
  const [faqList, setFaqList] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [renderFaq, reRenderFaq] = useState(false)

  const getDatatFromDB = async () => {
    const { data } = await axios.get("http://localhost:6001/faq");
    setFaqList(data);
  };
  useEffect(() => {   
    getDatatFromDB();
  }, [renderFaq]);
   //fuse.js search setup
  const fuse = new Fuse(faqList, {
    keys: ["title", "summary", "id"],
    includeScore: true,
  });
  const results = fuse.search(searchTerm);
  const faqResults = searchTerm
    ? results.map((results) => results.item)
    : faqList;
  function handleSearch(e) {
    e.preventDefault();
    const value = e.target.value;
    console.log(value);
    setSearchTerm(value);
  } 
  // updates database with new title/body when enter is pressed, and closes out edit mode
  const handleUpdate = function (divId, dataType) {
    return async function(e) {
      if (e.key === 'Enter'){
        const { data } = await axios.patch("http://localhost:6001/faq", {
          id : divId,
          column: dataType,
          value: e.target.value
        })
        setEditMode(!editMode);
        reRenderFaq(!renderFaq); 
      }
    }
  }
  //create new blank article to edit
  const handleCreate = async () => {
    const { data } = await axios.post("http://localhost:6001/faq")
    console.log(data)
    searchTerm ? faqResults.push(data[0]) : faqList.push(data[0])
    reRenderFaq(!renderFaq); 
  }
  //toggle between plain text and editable input boxes
  const handleEdit = (e) => { 
      e.stopPropagation();
      setEditMode(!editMode)   
  }
  //delete referenced article
  const handleDelete = async function(deleteId){
    console.log('deleting ', deleteId)
    const {data} = await axios.delete(`http://localhost:6001/faq/${deleteId}`)
    reRenderFaq(!renderFaq)
    console.log(data)
  }

  return (
    
    <>
      <Header />
      <div className="faq-header">
        <div class="box">
          <form name="search">
            <input
              type="text"
              class="input"              
              value={searchTerm}
              placeholder="Search FAQs"
              onChange={handleSearch}
            />
          </form>
          <FaSearch className="fasfa-search"></FaSearch>
        </div>
        <FaPlusSquare className='create-faq' onClick={() => handleCreate()}/>
      </div>
      
      {/* maps over articles that match search, defaults to all if no search is present */}
      {faqResults.slice(0).reverse().map((i) => {
        const { title, summary, id } = i;
        console.log(id)
        return (  
            <details>
            {/* adds edit/delete if admin */}
            {user.accessRole === 'admin' 
            ? <div className='adminIcons'>
                <FaPencilAlt onClick={(e) => handleEdit(e)}/>
                <FaTrash onClick={() => handleDelete(id)}/>
              </div> 
            : ''}
              <summary>
              {/* toggles title between editable and not when edit button is clicked */}
              {editMode === true 
              ? <input type='text' className='title-input' defaultValue={title} onKeyDown={handleUpdate(id, 'title')}></input> 
              : <ReactMarkdown>{title}</ReactMarkdown>}
              </summary>
                {/* toggles body between editable and not when edit button is clicked  */}
                {editMode === true 
                ? <input type='text' className='summary-input' defaultValue={summary} onKeyDown={handleUpdate(id, 'summary')}></input>
                : <ReactMarkdown>{summary}</ReactMarkdown>}    
            </details>           
        );
      })}
      
    </>
  );
};
export default Faq;

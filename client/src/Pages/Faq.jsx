import React from 'react'
import Modal from 'react-modal'
import { ReactDOM } from 'react'
import Fuse from 'fuse.js'
import Header from '../Components/Admin/header'
import { useState, useEffect, useContext, useRef } from "react";
import axios from 'axios';
import { FiChevronDown } from "react-icons/fi"
import '../CssFiles/faq.css'

const Faq = () => {
  const [faqList, setFaqList] = useState([]);
  const [faqSearch, setFaqSearch] = useState('');
  useEffect(() => {
    const getDatatFromDB = async () => {
        const { data } = await axios.get("http://localhost:6001/faq");
        setFaqList(data)
        console.log(data)
    }
    getDatatFromDB()
}, [])
const handleChange = (e) =>{
    // e.preventDefault();
    if (e.key === 'Enter') {
      console.log('do validate');
      setFaqSearch(e.target.value);
    }
    
}
  
  return (
    
    <>
    <Header />
      <input type='search' placeholder='Search FAQs by Title' onKeyDown={handleChange}/>
      {/* search button */}
      {faqList.map(i => {
        return <>
        {console.log(i.id)} 
        <details>
          <summary>{i.title}</summary>
          {i.summary}
        </details>
        </>             
      })}
      
    </>
  )
}

export default Faq

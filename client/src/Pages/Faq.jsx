import React from "react";
import { ReactDOM } from "react";
import Fuse from "fuse.js";
import Header from "../Components/Admin/header";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { FiChevronDown } from "react-icons/fi";
import "../CssFiles/faq.css";
import { FaSearch } from "react-icons/fa";

const Faq = ({ user }) => {
  console.log("this is in faq", user);
  const [faqList, setFaqList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getDatatFromDB = async () => {
      const { data } = await axios.get("http://localhost:6001/faq");
      setFaqList(data);

      console.log(data);
    };
    getDatatFromDB();
  }, []);

  const fuse = new Fuse(faqList, {
    keys: ["title", "summary"],
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

  return (
    <>
      <Header />
      <div className="faq-header">
        <div class="box">
          <form name="search">
            <input
              type="text"
              class="input"
              name="txt"
              onmouseout="this.blur() this.placeholder=''"
              value={searchTerm}
              placeholder="Search FAQs"
              onChange={handleSearch}
            />
          </form>
          <FaSearch className="fasfa-search"></FaSearch>
        </div>
      </div>

      {faqResults.map((i) => {
        const { title, summary } = i;
        return (
          <>
            <details>
              <summary>{title}</summary>
              {summary}
            </details>
          </>
        );
      })}
    </>
  );
};

export default Faq;

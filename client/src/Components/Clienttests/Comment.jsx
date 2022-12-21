import React from "react";
const Comment = (props) => {
   return (
         <>
           <div className="container">
               <div className="row justify-content-center">
                   <div 
                      className="col col-xl-11 col-lg-11 col-md-10 col-sm-8 col-xs-8">
                      <div 
                         className="card" data-testid='testing'
                         style={{ 'width': '80%' }}>
                            test text
                            
                        <div 
                           className="card-body" data-testid="name"
                           style={{ 'backgroundColor': '#edf0ed' }}>
                                
                                <b>{props.name}</b>
                                <p>{props.description}</p>
                            
                          </div>
                      </div>
                    </div>
                </div>
            </div>
            <br />
        </>
)}
export default Comment;
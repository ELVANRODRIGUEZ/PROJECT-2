import React, { Component } from 'react';
import "./style.css"

class MailRetrieve extends Component {
 
  state = {
    savedMails: this.props.savedMails,
   };

 render() {
   return (
     <>
       <div>
         {!this.props.savedMails.length ? (
           <h2 >No History Yet</h2>
         ) : (
             <div>
               <h2 id="title">Task Mail History</h2>
               {this.props.savedMails.map(mail => {
                 return (
                   <div id="mailList" key={mail._id}>
                     <p  id="firstLine" >
                        <strong>Sended On: </strong> {mail.createdAt}
                      </p>
                     <p >
                       <strong>From:</strong> {mail.senderName + " <" + mail.senderEmail + "> "}{" "}
                     </p>
                     <p >
                       <strong>To:</strong> {mail.email}{" "}
                     </p>
                     <p >
                       <strong>Subject:</strong> {mail.mailSubject}{" "}
                     </p>
                     <p >
                       <strong>Message:</strong> {mail.message}{" "}
                     </p>
                     <p >
                        <strong>Attachments:</strong> {mail.fileName}{" "}
                      </p>
                     <hr />
                   </div>
                 );
               })
               }
             </div>
           )
         }
       </div>
     </>
   );
 };
};

export default MailRetrieve; 
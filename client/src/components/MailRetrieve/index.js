import React, { Component } from 'react';

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
               <h2>Task Mail History</h2>
               {this.props.savedMails.map(mail => {
                 return (
                   <div key={mail._id}>
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
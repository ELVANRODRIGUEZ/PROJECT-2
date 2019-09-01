import React from "react";

function Initials(props) {

let initials = props.name.match(/\b\w/g) || [];
initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return <img className="chat-message-authtorInitials" src={"https://dummyimage.com/70/4aaaa5/000000&text="+initials} alt="nameInitials"></img>;
}

export default Initials;

import React from "react";

// The Math function component accepts a props argument
function Initials(props) {

let initials = props.name.match(/\b\w/g) || [];
initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
 
// <img src="https://dummyimage.com/250/4aaaa5/000000&text=IG" alt="sunil">

  return <img src={"https://dummyimage.com/70/4aaaa5/000000&text="+initials} alt="nameInitials"></img>;
}

export default Initials;

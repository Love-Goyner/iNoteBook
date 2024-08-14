import React from 'react'

export default function Alert(props) {
    const firstCaptial = (msg) => {
      if(msg === "danger"){
        msg = "Error";
      }
        let text = msg.toLowerCase();
        return text.charAt(0).toUpperCase() + text.slice(1);

    }
  return (
    <div style={{height: '50px'}}>{
      props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{firstCaptial(props.alert.type)}</strong>: {props.alert.message}
    </div>
    }
    </div>
  )
}

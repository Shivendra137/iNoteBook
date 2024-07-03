import React from 'react'

export default function Alert(props) {

    const capitalize= (word) => {

        const lower = word.toLowerCase();

        return lower.charAt(0).toUpperCase() +  lower.slice(1);
    }
  return (

     
    <div  style={{height:'50px', width: '90vw'}}> 
  {props.alert &&  <div className={`d-flex justify-content-start alert alert-${props.alert.type} alert-dismissishowble fade show`}  role="alert">
 <div> <strong>{capitalize(props.alert.type)}</strong> {props.alert.msg}</div>

</div>}
</div>
      

    
  )
}

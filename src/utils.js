 import React , {useState} from "react";

export const isValidate = (FormData , setFormdata)=>{
    console.log("formdata in valid is : " , FormData)
    
     let isValid =  true
     let updatedFormData = {...FormData}

     Object.keys(updatedFormData).forEach((key)=>{
        const field = updatedFormData[key]
        console.log("field is : " , field)
        
        field.error = ''
        if(field.isRequired && !field.value){
            field.error = `${field.name} is required.`
            isValid = false
        }
        if(field.name == 'email' && field.value){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.error = "Invalid email format.";
                isValid = false;
            }
        }
        console.log("field after update is : " , field)
        updatedFormData[key] = field
     })
     console.log( "after check : " , updatedFormData)
     
     setFormdata(updatedFormData)
     return isValid
 }
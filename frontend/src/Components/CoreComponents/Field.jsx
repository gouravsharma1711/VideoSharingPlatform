import React from 'react'
import FormLabel from './FormLabel'
import FormInput from './FormInput'

function Field({
    forLabel,
    lableCustomClass,
    lableChildren,
    inputPlaceHolder='',
    type,
    name,
    value,
    InputCustomClass,
    InputId,
    isRequired=false,
    onChange=()=>{},
    canChange=true,
    ...rest
}) {

    return (
        <>
            <FormLabel forLabel={forLabel} customClass={lableCustomClass} children={lableChildren}  />
            <FormInput placeholder={inputPlaceHolder} type={type} name={name} value={value} customClass={InputCustomClass} id={InputId} isRequired={isRequired} onChange={onChange} canChange={canChange} {...rest} ></FormInput>
        </>
        
    )
}

export default Field

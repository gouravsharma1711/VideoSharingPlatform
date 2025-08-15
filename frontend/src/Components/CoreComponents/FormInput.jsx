import React from 'react'

function FormInput(
    {
        placeholder='',
        type,
        name,
        value,
        customClass='',
        id,
        isRequired=false,
        onChange=()=>{},
        canChange=true,
        ...rest
    }
) {
    return (
        <input type={type} value={value} name={name} id={id} className={customClass} placeholder={placeholder} required={isRequired} onChange={onChange} disabled={!canChange} {...rest} />
    );
}

export default FormInput

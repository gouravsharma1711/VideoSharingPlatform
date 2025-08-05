

function FormLabel({
    forLabel,
    customClass,
    children
}) {
    return (
        <label htmlFor={forLabel} className={customClass}>{children}</label>
    )
}

export default FormLabel

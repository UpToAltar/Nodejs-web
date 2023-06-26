export const generate = (field) => {
    let output = ''
    output += `${field.charAt(0).toUpperCase()}${field.charAt(1).toUpperCase()}${field.length}`; 
    return output
}
export const generate2 = (field) => {
    let output = ''
    output += `${field.charAt(0).toUpperCase()}${field.slice(1, field.length)}`; 
    return output
}
export const obtenFecha = objetoDate => {
    const months = ["ENE", "FEB", "MAR","ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    let date = new Date(objetoDate)
    let formatted_date = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()
    return formatted_date;
}
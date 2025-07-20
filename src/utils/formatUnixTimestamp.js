//Función para formatear el tiempo de versión unix a version texto legible.
//Se tiene que pasar como parametro el tipo de formato que queremos que devuelva.

export function formatUnixTimestamp(unixTimestamp, formatType) {
    const date = new Date(unixTimestamp * 1000);
    switch (formatType) {
        case "hour":
            return date.getHours();
        case "date":
            return `${date.getDate()}/${date.getMonth() + 1}`;
        case "fullDate":
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        default:
            return"Error, you haven't sent the format type parameter: hour, date or fullDate ";
    }
}
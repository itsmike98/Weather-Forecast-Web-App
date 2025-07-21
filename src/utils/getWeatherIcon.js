export function getWeatherIcon(nocheDia, icon) {
    if (!icon) {
        // Previene errores si icon es undefined o null
        return "Weather-icons/default.svg";
    }

    if (nocheDia === "day") {
        return `Weather-icons/Day-icons/${icon}.svg`;
    } else if (nocheDia === "night") {
        return `Weather-icons/Night-icons/${icon}.svg`;
    } else {
        const suffix = icon.slice(-1); // Solo se ejecuta si icon es válido
        if (suffix === "d") {
            return `Weather-icons/Day-icons/${icon}.svg`;
        } else if (suffix === "n") {
            return `Weather-icons/Night-icons/${icon}.svg`;
        } else {
            return `Weather-icons/${icon}.svg`;
        }
    }
}

export function getWeatherIcon(nocheDia, icon) {
    if(nocheDia === "day"){
        return `Weather-icons/Day-icons/${icon}.svg`
    }else {
        return `Weather-icons/Night-icons/${icon}.svg`
    }
}
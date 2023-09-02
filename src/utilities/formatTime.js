export function formatTime (waitTime) {
    const deliveryTime = new Date(Date.now() + (waitTime * 60 * 1000))
    const date = deliveryTime.getDate() 
    const month = deliveryTime.getMonth() + 1
    const hours = deliveryTime.getHours()
    const minutes = deliveryTime.getMinutes()
    
    return `${date < 10 ? "0" + date : date}.${month < 10 ? "0" + month : month} ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`
}
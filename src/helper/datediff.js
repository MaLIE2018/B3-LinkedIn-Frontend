import { differenceInCalendarDays, differenceInHours, differenceInMinutes } from "date-fns";


const dateDiff = (date, now) => {
  const actDate = new Date(date)
  const daysDiff =  differenceInCalendarDays(now,actDate)
  const hoursDiff = differenceInHours(now,actDate)
  const minutesDiff = differenceInMinutes(now,actDate)
  if(daysDiff !== 0){
      return daysDiff + " d "
  } else if(hoursDiff !== 0){
      return differenceInHours(now,actDate) + " h "
  } else if(minutesDiff !== 0){
    return differenceInMinutes(now,actDate) + " min "
  }else{
    return "Now"
  }
}

export default dateDiff


export const checkImg = async(url) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      return true
    }else{
      return false
    }
  } catch (error) {
      
  }
    
}
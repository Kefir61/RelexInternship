export const briefLongNum = (num:number):string => {
    if(num<1000) return num.toString()
    else if (num<1000000) return`${Math.floor(num/1000)}т.`
    return `${Math.floor(num/1000000)}м.`
}
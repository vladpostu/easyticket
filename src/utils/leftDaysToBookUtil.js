export function leftDaysToBookUtil(datePrm) {
    const dif = new Date(datePrm) - (new Date)
    const daysLeftToBook = Math.ceil(dif / (1000 * 60 * 60 * 24))

    return daysLeftToBook
}
import { intervalToDuration } from 'date-fns'

export default class DateTime {
  static getCurrentDate() {
    const date = new Date()

    let day = ('0' + date.getDate()).slice(-2)
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let year = date.getFullYear()

    return `${year}-${month}-${day}`
  }

  static getCurrentTime() {
    const _date = new Date()

    let hour = ('0' + _date.getHours()).slice(-2)
    let minute = ('0' + _date.getMinutes()).slice(-2)

    return `${hour}:${minute}`
  }

  static getCurrentYear() {
    const date = new Date()

    return date.getFullYear()
  }

  static amPmFormatter(date: string) {
    const [_hour, minute] = date?.match(/[^:]+/gi) ?? []
    const hour = _hour?.includes('T') ? _hour.split('T')[1] : _hour
    let amPm = 'AM'
    let updatedHour = Number(hour)
    if (updatedHour >= 12) {
      amPm = 'PM'
      updatedHour = updatedHour - 12
    }
    if (updatedHour === 0) {
      updatedHour = 12
    }

    return `${
      updatedHour.toString().length < 2 ? '0' + updatedHour : updatedHour
    }:${minute} ${amPm}`
  }

  static formateTime(date: Date) {
    let hour = ('0' + date.getHours()).slice(-2)
    let minute = ('0' + date.getMinutes()).slice(-2)

    return this.amPmFormatter(`${hour}:${minute}`)
  }

  static formatDate(date: Date, joinSymbol: string = '-') {
    let day = ('0' + (date ?? Date.now()).getDate()).slice(-2)
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let year = date.getFullYear()

    return `${year}${joinSymbol}${month}${joinSymbol}${day}`
  }

  static slashDateFormat(date: Date) {
    let day = ('0' + date.getDate()).slice(-2)
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  static getDefaultDate() {
    const isToReturn =
      process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' // TODO: Resolve test env or remove this line of code
    return this.getCurrentDate()
  }

  static getInterval(start: string, end: string) {
    const intervals = intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    })

    const format =
      !intervals?.minutes && intervals?.seconds! < 60
        ? `${intervals.seconds} second${
            (intervals?.seconds || 0) > 1 ? 's' : ''
          }`
        : !intervals?.hours && intervals?.minutes! < 60
        ? `${intervals.minutes} minute${
            (intervals?.minutes || 0) > 1 ? 's' : ''
          }`
        : !intervals?.days && intervals?.hours! < 24
        ? `${intervals.hours} hour${(intervals?.hours || 0) > 1 ? 's' : ''}`
        : !intervals?.months
        ? `${intervals.days} day${(intervals?.days || 0) > 1 ? 's' : ''}`
        : !intervals?.years && intervals?.months! < 12
        ? `${intervals.months} month${(intervals?.months || 0) > 1 ? 's' : ''}`
        : `${intervals?.years} year${(intervals?.years || 0) > 1 ? 's' : ''}`

    return format
  }
}

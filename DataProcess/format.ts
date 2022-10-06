const dateFormat = (dateInput: Date, format: string): string => {
    format = format.replace(/yyyy/, String(dateInput.getFullYear()))
    format = format.replace(/MM/, String(dateInput.getMonth() + 1))
    format = format.replace(/dd/, String(dateInput.getDate()))
    return format
}

dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日') // 2020年04月01日

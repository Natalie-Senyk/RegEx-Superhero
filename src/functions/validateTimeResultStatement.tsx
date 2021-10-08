
export const validateTimeResultStatement = (minutes: number, hours: number, updateTimeStatement: (result: string) => void) => {

  hours === 0 && minutes === 0 && updateTimeStatement("less than a minute!")
  hours === 0 && minutes > 1 && updateTimeStatement(`${minutes} minutes`)
  hours === 0 && minutes === 1 && updateTimeStatement(`${minutes} minute`)

  hours === 1 && minutes === 0 && updateTimeStatement(`${hours} hour`)
  hours === 1 && minutes === 1 && updateTimeStatement(`${hours} hour and ${minutes} minute`)
  hours === 1 && minutes > 1 && updateTimeStatement(`${hours} hour and ${minutes} minutes`)

  hours > 1 && minutes === 0 && updateTimeStatement(`${hours} hours`)
  hours > 1 && minutes === 1 && updateTimeStatement(`${hours} hours and ${minutes} minute`)
  hours > 1 && minutes > 1 && updateTimeStatement(`${hours} hours and ${minutes} minutes`)

}




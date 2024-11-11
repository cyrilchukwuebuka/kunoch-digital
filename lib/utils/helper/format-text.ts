export const capitalizeWord = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1)
export const commaSeperatedNumberFormat = (value: number) =>
  new Intl.NumberFormat().format(value)

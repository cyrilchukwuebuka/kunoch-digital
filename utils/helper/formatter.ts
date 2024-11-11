export default class Formatter {
  static standardNumberFormat(value: string): number {
    let newValue = value ? value.replace(",", "") : "0";
    newValue =
      newValue.match(/[^.]+/m)?.length !== 0
        ? (newValue.match(/[^.]+/m)![0] as string)
        : "0";
    return Number(newValue);
  }

  static standardCurrencyFormat(value: number): string {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(value);
  }
}

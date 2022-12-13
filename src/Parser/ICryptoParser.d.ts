import { Currency } from "../types/Currency";

export interface ICryptoParser {
    RefreshCurrencyList(): Promise<void | null | string>,
    GetCurrencyList(): Array<Currency>,
    GetCurrencyByName(name: string): Promise<Currency | string>,
    GetCurrencyByShortname(shortname: string): Promise<Currency | string>,
    GetTopCurrency(positions: number): Promise<Currency[] | string>,
}
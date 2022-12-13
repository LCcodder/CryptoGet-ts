import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

import { Currency } from '../types/Currency';

import { ICryptoParser } from "./ICryptoParser";
import { IParserSettings } from "./IParserSettings";



export class CryptoParser implements ICryptoParser {

    private readonly _parserSettings: IParserSettings

    private _currencyList: Array<Currency> = []

    
    constructor() {
        this._parserSettings = require("./config.json")
        this.RefreshCurrencyList().then()
    }

    private static async GetHtml(url: string): Promise<cheerio.CheerioAPI | null> {
        
        const response = await fetch(url, {
            method: 'GET'
        })

        if (!response.ok) return null
            
        return cheerio.load(await response.text()) 
        
    }

    private static GetPrice(attr: string | undefined): number {
        switch(attr) {
            case undefined: return 0
            default: return parseFloat(attr)
        }
    } 

    public GetCurrencyList(): Array<Currency> {
        return this._currencyList
    }

    public async RefreshCurrencyList(): Promise<void | null | string> {

        const selector = await CryptoParser.GetHtml(this._parserSettings.main_url)
        if (selector == null) return "parse_error"

        selector('tr[class="ptr"]').each((i, el) => {

            let currency: Currency = {
                name: "",
                shortname: "",
                price: 0,
                capitalize: "",
                exchange_capacity: "",
                course: {
                    weekly: "",
                    daily: ""
                },   
            }

            currency.name = selector(el).children().first().children().last().text()
            currency.shortname = selector(el).children().first().attr("data-val")
            currency.price = CryptoParser.GetPrice(selector(el).find('a[class="conv_cur"]').parent().attr("data-val"))
            currency.capitalize = selector(el).find('td:nth-child(4) > a > span').text()
            currency.exchange_capacity = selector(el).find('td:nth-child(5) > span:nth-child(1)').text()
            currency.course = {
                weekly: selector(el).find('td:nth-child(2) > span:nth-child(5)').text(),
                daily: selector(el).find('td:nth-child(2) > span:nth-child(3)').text()
            }

            this._currencyList[i] = currency
        })

    }

    public async GetCurrencyByShortname(shortname: string): Promise<Currency | string> {
        const currency: Currency | undefined = this._currencyList.find(el => typeof el.shortname != 'undefined' && el.shortname.toLowerCase() === shortname.toLowerCase())
        return typeof(currency) === 'undefined' ? "Cannot find currency": currency
 
    }

    public async GetCurrencyByName(currencyName: string): Promise<Currency | string> {

        const currency: Currency | undefined = this._currencyList.find(el => el.name.toLowerCase() === currencyName.toLowerCase())
        return typeof(currency) === 'undefined' ? "Cannot find currency": currency
 
    }
    
    public async GetTopCurrency(positions: number): Promise<Currency[] | string> {
        return this._currencyList.slice(0, positions)
    }


}



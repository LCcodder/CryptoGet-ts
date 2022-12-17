# **This is the library for cryptocurrency based on *TypeScript* and *Node.js***
## *This powerful library is for finding out the price, course, turnover of cryptocurrency*
---
* Before using this lib you need to initiate types in `/types` folder and copy `tsconfig.json` file into your project
---
## *Types:*
> 1) `Currency.d.ts` - main cryptocurrency type for each element
```TypeScript
type Currency = {
    shortname: string | undefined,
    name: string,
    capitalize: string,
    exchange_capacity: string,
    price: number,
    course: {
        weekly: string,
        daily: string
    }
}
```
---
## *Interfaces:*
>1) `IParserSettings.d.ts` - interface for parser settings (with base url)

```TypeScript
interface IParserSettings {
    readonly main_url: string,
}
```

>2) `ICryptoParser.d.ts` - main interface for parser with realised methods

```TypeScript
interface ICryptoParser {
    RefreshCurrencyList(): Promise<void | null | string>,
    GetCurrencyList(): Array<Currency>,
    GetCurrencyByName(name: string): Promise<Currency | string>,
    GetCurrencyByShortname(shortname: string): Promise<Currency | string>,
    GetTopCurrency(positions: number): Promise<Currency[] | string>,
}
```

---
## *Methods:*
>1) `constructor` - need no argument, initiates `IParserSettings.d.ts`, creates currency list
* Currency list refreshes asyncronously
```TypeScript
new CryptoParser()
```
>2) `async RefreshCurrencyList()` - asyncronously refreshes currency list, returns error or `void`
```TypeScript
await RefreshCurrencyList()
```
>3) `async GetCurrencyList()` - returns currency list
```TypeScript
GetCurrencyList()
```

>4) `async GetCurrencyByShortname(shortname)` - returns certain currency by it shortname

```TypeScript
async GetCurrencyByShortname("btc")
```

>5) `async GetCurrencyByName(name)` - returns certain currency by name
```TypeScript
async GetCurrencyByName('Bitcoin')
```

>6) `async GetTopCurrency(length)` - returns currency by relevation in limit
```TypeScript
async GetTopCurrency(5)
```
---
## *How to setup and use:*

* 1. Copy repo and install dependences from `dependences.sh` file
* 2. Set up `@types` and `tsconfig.json` files
* 3. Make new `CryptoCurrency` class
---
## *Tech specs:*
### *(Pre-build v1.0.0)*
+ node.js `v16.17.1`
+ typescript `^4.8.4`
+ cheerio `^1.0.0-rc.12`
+ node-fetch `^2.6.1`

### *@types:*
+ @types/node `^18.11.3`
+ @types/node-fetch `^2.6.2`
---
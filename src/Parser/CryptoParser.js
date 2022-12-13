"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CryptoParser = void 0;
var cheerio = require("cheerio");
var node_fetch_1 = require("node-fetch");
var CryptoParser = /** @class */ (function () {
    function CryptoParser() {
        this._currencyList = [];
        this._parserSettings = require("./config.json");
        this.RefreshCurrencyList().then();
    }
    CryptoParser.GetHtml = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])(url, {
                            method: 'GET'
                        })];
                    case 1:
                        response = _c.sent();
                        if (!response.ok)
                            return [2 /*return*/, null];
                        _b = (_a = cheerio).load;
                        return [4 /*yield*/, response.text()];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    CryptoParser.GetPrice = function (attr) {
        switch (attr) {
            case undefined: return 0;
            default: return parseFloat(attr);
        }
    };
    CryptoParser.prototype.GetCurrencyList = function () {
        return this._currencyList;
    };
    CryptoParser.prototype.RefreshCurrencyList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selector;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CryptoParser.GetHtml(this._parserSettings.main_url)];
                    case 1:
                        selector = _a.sent();
                        if (selector == null)
                            return [2 /*return*/, "parse_error"];
                        selector('tr[class="ptr"]').each(function (i, el) {
                            var currency = {
                                name: "",
                                shortname: "",
                                price: 0,
                                capitalize: "",
                                exchange_capacity: "",
                                course: {
                                    weekly: "",
                                    daily: ""
                                }
                            };
                            currency.name = selector(el).children().first().children().last().text();
                            currency.shortname = selector(el).children().first().attr("data-val");
                            currency.price = CryptoParser.GetPrice(selector(el).find('a[class="conv_cur"]').parent().attr("data-val"));
                            currency.capitalize = selector(el).find('td:nth-child(4) > a > span').text();
                            currency.exchange_capacity = selector(el).find('td:nth-child(5) > span:nth-child(1)').text();
                            currency.course = {
                                weekly: selector(el).find('td:nth-child(2) > span:nth-child(5)').text(),
                                daily: selector(el).find('td:nth-child(2) > span:nth-child(3)').text()
                            };
                            _this._currencyList[i] = currency;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CryptoParser.prototype.GetCurrencyByShortname = function (shortname) {
        return __awaiter(this, void 0, void 0, function () {
            var currency;
            return __generator(this, function (_a) {
                currency = this._currencyList.find(function (el) { return typeof el.shortname != 'undefined' && el.shortname.toLowerCase() === shortname.toLowerCase(); });
                return [2 /*return*/, typeof (currency) === 'undefined' ? "Cannot find currency" : currency];
            });
        });
    };
    CryptoParser.prototype.GetCurrencyByName = function (currencyName) {
        return __awaiter(this, void 0, void 0, function () {
            var currency;
            return __generator(this, function (_a) {
                currency = this._currencyList.find(function (el) { return el.name.toLowerCase() === currencyName.toLowerCase(); });
                return [2 /*return*/, typeof (currency) === 'undefined' ? "Cannot find currency" : currency];
            });
        });
    };
    CryptoParser.prototype.GetTopCurrency = function (positions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._currencyList.slice(0, positions)];
            });
        });
    };
    return CryptoParser;
}());
exports.CryptoParser = CryptoParser;
var p = new CryptoParser();
p.RefreshCurrencyList().then(function (res) {
    p.GetCurrencyByShortname('btc').then(function (res2) { return console.log(res2); });
});

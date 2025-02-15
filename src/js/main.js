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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _a, _b, _c;
// currentTime
var currentUserTime = new Date();
document.querySelector("#userDate").textContent = "".concat(currentUserTime.getDate(), "/").concat(currentUserTime.getMonth() + 1, "/").concat(currentUserTime.getFullYear());
// copyright updated
document.querySelector("#copyDate").textContent = currentUserTime
    .getFullYear()
    .toString();
// request from api
// input
var inputLocation = document.querySelector("#searchLocation");
// output
var outputInput = document.querySelector("#searchedLocation");
var iconTempOutput = document.querySelector("#iconTemp");
var weatherOutput = document.querySelector("#currentLocationWeatherOutput");
// events
// header__form event
(_a = document
    .querySelector(".header__form > form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
    e.preventDefault();
    generateInfo();
});
// requestOutput event
(_b = document.querySelector("#requestOutput")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) {
    generateInfo();
});
// reset app button event
(_c = document.querySelector("#resetOutput")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function (e) {
    clearReport();
});
// functions
// fetch function for events
function generateInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchInfo()];
                case 1:
                    response = _a.sent();
                    generateReport(response);
                    return [2 /*return*/];
            }
        });
    });
}
// obtain response
function fetchInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var result, jsonResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.tomorrow.io/v4/weather/forecast?location=".concat(inputLocation.value.toLowerCase(), "&apikey=PF6YuNMLjexkYjkLQEHVlALjCLvrYNCZ"))];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    jsonResponse = _a.sent();
                    return [2 /*return*/, jsonResponse];
                case 3:
                    error_1 = _a.sent();
                    outputInput.value = "Error";
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// generate report of response
function generateReport(info) {
    var iconResult = [
        '<i class="fa-solid fa-temperature-low"></i>',
        '<i class="fa-solid fa-temperature-half"></i>',
        '<i class="fa-solid fa-temperature-high"></i>',
        '<i class="fa-solid fa-question"></i>',
    ];
    if (info.code != 429001 && info.code != 400001) {
        var tempWeather = info.timelines.hourly[0].values.temperature;
        outputInput.value = info.location.name;
        weatherOutput.innerText = tempWeather + "º";
        switch (true) {
            case tempWeather < 0 || (tempWeather > 0 && tempWeather <= 10):
                iconTempOutput.innerHTML = iconResult[0];
                break;
            case tempWeather > 10 && tempWeather <= 20:
                iconTempOutput.innerHTML = iconResult[1];
                break;
            case tempWeather > 20 && tempWeather > 30:
                iconTempOutput.innerHTML = iconResult[2];
                break;
            default:
                break;
        }
    }
    else {
        outputInput.value = "No se pudo obtener el resultado.";
        iconTempOutput.innerHTML = iconResult[3];
        weatherOutput.innerText = "Error";
    }
}
// clear report of response
function clearReport() {
    inputLocation.value = "";
    outputInput.value = "";
    var iconNotResult = '<i class="fa-solid fa-business-time"></i>';
    iconTempOutput.innerHTML = iconNotResult;
    weatherOutput.innerText = "";
    location.reload();
}

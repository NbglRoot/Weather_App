// currentTime
const currentUserTime: Date = new Date();
document.querySelector(
  "#userDate"
)!.textContent = `${currentUserTime.getDate()}/${
  currentUserTime.getMonth() + 1
}/${currentUserTime.getFullYear()}`;

// copyright updated
document.querySelector("#copyDate")!.textContent = currentUserTime
  .getFullYear()
  .toString();

// request from api
// input
const inputLocation = document.querySelector(
  "#searchLocation"
) as HTMLInputElement;
// output
const outputInput = document.querySelector(
  "#searchedLocation"
) as HTMLInputElement;
const iconTempOutput = document.querySelector(
  "#iconTemp"
) as HTMLParagraphElement;
const weatherOutput = document.querySelector(
  "#currentLocationWeatherOutput"
) as HTMLSpanElement;

// events
// header__form event
document
  .querySelector(".header__form > form")
  ?.addEventListener("submit", (e) => {
    e.preventDefault();
    generateInfo();
  });
// requestOutput event
document.querySelector("#requestOutput")?.addEventListener("click", (e) => {
  generateInfo();
});
// reset app button event
document.querySelector("#resetOutput")?.addEventListener("click", (e) => {
  clearReport();
});

// functions
// fetch function for events
async function generateInfo() {
  const response = await fetchInfo();
  generateReport(response);
}
// obtain response
async function fetchInfo() {
  try {
    const result = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${inputLocation.value.toLowerCase()}&apikey=PF6YuNMLjexkYjkLQEHVlALjCLvrYNCZ`
    );
    const jsonResponse = await result.json();
    return jsonResponse;
  } catch (error) {
    outputInput.value = "Error";
  }
}
// generate report of response
function generateReport(info: any) {
  const iconResult: string[] = [
    '<i class="fa-solid fa-temperature-low"></i>',
    '<i class="fa-solid fa-temperature-half"></i>',
    '<i class="fa-solid fa-temperature-high"></i>',
    '<i class="fa-solid fa-question"></i>',
  ];
  if (info.code != 429001 && info.code != 400001) {
    const tempWeather = info.timelines.hourly[0].values.temperature;
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
  } else {
    outputInput.value = "No se pudo obtener el resultado.";
    iconTempOutput.innerHTML = iconResult[3];
    weatherOutput.innerText = "Error";
  }
}
// clear report of response
function clearReport() {
  inputLocation.value = "";
  outputInput.value = "";
  const iconNotResult: string = '<i class="fa-solid fa-business-time"></i>';
  iconTempOutput.innerHTML = iconNotResult;
  weatherOutput.innerText = "";
}

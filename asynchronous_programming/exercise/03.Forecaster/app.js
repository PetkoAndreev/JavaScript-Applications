// function attachEvents() {
//     // add event listener for click
//     // add DOM objects
//     const name = document.getElementById('location');
//     document.getElementById('submit').addEventListener('click', () => getForecast(name.value));
//     name.value = '';

//     const forecastEl = document.getElementById('forecast')

//     async function getForecast(name) {

//         const symbols = {
//             Sunny: '\u2600',
//             'Partly sunny': '\u26C5',
//             Overcast: '\u2601',
//             Rain: '\u2614',
//             Degrees: '\xB0'
//         };
//         const code = await getLocationCode(name);

//         const [current, upcoming] = await Promise.all([
//             getCurrent(code),
//             getUpcoming(code)
//         ]);

//         displayCurrentForecast(current);
//         displayUpcomingForecast(upcoming);

//         function displayCurrentForecast(current) {
//             forecastEl.style.display = 'block';

//             const currentForecast = document.getElementById('current');
//             const divEl = document.createElement('div');
//             divEl.className = 'forecasts';
//             const spanOne = document.createElement('span');
//             spanOne.className = 'condition symbol';
//             let symbol = current.forecast.condition;
//             spanOne.textContent = symbols[symbol];
//             const spanList = document.createElement('span');
//             spanList.className = 'condition';
//             const spanLoc = document.createElement('span');
//             const spanTemp = document.createElement('span');
//             const spanCondition = document.createElement('span');

//             spanLoc.className = 'forecast-data';
//             spanTemp.className = 'forecast-data';
//             spanCondition.className = 'forecast-data';
//             spanLoc.textContent = current.name;
//             spanTemp.textContent = `${current.forecast.low}${symbols['Degrees']}/${current.forecast.high}${symbols['Degrees']}`;
//             spanCondition.textContent = current.condition;

//             spanList.appendChild(spanLoc);
//             spanList.appendChild(spanTemp);
//             spanList.appendChild(spanCondition);
//             divEl.appendChild(spanOne);
//             divEl.appendChild(spanList);
//             currentForecast.appendChild(divEl);
//         }

//         function displayUpcomingForecast(upcoming) {
//             forecastEl.style.display = 'block';

//             const upcomingForecast = document.getElementById('upcoming');

//             const divEl = document.createElement('div');
//             divEl.className = 'forecast-info';
//             divEl.textContent = '';
//             upcoming.forecast.forEach(e => {
//                 const spanList = document.createElement('span');
//                 spanList.className = 'upcoming';
//                 const spanSymbol = document.createElement('span');
//                 spanSymbol.className = 'symbol';
//                 let symbol = e.condition;
//                 spanSymbol.textContent = symbols[symbol];
//                 const spanTemp = document.createElement('span');
//                 const spanCondition = document.createElement('span');
//                 spanTemp.className = 'forecast-data';
//                 spanCondition.className = 'forecast-data';
//                 spanTemp.textContent = `${e.low}${symbols['Degrees']}/${e.high}${symbols['Degrees']}`;
//                 spanCondition.textContent = e.condition;

//                 spanList.appendChild(spanSymbol);
//                 spanList.appendChild(spanTemp);
//                 spanList.appendChild(spanCondition);
//                 divEl.appendChild(spanList);
//                 upcomingForecast.appendChild(divEl);
//             })

//         }
//     }

//     async function getLocationCode(name) {
//         // To have error handling

//         const url = 'http://localhost:3030/jsonstore/forecaster/locations';
//         try {
//             const res = await fetch(url);
//             if (res.status != 200) {
//                 throw new Error('Location not found');
//             }

//             const data = await res.json();

//             const location = data.find(l => l.name == name);
//             return location.code;
//         }
//         catch (error) {
//             forecastEl.textContent = 'Error';
//         }


//     }

//     async function getCurrent(code) {

//         const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;
//         try {
//             const res = await fetch(url);
//             if (res.status != 200) {
//                 throw new Error('Location not found');
//             }
//             const data = await res.json();
//             return data;
//         }
//         catch (error) {
//             forecastEl.textContent = 'Error';
//         }


//     }

//     async function getUpcoming(code) {

//         const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;
//         try {
//             const res = await fetch(url);
//             if (res.status != 200) {
//                 throw new Error('Location not found');
//             }
//             const data = await res.json();
//             return data;
//         }
//         catch (error) {
//             forecastEl.textContent = 'Error';
//         }
//     }
// }

// attachEvents();

function attachEvents() {

    document.getElementById('submit').addEventListener('click', display);
    const input = document.getElementById('location');
    const forecastElement = document.getElementById('forecast');
    const currentWeatherElement = forecastElement.children[0];
    const upcomingWeatherElement = forecastElement.children[1];

    async function getLocation() {
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        try {
            const resp = await fetch(url);
            const data = await resp.json();

            const index = data.findIndex(c => c.name == input.value);

            if (resp.status != 200 || index == -1) {
                throw new Error('Invalid request');
            }

            return data[index].code;
        } catch {
            forecastElement.style.display = '';
            forecastElement.textContent = 'Error';
        }
    }

    async function getCurrentWeather(code) {
        const url = `http://localhost:3030/jsonstore/forecaster/today/${code}`;

        const resp = await fetch(url);
        const data = await resp.json();
        return data; 
    }

    async function getUpcomingWeather(code) {
        const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

        const resp = await fetch(url);
        const data = await resp.json();
        return data;
    }

    async function display() {
        const locationCode = await getLocation();

        const [currentWeatherObj, upcomingWeatherObj] = await Promise.all([getCurrentWeather(locationCode), getUpcomingWeather(locationCode)]);

        const symbols = {
            'Sunny': '\u2600',
            'Partly sunny': '\u26C5',
            'Overcast': '\u2601',
            'Rain': '\u2614',
            'Degrees': '\xB0'
        }

        currentWeatherDisplay(currentWeatherObj);
        upcomingWeatherDisplay(upcomingWeatherObj);

        function currentWeatherDisplay(obj) {
            const div = document.createElement('div');
            div.classList.add('forecasts'); 
            const symbolSpan = document.createElement('div');
            symbolSpan.textContent = symbols[obj.forecast.condition];
            symbolSpan.classList.add('condition');
            symbolSpan.classList.add('symbol');
            const conditionSpan = document.createElement('span');
            conditionSpan.classList.add('condition');
            const span1 = document.createElement('span');
            span1.classList.add('forecast-data');
            span1.textContent = obj.name;
            const span2 = document.createElement('span');
            span2.classList.add('forecast-data');
            span2.textContent = `${obj.forecast.low}${symbols['Degrees']}/${obj.forecast.high}${symbols['Degrees']}`
            const span3 = document.createElement('span');
            span3.classList.add('forecast-data');
            span3.textContent = obj.forecast.condition;

            conditionSpan.appendChild(span1);
            conditionSpan.appendChild(span2);
            conditionSpan.appendChild(span3);
            div.appendChild(symbolSpan);
            div.appendChild(conditionSpan);
            currentWeatherElement.appendChild(div);
        }

        function upcomingWeatherDisplay(obj) {
            const div = document.createElement('div');
            div.classList.add('forecast-info');
            obj.forecast.forEach(day => {
                const daySpan = document.createElement('span');
                daySpan.classList.add('upcoming');
                const span1 = document.createElement('span');
                span1.classList.add('symbol');
                span1.textContent = symbols[day.condition];
                const span2 = document.createElement('span');
                span2.classList.add('forecast-data')
                span2.textContent = `${day.low}${symbols['Degrees']}/${day.high}${symbols['Degrees']}`
                const span3 = document.createElement('span');
                span3.classList.add('forecast-data');
                span3.textContent = day.condition;

                daySpan.appendChild(span1);
                daySpan.appendChild(span2);
                daySpan.appendChild(span3);
                div.appendChild(daySpan);
            })
            upcomingWeatherElement.appendChild(div);
        }
        forecastElement.style.display = '';
    }
}

attachEvents();
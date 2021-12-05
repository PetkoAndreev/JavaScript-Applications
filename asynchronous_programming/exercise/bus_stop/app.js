async function getInfo() {
    // read input value
    // make request to server
    // parse response data
    // display data
    // error check for request

    const busId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`;

    const stopNameEl = document.getElementById('stopName');
    const busesEl = document.getElementById('buses');

    try {
        stopNameEl.textContent = 'Loading...';
        busesEl.replaceChildren();

        const res = await fetch(url);
        if (res.status != 200) {
            throw new Error('Stop ID not found');
        }

        const data = await res.json();

        stopNameEl.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const liEl = document.createElement('li');
            liEl.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`

            busesEl.appendChild(liEl);
        });



    }
    catch (error) {
        stopNameEl.textContent = 'Error';
    }
}
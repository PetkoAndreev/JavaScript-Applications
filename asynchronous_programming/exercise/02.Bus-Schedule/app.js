function solve() {
    const label = document.querySelector('#info span');
    const depBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let stop = {
        next: 'depot'
    }

    async function depart() {
        // get information about next stop
        // display name of next stop
        // activate other button
        depBtn.disabled = true;
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        const res = await fetch(url);
        stop = await res.json();

        label.textContent = `Next stop: ${stop.name}`

        arriveBtn.disabled = false;

    }

    async function arrive() {
        // display name of current stop
        // activate other button
        label.textContent = `Arriving at: ${stop.name}`

        depBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
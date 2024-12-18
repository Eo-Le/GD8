console.log("loaded: assets/js/calc-event.js");

function calcEvent(fetchUrl, containerID) {

fetch(fetchUrl) // Ensure the endpoint returns JSON
.then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
})
.then(data => {
    // Process data: Map relevant properties
    const processedData = data.map(event => {
        return {
            event: event.event,
            date: event.date,
            place: event.place,
            guests: event.guests
        };
    });

    // Get the container element
    const container = document.getElementById(containerID);
    container.className = 'overflow-auto';
    container.style.maxHeight = '800px'; // Correct style assignment
    container.innerHTML = ''; // Clear existing content

    // Create a table
    const table = document.createElement('table');
    table.className = 'table table-striped table-bordered';

    // Create the table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Define headers
    const headers = ['Begivenhed', 'Dato', 'Sted', 'Gæster'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body
    const tbody = document.createElement('tbody');

    processedData.forEach(event => {
        const row = document.createElement('tr');

        // Add cells for each property
        Object.values(event).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table); // Append the table to the container
})
.catch(error => console.error('Error fetching or processing data:', error));

}

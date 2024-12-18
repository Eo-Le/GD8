console.log("loaded: assets/js/calc-cost.js");

function calcCost(fetchUrl, containerID) {

    fetch(fetchUrl) // Ensure the endpoint returns JSON
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            // Process data: Map relevant properties and add currency to bill
            const processedData = data.map(cost => {
                return {
                    creditor: cost.creditor,
                    date: cost.date,
                    bill: parseFloat(cost.bill).toFixed(2) + " DKK", // Format bill as currency
                    period: cost.period,
                    description: cost.description
                };
            });

            // Get the container element
            const container = document.getElementById(containerID);
            container.className = 'overflow-auto';
            container.style.max-height = '800px';
            container.innerHTML = ''; // Clear existing content

            // Create a table
            const table = document.createElement('table');
            table.className = 'table table-sm table-striped table-bordered';

            // Create the table header
            const thead = document.createElement('thead');
            thead.className ='table-info';
            const headerRow = document.createElement('tr');

            // Define headers
            const headers = ['Kreditor', 'Dato', 'Beløb', 'Periode', 'Beskrivelse'];
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create the table body
            const tbody = document.createElement('tbody');

            processedData.forEach(cost => {
                const row = document.createElement('tr');

                // Add cells for each property
                Object.values(cost).forEach(value => {
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

console.log("loaded: assets/js/calc-cost.js")

function calcCost(fetchUrl, containerID) {
    
fetch(fetchUrl)// Ensure the endpoint returns JSON
.then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
})
.then(data => {
    const today = new Date();

    // Process data: Calculate age dynamically
    const processedData = data.map(cost => {
        // const date = new Date(cost.date);

        return {
            creditor: cost.creditor,
            date: cost.date,
            bill: cost.bill,
            period: cost.period,
            description: cost.description
        };
    });

    // Dynamically render the data into the container
    const container = document.getElementById(containerID);
    container.innerHTML = ''; // Clear existing content

    // Create a d-flex container
    const dFlexContainer = document.createElement('div');
    dFlexContainer.className = 'container-fluid d-flex align-items-center text-center text-white overflow-x-auto overflow-y-hidden border border-2 custom-img-container';
    dFlexContainer.style.height = '250px';

    // Loop through the data and create each cost's block
    processedData.forEach(cost => {
        const costBlock = document.createElement('div');
        costBlock.className = 'p-3'; // Padding for each cost's content

        costBlock.innerHTML = `
            <p class="pt-2"><small>${cost.creditor}, ${cost.date}</small></p>
            <p class="pt-2"><small>${cost.bill}, ${cost.period}, ${cost.description}</small></p>
            <p class="pt-2"><small>${cost.description}</small></p>
        `;

        dFlexContainer.appendChild(costBlock); // Append each cost block to the d-flex container
    });

    container.appendChild(dFlexContainer); // Append the d-flex container to the main container
})
.catch(error => console.error('Error fetching or processing data:', error));

}
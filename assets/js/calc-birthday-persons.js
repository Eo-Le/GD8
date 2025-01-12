console.log("loaded: assets/js/calc-birthday-persons.js")
function calcBirthdayPersons(fetchUrl, containerID) {
    
fetch(fetchUrl) // Ensure the endpoint returns JSON
.then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
})
.then(data => {
    console.log("inside function of calcBirthdayPersons");
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    // Filter data: Include only people whose birthdays are today
    const processedData = data
        .map(person => {
            const dob = new Date(person.dob);

            // Check if birthday is today
            const isBirthdayToday = (dob.getMonth() === todayMonth && dob.getDate() === todayDate);

            if (!isBirthdayToday) return null;

            // Calculate age
            const age = today.getFullYear() - dob.getFullYear() - 
                (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

            return {
                name: person.name,
                age: age,
                img: person.img
            };
        })
        .filter(person => person !== null); // Remove null entries for people not having birthdays today

    // Dynamically render the data into the container
    const container = document.getElementById(containerID);
    container.innerHTML = ''; // Clear existing content

    if (processedData.length === 0) {
        // Display a message if no birthdays are found
        container.innerHTML = '<p class="text-white text-center">Ingen har fødselsdag i dag!</p>';
        return;
    }

    // Create a d-flex container
    const dFlexContainer = document.createElement('div');
    dFlexContainer.className = 'container-fluid d-flex align-items-center text-center overflow-x-auto overflow-y-hidden border border-2 custom-img-container';
    dFlexContainer.style.height = '250px';

    // Loop through the data and create each person's block
    processedData.forEach(person => {
        const personBlock = document.createElement('div');
        personBlock.className = 'p-2 mx-2 border border-2 rounded'; // Padding for each person's content
        personBlock.style.backgroundColor = '#333';

        personBlock.innerHTML = `
            <img class="rounded-circle" src="${person.img}" alt="${person.name}">
            <p class="pt-2"><small>${person.name}, ${person.age} år</small></p>
        `;

        dFlexContainer.appendChild(personBlock); // Append each person block to the d-flex container
    });

    container.appendChild(dFlexContainer); // Append the d-flex container to the main container
})
.catch(error => console.error('Error fetching or processing data:', error));

}

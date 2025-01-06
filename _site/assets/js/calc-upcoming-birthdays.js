console.log("loaded: assets/js/calc-upcoming-birthdays.js")
function calcUpcomingBirthdays(fetchUrl, containerID) {
    
fetch(fetchUrl) // Ensure the endpoint returns JSON
.then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
})
.then(data => {
    console.log("inside function of calcUpcomingBirthdays");
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    // Filter data: Include only people whose birthdays are in the next 30 days (excluding today)
    const processedData = data
        .map(person => {
            const dob = new Date(person.dob);

            // Calculate next birthday
            let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
            if (today > nextBirthday) {
                nextBirthday.setFullYear(today.getFullYear() + 1);
            }

            // Calculate days to next birthday
            const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

            // Include only if the birthday is within the next 30 days but not today
            if (daysToNextBirthday <= 30 && daysToNextBirthday > 0) {
                const age = today.getFullYear() - dob.getFullYear() - 
                    (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

                return {
                    name: person.name,
                    age: age,
                    daysToNextBirthday: daysToNextBirthday,
                    img: person.img
                };
            }

            return null;
        })
        .filter(person => person !== null) // Remove null entries for people not meeting the criteria
        .sort((a, b) => a.daysToNextBirthday - b.daysToNextBirthday); // Sort by daysToNextBirthday in ascending order

    // Dynamically render the data into the container
    const container = document.getElementById(containerID);
    container.innerHTML = ''; // Clear existing content

    if (processedData.length === 0) {
        // Display a message if no upcoming birthdays are found
        container.innerHTML = '<p class="text-white text-center">Ingen har fødselsdag inden for de næste 30 dage!</p>';
        return;
    }

    // Create a d-flex container
    const dFlexContainer = document.createElement('div');
    dFlexContainer.className = 'container-fluid d-flex align-items-center text-center text-white overflow-x-auto overflow-y-hidden border border-2 custom-img-container';
    dFlexContainer.style.height = '250px';

    // Loop through the data and create each person's block
    processedData.forEach(person => {
        const personBlock = document.createElement('div');
        personBlock.className = 'p-2 mx-2 border border-2 rounded'; // Padding for each person's content

        personBlock.innerHTML = `
            <img class="rounded-circle" src="${person.img}" alt="${person.name}">
            <p class="pt-2"><small>${person.name}, ${person.age} år</small></p>
            <p class="pt-2"><small>Om ${person.daysToNextBirthday} dage</small></p>
        `;

        dFlexContainer.appendChild(personBlock); // Append each person block to the d-flex container
    });

    container.appendChild(dFlexContainer); // Append the d-flex container to the main container
})
.catch(error => console.error('Error fetching or processing data:', error));

}

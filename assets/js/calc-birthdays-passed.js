console.log("loaded: assets/js/calc-birthdays-passed.js")
function calcBirthdaysPassed(fetchUrl, containerID) {
    
fetch(fetchUrl) // Ensure the endpoint returns JSON
.then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
})
.then(data => {
    console.log("inside function of calcBirthdaysPassed");
    const today = new Date();

    // Filter and process data: Include only people whose birthdays were in the past 30 days (excluding today)
    const processedData = data
        .map(person => {
            const dob = new Date(person.dob);

            // Calculate the most recent birthday
            let lastBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
            
            // If today's date is before or on their birthday this year, use last year's birthday
            if (today.getTime() <= lastBirthday.getTime()) {
                lastBirthday.setFullYear(today.getFullYear() - 1);
            }

            // Calculate days since last birthday
            const daysSinceLastBirthday = Math.floor((today - lastBirthday) / (1000 * 60 * 60 * 24));

            // Include only if the birthday was within the past 30 days but not today
            if (daysSinceLastBirthday > 0 && daysSinceLastBirthday <= 30) {
                const age = today.getFullYear() - dob.getFullYear() - 
                    (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

                return {
                    name: person.name,
                    age: age,
                    daysSinceLastBirthday: daysSinceLastBirthday,
                    img: person.img
                };
            }

            return null;
        })
        .filter(person => person !== null) // Remove null entries for people not meeting the criteria
        .sort((a, b) => a.daysSinceLastBirthday - b.daysSinceLastBirthday); // Sort by daysSinceLastBirthday in ascending order

    // Dynamically render the data into the container
    const container = document.getElementById(containerID);
    container.innerHTML = ''; // Clear existing content

    if (processedData.length === 0) {
        // Display a message if no recent birthdays are found
        container.innerHTML = '<p class="text-white text-center">Ingen har haft fødselsdag inden for de sidste 30 dage!</p>';
        return;
    }

    // Create a d-flex container
    const dFlexContainer = document.createElement('div');
    dFlexContainer.className = 'container-fluid d-flex align-items-center text-center text-white overflow-x-auto overflow-y-hidden border border-2 custom-img-container';
    dFlexContainer.style.height = '250px';

    // Loop through the sorted data and create each person's block
    processedData.forEach(person => {
        const personBlock = document.createElement('div');
        personBlock.className = 'p-2 mx-2 border border-2 rounded'; // Padding for each person's content
        personBlock.style.backgroundColor = '#333';

        personBlock.innerHTML = `
            <img class="rounded-circle" src="${person.img}" alt="${person.name}">
            <p class="pt-2"><small>${person.name}, ${person.age} år</small></p>
            <p class="pt-2"><small>${person.daysSinceLastBirthday} dage siden</small></p>
        `;

        dFlexContainer.appendChild(personBlock); // Append each person block to the d-flex container
    });

    container.appendChild(dFlexContainer); // Append the d-flex container to the main container
})
.catch(error => console.error('Error fetching or processing data:', error));

}

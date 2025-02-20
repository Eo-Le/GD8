console.log("loaded: assets/js/calc-birthdays-all.js");

function calcBirthdaysAll(dataArray, containerID, filterDaysFrom = 0, sortOrder = 'asc') {
    try {
        console.log("inside function of calcBirthdaysAll");
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight to avoid timezone issues

        // Get the container element
        const container = document.getElementById(containerID);
        if (!container) {
            console.error(`Error: No element found with ID '${containerID}'. Ensure the ID is correct.`);
            return;
        }

        // Filter and process data based on days from/to their birthday
        const processedData = dataArray
            .map(person => {
                const dob = new Date(person.dob);
                if (isNaN(dob.getTime())) {
                    console.warn(`Invalid date detected for ${person.name}: ${person.dob}`);
                    return null;
                }

                // Calculate next and last birthday
                let lastBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
                let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

                if (today < lastBirthday) {
                    lastBirthday.setFullYear(today.getFullYear() - 1);
                }
                if (today > nextBirthday) {
                    nextBirthday.setFullYear(today.getFullYear() + 1);
                }

                // Calculate days since last birthday and until next birthday
                const daysSinceLastBirthday = Math.floor((today - lastBirthday) / (1000 * 60 * 60 * 24));
                const daysUntilNextBirthday = Math.floor((nextBirthday - today) / (1000 * 60 * 60 * 24));
                
                // Determine if the person meets the filtering criteria
                if ((filterDaysFrom > 0 && daysUntilNextBirthday <= filterDaysFrom && daysUntilNextBirthday > 0) ||
                    (filterDaysFrom < 0 && daysSinceLastBirthday <= Math.abs(filterDaysFrom) && daysSinceLastBirthday > 0) ||
                    (filterDaysFrom === 0 && today.getDate() === dob.getDate() && today.getMonth() === dob.getMonth())) {
                    const age = today.getFullYear() - dob.getFullYear() - 
                        (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

                    return {
                        name: person.name,
                        age: age,
                        daysSinceLastBirthday: daysSinceLastBirthday,
                        daysUntilNextBirthday: daysUntilNextBirthday,
                        img: person.img
                    };
                }
                return null;
            })
            .filter(person => person !== null) // Remove null entries for people not meeting the criteria
            .sort((a, b) => sortOrder === 'asc' 
                ? (a.daysUntilNextBirthday - b.daysUntilNextBirthday || a.daysSinceLastBirthday - b.daysSinceLastBirthday)
                : (b.daysUntilNextBirthday - a.daysUntilNextBirthday || b.daysSinceLastBirthday - a.daysSinceLastBirthday)
            ); // Sort by upcoming birthdays first, then past birthdays

        // Clear existing content
        container.innerHTML = '';

        if (processedData.length === 0) {
            container.innerHTML = '<p class="text-white text-center">Ingen personer matcher filtreringskriteriet!</p>';
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

            let birthdayMessage = '';
            if (filterDaysFrom > 0) {
                birthdayMessage = person.age+1 + ' år om ' + person.daysUntilNextBirthday + ' dage';
            } else if (filterDaysFrom < 0) {
                birthdayMessage = person.daysSinceLastBirthday + ' dage siden';
            } else {
                birthdayMessage = 'Tillykke med dagen';
            }

            personBlock.innerHTML = `
                <img class="rounded-circle" src="${person.img}" alt="${person.name}">
                <p class="pt-2"><small>${person.name}, ${person.age} år</small></p>
                <p class="pt-2"><small>${birthdayMessage}</small></p>
            `;

            dFlexContainer.appendChild(personBlock); // Append each person block to the d-flex container
        });

        container.appendChild(dFlexContainer); // Append the d-flex container to the main container
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

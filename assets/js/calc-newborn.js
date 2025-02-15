console.log("loaded: assets/js/calc-newborn.js");

function calcNewBorn(dataArray, containerID, sortBy = "nextBirthday", sortOrder = "asc") {
    try {
        console.log("inside function of calcNewBorn");
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight to avoid timezone issues

        // Get the container element
        const container = document.getElementById(containerID);
        if (!container) {
            console.error(`Error: No element found with ID '${containerID}'. Ensure the ID is correct.`);
            return;
        }

        // Filter to include only newborns (age <= 365 days)
        let filteredData = dataArray.filter(person => {
            console.log(`Processing person: ${person.name}, DOB: ${person.dob}`);
            
            let dob = new Date(person.dob);
            if (isNaN(dob.getTime())) {
                console.warn(`Invalid date detected for ${person.name}: ${person.dob}`);
                return false; // Ensure valid date
            }
            
            dob.setHours(0, 0, 0, 0); // Normalize DOB to midnight
            const ageInDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
            console.log(`Age in days for ${person.name}: ${ageInDays}`);
            
            return ageInDays <= 365; // Include if less than or equal to 365 days old
        });

        // Process data: Calculate age in days and next birthday
        const processedData = filteredData.map(person => {
            const dob = new Date(person.dob);
            const formattedDob = `${dob.getDate().toString().padStart(2, '0')}-${(dob.getMonth() + 1).toString().padStart(2, '0')}-${dob.getFullYear()}`;
            const ageInDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));

            // Calculate next birthday
            const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
            if (today > nextBirthday) {
                nextBirthday.setFullYear(today.getFullYear() + 1);
            }
            const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
            const ageInYears = Math.floor(ageInDays / 365);

            return {
                name: person.name,
                ageInDays: ageInDays,
                nextBirthday: daysToNextBirthday,
                ageInYears: ageInYears,
                img: person.img,
                dob: formattedDob
            };
        });

        // Sorting logic
        const sortMultiplier = sortOrder === "desc" ? -1 : 1;
        if (sortBy === "nextBirthday") {
            processedData.sort((a, b) => (a.nextBirthday - b.nextBirthday) * sortMultiplier);
        } else if (sortBy === "name") {
            processedData.sort((a, b) => a.name.localeCompare(b.name) * sortMultiplier);
        } else if (sortBy === "ageInDays") {
            processedData.sort((a, b) => (a.ageInDays - b.ageInDays) * sortMultiplier);
        }

        console.log("Filtered newborns:", processedData);
        
        // Clear existing content
        container.innerHTML = '';

        if (processedData.length === 0) {
            container.innerHTML = '<p class="text-center text-white">No newborns found.</p>';
            return;
        }

        // Create a d-flex container
        const dFlexContainer = document.createElement('div');
        dFlexContainer.className = 'container-fluid d-flex align-items-center text-center text-white overflow-x-auto overflow-y-hidden border border-2 custom-img-container';
        dFlexContainer.style.height = '300px';

        // Loop through the data and create each person's block
        processedData.forEach(person => {
            const personBlock = document.createElement('div');
            personBlock.className = 'p-2 mx-2 border border-2 rounded'; // Padding for each person's content
            personBlock.style.backgroundColor = '#333';

            personBlock.innerHTML = `
                <img class="rounded-circle" src="${person.img}" alt="${person.name}">
                <p class="pt-2"><small>${person.name}, ${person.ageInDays} dage<br>${person.dob}</small></p>
                <p class="pt-2"><small>${person.ageInYears + 1} år om ${person.nextBirthday} dage</small></p>
            `;

            dFlexContainer.appendChild(personBlock); // Append each person block to the d-flex container
        });

        container.appendChild(dFlexContainer); // Append the d-flex container to the main container
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

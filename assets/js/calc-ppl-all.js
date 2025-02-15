console.log("loaded: assets/js/calc-ppl-all.js");

function calcPeopleAll(dataArray, containerID, filterBy = null, filterValue = null, sortBy = 'dob', sortOrder = 'asc' ) {
    try {
        console.log("inside function of calcPeopleAll");
        const today = new Date();

        // Filter data based on provided filter criteria
        let filteredData = dataArray.filter(person => {
            const dob = new Date(person.dob);
            if (isNaN(dob.getTime())) return false; // Ensure valid date

            if (filterBy === "family" && filterValue) {
                return person.family && person.family.toLowerCase() === filterValue.toLowerCase();
            } else if (filterBy === "month" && filterValue) {
                return dob.getMonth() + 1 === parseInt(filterValue); // Match month (1-12)
            }
            return true; // No filter applied
        });

        // Process data: Validate and calculate age dynamically
        const processedData = filteredData.map(person => {
            const dob = new Date(person.dob);
            const formattedDob = `${dob.getDate().toString().padStart(2, '0')}-${(dob.getMonth() + 1).toString().padStart(2, '0')}-${dob.getFullYear()}`;

            // Calculate age
            const age = today.getFullYear() - dob.getFullYear() - 
                (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

            // Calculate next birthday
            const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
            if (today > nextBirthday) {
                nextBirthday.setFullYear(today.getFullYear() + 1);
            }
            const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

            return {
                name: person.name,
                age: age,
                nextBirthday: daysToNextBirthday,
                img: person.img,
                dob: formattedDob,
                dobDate: dob // Store for sorting
            };
        });

        // Sorting logic with reverse order option
        const sortMultiplier = sortOrder === "desc" ? -1 : 1;
        if (sortBy === "age") {
            processedData.sort((a, b) => (a.age - b.age) * sortMultiplier);
        } else if (sortBy === "name") {
            processedData.sort((a, b) => a.name.localeCompare(b.name) * sortMultiplier);
        } else if (sortBy === "nextBirthday") {
            processedData.sort((a, b) => (a.nextBirthday - b.nextBirthday) * sortMultiplier);
        } else if (sortBy === "dob") {
            processedData.sort((a, b) => (a.dobDate - b.dobDate) * sortMultiplier);
        }

        // Dynamically render the data into the container
        const container = document.getElementById(containerID);
        container.innerHTML = ''; // Clear existing content

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
                <p class="pt-2"><small>${person.name}, ${person.age} år<br>${person.dob}</small></p>
                <p class="pt-2"><small>${person.age + 1} år om ${person.nextBirthday} dage</small></p>
            `;

            dFlexContainer.appendChild(personBlock); // Append each person block to the d-flex container
        });

        container.appendChild(dFlexContainer); // Append the d-flex container to the main container
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

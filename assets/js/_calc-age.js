console.log("loaded: assets/js/_calc-age.js")

fetch('/api-people.html')
    .then(response => response.json())
    .then(data => {
        const processedData = data.map(person => {
            const today = new Date();
            const dob = new Date(person.dob);

            // Calculate age
            const age = today.getFullYear() - dob.getFullYear() - 
                        (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

            // Calculate next birthday
            const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
            if (today > nextBirthday) {
                nextBirthday.setFullYear(today.getFullYear() + 1);
            }
            const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

            // Calculate days past since last birthday
            const lastBirthday = new Date(today.getFullYear() - 1, dob.getMonth(), dob.getDate());
            if (today < nextBirthday) {
                lastBirthday.setFullYear(today.getFullYear());
            }
            const daysPastSinceBirthday = Math.ceil((today - lastBirthday) / (1000 * 60 * 60 * 24));

            return {
                ...person,
                age,
                daysToNextBirthday,
                daysPastSinceBirthday
            };
        });
        console.log("loaded: calc-age");
        console.log(processedData);
        // Use processedData to update the UI
    })
    .catch(error => console.error('Error fetching or processing data:', error));

console.log("loaded: calc-dob");

// Safely access after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calc-dob').textContent = `Dato: ${getCurrentDay()}-${getCurrentYear()}-${getCurrentMonth()}`;
});


// Define a function to expose the data
function getCurrentDate(timestamp) {
const date = new Date(timestamp); // Create a Date object

// Extract day, month, and year
const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit format
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = date.getFullYear();

// Return in dd-mm-YYYY format
return `${day}-${month}-${year}`;
}


function getCurrentYear() {
    // Create a Date object and get the year
    return new Date(Date.now()).getFullYear();
}

function getCurrentMonth() {
    // Create a Date object and get the year
    // String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    return new Date(Date.now()).getMonth() + 1;
}

function getCurrentDay() {
    // Create a Date object and get the year
    //String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    // Extract day, month, and year
//const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit format
    return new Date(Date.now()).getDate();
}



// Example Usage
const currentDateFormatted = getCurrentDate(Date.now());
console.log(currentDateFormatted); // e.g., "15-12-2024"
  
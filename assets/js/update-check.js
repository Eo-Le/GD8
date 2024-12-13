// Fetch the current update timestamp from the meta tag
const currentUpdate = document.querySelector('meta[name="last-update"]').getAttribute('content');

// Retrieve the previous update timestamp from localStorage
const previousUpdate = localStorage.getItem('lastUpdate');

// Compare timestamps to detect updates
if (previousUpdate && previousUpdate !== currentUpdate) {
    alert(`The website has been updated! Please refresh.\npreviousUpdate: ${previousUpdate}\ncurrentUpdate: ${currentUpdate}`);
} else {
    alert(`No updates.\npreviousUpdate: ${previousUpdate}\ncurrentUpdate: ${currentUpdate}`);
}

// Store the latest timestamp in localStorage
localStorage.setItem('lastUpdate', currentUpdate);
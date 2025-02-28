document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("exit-popup");
    const closeBtn = document.getElementById("close-popup");

    // Function to show popup
    function showPopup() {
        if (!sessionStorage.getItem("popupClosed") && !localStorage.getItem("bookingCompleted")) {
            popup.style.display = "flex";
            popup.style.opacity = "1"; // Smooth fade-in
        }
    }

    // Function to close popup and store session
    function closePopup() {
        popup.style.opacity = "0";
        setTimeout(() => {
            popup.style.display = "none"; // Hide popup
        }, 300); // Smooth fade-out
        sessionStorage.setItem("popupClosed", "true");
    }

    // Check if booking is completed
    if (localStorage.getItem("bookingCompleted")) {
        popup.style.display = "none"; // Ensure it never appears
        return;
    }

    // Exit intent detection (Desktop only)
    document.addEventListener("mouseleave", function (event) {
        if (event.clientY <= 0) {
            showPopup();
        }
    });

    // Show popup after delay on mobile
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        setTimeout(showPopup, 10000); // Show after 10 seconds on mobile
    }

    // Close popup when button is clicked
    closeBtn.addEventListener("click", closePopup);

    // Listen for the confirm_appointment event in the dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push = function(event) {
        // Call the original dataLayer.push method
        Array.prototype.push.apply(this, arguments);
        
        // If confirm_appointment is detected, store a flag in localStorage
        if (event.event === "confirm_appointment") {
            localStorage.setItem("bookingCompleted", "true");
            sessionStorage.setItem("popupClosed", "true"); // Also close for the current session
            popup.style.display = "none"; // Ensure popup is hidden
        }
    };
});

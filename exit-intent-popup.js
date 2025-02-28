document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("exit-popup");
    const closeBtn = document.getElementById("close-popup");

    // Function to show popup
    function showPopup() {
        if (!sessionStorage.getItem("popupClosed")) {
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

    // Check if popup has already been closed in this session
    if (sessionStorage.getItem("popupClosed")) {
        popup.style.display = "none";
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
});

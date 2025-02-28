document.addEventListener("DOMContentLoaded", function () {
    let hasPopupShown = getCookie("exitPopupShown");
    let hasPopupClosed = sessionStorage.getItem("exitPopupClosed");

    function showPopup() {
        if (!hasPopupShown && !hasPopupClosed) {
            document.getElementById("exit-popup").style.display = "flex";
            setCookie("exitPopupShown", "true", 7);
        }
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + "; path=/" + expires;
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length);
        }
        return null;
    }

    document.addEventListener("mouseleave", function (event) {
        if (event.clientY <= 0) {
            showPopup();
        }
    });

    let lastScrollTop = window.scrollY;
    window.addEventListener("scroll", function () {
        let currentScroll = window.scrollY;
        if (!hasPopupShown && !hasPopupClosed && currentScroll < lastScrollTop - 50) {
            showPopup();
        }
        lastScrollTop = currentScroll;
    });

    document.getElementById("close-popup").addEventListener("click", function () {
        document.getElementById("exit-popup").style.display = "none";
        sessionStorage.setItem("exitPopupClosed", "true");
    });
});

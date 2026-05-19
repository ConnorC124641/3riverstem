async function initCounter() {
    const counterElement = document.getElementById('visitor-count');
    if (!counterElement) return;
    
    const siteKey = window.location.hostname + window.location.pathname.replace(/\/$/, "");
    const cleanKey = siteKey.replace(/[^a-zA-Z0-9]/g, "-"); 

    try {
        const response = await fetch(`https://api.countapi.it/hit/${cleanKey}`);
        const data = await response.json();
        
        if (data && data.value) {
            counterElement.innerText = data.value.toLocaleString();
        } else {
            counterElement.innerText = "1";
        }
    } catch (error) {
        console.error("Counter failed to load:", error);
        if (counterElement.parentNode) {
            counterElement.parentNode.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", initCounter);

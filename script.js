
window.onload = function() {
    // Protect dashboard: only show if user is logged in and email verified
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && user.emailVerified) {
            document.getElementById("dashboard").style.display = "block";
        } else {
            document.getElementById("dashboard").style.display = "none";
        }
    });
    getUserLocation();
};
// Get user location and auto-set weather + traffic
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Auto-detect weather
    getWeather(lat, lon);

    // Auto-set traffic (simulate by time for hackathon)
    getTraffic();
}

function showError(error) {
    alert("Error getting location: " + error.message);
}

// Weather detection using OpenWeatherMap API
function getWeather(lat, lon) {
    const apiKey = "65653edb0a94b3995401f66c2153a7d1"; // replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
document.getElementById("weatherDisplay").innerText = weather;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weather = data.weather[0].main; // Clear, Rain, Clouds, Rain, etc.
        const weatherSelect = document.getElementById("weather");

        if (weather.includes("Rain") || weather.includes("Drizzle")) {
            weatherSelect.value = 30; // Rainy
        } else if (weather.includes("Storm")) {
            weatherSelect.value = 50; // Storm
        } else {
            weatherSelect.value = 10; // Clear
        }
    })
    .catch(error => console.error("Error fetching weather:", error));
}

// Traffic simulation based on time of day
function getTraffic() {
    const hour = new Date().getHours();
    const trafficSelect = document.getElementById("traffic");

    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
        trafficSelect.value = 50; // High
    } else if (hour >= 10 && hour <= 16) {
        trafficSelect.value = 30; // Medium
    } else {
        trafficSelect.value = 10; // Low
    }
        }
function calculateRisk() {

    let weather = parseInt(document.getElementById("weather").value);
    let traffic = parseInt(document.getElementById("traffic").value);
    let time = parseInt(document.getElementById("time").value);

    let risk = weather * 0.4 + traffic * 0.3 + time * 0.3;

    let message = "";
    let color = "";

    if (risk > 40) {
        message = "🔴 High Risk Route - Not Recommended";
        color = "red";
    } else if (risk > 25) {
        message = "🟡 Medium Risk - Drive Carefully";
        color = "orange";
    } else {
        message = "🟢 Low Risk - Safe Route Recommended";
        color = "green";
    }

    document.getElementById("result").innerHTML =
        "Risk Score: " + risk.toFixed(2) + "%<br>" + message;

    document.getElementById("result").style.color = color;
}
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            let user = userCredential.user;

            // Send email verification
            user.sendEmailVerification().then(() => {
                alert("Registration successful! Verification email sent.");
            });

        })
        .catch((error) => {
            alert(error.message);
        });
}
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            let user = userCredential.user;

            if (user.emailVerified) {
                alert("Login successful!");
            } else {
                alert("Please verify your email before login.");
            }

        })
        .catch((error) => {
            alert(error.message);
        });
}
function googleLogin() {

    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            alert("Google Login Successful!");
        })
        .catch((error) => {
            alert(error.message);
        });
}
function logout() {
    firebase.auth().signOut().then(() => {
        alert("Logged out successfully");
    }).catch((error) => {
        alert(error.message);
    });

}





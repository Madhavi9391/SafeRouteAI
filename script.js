// Dashboard protection: show only after login
firebase.auth().onAuthStateChanged(function(user) {
    if (user && user.emailVerified) {
        document.getElementById("dashboard").style.display = "block";
    } else {
        document.getElementById("dashboard").style.display = "none";
    }
});

// Logout function
function logout() {
    firebase.auth().signOut().then(() => {
        alert("Logged out successfully!");
    }).catch((error) => {
        alert(error.message);
    });
}

// Registration
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            user.sendEmailVerification().then(() => {
                alert("Registration successful! Verification email sent.");
            });
        })
        .catch((error) => alert(error.message));
}

// Login
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            if (user.emailVerified) {
                alert("Login successful!");
                document.getElementById("dashboard").style.display = "block";
            } else {
                alert("Please verify your email before login.");
            }
        })
        .catch((error) => alert(error.message));
}

// Google Login
function googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            alert("Google Login Successful!");
            document.getElementById("dashboard").style.display = "block";
        })
        .catch((error) => alert(error.message));
}

// Risk calculation
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

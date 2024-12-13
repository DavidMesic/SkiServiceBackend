document.getElementById('registerForm').addEventListener('submit', function (event) {
    console.log("Form submit detected");
    event.preventDefault();

    // Werte aus dem Formular abrufen
    const benutzername = document.getElementById('benutzername').value;
    const passwortHash = document.getElementById('passwortHash').value;
    const email = document.getElementById('email').value;
    var telefon = document.getElementById('telefon').value;

    if (!telefon)
    {
        telefon = null;
    }



    // Erstellung des Objekts für die Anmeldung
    const registerAccount = {
        benutzername,
        passwortHash,
        email,
        telefon
    };



    // Anfrage an den Server senden
    fetch('https://localhost:7290/api/Account/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerAccount)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Serverantwort:', data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Es gab ein Problem mit der Registration.');
        });
});
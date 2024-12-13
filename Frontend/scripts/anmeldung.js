var totalPrice = 0;

var today = null;
var pickupDate = null;

document.getElementById('anmeldungForm').addEventListener('submit', function (event) {
    console.log("Form submit detected");
    event.preventDefault();

    const kundeID = sessionStorage.getItem('accountId');
    const dienstleistung = document.getElementById('dienstleistung').value;
    const priorität = document.getElementById('priorität').value;

    if (!kundeID) {
        console.log('Bitte logge dich zuerst ein.');
        alert('Bitte logge dich zuerst ein.');
        return;
    }

    console.log(kundeID);
    console.log(dienstleistung);
    console.log(priorität);


    
    // Berechnung des Abholdatums
    today = new Date();
    const pickupDays = priorität === 3 ? 12 : priorität === 2 ? 7 : 5;
    pickupDate = new Date(today);
    pickupDate.setDate(today.getDate() + pickupDays);



    // Berechnung der Preise
    let mandatoryPrice = 0;
    if (dienstleistung === 'small_service') mandatoryPrice = 50;
    if (dienstleistung === 'large_service') mandatoryPrice = 80;
    if (dienstleistung === 'race_service') mandatoryPrice = 120;
    if (dienstleistung === 'binding_setup') mandatoryPrice = 30;
    if (dienstleistung === 'skin_cut') mandatoryPrice = 40;
    if (dienstleistung === 'hot_waxing') mandatoryPrice = 25;



    const priorityPrice = priorität === 3 ? 0 : priorität === 2 ? 20 : 40;
    totalPrice = mandatoryPrice + priorityPrice;



    // Erstellung des Objekts für die Anmeldung
    const registration = {
        kundeID,
        dienstleistung,
        priorität
    };



    // Aktualisiere den Output-Bereich
    updateOutput(registration);



    // Anfrage an den Server senden
    fetch('https://localhost:7290/api/Auftrag/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registration)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Serverantwort:', data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Es gab ein Problem mit der Anmeldung.');
        });
});





// Funktion zum Aktualisieren des Outputs
function updateOutput(data) {
    const outputContent = `
        <p><strong>Dienstleistung:</strong> ${getServiceLabel(data.dienstleistung)}</p>
        <p><strong>Priorität:</strong> ${getPriorityLabel(data.priorität)}</p>
        <p><strong>Gesamtpreis:</strong> ${totalPrice} CHF</p>
        <p><strong>Erstellungsdatum:</strong> ${today}</p>
        <p><strong>Abholdatum:</strong> ${pickupDate}</p>
    `;



    // Aktualisiere den Inhalt des Modals
    document.getElementById('modalOutputContent').innerHTML = outputContent;



    // Öffne das Modal
    const modal = new bootstrap.Modal(document.getElementById('outputModal'));
    modal.show();
}





// Funktion zum Zurücksetzen des Formulars
function cancelTicket() {
    if (confirm("Möchten Sie wirklich abbrechen?")) {
        document.getElementById("anmeldungForm").reset(); // Formular zurücksetzen
        document.getElementById("outputContent").innerHTML = "Keine Anmeldung vorhanden."; // Ausgabe zurücksetzen
    }
}





// Funktion, um die Priorität in lesbaren Text umzuwandeln
function getPriorityLabel(priorität) {
    switch (priorität) {
        case '3':
            return 'Tief (12 Tage)';
        case '2':
            return 'Standard (7 Tage)';
        case '1':
            return 'Express (5 Tage)';
        default:
            return 'Unbekannt';
    }
}





// Funktion, um den Dienstleistungstyp in lesbaren Text umzuwandeln
function getServiceLabel(dienstleistung) {
    switch (dienstleistung) {
        case 'small_service':
            return 'Kleiner Service';
        case 'large_service':
            return 'Grosser Service';
        case 'race_service':
            return 'Rennski-Service';
        case 'binding_setup':
            return 'Bindung montieren und einstellen';
        case 'skin_cut':
            return 'Fell zuschneiden';
        case 'hot_waxing':
            return 'Heisswachsen';
        default:
            return 'Unbekannte Dienstleistung';
    }
}
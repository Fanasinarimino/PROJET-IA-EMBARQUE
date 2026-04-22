// Fonction pour deviner la météo (Simule le modèle IA du TP4)
function devinerMeteo(temp, hum) {
    if (hum > 80) return { texte: "Pluvieux", icone: "ph-cloud-rain", couleur: "text-blue-300" };
    if (hum > 60 && temp < 15) return { texte: "Brouillard", icone: "ph-cloud-fog", couleur: "text-gray-300" };
    if (hum > 50) return { texte: "Partiellement nuageux", icone: "ph-cloud-sun", couleur: "text-yellow-100" };
    if (temp > 25) return { texte: "Ensoleillé et Chaud", icone: "ph-sun", couleur: "text-yellow-400" };
    return { texte: "Ciel Dégagé", icone: "ph-sun", couleur: "text-yellow-300" };
}

async function updateWeather() {
    try {
        // RAPPEL : Assurez-vous que votre server.js tourne en arrière-plan !
        const response = await fetch('http://localhost:3000/api/weather');
        const data = await response.json();
        const lastFeed = data.feeds[data.feeds.length - 1];

        const temp = parseFloat(lastFeed.field1);
        const hum = parseFloat(lastFeed.field2);
        const accel = parseFloat(lastFeed.field3);

        // 1. Mettre à jour les chiffres
        document.getElementById('temp-val').innerText = temp.toFixed(1);
        document.getElementById('hum-val').innerText = `${hum.toFixed(0)} %`;
        document.getElementById('accel-val').innerText = accel.toFixed(2);

        // 2. Mettre à jour la date
        const dateStr = new Date(lastFeed.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('date-display').innerText = `Mis à jour à ${dateStr}`;

        // 3. Mettre à jour l'interface météo (La "Prédiction")
        const meteo = devinerMeteo(temp, hum);
        document.getElementById('weather-desc').innerText = meteo.texte;
        
        const iconElement = document.getElementById('weather-icon');
        // Retirer les anciennes classes et mettre les nouvelles
        iconElement.className = `ph ${meteo.icone} text-8xl drop-shadow-lg mb-2 ${meteo.couleur}`;

    } catch (e) { 
        console.error("Erreur de connexion au capteur", e); 
        document.getElementById('date-display').innerText = "Erreur de connexion au serveur";
    }
}

// Lancer au démarrage puis toutes les 15 secondes
updateWeather();
setInterval(updateWeather, 15000);
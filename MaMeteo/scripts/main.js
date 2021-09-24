
import tabJoursenOrdre from "./Utilitaire/gestionTemps.js";
console.log("Depuis Main JS:" + tabJoursenOrdre);

const CLEAPI = '24a75ef9f2cca3dd269b80d8613dbf12' /*const de la clef copiée sur le site de weatherMap*/
let resultatsAPI;
// ici toute les constantes crées utilisent document.querySlector (et le seclecteur se fait avec le .temps'/localisation' etc)
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imagIcone = document.querySelector(`.logo-meteo`);
const chargementContainer = document.querySelector(`.overlay-icone-chargement`);

/*pour obtenir la géolocation _ Methode de getCurentPosition donc gchrome va localiser sinon si désactiver en 2ème argument une Alerte*/

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        //console.log(position); en dessous on utiliser les let latitude et longitude
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        //ici on créer une methode AppelApid pour appeler les long et lat
        AppelAPI(long, lat);
    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer!`)

    })
    // ici après créer la methode AppelAPI je rentre une fonction avec les argument long et lat
    //et en console log sur Inspecteur il apparait les coordonnées
    function AppelAPI(long, lat) {
        //console.log(long, lat);on récupère la clef du fetch puis on rajoute long et lat et exclude les minutes et les unités métric 
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
            .then((reponse) => {
                return reponse.json(); //renvoi une promesse c-a-d une réponse en json de l'API en json (jav object notation)
            })
            //ici retourne donc la data du json
            .then((data) => {
                //console.log(data);
                //ici retourne le résultat de temps avec la description
                //temps local..innerText c'est jsute le texte sinon on peut faire innerHtml, Math.trunc enlève dans le résultat current.temp les décimales après la virgue ex 17.23° donnera 17°
                resultatsAPI = data;
                temps.innerText = resultatsAPI.current.weather[0].description;//ciel dégagé par exemple
                temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`//17° par exemple
                localisation.innerText = resultatsAPI.timezone;//où l'on se situe europe/Budapest par exemple

                //les heures, par tranche de trois avec leur température.

                let heureActuelle = new Date().getHours(); //ceci donne l'heure actuelle 

                //ici on va itérer à travers "heure" le tableau où il y a tes les heures
                // qui correspond à cela selon la classe indexHtml  <p class="heure-nom-prevision"></p>
                //incrément l'heure actuelle + 3 heure de plus ainsi de suite
                for (let i = 0; i < heure.length; i++) {

                    let heureIncr = heureActuelle + i * 3;


                    if (heureIncr > 24) {
                        heure[i].innerText = `${heureIncr - 24} h`;
                        //ici une condition pur que les chiffres après 24h deviennent 00 et pas 27h car cela n'existe pas..
                    } else if (heureIncr === 24) {
                        heure[i].innerText = "00 h"
                    } else {
                        heure[i].innerText = `${heureIncr} h`;
                    }
                }
                //2nd boucle for pour les températures toutes les 3h

                for (let j = 0; j < tempPourH.length; j++) {
                    tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
                }

                //rangée du dessous 3 1ère lettres des jours

                for (let k = 0; k < tabJoursenOrdre.length; k++) {
                    joursDiv[k].innerText = tabJoursenOrdre[k].slice(0, 3);

                }

                //rangée de dessous : les jours & valeurs des températures
                //j'affiche les températures jour par jour (m + 1)
                for (let m = 0; m < 7; m++) {
                    tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`

                }

                //affiche Icone de mannière dynamique
                // 6 à 21h = en journée donc le jour
                //dans ressource/jour ou nuit les icone 123...en svg

                if (heureActuelle >= 6 && heureActuelle < 21) {
                    imagIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
                } else {
                    imagIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
                }
                //rajout d'une classe disparition
                chargementContainer.classList.add(`disparition`);



            })
    }
}

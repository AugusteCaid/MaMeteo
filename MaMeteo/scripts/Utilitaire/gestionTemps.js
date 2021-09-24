//nous sert à avoir un tableau du jour de la semaine dans l'ordre à partir du jour ou j'y suis moi.
//gestion Temps est importé dans Index.html bas de page script 
const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

//new Date() permet d'afficher la date du jour
let adj = new Date();
let options = { weekday: 'long' };
//ici on passe jour actuel en français tolocaldatestring est une méthode :ici la date locale en français 
let jourActuel = adj.toLocaleDateString('fr-FR', options);
//console.log(jourActuel, adj);

//mettre la 1ère lettre en Maj avec CharAt(0)sélection de la 1ere lettre puis 
//et .slice(1)le reste en normal
//ex: 'M' & 'ardi' = 'Mardi'
jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

//ici calcul pour mettre les jours en ordre le 1er jour ou j'y suis
//.slice -> je prends un morceau du tableau à partir du jour ou je suis (ex Mercredi) puis je lui
//concatene (concat) un autre morceau du/des jours d'avant qui n'apparait pas (ici lun et mardi avant) 
let tabJoursenOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat
    (joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
//console.log(tabJoursenOrdre);


//maintenant j'exporte pour l'importer dans mainjs
export default tabJoursenOrdre;

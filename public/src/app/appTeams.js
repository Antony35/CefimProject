const modifierPrenoms = document.querySelectorAll('.modifier-prenom');
const nameActuels = document.querySelectorAll('.nom');

function changerPrenom(event) {
   const nameActuel = event.currentTarget.previousElementSibling.innerHTML;
   let newName = prompt('Veuiller saisir la modification du prenom');
   console.log(newName);
   if (newName === null || newName === '') {
      newName = nameActuels;
   } else {
      event.currentTarget.previousElementSibling.innerHTML = newName;
   }
}
nameActuels.forEach(nameActuel => {
   nameActuel.addEventListener('click', changerPrenom)
});

modifierPrenoms.forEach(modifierPrenom => {
   modifierPrenom.addEventListener('click', changerPrenom) 
});


const modifierPostes = document.querySelectorAll('.modifier-poste');
const posteActuels =document.querySelectorAll('.poste')

function changerPoste(event) {
   const changerPoste = event.currentTarget.previousElementSibling.innerHTML;
   let newPoste = prompt('Veuiller saisir la modification du poste');
   console.log(newPoste);
   if (newPoste === null || newPoste === '') {
      newPoste = changerPoste;
   }
   event.currentTarget.previousElementSibling.innerHTML = newPoste; 
}

posteActuels.forEach(posteActuel => {
   posteActuel.addEventListener('click', changerPoste)
});

modifierPostes.forEach(modifierPoste => {
   modifierPoste.addEventListener('click', changerPoste) 
});

// Sélectionner le bouton "Ajouter"
let addButton = document.querySelector('.add');

// Ajouter un écouteur d'événement pour le clic sur le bouton "Ajouter"
addButton.addEventListener('click', function() {
  // Sélectionner l'élément à dupliquer
  let personnelItem = document.querySelector('.personnel-item');

  // Cloner l'élément
  let clonedItem = personnelItem.cloneNode(true);

  // Ajouter la classe "copie" à l'élément cloné
  clonedItem.classList.add('nouveau-employé');

  // Ajouter l'élément cloné à la suite des autres éléments
  let employeSection = document.querySelector('.employé');
  employeSection.appendChild(clonedItem);
});

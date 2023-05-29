const listItems = document.querySelector('.list-items')


export default class Item {
  
  quantity = '0';
  itemPrice = '0.00';
  
  constructor(id, price, img, name, description) {
    this.id - id,
    this.price = price,
    this.img = img,
    this.name = name,
    this.description = description
  }

  createItem() {
    listItems.insertAdjacentHTML('beforeend',
  `<li data-index="${this.id}" class="item">
    <p class="item__price">${this.price}</p>
    <img src="${this.img}">
    <p class="item__name">${this.name}</p>
    <div class="item__button">
      <img id='btn-less' src="../src/assets/remove.png" alt="bouton moins">
      <p>${this.quantity}</p>
      <img id='btn-add' src="../src/assets/add.png" alt="bouton plus">
      <img src="../src/assets/euro.png" alt="euro">
      <span class="item__total">${this.itemPrice}</span>
      <img src="../src/assets/delete-black.png" alt="bouton supprimer">
    </div>
    <p class="item__description">${this.description}</p>
  </li>`)
  }

  addItem() {
    console.log(this.name)
  }

  
}
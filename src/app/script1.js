const addsButtons = document.querySelectorAll('.plus'); /*node list qui sotck tout les class .plus*/
const subsButtons = document.querySelectorAll('.moins'); /*node list qui sotck tout les class .plus*/
const trasshButtons = document.querySelectorAll('.trash'); /*node list qui sotck tout les class .plus*/
const trashsTotal = document.querySelectorAll('.trashJs');
const pricesU = document.querySelectorAll('.price-U');
const prices = document.querySelectorAll('.price');
const pricesTotal = document.querySelectorAll('.pricesTotalJs');

function calculPrice (event, qtyItem){
  let priceUInCents = Number.parseFloat(event.currentTarget.parentElement.parentElement.childNodes[3].innerHTML, 10)*100;
  let qtyInU = Number.parseInt(qtyItem, 10);
  const priceU = (priceUInCents * qtyInU) / 100;
  event.currentTarget.parentElement.childNodes[9].innerHTML = priceU + " €";
  }

function addQty(event){
  
  let qty = event.currentTarget.previousElementSibling.innerHTML;
  qty++;
  event.currentTarget.previousElementSibling.innerHTML = qty;
  calculPrice(event, qty)

  let CumulPrices = 0;
  prices.forEach(price => {
    let iterPrice = Number.parseFloat(price.innerHTML, 10) * 100;
    CumulPrices = CumulPrices + iterPrice;
    document.querySelectorAll('.pricesTotalJs').forEach(totalPrice =>{
    totalPrice.innerHTML = "Total " + (Number.parseFloat(CumulPrices, 10) /100) + " €";
    })
   })

}

function subQty(event){
  let qty = event.currentTarget.nextElementSibling.innerHTML
  if(qty > 1){
    qty --
    event.currentTarget.nextElementSibling.innerHTML = qty
  }
  calculPrice(event, qty)
  
  let CumulPrices = 0;
  prices.forEach(price => {
    let iterPrice = Number.parseFloat(price.innerHTML, 10) * 100;
    CumulPrices = CumulPrices + iterPrice; 
    document.querySelectorAll('.pricesTotalJs').forEach(totalPrice =>{
    totalPrice.innerHTML = "Total " + (Number.parseFloat(CumulPrices, 10) /100) + " €";
    })
   })
}

function trash(event){
  let priceUInCents = Number.parseFloat(event.currentTarget.parentElement.parentElement.childNodes[3].innerHTML, 10);
  event.currentTarget.nextElementSibling.innerHTML = priceUInCents + " €";
  let qty = event.currentTarget.previousElementSibling.previousElementSibling.innerHTML;
  qty = 1;
  event.currentTarget.previousElementSibling.previousElementSibling.innerHTML = qty;
}

function razTotal(event){
  pricesU.forEach(priceU =>{
    let iterPrice = Number.parseFloat(priceU.innerHTML, 10) * 100;
    console.log(iterPrice)
    document.querySelectorAll('.price').forEach(razTotal =>{
      razTotal.innerHTML = (Number.parseFloat(iterPrice[razTotal], 10) /100);
      console.log(Number.parseFloat(iterPrice[razTotal]))
      
    })
  })
}
/*function addPricesTotal(event){
  let CumulPrices = 0;
  prices.forEach(price => {
    let iterPrice = Number.parseFloat(price.innerHTML, 10);
    CumulPrices = CumulPrices + iterPrice;
    console.log(CumulPrices)
    event.currentTarget.innerHTML = "Total " + CumulPrices + " €";
   })
  }*/

addsButtons.forEach(addButton =>{
  addButton.addEventListener('click', addQty)
})

subsButtons.forEach(subButtons => {
  subButtons.addEventListener('click', subQty )
})

trasshButtons.forEach(trashButton =>{
  trashButton.addEventListener('click', trash )
})

trashsTotal.forEach(trashTotal =>{
  trashTotal.addEventListener('click', razTotal)
})



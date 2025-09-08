let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

document.getElementById("priceSpan").innerText = `$${price.toFixed(2)}`;
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const debug = document.getElementById("debug");

const calculateChange = (price, cash, cid) => {



  if(price > cash) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  
  price = parseFloat(price).toFixed(2);

  if(price === cash) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    return;
  }

  const totalCID = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);
  
  let change = parseFloat(cash-price).toFixed(2);

  if (parseFloat(change) > parseFloat(totalCID)) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }


  
  if (parseFloat(change) < parseFloat(totalCID)) {
    
    let changeArray = [];

    const currencyUnits = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.10,
      "QUARTER": 0.25,
      "ONE": 1.00,
      "FIVE": 5.00,
      "TEN": 10.00,
      "TWENTY": 20.00,
      "ONE HUNDRED": 100.00
    };

    for (let i = cid.length - 1; i >= 0; i--) {
      let coinName = cid[i][0];
      let coinValue = currencyUnits[coinName];
      let coinTotal = cid[i][1];
      let coinCount = Math.floor(coinTotal / coinValue);
      let coinsToReturn = 0;

      while (change >= coinValue && coinCount > 0) {
        change -= coinValue;
        change = parseFloat(change).toFixed(2);
        coinCount--;
        coinsToReturn++;
      }

      if (coinsToReturn > 0) {
        changeArray.push([coinName, coinsToReturn * coinValue]);
      }
    }

    debug.innerText += `Change After: ${change}\n`;

    if (change > 0) {
      changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
      return;
    } else if (parseInt(change) === 0) {
      changeDue.innerText = "Status: OPEN \n";
      changeArray.forEach(coin => {
        changeDue.innerText += ` ${coin[0]}: $${coin[1].toFixed(2)} \n`;
      });
      return;
    }

  } else if (change === totalCID) {
    changeDue.innerText = "Status: CLOSED \n";
    for (let i = cid.length - 1; i >= 0; i--) {
      if (cid[i][1] > 0) {
        changeDue.innerText += ` ${cid[i][0]}: $${cid[i][1].toFixed(2)} \n`;
      }
    }
    return;
  }

}

purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(cashInput.value).toFixed(2);
  changeDue.innerText = "";
  calculateChange(price, cash, cid);
});
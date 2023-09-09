"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Anurag Singh",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2023-12-23T07:42:02.383Z",
    "2023-01-28T09:15:04.904Z",
    "2023-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-05-27T17:01:17.194Z",
    "2023-07-11T23:36:17.929Z",
    "2023-07-12T10:51:36.790Z",
  ],
  currency: "INR",
  locale: "hi",
};

const account2 = {
  owner: "Lucky Mishra",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2023-11-01T13:15:33.035Z",
    "2023-11-30T09:48:16.867Z",
    "2023-12-25T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2023-02-05T16:33:06.386Z",
    "2023-04-10T14:43:26.374Z",
    "2023-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Vishal Singh",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2023-11-01T13:15:33.035Z",
    "2023-11-30T09:48:16.867Z",
    "2023-12-25T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2023-02-05T16:33:06.386Z",
    "2023-04-10T14:43:26.374Z",
    "2023-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "en-GB",
};

 

const accounts = [account1, account2,account3];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Date formatting
const formatdate = (date, locale) => {
  // calculate the difference of days and passed to dayspassed variable
  const datecalc = (date2, date1) => Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  let dayspassed = datecalc(new Date(), date);

  if (dayspassed === 0) return "Today";
  if (dayspassed === 1) return "Yesterday";
  if (dayspassed <= 7) return `${dayspassed} day's ago`;

  return new Intl.DateTimeFormat('locale').format(date);
  // const year = date.getFullYear();
  // const month = `${date.getMonth()}`.padStart(2, "0");
  // const datee = `${date.getDate()}`.padStart(2, "0");
  // return `${datee}/${month}/${year}`;

}

const dateformmatingfunction = (value, local, currency) => new Intl.NumberFormat(local, {
  style: "currency",
  currency: currency,
}).format(value);

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const moves =
    sort === true ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  moves.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    // let date1 = new Date(acc.movementsDates[i]); //It is the common method of calling an another loop with the help of another existing looping condition
    let sttodate = new Date(acc.movementsDates[i]);
    let displaydatee = formatdate(sttodate, acc.locale);
    const currencyformatting = dateformmatingfunction(mov, acc.locale, acc.currency);
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
      <div class="movements__date">${displaydatee}</div>
          <div class="movements__value">${currencyformatting}</div>
        </div>
      `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const creatusername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((mov) => mov.slice(0, 1))
      .join("");
  });
};
creatusername(accounts);

let depositsandwithdrwal = function (accs) {
  accs.deposit = accs.movements.filter((movv) => movv > 0);
  accs.withdrawal = accs.movements.filter((mov) => mov < 0);
};

// Total balance
const currenbalance = function (acc) {
  acc.totalbalace = acc.movements.reduce((acc, mov) => acc + mov, 0);
};

const displaycurrntbalance = function (acc) {
  let currencyformatting = dateformmatingfunction(acc.totalbalace, acc.locale, acc.currency);
  const html = ` 
       <p class="balance__value">${currencyformatting}</p>`;
  labelBalance.innerHTML = html;
};
const displaysummery = (acc) => {
  let inc = acc.deposit.reduce((temp, curr) => temp + curr);
  let out = acc.withdrawal.reduce((temp, curr) => temp + curr, 0);
  labelSumIn.textContent = `${dateformmatingfunction(inc, acc.locale, acc.currency)} `;
  labelSumOut.textContent = `${dateformmatingfunction(Math.abs(out), acc.locale, acc.currency)} `;

  let interest = acc.deposit
    .map((curr) => (curr * acc.interestRate) / 100)
    .filter((interestlessthan1) => interestlessthan1 > 1)
    .reduce((temp, curr) => temp + curr, 0);
  labelSumInterest.textContent = `${dateformmatingfunction(interest, acc.locale, acc.currency)} `;
};
const updateui = function (acc) {
  displayMovements(acc);
  depositsandwithdrwal(acc);
  displaysummery(acc);
  currenbalance(acc);
  displaycurrntbalance(acc);
};
let currentuser = "",starttimer;
// // fake login
// currentuser = account1;
// updateui(currentuser);
// containerApp.style.opacity = "100";

//  button working function

btnLogin.addEventListener("click", function (e) {
  // Prevent from Submitting
  e.preventDefault();
  currentuser = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentuser?.pin === Number(inputLoginPin.value)) {
    // display UI and display welcome Message
    labelWelcome.textContent = `Good Evening,  ${currentuser.owner.split(" ")[0]
      }`;
    containerApp.style.opacity = "100";
    // clear field after login
    inputLoginPin.value = inputLoginUsername.value = "";
    // display dates

    const now = new Date();
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    labelDate.textContent = new Intl.DateTimeFormat(currentuser.locale,options).format(now);

    // Display UI
    updateui(currentuser);
    // on the timer
     if(starttimer)
    clearInterval(starttimer);
    starttimer=logouttimer();
  }
});


// Transfer money to another user --------event handler //

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  let amount = Number(inputTransferAmount.value);

  let recivername = accounts.find(
    (curr) => curr.username === inputTransferTo.value
  );

  // Check on transfer money

  if (
    amount <= currentuser.totalbalace &&
    recivername &&
    amount > 0 &&
    recivername.username != currentuser.username
  ) {
    currentuser.movements.push(-amount);
    recivername.movements.push(amount);
    // date transfer
    currentuser.movementsDates.push(new Date().toISOString());
    recivername.movementsDates.push(new Date().toISOString());
    updateui(currentuser);
    clearInterval(starttimer);
    starttimer=logouttimer();
  }
  inputTransferTo.value = inputTransferAmount.value = "";
});

// Close account  functionality
const hideui = () => (containerApp.style.opacity = "0");
btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  let closeusername = accounts.find(
    (curr) => curr.username === inputCloseUsername.value
  );
  if (
    closeusername.username === currentuser.username &&
    closeusername.pin === Number(inputClosePin.value)
  ) {
    let inec = accounts.findIndex(
      (curr) => curr.username === closeusername.username
    );
    // delete account
    accounts.splice(inec, 1);
    //  hide ui
    hideui();
  }
  // remove input content
  inputCloseUsername.value = inputClosePin.value = "";
});

// Lone reqest functionality
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentuser.movements.some((curr) => curr > amount / 10)) {

    setTimeout(() => {
      //  Update the movement in the currentuser
      currentuser.movements.push(amount);
      // pushing the date in the datearray of object
      currentuser.movementsDates.push(new Date().toISOString());
      // Update ui
      updateui(currentuser);
      clearInterval(starttimer);
    starttimer=logouttimer();
    }
      , 2500);
  }
  inputLoanAmount.value = "";
});

//  Sort btn functionality
let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentuser, !sorted);
  sorted = !sorted;
});


let logouttimer = () => {
 let timer=300;
  const tick = () => {
    let min= String(Math.floor( timer/60)).padStart(2,0);
    let sec= String(timer%60).padStart(2,0);
    labelTimer.textContent=`${min}:${sec}`;
    // if timer reaches 0 then logout of display
    if(timer===0)
    { 
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started  `;
      hideui();
    }
    // update the timer every second
    timer--;
  }; tick();
 const t=setInterval(tick,1000);
 return t;
}

 





















// //   some calculation stuffesssss
// // 1
// let backdeposits = accounts.flatMap((curr) => curr.movements); //it first call the map method and then flat it
// console.log(
//   backdeposits.filter((curr) => curr > 0).reduce((temp, curr) => temp + curr)
// );
// // 2 To check the deposits >$1000
// //  const check= accounts.flatMap(curr=>curr.movements).filter(curr=>curr>1000).length;
// const check = accounts
//   .flatMap((curr) => curr.movements)
//   .reduce((temp, cur) => (cur > 1000 ? ++temp : temp), 0);
// console.log(check);
// // 3 To make an object of deposits and withdrawls

// const ob = accounts
//   .flatMap((curr) => curr.movements)
//   .reduce(
//     (temp, curr) => {
//       curr > 0 ? (temp.diposits += curr) : (temp.withdrawls += curr);
//       return temp;
//     },
//     { diposits: 0, withdrawls: 0 }
//   );
// console.log(ob);
// console.log([...document.querySelectorAll(".movements__row")]);

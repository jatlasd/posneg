

let add = document.getElementById('add');
let deposit = document.getElementById('deposit');
let withdrawal = document.getElementById('withdrawal');
let table = document.getElementById('table');
let currentBalance = document.getElementById('current-balance');
let desc = document.getElementById('desc');



let balance = 400;
let transactionType = '';

deposit.addEventListener('click', function() {
    if (transactionType === '' || transactionType === 'withdrawal') {
        transactionType = 'deposit';
        deposit.classList.add('deposit-selected')
        if(withdrawal.classList.contains('withdrawal-selected')) {
            withdrawal.classList.remove('withdrawal-selected')
        }
    }
});

withdrawal.addEventListener('click', function() {
    if (transactionType === '' || transactionType === 'deposit') {
        transactionType = 'withdrawal';
        withdrawal.classList.add('withdrawal-selected')
        if(deposit.classList.contains('deposit-selected')) {
            deposit.classList.remove('deposit-selected')
        }
    }
});

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

function updateBalance() {
    currentBalance.innerHTML = `$${balance.toFixed(2)}`
    if(balance<0) {
        currentBalance.classList.add('negative')
    }
    else if (currentBalance.classList.contains('negative')) {
        currentBalance.classList.remove('negative')
    }
}
updateBalance()

function addTransaction(e) {
    e.preventDefault();

    let inp = document.getElementById('input');
    let input = Number(inp.value);

    const isDeposit = transactionType === 'deposit';

    let row = document.createElement('tr');
    let date = document.createElement('td');
    let description = document.createElement('td');
    let dep = document.createElement('td');
    let withd = document.createElement('td');
    let bal = document.createElement('td');

    date.innerText = today;
    description.innerText = `  ${desc.value}`;

    if (isDeposit) {
        dep.innerHTML = `$${input.toFixed(2)}`;
        dep.className = 'positive';
        withd.innerText = '';
        bal.innerHTML = `$${(balance + input).toFixed(2)}`;
        balance += input;
    } else {
        dep.innerText = '';
        withd.innerHTML = `$${input.toFixed(2)}`;
        withd.className = 'negative';
        bal.innerHTML = `$${(balance - input).toFixed(2)}`;
        balance -= input;
    }

    if(isDeposit) {
        deposit.classList.remove('deposit-selected')
    } else {
        withdrawal.classList.remove('withdrawal-selected')
    }

    updateBalance()
    row.appendChild(date);
    row.appendChild(description);
    row.appendChild(dep);
    row.appendChild(withd);
    row.appendChild(bal);

    table.appendChild(row);
    inp.value = ''
    desc.value = ''
}

add.addEventListener('click', addTransaction);

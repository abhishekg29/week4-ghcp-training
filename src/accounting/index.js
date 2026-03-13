const readline = require('readline');

let balance = 1000.00; // Initial balance, simulating data.cob

function displayMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function viewBalance() {
  console.log(`Current balance: ${balance.toFixed(2)}`);
}

function creditAccount(amount) {
  const amt = parseFloat(amount);
  if (isNaN(amt) || amt < 0) {
    console.log('Invalid amount.');
    return;
  }
  balance += amt;
  console.log(`Amount credited. New balance: ${balance.toFixed(2)}`);
}

function debitAccount(amount) {
  const amt = parseFloat(amount);
  if (isNaN(amt) || amt < 0) {
    console.log('Invalid amount.');
    return;
  }
  if (balance >= amt) {
    balance -= amt;
    console.log(`Amount debited. New balance: ${balance.toFixed(2)}`);
  } else {
    console.log('Insufficient funds for this debit.');
  }
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let continueFlag = true;

  while (continueFlag) {
    displayMenu();
    const choice = await new Promise((resolve) => {
      rl.question('Enter your choice (1-4): ', resolve);
    });

    switch (choice) {
      case '1':
        viewBalance();
        break;
      case '2':
        const creditAmount = await new Promise((resolve) => {
          rl.question('Enter credit amount: ', resolve);
        });
        creditAccount(creditAmount);
        break;
      case '3':
        const debitAmount = await new Promise((resolve) => {
          rl.question('Enter debit amount: ', resolve);
        });
        debitAccount(debitAmount);
        break;
      case '4':
        continueFlag = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }

  console.log('Exiting the program. Goodbye!');
  rl.close();
}

if (require.main === module) {
  main();
}

module.exports = {
  balance,
  viewBalance,
  creditAccount,
  debitAccount,
  displayMenu
};
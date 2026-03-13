const { balance, viewBalance, creditAccount, debitAccount, displayMenu } = require('../index');

describe('Account Management System', () => {
  let consoleSpy;

  beforeEach(() => {
    // Reset balance before each test
    balance = 1000.00;
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('TC-001: View initial balance', () => {
    viewBalance();
    expect(consoleSpy).toHaveBeenCalledWith('Current balance: 1000.00');
  });

  test('TC-002: Credit account with valid amount', () => {
    creditAccount('500.00');
    expect(balance).toBe(1500.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1500.00');
  });

  test('TC-003: Debit account with sufficient funds', () => {
    balance = 1500.00; // Set after TC-002
    debitAccount('200.00');
    expect(balance).toBe(1300.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 1300.00');
  });

  test('TC-004: Debit account with insufficient funds', () => {
    balance = 1300.00; // Set after TC-003
    debitAccount('2000.00');
    expect(balance).toBe(1300.00); // Unchanged
    expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
  });

  test('TC-005: Multiple credit operations', () => {
    balance = 1300.00;
    creditAccount('100.00');
    expect(balance).toBe(1400.00);
    creditAccount('50.00');
    expect(balance).toBe(1450.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1400.00');
    expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1450.00');
  });

  test('TC-006: Multiple debit operations', () => {
    balance = 1450.00;
    debitAccount('100.00');
    expect(balance).toBe(1350.00);
    debitAccount('50.00');
    expect(balance).toBe(1300.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 1350.00');
    expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 1300.00');
  });

  test('TC-009: Credit with zero amount', () => {
    balance = 1300.00;
    creditAccount('0.00');
    expect(balance).toBe(1300.00); // Unchanged
    expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1300.00');
  });

  test('TC-010: Debit with zero amount', () => {
    balance = 1300.00;
    debitAccount('0.00');
    expect(balance).toBe(1300.00); // Unchanged
    expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 1300.00');
  });

  test('TC-011: Credit with maximum amount', () => {
    balance = 1300.00;
    creditAccount('999999.99');
    expect(balance).toBe(1001300.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1001300.00');
  });

  test('TC-012: Debit entire balance', () => {
    balance = 1300.00;
    debitAccount('1300.00');
    expect(balance).toBe(0.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 0.00');
  });

  test('Invalid amount for credit', () => {
    creditAccount('abc');
    expect(balance).toBe(1000.00); // Unchanged
    expect(consoleSpy).toHaveBeenCalledWith('Invalid amount.');
  });

  test('Invalid amount for debit', () => {
    debitAccount('-100');
    expect(balance).toBe(1000.00); // Unchanged
    expect(consoleSpy).toHaveBeenCalledWith('Invalid amount.');
  });

  test('Display menu', () => {
    displayMenu();
    expect(consoleSpy).toHaveBeenCalledWith('--------------------------------');
    expect(consoleSpy).toHaveBeenCalledWith('Account Management System');
    expect(consoleSpy).toHaveBeenCalledWith('1. View Balance');
    expect(consoleSpy).toHaveBeenCalledWith('2. Credit Account');
    expect(consoleSpy).toHaveBeenCalledWith('3. Debit Account');
    expect(consoleSpy).toHaveBeenCalledWith('4. Exit');
    expect(consoleSpy).toHaveBeenCalledWith('--------------------------------');
  });
});
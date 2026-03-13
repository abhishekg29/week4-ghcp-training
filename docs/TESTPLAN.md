# COBOL Account Management System - Test Plan

This test plan covers the business logic and implementation of the COBOL-based account management system. It is designed to validate functionality with business stakeholders and will serve as a foundation for creating unit and integration tests in the Node.js transformation.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|-----------------|----------------|---------------------|----------|
| TC-001 | View initial balance | Application is compiled and executable is present. Initial balance is 1000.00. | 1. Run the application.<br>2. Select option 1 (View Balance).<br>3. Observe the displayed balance. | Displays "Current balance: 001000.00" |  |  | Initial state verification. |
| TC-002 | Credit account with valid amount | Application is running. Current balance is 1000.00. | 1. Select option 2 (Credit Account).<br>2. Enter a valid amount (e.g., 500.00).<br>3. Observe the confirmation and new balance. | Balance increases by entered amount. Displays "Amount credited. New balance: 001500.00" |  |  | Tests positive credit flow. |
| TC-003 | Debit account with sufficient funds | Application is running. Current balance is 1500.00 (after TC-002). | 1. Select option 3 (Debit Account).<br>2. Enter an amount less than or equal to current balance (e.g., 200.00).<br>3. Observe the confirmation and new balance. | Balance decreases by entered amount. Displays "Amount debited. New balance: 001300.00" |  |  | Tests positive debit flow. |
| TC-004 | Debit account with insufficient funds | Application is running. Current balance is 1300.00 (after TC-003). | 1. Select option 3 (Debit Account).<br>2. Enter an amount greater than current balance (e.g., 2000.00).<br>3. Observe the error message. | Displays "Insufficient funds for this debit." Balance remains unchanged. |  |  | Tests error handling for insufficient funds. |
| TC-005 | Multiple credit operations | Application is running. Current balance is 1300.00. | 1. Select option 2 (Credit Account).<br>2. Enter 100.00.<br>3. Select option 2 again.<br>4. Enter 50.00.<br>5. Select option 1 to view balance. | Balance reflects cumulative credits: 1300 + 100 + 50 = 1450.00 |  |  | Verifies persistence across operations. |
| TC-006 | Multiple debit operations | Application is running. Current balance is 1450.00. | 1. Select option 3 (Debit Account).<br>2. Enter 100.00.<br>3. Select option 3 again.<br>4. Enter 50.00.<br>5. Select option 1 to view balance. | Balance reflects cumulative debits: 1450 - 100 - 50 = 1300.00 |  |  | Verifies persistence across operations. |
| TC-007 | Invalid menu choice | Application is running. | 1. Enter an invalid choice (e.g., 5).<br>2. Observe the response. | Displays "Invalid choice, please select 1-4." Continues to show menu. |  |  | Tests input validation. |
| TC-008 | Exit application | Application is running. | 1. Select option 4 (Exit).<br>2. Observe the termination. | Displays "Exiting the program. Goodbye!" and terminates. |  |  | Verifies clean exit. |
| TC-009 | Credit with zero amount | Application is running. Current balance is 1300.00. | 1. Select option 2 (Credit Account).<br>2. Enter 0.00.<br>3. Select option 1 to view balance. | Balance remains 1300.00. |  |  | Edge case: zero credit. |
| TC-010 | Debit with zero amount | Application is running. Current balance is 1300.00. | 1. Select option 3 (Debit Account).<br>2. Enter 0.00.<br>3. Select option 1 to view balance. | Balance remains 1300.00. |  |  | Edge case: zero debit. |
| TC-011 | Credit with maximum amount (999999.99) | Application is running. Current balance is 1300.00. | 1. Select option 2 (Credit Account).<br>2. Enter 999999.99.<br>3. Select option 1 to view balance. | Balance becomes 1001300.00 (if supported) or handles overflow gracefully. |  |  | Tests upper limit of PIC 9(6)V99. |
| TC-012 | Debit entire balance | Application is running. Current balance is 1300.00. | 1. Select option 3 (Debit Account).<br>2. Enter 1300.00.<br>3. Select option 1 to view balance. | Balance becomes 0.00. |  |  | Edge case: full debit. |

## Notes
- All test cases assume the application starts with an initial balance of 1000.00.
- "Actual Result" and "Status" columns should be filled during testing.
- This plan covers functional testing; performance and security tests are out of scope.
- For Node.js transformation, these cases can be adapted into unit tests (e.g., for operations module) and integration tests (e.g., for full flow).</content>
<parameter name="filePath">/workspaces/week4-ghcp-training/docs/TESTPLAN.md
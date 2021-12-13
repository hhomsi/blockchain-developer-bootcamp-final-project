# SWC-103 (Floating pragma)

Specific compiler pragma 0.8.10 used in contracts to avoid accidental bug inclusion through outdated compiler versions.

# SWC-105 (Unprotected Ether Withdrawal)
- Using Checks-effects-interactions pattern (Avoiding state changes after external calls)
- Using the withdrwal pattern

# Modifiers used only for validation

- Using the circuit breaker pattern
- All modifiers in contract(s) only validate data with require statements.

# re-entrancy

- CancelSubscription, RequestClaim and WithrawBalance functions, all protected against the reentrancy

# Tx.Origin Authentication

- It is never used in the smart contracts coding

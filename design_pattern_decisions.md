# Design patterns used

## factory pattern

- Using the factory design pattern: P2P_Insurance (the factory) that creates objects/smart contracts (InsurancePool) upon creation.

## Inheritance and Interfaces

- Createing the PoolMember interface and inherits from it in the InsurancePool contract

## Inter-Contract Execution

- Calling functions in external contracts ( P2P_Insurance > InsurancePool)

## Access Control

- Pool can be finished or canceled only by the pool manager

## Optimizing Gas

- As example, not using the struct construtor (PoolMember Struct), instead assign variables to values
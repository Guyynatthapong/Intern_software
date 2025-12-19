# Assignment 1: API

### Installation
1. Clone the repository and navigate to the folder:
```bash
   $ cd assignment_1_api
``` 
2. Install dependencies:
```bash
   $ npm install
```
3. Database Configuration:
Ensure your MongoDB is running on the default port (mongodb://localhost:27017/) or configure the connection string in the module file.

### Running the Server
Start the application in development mode:
```bash
   $ npm run start:dev
```
The server will start on http://localhost:3000
and open in path http://localhost:3000/transactions

# Testing 
E2E Tests Run:
```bash
   $ npm run test:e2e
```

### Design Decisions
- NestJS Framework
- MongoDB : 
Schema design For a assignment a personal finance track it should have a 
category, 
type(For income and expense), 
descriptions(ex.ค่าข้าว, ตั๋ว BTS),
amount,
deleteAt(For a soft delete It will set the value to check true or false)
date(A day that you create a transactions)
- DTO + Validation : 
Design For Validation a empty field such as a CreateTransactions or UpdateTransactions 



### What I'd Improve (With More Time)
If I had more time, I would:
- Add authentication & authorization For identification to be able to track that person's transactions.
- Write more unit and e2e tests.
- Improve more case of error handling.

### Time Spent 
I used 1 hour for this assignment
- Project setup & configuration: ~10 minutes
- Schema & DTO design: ~15 minutes
- CRUD implementation: ~20 minutes
- Basic testing : ~10 minutes
- cleanup: ~5 minutes

### API Endpoints

Base Url = `/transactions`

Method | Endpoint | Description | Query Params / Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Create a new transaction | **Body**: `{ description,type, category, amount, ... }` |
| `GET` | `/` | Get all transactions It depends on the conditions such as type , category | **Query**: `?type=expense&category=food` |  
| `GET` | `/:id` | Get a specific or one transaction | - |
| `PUT` | `/:id` | Update transaction details | **Body**: `{ ...fields to update }` such as ({"amount" : 150})|
| `DELETE` | `/:id` | Soft delete a transaction | - |
| `PATCH` | `/:id/restore` | Restore a deleted transaction | - |
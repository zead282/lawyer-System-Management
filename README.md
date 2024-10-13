# lawyer-System-Management
A web-based system to manage law firm operations, including client cases, schedules, document management, and task assignments for lawyers.

## Overview
The Lawyer System Management project is designed to help law firms manage their daily operations efficiently. It provides features to handle client information, assign tasks, track case statuses,using paymob payment gateway to facilitate the booking of legal consultations and manage legal documents securely.


## Features
  * User authentication and role-based access control (Admin, Lawyer, Client).
  * Case and client management.
  * Book a legal consultation.
  * Task and event scheduling.
  * Notifications and reminders.
  * Dashboard with key metrics.

## Usage
* Admin: Create lawyer accounts, manage cases, and access all data.
* Lawyer: Manage assigned cases, interact with clients, and upload documents.
* Client: View case progress, send messages, Book a legal consultation and view legal documents.

## Folder Structure
``` bash
./src/
  ├── config/               # Configuration files (DB, server, etc.)
  ├── modules/              # Main modules (users, tasks, cases, etc.)
  │   ├── user/             
  │   ├── admin/             
  │   ├── lawyer/
  │   ├── artical/             
  │   ├── sub-artical/
  │   ├── consultations/                   
  ├── middlewares/          # Custom middleware (auth, error handling)
  ├── payment-handler/      # Payment-related logic (e.g., invoicing, transactions)
  ├── services/             # Service layer for business logic
  ├── utils/                # Helper functions
  └── app.js                # Main app file

```
## Installation
1- Clone the repository:
```bash
git clone https://github.com/your-username/lawyer-system-management.git
cd lawyer-system-management
```
2- add your config folder at root directly and set up environment variables: Create a .env 
```bash
DATABASE_URL=<your MongoDB URI>
JWT_SECRET=<your JWT secret>
PORT=3000
....

```
3- Install dependencies:
``` bash
npm install
```
4- Run the application:
```bash
npm run dev

# RePlate — Surplus to Support

Turn surplus into support — connect donors with NGOs to reduce food waste and help communities.


## 🔍 Project Overview

RePlate is a donation platform that connects donors and NGOs to redistribute surplus food and resources. It provides donor and NGO dashboards,real-time donation/request management, real-time chat (Socket.io), and JWT-based authentication.

---

## 🚀 Features

- Donor and NGO registration and profiles
- Create, list, and manage donations and requests
- Real-time conversations and notifications via WebSockets
- Role-based access control (donor, ngo)
- Dashboard views and reporting (charts)

---

## 🧰 Tech Stack

| Layer | Technology | Purpose | Notes |
| --- | --- | --- | --- |
| Frontend | React (v19), Vite, Tailwind CSS, MUI | Single-page app, UI components & styling | Located in `Client/` |
| Backend | Node.js, Express | REST API and business logic | Located in `Server/` |
| Database | MongoDB (Mongoose) | Data persistence | Connection via `MONGODB_URI` |
| Real-time | Socket.io | WebSockets for chat & notifications | Socket server in `Server/server.js` |
| Authentication | JWT | Token-based authentication | Tokens generated with 1h expiry |
| Deployment | Vercel (frontend), Render/Heroku (backend) | Hosting & deployment | Update CORS origins in `Server/server.js` |

---

## 📸 Screenshots

Below are selected screenshots from the app (images are in `docs/screenshots/`). Click any image to view the full-size version.

- **Landing Page**

  ![Landing Page](/docs/screenshots/Landing_Page.png)

  Public landing/home page showcasing the app's intro and CTA.

- **Sign Up**

  ![Sign Up](/docs/screenshots/SignUp.png)

  Registration form with tabs to choose Donor or NGO.

- **Donor Profile**

  ![Donor Profile](/docs/screenshots/DonorProfile.png)

  Donor profile and account settings page.

- **Donor Dashboard**

  ![Donor Dashboard](/docs/screenshots/DonorDashboard.png)

  Donor landing dashboard showing quick stats and actions.


- **Donor Donations**

  ![Donor Donations](/docs/screenshots/DonorDonations.png)

  List of a donor's active and past donations.

- **View Donation Request**

  ![View Donation Request](/docs/screenshots/ViewDonationRequest.png)

  Detail view for a specific donation or request.

- **Add New Donation**

  ![Add New Donation](/docs/screenshots/AddNewDonation.png)

  Form for creating a new donation, including image uploads.


- **Donor Conversations**

  ![Donor Conversations](/docs/screenshots/DonorConversationsPage.png)

  Conversation list and message previews for donors.

- **Chatting Page**

  ![Chatting Page](/docs/screenshots/ChattingPage.png)

  Real-time chat interface used for messaging between users.

- **NGO Profile**

  ![NGO Profile](/docs/screenshots/ngo_profile.png)

  NGO organization profile and contact information.

- **NGO Dashboard**

  ![NGO Dashboard](/docs/screenshots/ngo_dashboard.png)

  NGO dashboard with donation metrics and summaries.

- **NGO Received Donations**

  ![NGO Received Donations](/docs/screenshots/ngo_receivedDonations.png)

  Record of donations received by the NGO.

- **NGO Active Donations**

  ![NGO Active Donations](/docs/screenshots/ngoActiveDonations.png)

  List showing donations currently active or ready for pickup.

- **NGO Request Page**

  ![NGO Request Page](/docs/screenshots/ngoRequestPage.png)

  Page for NGOs to create or view requests for donations.

- **NGO Conversations**

  ![NGO Conversations](/docs/screenshots/ngoConversation.png)

  Messaging view for NGO communications.



> Tip: Reorder screenshots or edit captions here; include descriptive alt text for accessibility.

---

## 🧩 Quick Start (Local)

Prerequisites: Node.js (v18+ recommended) and npm

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd RePlate
   ```

2. Backend setup

   ```bash
   cd Server
   npm install
   # create a .env file (see Environment variables below)
   npm start
   ```

3. Frontend setup

   ```bash
   cd ../Client
   npm install
   npm run dev
   # opens at http://localhost:5173 by default
   ```

---

## ⚙️ Environment Variables

Server (`Server/.env`) - required:

```
MONGODB_URI="your_mongodb_connection_string"
SECRET_KEY="your_jwt_secret"
PORT=3000
```

Client (`Client/.env`):

```
VITE_BACKEND_URL="http://localhost:3000"
```

---

## 🧭 API Endpoints (Overview)

The backend exposes these main route prefixes:

- `POST /user`, `GET /user` — user registration/login/profile
- `POST /donation`, `GET /donation` — manage donations
- `POST /ngo`, `GET /ngo` — NGO operations
- `POST /donor`, `GET /donor` — donor operations
- `GET /conversations`, `POST /messages` — messaging and chat

(See `Server/routes` for full details.)

---

## 📝 License

Add a `LICENSE` file with your preferred license (MIT is a common choice).

---


# InnSite - There Be Dragons

**InnSite** is a fantasy-themed Airbnb clone where adventurers can browse, book, and review mystical inns (or taverns).

![InnSite Showcase](showcase.gif)

## Technologies Used

- **Frontend**: React for building dynamic user interfaces.
- **State Management**: Redux for managing the application's state.
- **Backend**: Express.js for handling server-side logic and API requests.
- **ORM**: Sequelize for managing database interactions..
- **Database**: PostgreSQL for production and SQLite for development.

## Local Development

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v16 or higher)

1. **Clone the Repository**

```bash
git clone https://github.com/aileks/InnSite.git
```

2. **Install Dependencies**

```bash
cd InnSite && npm install
```

3. **Set Up the Database**

- The local DB will be SQLite.
- Copy `.env.example` to `.env` and update it with your own credentials:

```bash
cd backend && cp .env.example .env
```

4. **Run Migrations & Seeders**

```bash
npx dotenv sequelize-cli db:migrate
npx dotenv sequelize-cli db:seed:all
```

## Running the Application

1. **Start the Backend Server**

```bash
cd backend && npm start
```

2. **Start the Frontend Server**

```bash
cd frontend && npm run dev
```

3. **Visit `http://localhost:5173/` in your browser**

# Konimbo Landing Page

A professional landing page with a contact form that submits directly to Airtable via API.

## Tech Stack

- **Next.js 16** - React framework with built-in routing and API routes
- **React 19** - UI component library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Airtable API** - Database for storing form submissions

## Project Structure
```
konimbo-landing-page/
├── app/
│   ├── api/
│   │   └── submit/
│   │       └── route.js        # Backend API endpoint → sends data to Airtable
│   ├── globals.css             # Global styles + Tailwind import
│   ├── layout.js               # Root layout wrapper (font, metadata)
│   └── page.js                 # Homepage — hero, navbar, form card, footer
├── components/
│   └── ContactForm.jsx         # Form component with state and validation
├── .env.local                  # Secret credentials (not committed to GitHub)
└── README.md
```

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/OhadAms/Konimbo-Landing-Page.git
cd Konimbo-Landing-Page
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the **root** of the project (same level as `package.json`):
```
AIRTABLE_API_KEY=your_personal_access_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=UserData
```

### Where to get each value:

**AIRTABLE_API_KEY**
1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Give it a name, set scopes to `data.records:read` + `data.records:write`
4. Select your base under Access
5. Copy the token - it starts with `pat...`

**AIRTABLE_BASE_ID**
1. Open your Airtable base in the browser
2. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
3. Copy the part that starts with `app` - that is your Base ID

**AIRTABLE_TABLE_NAME**
- The exact name of your table as it appears in Airtable (e.g. `UserData`)

### 4. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Airtable Table Setup

Create a base with a table named `UserData` with these fields:

| Field Name | Field Type |
|---|---|
| Name | Single line text |
| Family Name | Single line text |
| Email | Email |
| Message | Long text |
| Submitted At | Date |

## How It Works

1. User fills in the form on the landing page
2. On submit, the form sends a `POST` request to `/api/submit`
3. The API route (server-side) reads the credentials from `.env.local`
4. It forwards the data to Airtable using the Airtable REST API
5. On success, the form shows a confirmation message
6. On failure, the form shows a descriptive error message

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint code checks |
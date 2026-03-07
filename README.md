# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

To connect forms to the Flask backend, set:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

## Backend Setup (Flask + PostgreSQL)

This repo now includes a Flask backend in `backend/` with a PostgreSQL schema for:

- `contributions`
- `uploads`

### Contribution Schema

- `id` (primary key)
- `title`
- `artist_name`
- `description_text`
- `alt_text_description`
- `artwork_image_url`
- `audio_url` (optional)
- `video_url` (optional)
- `ar_asset_url_ios` (USDZ URL)
- `ar_asset_url_android` (GLB URL)
- `created_at`
- `updated_at`

### Upload Schema

- `id` (primary key)
- `name`
- `artwork_image_url`
- `ar_asset_url_ios` (optional USDZ URL)
- `ar_asset_url_android` (optional GLB URL)
- `email` (optional)
- `created_at`

### Run with Docker (Recommended)

```bash
docker compose up --build
```

Services:

- PostgreSQL: `localhost:5432`
- Flask API: `http://localhost:5000`

### Local Python Run

1. Create and activate a virtual environment in `backend/`.
2. Install dependencies.
3. Set env vars (copy `backend/.env.example`).
4. Initialize tables.
5. Run Flask.

Example:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
flask --app manage.py init-db
flask --app manage.py run --host=0.0.0.0 --port=5000
```

### API Endpoints

- `GET /api/health`
- `GET /api/contributions`
- `POST /api/contributions`
- `GET /api/uploads`
- `POST /api/uploads`

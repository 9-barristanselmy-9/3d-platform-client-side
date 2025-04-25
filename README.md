# ABOUT
# 🧊 3D Model Sharing Platform
A platform where creators can soon upload and share 3D models.  
For now, you can **sign up and log in** — the rest is coming soon!

## 🔐 Current Features

- ✅ User registration (sign up)
- ✅ User login (sign in)
- 🔒 Protected routes for authenticated users
  
## 🚀 Coming Soon   
- 🧠 Upload and preview 3D models
- 👤 User profiles
- ❤️ Like & comment system
- 🗃 Model management dashboard
- 🔍 Discover and explore public models
- 🧼 Content moderation
- 📦 15GB free storage per user

## 🧱 Tech Stack
- **Frontend:** Next.js 15 (using Server Actions), React, Tailwind CSS
- **Database:** MongoDB with **Prisma ORM**
- **Authentication:** Auth.js v5
## 🔐 Demo Login
You can explore the app using:

**Email**: demo@demo.com  
**Password**: demopassword
## Installation
Create a .env.local file in the root of the project and add the required environment variables
```bash
MONGODB_URI==<mongodb_url>
NEXTAUTH_SECRET=<your_secret>
NEXTAUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=<your_google_client_id>
AUTH_GOOGLE_SECRET=<your_google_client_secret>
AUTH_DISCORD_ID=<your_discord_client_id>
AUTH_DISCORD_SECRET=<your_discord_client_secret>
AUTH_GITHUB_ID=<your_github_client_id>
AUTH_GITHUB_SECRET=<your_github_client_secret>
```



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

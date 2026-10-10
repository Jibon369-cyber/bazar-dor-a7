# 🛒 বাজার দর (Bazar Dor)

**প্রয়োজনীয় নিত্যপণ্যের দাম এক নজরে।**

বাজার দর একটি responsive grocery price tracking web application। এই অ্যাপের মাধ্যমে ব্যবহারকারীরা চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ বিভিন্ন নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম, দামের পরিবর্তন এবং বিভিন্ন বাজারের দামের তথ্য দেখতে পারবেন।

## 🌐 Live Demo

- **Live Website:** 
- **GitHub Repository:** (https://github.com/Jibon369-cyber/bazar-dor-a7)

## ✨ Features

- **Dynamic Navbar:** ক্যাটাগরি নেভিগেশন, বাংলা তারিখ এবং authentication controls।
- **Price Ticker:** নিত্যপ্রয়োজনীয় পণ্যের দামের পরিবর্তন দেখার সুবিধা।
- **Hero Section:** সহজ নেভিগেশনের জন্য introductory banner এবং call-to-action।
- **Product Listings:** সব পণ্যের তালিকা, দাম এবং price-change indicators।
- **Price Trends:** যেসব পণ্যের দাম বেড়েছে বা কমেছে, সেগুলোর আলাদা তালিকা।
- **Product Details:** পণ্যের সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং বাজারভিত্তিক price information।
- **Category Filtering:** ক্যাটাগরি অনুযায়ী পণ্য দেখা।
- **Price Sorting:** দাম কম থেকে বেশি এবং বেশি থেকে কম ক্রমে পণ্য সাজানো।
- **Authentication:** Email/password, Google এবং GitHub দিয়ে sign-in/sign-up।
- **Protected Routes:** Authentication ছাড়া নির্দিষ্ট protected pages access করলে sign-in-এ redirect।
- **Profile Management:** Profile information দেখা এবং নাম update করা।
- **Responsive Design:** Mobile, tablet এবং desktop-এ ব্যবহারযোগ্য layout।
- **Loading States:** Data load হওয়ার সময় loading skeleton।
- **Error Handling:** Custom 404 page এবং empty-state UI।
- **Toast Notifications:** গুরুত্বপূর্ণ authentication ও action feedback বাংলায় দেখানো।

## 🛠️ Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- daisyUI
- Better Auth
- MongoDB
- REST API
- React Hot Toast
- Git and GitHub
- Vercel

## 🔌 API Integration

Application-টি grocery product এবং category data দেখানোর জন্য REST API ব্যবহার করে।

**Base API URL:**

https://api.api-store.workers.dev/api/bazardor


Alternative API:

https://api.abcz.workers.dev/api/bazardor


### Available Endpoints

| Endpoint | Description |
|---|---|
| `/products` | সব পণ্যের তালিকা |
| `/products?category=chal` | নির্দিষ্ট ক্যাটাগরির পণ্য |
| `/products/1` | নির্দিষ্ট পণ্যের বিস্তারিত |
| `/categories` | সব ক্যাটাগরির তালিকা |
| `/categories/chal` | নির্দিষ্ট ক্যাটাগরির তথ্য |

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git
- MongoDB database access

### Installation

**1. Clone the repository**

git clone YOUR_GITHUB_REPOSITORY_URL


**2. Navigate to the project directory**

cd bazar-dor


**3. Install dependencies**

npm install


**4. Configure environment variables**

Create a `.env.local` file in the root directory and add the required variables.

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000


MONGODB_URL=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret


Replace the placeholder values with your own credentials. Configure Google and GitHub OAuth callback URLs for your local and deployed environments as needed.

**Important:** Never commit `.env.local` or expose database credentials, authentication secrets, or OAuth client secrets in a public repository.

**5. Start the development server**

npm run dev


Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

npm run build


To run the production build locally:

npm run start


## 🔐 Authentication

Bazar Dor uses Better Auth for user authentication.

Supported authentication methods:

- Email and password
- Google OAuth
- GitHub OAuth

Protected pages include the profile page and product detail pages. Unauthenticated users are redirected to the sign-in page.

## 📱 Responsive Design

The application is designed to work across:

- Mobile phones
- Tablets
- Desktop screens

Product grids, navigation, authentication forms, and other UI sections adapt to different screen sizes.

## 📁 Project Structure

The project uses the Next.js App Router and organizes pages, reusable components, API utilities, and authentication configuration.

src/
├── app/
│   ├── api/
│   │   └── auth/
│   ├── components/
│   ├── category/
│   ├── product/
│   ├── profile/
│   ├── sign-in/
│   ├── sign-up/
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── auth-client.ts
└── proxy.ts


*Note: Update the structure above if your actual folder names differ.*

## ⚠️ Disclaimer

পণ্যের প্রদর্শিত দাম সম্ভাব্য এবং বাজারের অবস্থা অনুযায়ী পরিবর্তিত হতে পারে। কেনাকাটার আগে স্থানীয় বাজারে দাম যাচাই করে নেওয়া উচিত।

## 👨‍💻 Author

**Your Name**

- GitHub: https://github.com/Jibon369-cyber


*Built as a Programming Hero assignment project.*

# 🔐 Password Manager App

A modern, secure, and user-friendly Password Manager built with TypeScript and Next.js! Easily store, manage, and retrieve your passwords from anywhere.

---

## 🚀 Features

- **Secure Storage:** All passwords and cards are stored securely in user-specific, private metadata.
- **🔑 Clerk Authentication:** User authentication, session management, and secure user data storage are powered by [Clerk](https://clerk.com/).
- **Beautiful UI:** Clean and responsive design for all devices.
- **Fast & Reliable:** Built with Next.js and TypeScript for speed and stability.
- **Extensible:** Modular codebase for easy contribution and feature addition.

---

## 🔑 Authentication & User Management (Powered by Clerk)

- **Clerk Integration:**  
  The app uses [Clerk](https://clerk.com/) for authentication, user sign-in, sign-up, and secure session handling.
- **User Data Storage:**  
  All sensitive data (passwords, cards) is stored as part of the user's private metadata using Clerk’s API, ensuring each user’s data is isolated and safe.
- **Middleware Protection:**  
  API routes and private pages are protected using Clerk middleware to ensure only authenticated users can access their vault.
- **Ready-Made UI:**  
  Clerk’s prebuilt `<SignIn />`, `<SignUp />`, and `<UserButton />` React components are used for seamless onboarding and account management.

**Key Clerk Usage in Code:**
- `app/layout.tsx` wraps your app with `ClerkProvider`.
- `middleware.ts` uses `clerkMiddleware` to protect all non-public routes.
- All actions involving sensitive data (e.g., `addPassword`, `addCard`) leverage the Clerk API and store items in `user.privateMetadata`.
- Sign-in page: `app/sign-in/[[...sign-in]]/page.tsx` uses Clerk’s `<SignIn />` component.
- User info is fetched in API routes and UI components via Clerk hooks and server utilities.

---

## 📁 Project Structure

```
.
├── actions/              # App actions and handlers (uses Clerk API)
├── app/                  # Main Next.js app directory
│   ├── layout.tsx        # ClerkProvider, ThemeProvider
│   ├── sign-in/          # Clerk sign-in UI
│   ├── api/getUserMetaData/route.ts # Uses Clerk to fetch user's private metadata
├── components/           # UI components (use Clerk hooks for user info)
├── lib/                  # Library utilities and helpers
├── public/               # Static files (images, favicon, etc.)
├── middleware.ts         # Clerk middleware for route protection
├── next.config.ts        # Next.js configuration
├── package.json          # NPM dependencies and scripts
└── ...
```

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/suthar879/Password-Manager-App.git
   cd Password-Manager-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Clerk**
   - Sign up for a [Clerk account](https://clerk.com/).
   - Create a new Clerk application and get your API keys.
   - Add Clerk environment variables to your `.env` file:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
     CLERK_SECRET_KEY=your_secret_key
     ```
   - See Clerk’s [Next.js quickstart](https://clerk.com/docs/quickstarts/nextjs) for more info.

4. **Run the app**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

---

## 💡 Usage

- **Sign Up/In:** Use Clerk’s UI for account creation and login.
- **Add Passwords & Cards:** Your secrets are stored securely in Clerk’s user metadata, accessible only while authenticated.
- **Retrieve/Manage:** Search, update, or delete your passwords and cards.
- **Logout:** Securely log out with Clerk’s session management.

---

## 🤝 Contributing

Contributions are welcome!
- Fork the repository
- Create your feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Open a pull request

---

## 📚 Tech Stack

- **TypeScript**
- **Next.js**
- **Tailwind CSS**
- **Clerk** for authentication and user data
- **ESLint** for code linting

---

## 📝 License

Currently, no license specified. Please contact the repository owner for more information.

---

## 📬 Contact

- GitHub: [suthar879](https://github.com/suthar879)

---

> ⚠️ *This documentation is based on available file structure and metadata. For the latest and most complete information, explore the [repository on GitHub](https://github.com/suthar879/Password-Manager-App).*

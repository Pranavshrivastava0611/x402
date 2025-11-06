# MonoPay - Solana API Monetization Platform

A modern, dark-themed web dashboard and landing page for monetizing APIs on the Solana blockchain. Built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🎨 Design

- **Theme**: Dark, minimalist design inspired by Clerk, Vercel, and Linear.app
- **Colors**: Black (#000000), Dark Gray (#1A1A1A), White (#FFFFFF), Light Gray (#2A2A2A), Accent Gray (#3A3A3A)
- **Font**: Inter (modern and minimal)
- **Animations**: Smooth Framer Motion transitions throughout

## 🚀 Features

### Landing Page
- Hero section with animated background particles
- "How It Works" step-by-step guide
- Features showcase
- Modern footer with links

### Authentication
- Login/Register page with SSO options:
  - GitHub OAuth
  - Google OAuth
  - Solana Wallet Connect (Phantom, Solflare)

### Dashboard
- **Overview**: Revenue stats, charts, and recent transactions
- **My APIs**: Manage registered APIs, set pricing, configure routes
- **Payments**: View all transactions with filters
- **Analytics**: Detailed insights and charts
- **Settings**: Wallet management, network switching, profile settings

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Wallet**: Solana Wallet Adapter (ready for integration)
- **TypeScript**: Full type safety

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
402/
├── app/
│   ├── dashboard/          # Dashboard pages
│   │   ├── layout.tsx      # Dashboard layout with sidebar
│   │   ├── page.tsx       # Overview page
│   │   ├── apis/          # API management
│   │   ├── payments/      # Payment transactions
│   │   ├── analytics/     # Analytics dashboard
│   │   └── settings/      # User settings
│   ├── login/             # Login/Register page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── MonoButton.tsx
│   │   ├── MonoCard.tsx
│   │   ├── MonoModal.tsx
│   │   ├── MonoDropdown.tsx
│   │   ├── MonoInput.tsx
│   │   └── MonoSelect.tsx
│   ├── layout/            # Layout components
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   └── wallet/             # Wallet integration
│       └── WalletConnect.tsx
└── package.json
```

## 🎯 Components

### UI Components
- **MonoButton**: Primary, secondary, and ghost variants with smooth animations
- **MonoCard**: Elevated cards with hover effects
- **MonoModal**: Animated modals with backdrop blur
- **MonoDropdown**: Smooth dropdown menus
- **MonoInput/MonoSelect**: Styled form inputs

### Layout Components
- **Sidebar**: Collapsible navigation sidebar
- **Navbar**: Top navigation with wallet connection
- **WalletConnect**: Solana wallet connection modal

## 🎨 Design Principles

1. **Consistency**: All components use the same shadow, corner radius, and spacing
2. **Smooth Animations**: 0.2s transitions for all interactions
3. **Responsive**: Fully responsive design for desktop, tablet, and mobile
4. **Dark Theme**: Consistent dark color scheme throughout
5. **Accessibility**: Proper contrast ratios and keyboard navigation

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom theme variables defined in `globals.css`.

### Framer Motion
All animations use Framer Motion for smooth, performant transitions.

## 📝 Next Steps

1. **Backend Integration**: Connect to your Solana API backend
2. **Wallet Integration**: Implement full Solana Wallet Adapter
3. **Authentication**: Add real OAuth providers (GitHub, Google)
4. **API Protection**: Implement SDK for API route protection
5. **Real-time Updates**: Add WebSocket connections for live data

## 📄 License

MIT

---

Built with ❤️ for the Solana ecosystem

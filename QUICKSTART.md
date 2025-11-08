# MonoPay - Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd 402
npm install
```

This will install all required packages including:
- Next.js 16
- Tailwind CSS v4
- Framer Motion
- Recharts
- Lucide React
- Solana Wallet Adapter packages

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

### 3. Navigate to Pages

- **Landing Page**: `/` - Main marketing page
- **Login**: `/login` - Authentication page
- **Dashboard**: `/dashboard` - Main dashboard (requires login)
  - Overview: `/dashboard`
  - APIs: `/dashboard/apis`
  - Payments: `/dashboard/payments`
  - Analytics: `/dashboard/analytics`
  - Settings: `/dashboard/settings`

## 📱 Responsive Design

The application is fully responsive:
- **Desktop**: Full sidebar and expanded layout
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu with slide-out sidebar

## 🎨 Customization

### Colors
Edit `app/globals.css` to change the color scheme:
```css
:root {
  --background: #000000;
  --dark-gray: #1a1a1a;
  --light-gray: #2a2a2a;
  --accent-gray: #3a3a3a;
}
```

### Components
All reusable components are in `components/ui/`:
- MonoButton
- MonoCard
- MonoModal
- MonoDropdown
- MonoInput
- MonoSelect

## 🔌 Wallet Integration

The wallet connection component is ready for Solana Wallet Adapter integration. Currently, it's set up with mock data. To integrate:

1. Set up Solana Wallet Adapter providers in `app/dashboard/layout.tsx`
2. Connect real wallet functionality in `components/wallet/WalletConnect.tsx`

## 📊 Charts

Charts use Recharts and are fully customizable. Sample data is included in:
- `/dashboard` - Revenue trend line chart
- `/dashboard/analytics` - Bar charts and pie charts

## ✨ Animations

All animations use Framer Motion:
- Page transitions: 0.2s fade
- Button interactions: scale on hover/press
- Modal open/close: fade + scale
- Sidebar: smooth width transitions

## 🐛 Troubleshooting

### TypeScript Errors
If you see TypeScript errors about missing modules, run:
```bash
npm install
```

### Email / OTP (Forgot Password)
If you want the app to actually send OTP emails for password reset, install `nodemailer` and provide SMTP env vars:

```bash
npm install nodemailer
```

Add the following to your `.env.local` (example):

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM="MonoPay <no-reply@example.com>"
```

If SMTP is not configured the app will log OTPs to the server console for development.

### Build Errors
Clear `.next` folder and rebuild:
```bash
rm -rf .next
npm run build
```

## 📝 Next Steps

1. **Backend API**: Connect to your Solana API backend
2. **Authentication**: Implement real OAuth (GitHub, Google)
3. **Wallet**: Full Solana Wallet Adapter integration
4. **Real Data**: Replace mock data with API calls
5. **Deployment**: Deploy to Vercel or your preferred platform

---

Happy coding! 🎉


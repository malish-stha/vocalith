# Vocalith

A modern, full-featured text-to-speech (TTS) application built with Next.js, React, and TypeScript. Create, manage, and generate high-quality audio from text using custom and system voices.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black)
![React](https://img.shields.io/badge/React-19.2-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)

![Vocalith Preview](./public/preview.png)

## ✨ Features

- **Text-to-Speech Generation**: Convert text to natural-sounding audio using the Chatterbox API
- **Voice Management**: Create, customize, and manage both system and custom voices
- **Audio Playback**: Built-in audio player with waveform visualization using WaveSurfer
- **Voice Categories**: Organize voices by category (audiobook, conversational, customer service, podcast, etc.)
- **Multi-language Support**: Support for multiple languages including English (en-US)
- **Authentication**: Secure user authentication via Clerk
- **Subscription Management**: Integrated billing and metering with Polar
- **Cloud Storage**: Audio files stored securely in AWS S3 (R2)
- **Dashboard**: User-friendly dashboard for managing voices and generations
- **Real-time Updates**: tRPC-based API for real-time data fetching
- **Error Monitoring**: Integrated Sentry for error tracking and monitoring
- **Responsive UI**: Modern, accessible UI components built with Radix UI and shadcn/ui
- **Dark Mode**: Theme support with next-themes

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) - React meta-framework
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: CSS with [PostCSS](https://postcss.org/)
- **Forms**: [@tanstack/react-form](https://tanstack.com/form/)
- **Data Fetching**: [@tanstack/react-query](https://tanstack.com/query/)
- **Audio**: [WaveSurfer.js](https://wavesurfer.xyz/), [RecordRTC](https://recordrtc.org/)
- **Icons**: [Lucide React](https://lucide.dev/), [Hugeicons](https://www.hugeicons.com/)

### Backend
- **API**: [tRPC 11](https://trpc.io/) with React Query integration
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Billing**: [Polar SDK](https://polar.sh/)
- **Cloud Storage**: [AWS S3](https://aws.amazon.com/s3/) via [@aws-sdk/client-s3](https://docs.aws.amazon.com/sdk-for-javascript/)
- **TTS Engine**: [Chatterbox API](https://chatterbox.com/)

### DevOps & Monitoring
- **Error Tracking**: [Sentry](https://sentry.io/)
- **Environment Management**: [@t3-oss/env-nextjs](https://env.t3.gg/)

## 📋 Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn** package manager
- **PostgreSQL** database (local or cloud-hosted)
- Environment variables (see [Environment Setup](#environment-setup))

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd vocalith

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/vocalith

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Billing (Polar)
POLAR_ACCESS_TOKEN=your_polar_token
POLAR_SERVER=sandbox
POLAR_PRODUCT_ID=your_product_id
POLAR_METER_VOICE_CREATION=your_meter_id
POLAR_METER_TTS_GENERATION=your_meter_id
POLAR_METER_TTS_PROPERTY=your_meter_id

# Cloud Storage (AWS S3/R2)
R2_ACCOUNT_ID=your_r2_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=your_bucket_name

# TTS Engine (Chatterbox)
CHATTERBOX_API_URL=https://api.chatterbox.com
CHATTERBOX_API_KEY=your_api_key

# App Configuration
APP_URL=http://localhost:3000

# Error Tracking (Sentry)
SENTRY_ORG=your_org
SENTRY_PROJECT=vocalith
```

### 3. Database Setup

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npm run postinstall

# (Optional) Seed database with system voices
npm run sync-api
```

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app auto-reloads as you edit files.

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload

# Production
npm run build            # Build optimized production bundle
npm start                # Start production server

# Database
npx prisma studio       # Open Prisma Studio GUI for database management
npx prisma migrate dev  # Run pending migrations
npx prisma generate     # Generate Prisma client

# Code Quality
npm run lint             # Run ESLint

# API Management
npm run sync-api         # Sync voices from external API
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes and tRPC
│   ├── (dashboard)/       # Dashboard authenticated routes
│   │   ├── text-to-speech/
│   │   └── voices/
│   ├── sign-in/           # Authentication pages
│   └── sign-up/
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── voice-avatar/     # Voice-specific components
├── features/             # Feature-specific modules
│   ├── billing/
│   ├── dashboard/
│   ├── text-to-speech/
│   └── voices/
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── chatterbox-client.ts
│   ├── db.ts
│   ├── env.ts
│   ├── polar.ts
│   ├── r2.ts
│   └── utils.ts
├── trpc/                 # tRPC configuration and routers
│   ├── client.tsx
│   ├── init.ts
│   └── routers/
└── types/                # TypeScript type definitions

prisma/
├── schema.prisma         # Database schema
└── migrations/           # Database migration history
```

## 🗄️ Database Schema

### Voice Model
- **id**: Unique identifier
- **name**: Voice name
- **description**: Voice description
- **category**: Voice category (enum)
- **language**: Language code (default: en-US)
- **variant**: SYSTEM or CUSTOM
- **r2ObjectKey**: S3 object key for audio file
- **orgId**: Organization ID (optional)

### Generation Model
- **id**: Unique identifier
- **orgId**: Organization ID
- **voiceId**: Reference to Voice
- **text**: Input text
- **voiceName**: Generated voice name
- **r2ObjectKey**: S3 object key for output audio
- **temperature, topP, topK, repetitionPenalty**: TTS parameters

## 🔐 Authentication & Authorization

- User authentication via [Clerk](https://clerk.com/)
- Organization-based access control
- Protected routes in dashboard

## 💳 Billing & Usage Metering

- Integrated with [Polar](https://polar.sh/) for subscription management
- Usage metrics:
  - Voice creation
  - TTS generation
  - Property usage
- Metered billing model

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Connect repository to Vercel
# Environment variables are automatically synced
vercel deploy
```

### Manual Deployment

1. Build the application: `npm run build`
2. Deploy `dist` folder to your hosting
3. Set environment variables on your hosting platform
4. Ensure PostgreSQL database is accessible

## 🛠️ Development Guide

### Creating a New Voice

```typescript
// Example: Create a custom voice
const voice = await prisma.voice.create({
  data: {
    name: "My Voice",
    description: "A custom voice",
    category: "CONVERSATIONAL",
    variant: "CUSTOM",
    orgId: "org_123",
  },
});
```

### Generating Speech

```typescript
// Example: Generate speech from text
const generation = await prisma.generation.create({
  data: {
    orgId: "org_123",
    voiceId: voice.id,
    text: "Hello, world!",
    voiceName: "my_voice",
    temperature: 0.7,
    topP: 0.9,
    topK: 50,
    repetitionPenalty: 1.2,
  },
});
```

## 📊 Monitoring

- **Error Tracking**: Sentry integration for real-time error monitoring
- **Performance**: Built-in Next.js analytics
- **Database**: Prisma Studio for database inspection

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Verify DATABASE_URL is correct
# Check PostgreSQL is running
psql $DATABASE_URL -c "SELECT 1"
```

### Missing Environment Variables
- Ensure all required variables are in `.env.local`
- Restart dev server after adding variables

### Audio Playback Issues
- Check browser permissions for audio playback
- Verify audio files exist in R2 bucket

## 📝 License

[Add your license information here]

## 👥 Contributors

- [Your name/team]

## 📧 Support

For issues, questions, or feature requests, please open an issue on GitHub or contact support.

---

**Happy speaking! 🎙️**

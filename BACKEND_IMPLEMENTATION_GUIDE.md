# Backend Implementation Guide for Real-Africa

## 📋 Required Backend Features

Based on your codebase analysis, you need:

1. **User Authentication & Management**
   - Sign up / Login
   - User profiles (name, avatar, initials)
   - Session management

2. **Subscription & Tier Management**
   - 7 subscription tiers (Free → Ksh. 10,000/month)
   - Tier-based access control
   - Subscription upgrades/downgrades
   - Billing & invoices

3. **Payment Processing**
   - M-Pesa integration (primary for Kenya)
   - Card payments (optional)
   - Recurring subscriptions
   - Payment webhooks

4. **Content Management**
   - Course modules & videos
   - Tier-specific curriculum
   - Lesson progress tracking
   - Completion status

5. **Referral System**
   - Track referrals
   - Invite emails
   - Free month rewards (3 referrals = 1 free month)
   - Referral codes

6. **Live Calls & Mentorship**
   - Schedule live calls
   - Mentor profiles
   - Calendar integration
   - Call reminders

7. **Mentor Management**
   - Mentor applications
   - Mentor approval workflow
   - Mentor profiles

---

## 🚀 Recommended Approaches

### Option 1: Supabase (RECOMMENDED) ⭐

**Why Supabase?**
- ✅ PostgreSQL database (powerful & flexible)
- ✅ Built-in authentication (email, OAuth, magic links)
- ✅ Row Level Security (RLS) for tier-based access
- ✅ Real-time subscriptions
- ✅ Storage for avatars/videos
- ✅ Edge Functions for payment webhooks
- ✅ Free tier: 500MB database, 2GB bandwidth
- ✅ Great React integration
- ✅ Self-hostable if needed

**Implementation:**
```bash
npm install @supabase/supabase-js
```

**Database Schema Overview:**
- `users` (id, email, name, avatar_url, tier_level, created_at)
- `subscriptions` (id, user_id, tier_level, status, mpesa_receipt, expires_at)
- `courses` (id, tier_level, title, description)
- `modules` (id, course_id, title, description, order)
- `videos` (id, module_id, title, youtube_url, order)
- `lesson_progress` (user_id, video_id, completed_at)
- `referrals` (id, referrer_id, referred_email, status, created_at)
- `live_calls` (id, title, datetime, tier_required, mentor_id)
- `mentor_applications` (id, user_id, name, email, tier, company, status)

**Payment Integration:**
- Use Supabase Edge Functions + M-Pesa API
- Store payment records in `subscriptions` table
- Use RLS to enforce tier access

**Pros:**
- Fastest to implement
- Great developer experience
- Built-in auth & database
- Real-time capabilities
- Generous free tier

**Cons:**
- Less control over infrastructure
- Vendor lock-in (though self-hostable)

---

### Option 2: Firebase (Google)

**Why Firebase?**
- ✅ Authentication (email, Google, etc.)
- ✅ Firestore (NoSQL database)
- ✅ Cloud Functions for backend logic
- ✅ Storage for files
- ✅ Free tier: 1GB storage, 50K reads/day

**Implementation:**
```bash
npm install firebase
```

**Database Structure:**
- Collections: `users`, `subscriptions`, `courses`, `progress`, `referrals`

**Payment Integration:**
- Cloud Functions + M-Pesa API
- Stripe extension available (but M-Pesa needs custom)

**Pros:**
- Mature platform
- Excellent documentation
- Real-time database
- Good free tier

**Cons:**
- NoSQL (less flexible for complex queries)
- More expensive at scale
- Less suitable for relational data

---

### Option 3: AWS Amplify

**Why Amplify?**
- ✅ Full AWS ecosystem
- ✅ Cognito for auth
- ✅ AppSync (GraphQL) or DynamoDB
- ✅ Lambda functions
- ✅ S3 for storage
- ✅ Free tier: 1M requests/month

**Implementation:**
```bash
npm install aws-amplify
```

**Pros:**
- Enterprise-grade
- Scalable
- Integrates with AWS services
- Good for complex workflows

**Cons:**
- Steeper learning curve
- More complex setup
- Can be expensive
- AWS-specific

---

### Option 4: Traditional Backend (Node.js/Express)

**Why Custom Backend?**
- ✅ Full control
- ✅ Custom payment logic
- ✅ No vendor lock-in
- ✅ Can optimize for your needs

**Tech Stack:**
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (Supabase, Neon, or Railway)
- **Auth:** JWT + bcrypt (or Passport.js)
- **ORM:** Prisma or TypeORM
- **Payment:** M-Pesa SDK + Stripe (optional)

**Implementation:**
```bash
# Server setup
npm init -y
npm install express cors dotenv
npm install prisma @prisma/client
npm install jsonwebtoken bcryptjs
npm install @daraja/mpesa  # M-Pesa SDK
```

**Project Structure:**
```
server/
├── src/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── subscriptions.js
│   │   ├── courses.js
│   │   ├── payments.js
│   │   └── referrals.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── tierAccess.js
│   ├── controllers/
│   ├── models/
│   └── utils/
├── prisma/
│   └── schema.prisma
└── server.js
```

**Pros:**
- Complete control
- Customizable
- No vendor lock-in
- Can optimize performance

**Cons:**
- More development time
- Need to manage infrastructure
- More code to maintain
- Need to handle security yourself

---

## 💳 Payment Integration Options

### M-Pesa (Primary - Kenya)
- **SDK:** `@daraja/mpesa` or `mpesa-api`
- **Provider:** Safaricom Developer Portal
- **Cost:** ~0.5-1% transaction fee
- **Setup:** Register at developer.safaricom.co.ke

### Stripe (International Cards)
- **SDK:** `stripe`
- **Good for:** International users, card payments
- **Cost:** 2.9% + $0.30 per transaction
- **Setup:** stripe.com

### Flutterwave (Pan-African)
- **SDK:** `flutterwave-node-v3`
- **Good for:** Multiple African countries
- **Supports:** Cards, Mobile Money, Bank transfers
- **Cost:** ~1.4-3.5% per transaction

---

## 🗄️ Database Recommendations

### PostgreSQL (Recommended)
- **Why:** Relational, ACID compliant, great for subscriptions
- **Hosting:** Supabase, Neon, Railway, AWS RDS
- **ORM:** Prisma (recommended) or TypeORM

### MongoDB (Alternative)
- **Why:** Flexible schema, good for content
- **Hosting:** MongoDB Atlas (free tier: 512MB)
- **ODM:** Mongoose

---

## 🎯 My Recommendation: **Supabase + M-Pesa**

### Why This Combination?

1. **Fastest to Market**
   - Supabase handles auth, database, storage
   - Focus on business logic, not infrastructure

2. **Cost-Effective**
   - Free tier covers early stage
   - M-Pesa: low transaction fees for Kenya

3. **Scalable**
   - Supabase scales automatically
   - PostgreSQL handles complex queries

4. **Developer Experience**
   - Great React integration
   - Real-time subscriptions
   - Excellent documentation

### Implementation Steps:

1. **Setup Supabase**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create Database Schema**
   - Use Supabase dashboard or migrations
   - Set up RLS policies for tier access

3. **Integrate M-Pesa**
   - Use Supabase Edge Functions
   - Handle payment webhooks
   - Update subscription status

4. **Connect Frontend**
   - Replace mock data with Supabase queries
   - Add authentication
   - Implement real-time updates

---

## 📦 Quick Start: Supabase Setup

### 1. Create Supabase Project
- Go to supabase.com
- Create new project
- Get API keys

### 2. Install Dependencies
```bash
cd client
npm install @supabase/supabase-js
```

### 3. Create Supabase Client
```javascript
// client/src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 4. Environment Variables
```env
# .env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🔐 Security Considerations

1. **Row Level Security (RLS)**
   - Enforce tier access at database level
   - Users can only see their tier's content

2. **API Keys**
   - Never expose service role key in frontend
   - Use environment variables

3. **Payment Webhooks**
   - Verify webhook signatures
   - Idempotent payment processing

4. **Authentication**
   - Use Supabase Auth (handles security)
   - Or JWT with secure storage

---

## 📊 Estimated Development Time

| Approach | Setup Time | Full Implementation |
|----------|-----------|---------------------|
| Supabase | 1-2 days | 1-2 weeks |
| Firebase | 2-3 days | 2-3 weeks |
| AWS Amplify | 3-5 days | 3-4 weeks |
| Custom Backend | 1-2 weeks | 4-6 weeks |

---

## 🚦 Next Steps

1. **Choose your approach** (I recommend Supabase)
2. **Set up authentication** first
3. **Create database schema**
4. **Integrate payment processing**
5. **Replace mock data** with real API calls
6. **Add error handling & loading states**

---

## 📚 Resources

- **Supabase Docs:** https://supabase.com/docs
- **M-Pesa API:** https://developer.safaricom.co.ke
- **Prisma Docs:** https://www.prisma.io/docs
- **Stripe Docs:** https://stripe.com/docs

---

## 💡 Additional Recommendations

1. **Start with Supabase** - fastest to market
2. **Use M-Pesa for Kenya** - primary payment method
3. **Add Stripe later** - for international users
4. **Implement caching** - for course content
5. **Add analytics** - track user engagement
6. **Email service** - SendGrid or Resend for invites
7. **File storage** - Supabase Storage for avatars

---

TO DO:

Next steps for your backend:
Option 1: Complete the authentication flow
Create a login/signup page (replace test buttons)
Add sign out functionality
Handle authentication state across the app
Protect routes (redirect if not logged in)

Option 2: Create more database tables
courses table (course modules)
modules table (course modules)
videos table (individual lessons)
lesson_progress table (track completed lessons)
referrals table (track referral system)

Option 3: Replace mock data with real database queries
Load courses from the database
Track lesson progress in the database
Load referrals from the database
Replace hardcoded curriculum with database data

Option 4: Set up payment/subscription system
Create subscription records when users upgrade
Integrate M-Pesa API (or Stripe for testing)
Handle subscription status and expiration

# Deployment Guide

## Quick Deploy (5 Minutes)

### 1. Deploy Database (Supabase)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy your project URL and keys
4. Run the SQL from `lib/supabase/schema.sql` in SQL Editor

### 2. Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or use Vercel Dashboard:
1. Import GitHub repository
2. Add environment variables
3. Deploy

### 3. Set Environment Variables

In Vercel Dashboard, add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
STRIPE_SECRET_KEY=your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pub_key
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_random_32_char_secret
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 4. Configure Stripe

1. Go to [stripe.com/dashboard](https://dashboard.stripe.com)
2. Get API keys from Developers > API keys
3. Set up webhook endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Add webhook secret to environment variables

### 5. Configure OpenAI

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create API key
3. Add to environment variables

## Advanced Deployment

### Railway (Backend Services)

For additional backend services:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

### Custom Domain

1. In Vercel: Settings > Domains
2. Add your domain
3. Update DNS records as instructed

### SSL Certificate

Vercel automatically provides SSL certificates for all domains.

## Post-Deployment

### 1. Test Authentication
- Sign up a new user
- Verify email confirmation
- Test login

### 2. Test Payments
- Use Stripe test cards
- Verify webhook events

### 3. Test AI Features
- Send chat message
- Verify OpenAI integration

### 4. Monitor
- Check Vercel Analytics
- Monitor Supabase logs
- Review Stripe dashboard

## Scaling

### Database
- Supabase auto-scales
- Upgrade plan as needed

### Frontend
- Vercel auto-scales
- No configuration needed

### Caching
- Add Redis for session storage
- Use Vercel Edge Cache

## Security Checklist

- [ ] All environment variables set
- [ ] JWT secret is random and secure
- [ ] Stripe webhook secret configured
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] SSL certificate active
- [ ] Database RLS policies active
- [ ] Audit logging enabled

## Monitoring

### Vercel
- Analytics dashboard
- Error tracking
- Performance metrics

### Supabase
- Database metrics
- API usage
- Auth logs

### Stripe
- Payment tracking
- Webhook logs
- Customer analytics

## Backup

### Database
```sql
-- Automated daily backups in Supabase
-- Manual backup:
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql
```

### Files
- Supabase Storage has automatic backups
- Configure retention policy

## Troubleshooting

### Build Fails
- Check environment variables
- Verify Node.js version (18+)
- Clear cache: `vercel --force`

### Database Connection
- Verify Supabase URL
- Check API keys
- Review RLS policies

### Payment Issues
- Verify Stripe keys
- Check webhook configuration
- Review Stripe logs

## Support

- Documentation: Check README.md
- Issues: GitHub Issues
- Email: support@example.com
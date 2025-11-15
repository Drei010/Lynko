# Production Deployment Guide

This guide ensures both the Lynko frontend and backend run smoothly in production.

## 📋 Pre-Deployment Checklist

### Backend Requirements
- [ ] Node.js 18+ installed
- [ ] PostgreSQL database setup
- [ ] OpenAI API key available
- [ ] All environment variables configured
- [ ] Database migrations run
- [ ] API endpoints tested

### Frontend Requirements
- [ ] Node.js 18+ installed
- [ ] Backend API URL configured
- [ ] Build artifacts generated
- [ ] All environment variables set
- [ ] Frontend tested against production API

---

## 🔧 Backend Deployment

### Step 1: Prepare Backend Environment

Create `.env` in the `backend/` directory:

```bash
# Production Database
DATABASE_URL=postgresql://username:password@prod-db-host:5432/lynko_prod
DB_HOST=prod-db-host
DB_PORT=5432
DB_USER=prod_user
DB_PASSWORD=secure_password
DB_NAME=lynko_prod

# OpenAI Configuration (REQUIRED)
OPENAI_API_KEY=sk-your_actual_production_key
OPENAI_MODEL=gpt-3.5-turbo

# Server Configuration
PORT=5000
NODE_ENV=production

# Logging
LOG_LEVEL=info

# CORS Configuration (Update to your frontend domain)
CORS_ORIGIN=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# AI Configuration (optional)
ANTHROPIC_API_KEY=your_key_if_using_anthropic
```

### Step 2: Install and Run Backend

```bash
cd backend

# Install dependencies
npm install --production

# Run database migrations
npm run migrate

# Test OpenAI connection
npm run test:openai

# Start server
npm start

# Verify it's running
curl http://localhost:5000/health
```

### Step 3: Verify Backend

```bash
# Should return:
# {
#   "success": true,
#   "message": "Lynko Backend is running",
#   "environment": "production"
# }
```

### Backend Health Endpoints

```bash
# Overall health
curl https://your-api-domain.com/health

# Chatbot status
curl https://your-api-domain.com/api/chatbot/health

# OpenAI status
curl https://your-api-domain.com/api/chatbot/openai/status
```

---

## 🎨 Frontend Deployment

### Step 1: Create Frontend Environment File

Create `.env.production` in the root directory:

```bash
# Production API Configuration
VITE_API_URL=https://your-api-domain.com/api

# Optional: Analytics, monitoring, etc.
VITE_ENVIRONMENT=production
VITE_APP_VERSION=1.0.0
```

Create `.env.development` for local testing:

```bash
# Development API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_ENVIRONMENT=development
```

### Step 2: Build Frontend

```bash
# Install dependencies
npm install --production

# Build for production
npm run build

# Output will be in dist/ directory
# This contains static files ready to serve
```

### Step 3: Verify Build

```bash
# Preview production build locally
npm run preview

# Should show: "Local:   http://localhost:4173/"
```

### Step 4: Deploy Static Files

The `dist/` folder contains everything needed:

```bash
# Contents of dist/:
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── *.js           # Bundled JavaScript
│   ├── *.css          # Bundled CSS
│   └── *.woff2        # Fonts
└── robots.txt         # SEO
```

**Deploy options:**
- Upload to web server (Apache, Nginx)
- Upload to CDN (Cloudflare, AWS S3)
- Upload to hosting (Vercel, Netlify)
- Docker container

---

## 🚀 Deployment Options

### Option 1: Traditional Server (VPS)

#### Backend Setup
```bash
# SSH into server
ssh user@your-server.com

# Clone repository
git clone <repo-url>
cd Lynko/backend

# Install & run
npm install --production
cp .env.production .env  # Use production env file
npm run migrate
npm start

# Use process manager (PM2)
npm install -g pm2
pm2 start server.js --name "lynko-backend"
pm2 save
```

#### Frontend Setup
```bash
cd ../
npm install --production
npm run build

# Copy to web server
cp -r dist/* /var/www/html/
# Or configure nginx/apache to serve dist/ folder
```

#### Nginx Configuration (Example)
```nginx
# /etc/nginx/sites-available/lynko

upstream lynko_backend {
    server localhost:5000;
}

server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    root /var/www/lynko;
    index index.html;

    # Frontend SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://lynko_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SSL redirect (after getting certificate)
    # return 301 https://$server_name$request_uri;
}
```

### Option 2: Docker Deployment

#### Backend Dockerfile
```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000
CMD ["npm", "start"]
```

#### Frontend Dockerfile
```dockerfile
# Dockerfile (root)
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/lynko_prod
      OPENAI_API_KEY: ${OPENAI_API_KEY}
      NODE_ENV: production
    depends_on:
      - db

  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      VITE_API_URL: http://backend:5000/api

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: lynko_prod
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Option 3: Managed Hosting

#### Vercel (Frontend)
```bash
# Deploy frontend to Vercel
npm i -g vercel
vercel --prod

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-api-domain.com/api
```

#### Heroku (Backend)
```bash
# Deploy backend to Heroku
heroku login
heroku create lynko-backend
heroku config:set OPENAI_API_KEY=sk-...
heroku config:set DATABASE_URL=postgresql://...
git push heroku main
```

#### Railway/Render
- Similar to Heroku setup
- Configure environment variables in dashboard
- Push to main branch to deploy

---

## 📊 Production Environment Variables

### Backend (.env)

```bash
# Database (Required)
DATABASE_URL=postgresql://...
DB_HOST=...
DB_PORT=5432
DB_USER=...
DB_PASSWORD=...
DB_NAME=lynko_prod

# OpenAI (Required)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo

# Server
PORT=5000
NODE_ENV=production

# Logging
LOG_LEVEL=info

# CORS (Update to your domain)
CORS_ORIGIN=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Optional
ANTHROPIC_API_KEY=...
```

### Frontend (.env.production)

```bash
# API Endpoint
VITE_API_URL=https://your-api-domain.com/api

# Metadata
VITE_ENVIRONMENT=production
VITE_APP_VERSION=1.0.0
```

---

## 🔒 Security Checklist

- [ ] Backend .env file is NOT committed to git
- [ ] Use HTTPS/SSL for all endpoints
- [ ] Set proper CORS origin (not `*`)
- [ ] Enable rate limiting (configured)
- [ ] Use strong passwords for database
- [ ] Rotate API keys regularly
- [ ] Enable database backups
- [ ] Monitor logs for errors
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Enable HTTPS redirect
- [ ] Configure security headers (Helmet enabled)

---

## ✅ Post-Deployment Testing

### Backend Verification

```bash
# Health check
curl https://your-api-domain.com/health

# Chatbot test
curl -X POST https://your-api-domain.com/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!"}'

# OpenAI status
curl https://your-api-domain.com/api/chatbot/openai/status
```

### Frontend Verification

- [ ] Frontend loads at your domain
- [ ] Can send messages to chatbot
- [ ] API calls work correctly
- [ ] No console errors
- [ ] Responsive design works
- [ ] Performance is acceptable

### Full Test Flow

1. **Open frontend**: https://yourdomain.com
2. **Send test message**: Should receive response from chatbot
3. **Check browser console**: No errors
4. **Check backend logs**: Request logged correctly
5. **Verify OpenAI**: Check that API calls are successful

---

## 🔄 Continuous Deployment

### GitHub Actions (Example)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          ssh user@backend-server << 'EOF'
          cd /app/Lynko/backend
          git pull
          npm install --production
          npm run migrate
          pm2 restart lynko-backend
          EOF
      
      - name: Deploy Frontend
        run: |
          npm install
          npm run build
          scp -r dist/* user@web-server:/var/www/html/
```

---

## 📈 Monitoring

### Backend Monitoring

```bash
# Check process status
pm2 status

# View logs
pm2 logs lynko-backend

# Monitor performance
pm2 monit
```

### Frontend Monitoring

- Use CDN analytics (if using CDN)
- Set up error tracking (Sentry, LogRocket)
- Monitor API response times
- Track user analytics

---

## 🆘 Troubleshooting

### Backend Won't Start

```bash
# Check port is available
lsof -i :5000

# Check environment variables
cat .env

# Check database connection
psql $DATABASE_URL

# Check logs
npm start  # See error output
```

### Frontend API Calls Fail

1. **Check CORS origin** in backend .env
2. **Verify API URL** in frontend .env
3. **Test API directly**: `curl https://api-url/health`
4. **Check browser console** for errors

### Database Connection Issues

```bash
# Test database
psql postgresql://user:pass@host:5432/dbname

# Run migrations
cd backend && npm run migrate
```

### Rate Limiting Issues

Adjust in `backend/.env`:
```bash
RATE_LIMIT_MAX_REQUESTS=200  # Increase limit
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
```

---

## 📞 Support

- Check logs first
- Verify all environment variables
- Test endpoints with curl
- Check OpenAI API status
- Review error messages carefully

---

**Status:** ✅ Production Ready
**Last Updated:** November 2025

# Lynko Backend Deployment Guide

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- PostgreSQL 12+ running
- Git (for cloning)

### 2. Setup Database
```bash
# Create database
createdb lynko_db

# Run migrations
npm run migrate
```

### 3. Configure Environment
```bash
# Copy environment template
cp env.example .env

# Edit .env with your settings
# Required: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, JWT_SECRET
```

### 4. Install & Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or start production server
npm start
```

### 5. Test API
```bash
# Run API tests
npm run test:api
```

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DB_HOST` | Database host | Yes | localhost |
| `DB_PORT` | Database port | Yes | 5432 |
| `DB_NAME` | Database name | Yes | lynko_db |
| `DB_USER` | Database user | Yes | postgres |
| `DB_PASSWORD` | Database password | Yes | - |
| `DATABASE_URL` | Full database URL | No | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `JWT_EXPIRES_IN` | JWT expiration | No | 7d |
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment | No | development |
| `CORS_ORIGIN` | CORS origin | No | http://localhost:3000 |

## 📊 API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user  
- `GET /api/auth/profile` - Get profile (auth required)

### Conversations
- `POST /api/conversations` - Create conversation (auth required)
- `GET /api/conversations` - List conversations (auth required)
- `GET /api/conversations/:id` - Get conversation (auth required)
- `PUT /api/conversations/:id` - Update conversation (auth required)
- `DELETE /api/conversations/:id` - Delete conversation (auth required)

### Messages
- `POST /api/conversations/:id/messages` - Send message + AI response (auth required)
- `GET /api/conversations/:id/messages` - Get messages (auth required)
- `DELETE /api/messages/:id` - Delete message (auth required)

### Health
- `GET /health` - Health check

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs with configurable rounds
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - Joi schema validation
- **Security Headers** - Helmet.js protection
- **CORS Protection** - Configurable origins
- **SQL Injection Protection** - Parameterized queries

## 🏗️ Production Deployment

### Environment Setup
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=your-super-secure-secret
CORS_ORIGIN=https://yourdomain.com
```

### Process Management
```bash
# Using PM2
npm install -g pm2
pm2 start server.js --name lynko-backend

# Using Docker
docker build -t lynko-backend .
docker run -p 5000:5000 --env-file .env lynko-backend
```

### Database Migration
```bash
# Run migrations in production
NODE_ENV=production npm run migrate
```

## 🧪 Testing

### Manual Testing
```bash
# Start server
npm run dev

# In another terminal
npm run test:api
```

### Automated Testing
```bash
# Run Jest tests
npm test

# Run with coverage
npm run test:coverage
```

## 📈 Monitoring

### Health Checks
- Endpoint: `GET /health`
- Returns: Server status, timestamp, environment

### Logging
- Structured JSON logs
- Request/response logging
- Error tracking with stack traces

### Metrics to Monitor
- Response times
- Error rates
- Database connection pool
- Memory usage
- CPU usage

## 🔄 Maintenance

### Database Maintenance
```sql
-- Check table sizes
SELECT schemaname,tablename,pg_size_pretty(size) as size 
FROM (
  SELECT schemaname,tablename,pg_total_relation_size(schemaname||'.'||tablename) as size
  FROM pg_tables WHERE schemaname = 'public'
) t ORDER BY size DESC;

-- Clean old messages (optional)
DELETE FROM messages WHERE created_at < NOW() - INTERVAL '90 days';
```

### Log Rotation
```bash
# Using logrotate
/var/log/lynko-backend/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    copytruncate
}
```

## 🚨 Troubleshooting

### Common Issues

**Database Connection Failed**
- Check DB_HOST, DB_PORT, DB_USER, DB_PASSWORD
- Verify PostgreSQL is running
- Check firewall settings

**JWT Token Invalid**
- Verify JWT_SECRET is set
- Check token expiration
- Ensure token is sent in Authorization header

**Rate Limit Exceeded**
- Increase RATE_LIMIT_MAX_REQUESTS
- Adjust RATE_LIMIT_WINDOW_MS
- Check for client-side request loops

**CORS Errors**
- Verify CORS_ORIGIN matches frontend URL
- Check if credentials are being sent
- Ensure preflight requests are handled

### Debug Mode
```env
NODE_ENV=development
# Enables detailed error messages and stack traces
```

## 📞 Support

- **Documentation**: See README.md
- **Issues**: Create GitHub issue
- **Email**: support@lynko.ai

---

**Built with ❤️ by the Lynko Team**

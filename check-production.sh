#!/bin/bash
# Production Deployment Checklist & Setup Script for Lynko
# This script helps verify and prepare the production environment

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "================================"
echo "Lynko Production Deployment Check"
echo "================================"
echo ""

# Track failures
FAILED=0

# ============================================================================
# SYSTEM CHECKS
# ============================================================================
echo -e "${YELLOW}[1/6] Checking system requirements...${NC}"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$MAJOR_VERSION" -ge 18 ]; then
        echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
    else
        echo -e "${RED}✗${NC} Node.js version must be 18 or higher (found: $NODE_VERSION)"
        FAILED=1
    fi
else
    echo -e "${RED}✗${NC} Node.js not installed. Install Node.js 18+ from https://nodejs.org/"
    FAILED=1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✓${NC} npm installed: $(npm -v)"
else
    echo -e "${RED}✗${NC} npm not installed"
    FAILED=1
fi

# Check PostgreSQL client
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✓${NC} PostgreSQL client installed"
else
    echo -e "${YELLOW}⚠${NC} PostgreSQL client not installed (needed for database setup)"
fi

echo ""

# ============================================================================
# ENVIRONMENT VARIABLES
# ============================================================================
echo -e "${YELLOW}[2/6] Checking environment variables...${NC}"

# Check backend environment
if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓${NC} Backend .env file exists"
    
    # Check required variables
    if grep -q "OPENAI_API_KEY=sk-" backend/.env; then
        echo -e "${GREEN}✓${NC} OpenAI API key configured"
    else
        echo -e "${RED}✗${NC} OpenAI API key not configured in backend/.env"
        FAILED=1
    fi
    
    if grep -q "DATABASE_URL=" backend/.env; then
        echo -e "${GREEN}✓${NC} Database URL configured"
    else
        echo -e "${RED}✗${NC} Database URL not configured in backend/.env"
        FAILED=1
    fi
    
    if grep -q "CORS_ORIGIN=" backend/.env; then
        echo -e "${GREEN}✓${NC} CORS origin configured"
    else
        echo -e "${RED}✗${NC} CORS origin not configured in backend/.env"
        FAILED=1
    fi
else
    echo -e "${RED}✗${NC} Backend .env file not found"
    echo "   Create it using: backend/env.production template"
    FAILED=1
fi

# Check frontend environment
if [ -f ".env.production" ]; then
    echo -e "${GREEN}✓${NC} Frontend .env.production file exists"
    
    if grep -q "VITE_API_URL=" .env.production; then
        API_URL=$(grep "VITE_API_URL=" .env.production | cut -d'=' -f2)
        echo -e "${GREEN}✓${NC} Frontend API URL: $API_URL"
    else
        echo -e "${RED}✗${NC} VITE_API_URL not configured in .env.production"
        FAILED=1
    fi
else
    echo -e "${YELLOW}⚠${NC} Frontend .env.production not found (needed for production builds)"
fi

echo ""

# ============================================================================
# DEPENDENCIES
# ============================================================================
echo -e "${YELLOW}[3/6] Checking dependencies...${NC}"

# Check backend dependencies
if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Backend node_modules exists"
else
    echo -e "${YELLOW}⚠${NC} Backend node_modules not installed"
    echo "   Run: cd backend && npm install --production"
fi

# Check frontend dependencies
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Frontend node_modules exists"
else
    echo -e "${YELLOW}⚠${NC} Frontend node_modules not installed"
    echo "   Run: npm install --production"
fi

echo ""

# ============================================================================
# DATABASE
# ============================================================================
echo -e "${YELLOW}[4/6] Checking database...${NC}"

if [ -f "backend/.env" ]; then
    # Extract DATABASE_URL
    DB_URL=$(grep "DATABASE_URL=" backend/.env | cut -d'=' -f2- | tr -d ' ')
    
    if [ -n "$DB_URL" ]; then
        echo "Database URL configured: ${DB_URL:0:20}..."
        
        # Try to connect (if psql available)
        if command -v psql &> /dev/null; then
            if psql "$DB_URL" -c "SELECT 1" >/dev/null 2>&1; then
                echo -e "${GREEN}✓${NC} Database connection successful"
            else
                echo -e "${YELLOW}⚠${NC} Could not connect to database"
                echo "   Verify DATABASE_URL in backend/.env"
            fi
        fi
    fi
fi

echo ""

# ============================================================================
# API ENDPOINTS
# ============================================================================
echo -e "${YELLOW}[5/6] Checking API endpoints...${NC}"

if [ -f "backend/server.js" ]; then
    if grep -q "'/health'" backend/server.js || grep -q "'/api/chatbot'" backend/server.js; then
        echo -e "${GREEN}✓${NC} API routes configured"
    else
        echo -e "${YELLOW}⚠${NC} Could not verify API routes"
    fi
else
    echo -e "${RED}✗${NC} backend/server.js not found"
    FAILED=1
fi

echo ""

# ============================================================================
# BUILD ARTIFACTS
# ============================================================================
echo -e "${YELLOW}[6/6] Checking build artifacts...${NC}"

if [ -d "dist" ]; then
    FILES=$(find dist -type f | wc -l)
    echo -e "${GREEN}✓${NC} Frontend build exists ($FILES files)"
else
    echo -e "${YELLOW}⚠${NC} Frontend dist/ directory not found"
    echo "   Run: npm run build"
fi

echo ""

# ============================================================================
# SUMMARY
# ============================================================================
echo "================================"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. If needed, install dependencies: cd backend && npm install --production"
    echo "2. If needed, build frontend: npm run build"
    echo "3. Configure nginx: sudo cp nginx.conf.template /etc/nginx/sites-available/lynko"
    echo "4. Start backend: cd backend && npm start"
    echo "5. Verify health: curl http://localhost:5000/health"
else
    echo -e "${RED}✗ Some checks failed. Please review above.${NC}"
    exit 1
fi
echo "================================"

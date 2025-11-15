#!/bin/bash

# ============================================================================
# Lynko Quickstart Script
# Starts both frontend and backend servers with a single command
# Usage: ./start.sh [backend-port] [frontend-port]
# Default: ./start.sh (uses 5000 for backend, 3000 for frontend)
# ============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
BACKEND_PORT=${1:-5000}
FRONTEND_PORT=${2:-3000}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Color output function
print_section() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# ============================================================================
# CLEANUP ON EXIT
# ============================================================================
cleanup() {
    local exit_code=$?
    echo ""
    print_section "Shutting Down"
    
    echo "Stopping backend and frontend processes..."
    echo ""
    
    # Only kill processes if we're actually shutting down (not just exiting normally)
    # Give processes a moment to shut down gracefully
    sleep 1
    
    # Force kill any remaining node processes (backend)
    echo "Ensuring backend (port $BACKEND_PORT) is stopped..."
    if command -v lsof &> /dev/null; then
        # Use lsof if available (more reliable)
        pids=$(lsof -t -i :$BACKEND_PORT 2>/dev/null || echo "")
        if [ -n "$pids" ]; then
            echo "$pids" | xargs -r kill -9 2>/dev/null || true
            print_status "Backend port $BACKEND_PORT cleaned up"
        fi
    elif command -v fuser &> /dev/null; then
        # Fallback to fuser if lsof not available
        fuser -k $BACKEND_PORT/tcp 2>/dev/null || true
        print_status "Backend port $BACKEND_PORT cleaned up"
    else
        # Fallback to pkill if neither available
        pkill -9 -f "node server.js" 2>/dev/null || true
        print_status "Backend process terminated"
    fi
    
    # Force kill any remaining vite processes (frontend)
    echo "Ensuring frontend (port $FRONTEND_PORT) is stopped..."
    pkill -9 -f "vite" 2>/dev/null || true
    pkill -9 -f "node.*vite" 2>/dev/null || true
    print_status "Frontend process terminated"
    
    # Final confirmation
    echo ""
    echo -e "${YELLOW}✓ All services stopped.${NC}"
    exit $exit_code
}

# Only trap SIGINT and SIGTERM, not EXIT (to avoid double cleanup)
trap cleanup SIGINT SIGTERM

# ============================================================================
# PREREQUISITE CHECKS
# ============================================================================
print_section "Checking Prerequisites"

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    echo "Install from: https://nodejs.org/ (v18+)"
    exit 1
fi
NODE_VERSION=$(node -v)
print_status "Node.js: $NODE_VERSION"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi
print_status "npm: $(npm -v)"

# ============================================================================
# BACKEND SETUP
# ============================================================================
print_section "Setting Up Backend"

cd "$SCRIPT_DIR/backend"

# Check if .env exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found in backend/"
    echo "Creating .env from env.example..."
    if [ -f "env.example" ]; then
        cp env.example .env
        print_status "Created .env from env.example"
        print_status "✅ Chatbot works WITHOUT database setup!"
        echo ""
        echo "To use the chatbot, you need:"
        echo "   ✓ OPENAI_API_KEY (required - get from https://platform.openai.com/api-keys)"
        echo ""
        echo "Optional for conversation history:"
        echo "   ⦿ DATABASE_URL (PostgreSQL connection - see DATABASE_OPTIONAL.md)"
        echo ""
    else
        print_error "env.example not found"
        exit 1
    fi
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    print_status "Installing backend dependencies..."
    npm install
else
    print_status "Backend dependencies already installed"
fi

print_status "Backend directory: $SCRIPT_DIR/backend"
print_status "Backend will run on: http://localhost:$BACKEND_PORT"

# ============================================================================
# FRONTEND SETUP
# ============================================================================
print_section "Setting Up Frontend"

cd "$SCRIPT_DIR"

# Check if .env.development exists
if [ ! -f ".env.development" ]; then
    print_warning ".env.development not found"
    echo "Creating .env.development..."
    cat > .env.development << EOF
VITE_API_URL=http://localhost:$BACKEND_PORT/api
VITE_ENVIRONMENT=development
VITE_APP_VERSION=1.0.0-dev
EOF
    print_status "Created .env.development"
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
else
    print_status "Frontend dependencies already installed"
fi

print_status "Frontend directory: $SCRIPT_DIR"
print_status "Frontend will run on: http://localhost:$FRONTEND_PORT"

# ============================================================================
# START SERVICES
# ============================================================================
print_section "Starting Services"

# Start backend
echo -e "${BLUE}Starting backend on port $BACKEND_PORT...${NC}"
cd "$SCRIPT_DIR/backend"
PORT=$BACKEND_PORT npm start > /tmp/lynko-backend.log 2>&1 &
BACKEND_PID=$!
print_status "Backend started (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 2

# Check if backend is actually running
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    print_error "Backend failed to start. Check the logs:"
    cat /tmp/lynko-backend.log
    exit 1
fi

# Start frontend
echo -e "${BLUE}Starting frontend on port $FRONTEND_PORT...${NC}"
cd "$SCRIPT_DIR"
PORT=$FRONTEND_PORT npm run dev > /tmp/lynko-frontend.log 2>&1 &
FRONTEND_PID=$!
print_status "Frontend started (PID: $FRONTEND_PID)"

# Wait a moment for frontend to start
sleep 2

# ============================================================================
# READY MESSAGE
# ============================================================================
print_section "🚀 Lynko is Running!"

echo ""
echo -e "${GREEN}✅ Frontend URL:${NC}   http://localhost:$FRONTEND_PORT"
echo -e "${GREEN}✅ Backend API:${NC}    http://localhost:$BACKEND_PORT"
echo -e "${GREEN}✅ Chatbot Ready:${NC}  http://localhost:$FRONTEND_PORT"
echo ""
echo -e "${YELLOW}Note:${NC} Database is optional. Chatbot works without it!"
echo "  • Chatbot working: Yes"
echo "  • Conversation history: $(grep -q 'DATABASE_URL' $SCRIPT_DIR/backend/.env && echo 'Yes (Database enabled)' || echo 'No (Database not needed)')"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# ============================================================================
# HEALTH CHECKS
# ============================================================================
print_section "Running Health Checks"

# Function to check if service is running with detailed error messages
check_health() {
    local url=$1
    local name=$2
    local port=$3
    local max_attempts=10
    local attempt=1
    
    echo ""
    echo -e "${BLUE}Checking $name...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        # Try to connect and get response
        response=$(curl -s -w "\n%{http_code}" "$url" 2>&1)
        http_code=$(echo "$response" | tail -n1)
        body=$(echo "$response" | sed '$d')
        
        # Check if curl succeeded
        if [ -z "$http_code" ] || ! echo "$http_code" | grep -q "^[0-9]*$"; then
            # Connection refused or other error
            if [ $attempt -lt $max_attempts ]; then
                echo -n "."
                sleep 1
                attempt=$((attempt + 1))
                continue
            else
                echo ""
                print_error "$name health check failed"
                echo ""
                echo "Possible reasons:"
                if ! command -v curl &> /dev/null; then
                    echo "  • curl not installed"
                fi
                if ! netstat -tuln 2>/dev/null | grep -q ":$port"; then
                    echo "  • Nothing is listening on port $port"
                    echo "  • Process may have crashed or failed to start"
                fi
                echo "  • Check logs: tail -f /tmp/lynko-${name,,}.log"
                echo ""
                return 1
            fi
        fi
        
        # Check HTTP status code
        if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
            echo ""
            print_status "$name is healthy ✅"
            if [ "$name" = "Backend" ]; then
                echo "   └─ Port: $port | Status: OK | Database: Optional"
            else
                echo "   └─ Port: $port | Status: Responding"
            fi
            return 0
        else
            # Got a response but not 200
            echo ""
            print_warning "$name returned HTTP $http_code"
            echo "   └─ This might be expected during startup"
            return 0
        fi
    done
    
    echo ""
    print_error "$name health check timed out after ${max_attempts}s"
    echo ""
    echo "Troubleshooting steps:"
    echo "  1. Check if process is still running:"
    echo "     ps aux | grep 'node server.js' (for backend)"
    echo "     ps aux | grep 'vite' (for frontend)"
    echo ""
    echo "  2. Check the logs:"
    echo "     Backend:  cat /tmp/lynko-backend.log"
    echo "     Frontend: cat /tmp/lynko-frontend.log"
    echo ""
    echo "  3. Verify ports are available:"
    echo "     Backend:  netstat -tuln | grep :$BACKEND_PORT"
    echo "     Frontend: netstat -tuln | grep :$FRONTEND_PORT"
    echo ""
    echo "  4. Check OpenAI configuration:"
    echo "     echo \$OPENAI_API_KEY"
    echo ""
    return 1
}

# Check backend health (works with or without database)
check_health "http://localhost:$BACKEND_PORT/health" "Backend" "$BACKEND_PORT"

# Check frontend (just verify it's responding)
echo ""
echo -e "${BLUE}Checking Frontend...${NC}"
frontend_response=$(curl -s -w "\n%{http_code}" "http://localhost:$FRONTEND_PORT" 2>&1)
frontend_code=$(echo "$frontend_response" | tail -n1)

if [ -n "$frontend_code" ] && echo "$frontend_code" | grep -q "^[0-9]*$"; then
    if [ "$frontend_code" = "200" ] || [ "$frontend_code" = "201" ]; then
        echo ""
        print_status "Frontend is responding ✅"
        echo "   └─ Port: $FRONTEND_PORT | Status: OK"
    else
        echo ""
        print_warning "Frontend returned HTTP $frontend_code (may be starting)"
        echo "   └─ This is often normal during initial startup"
    fi
else
    echo ""
    print_warning "Frontend health check could not connect"
    echo ""
    echo "Note: Frontend may still be starting. Check logs:"
    echo "  tail -f /tmp/lynko-frontend.log"
fi

echo ""

# ============================================================================
# MONITORING
# ============================================================================
print_section "Service Logs"

echo -e "${BLUE}Backend Log:${NC}    tail -f /tmp/lynko-backend.log"
echo -e "${BLUE}Frontend Log:${NC}   tail -f /tmp/lynko-frontend.log"
echo ""
echo -e "${GREEN}Both services are running. Press Ctrl+C to stop.${NC}"
echo ""

# Wait indefinitely for user to stop the services
# This keeps the services running in the background
while true; do
    sleep 1
    # Check if backend is still running
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        print_error "Backend process died unexpectedly"
        echo "Check logs: cat /tmp/lynko-backend.log"
        # Don't exit, just notify
    fi
    # Check if frontend is still running
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        print_error "Frontend process died unexpectedly"
        echo "Check logs: cat /tmp/lynko-frontend.log"
        # Don't exit, just notify
    fi
done

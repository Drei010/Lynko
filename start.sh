
#!/bin/bash

echo "🚀 Starting Lynko Application..."
echo ""

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  cd backend && npm install && cd ..
fi

# Check if frontend dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  npm install
fi

# Start backend and frontend in parallel
echo ""
echo "🎯 Starting services..."
echo "   Backend API will run on port 3001"
echo "   Frontend will run on port 5000"
echo ""

# Run both services
(cd backend && npm start) & npm run dev & wait

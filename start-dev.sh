#!/bin/bash

# Portfolio Management System - Development Startup Script

echo "🚀 Starting Portfolio Management System..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo -e "${RED}❌ Yarn is not installed!${NC}"
    echo -e "${YELLOW}Please install yarn: npm install -g yarn${NC}"
    exit 1
fi

# Check if root node_modules exists (yarn workspaces)
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}Installing dependencies (yarn workspaces)...${NC}"
    yarn install
fi

echo ""
echo -e "${GREEN}✅ Dependencies ready!${NC}"
echo ""
echo -e "${BLUE}Starting services...${NC}"
echo ""
echo -e "${GREEN}Backend (Strapi):${NC} http://localhost:1337/admin"
echo -e "${GREEN}Frontend (Next.js):${NC} http://localhost:3000"
echo ""
echo -e "${BLUE}Press Ctrl+C to stop all services${NC}"
echo ""

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo -e "${RED}Stopping services...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup INT TERM

# Start backend in background
yarn workspace portfolio-backend develop &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 5

# Start frontend in background
yarn workspace portfolio-frontend dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID


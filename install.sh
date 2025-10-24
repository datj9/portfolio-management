#!/bin/bash

# Portfolio Management - Installation Script

echo "🚀 Portfolio Management Installation"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
echo -e "${BLUE}Detected Node version: $(node -v)${NC}"

if [ "$NODE_VERSION" -gt 18 ]; then
    echo -e "${YELLOW}⚠️  Warning: Strapi 4.10.7 officially supports Node 18${NC}"
    echo -e "${YELLOW}   You're using Node $NODE_VERSION. This might cause issues.${NC}"
    echo -e "${YELLOW}   Consider using: nvm use 18${NC}"
    echo ""
fi

# Check Python
if command -v python3.12 &> /dev/null; then
    PYTHON_PATH=$(which python3.12)
    echo -e "${GREEN}✅ Python 3.12 found: $PYTHON_PATH${NC}"
    export PYTHON=$PYTHON_PATH
else
    echo -e "${RED}❌ Python 3.12 not found${NC}"
    echo -e "${YELLOW}Install it with: brew install python@3.12${NC}"
    exit 1
fi

# Check Yarn
if ! command -v yarn &> /dev/null; then
    echo -e "${RED}❌ Yarn not installed${NC}"
    echo -e "${YELLOW}Install it with: npm install -g yarn${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Yarn found: $(yarn --version)${NC}"
echo ""

# Check PostgreSQL
echo -e "${BLUE}Checking PostgreSQL...${NC}"
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✅ PostgreSQL found${NC}"
    
    # Check if portfolio database exists
    if psql -lqt | cut -d \| -f 1 | grep -qw portfolio; then
        echo -e "${GREEN}✅ Database 'portfolio' exists${NC}"
    else
        echo -e "${YELLOW}⚠️  Database 'portfolio' not found${NC}"
        echo -e "${YELLOW}   Run: createdb portfolio${NC}"
        echo ""
        read -p "Create database now? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            createdb portfolio
            echo -e "${GREEN}✅ Database created${NC}"
        fi
    fi
else
    echo -e "${RED}❌ PostgreSQL not found${NC}"
    echo -e "${YELLOW}Install with: brew install postgresql@14${NC}"
    echo -e "${YELLOW}See POSTGRES_SETUP.md for details${NC}"
    exit 1
fi
echo ""

# Clean old installations
echo -e "${BLUE}🧹 Cleaning old installations...${NC}"
rm -rf node_modules backend/node_modules frontend/node_modules yarn.lock 2>/dev/null
echo -e "${GREEN}✅ Cleaned${NC}"
echo ""

# Install
echo -e "${BLUE}📦 Installing dependencies...${NC}"
echo -e "${YELLOW}This may take a few minutes...${NC}"
echo ""

yarn install

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Installation successful!${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "  1. Run: ${GREEN}yarn dev${NC}"
    echo "  2. Open: ${GREEN}http://localhost:1337/admin${NC} (Strapi)"
    echo "  3. Open: ${GREEN}http://localhost:3000${NC} (Frontend)"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Installation failed${NC}"
    echo ""
    echo -e "${YELLOW}Try these solutions:${NC}"
    echo "  1. Switch to Node 18: ${GREEN}nvm install 18 && nvm use 18${NC}"
    echo "  2. Update Xcode tools: ${GREEN}xcode-select --install${NC}"
    echo "  3. See: ${GREEN}INSTALL_HELP.md${NC} for more options"
    echo ""
    exit 1
fi


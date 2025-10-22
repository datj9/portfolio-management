#!/bin/bash

# Test Strapi API Permissions

echo "🔍 Testing Strapi API Permissions..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

STRAPI_URL="http://localhost:1337"

# Test if Strapi is running
echo -e "${BLUE}1. Checking if Strapi is running...${NC}"
if curl -s "${STRAPI_URL}/admin" > /dev/null; then
    echo -e "${GREEN}✅ Strapi is running${NC}"
else
    echo -e "${RED}❌ Strapi is not running or not accessible${NC}"
    echo "Please start Strapi with: yarn dev:backend"
    exit 1
fi
echo ""

# Test Introduction endpoint
echo -e "${BLUE}2. Testing Introduction API...${NC}"
INTRO_RESPONSE=$(curl -s -w "\n%{http_code}" "${STRAPI_URL}/api/introduction")
INTRO_CODE=$(echo "$INTRO_RESPONSE" | tail -n1)
if [ "$INTRO_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Introduction API accessible (200 OK)${NC}"
else
    echo -e "${RED}❌ Introduction API failed (HTTP $INTRO_CODE)${NC}"
    echo "Response:"
    echo "$INTRO_RESPONSE" | head -n-1 | python3 -m json.tool 2>/dev/null || echo "$INTRO_RESPONSE"
fi
echo ""

# Test Work Experiences endpoint
echo -e "${BLUE}3. Testing Work Experiences API...${NC}"
WORK_RESPONSE=$(curl -s -w "\n%{http_code}" "${STRAPI_URL}/api/work-experiences")
WORK_CODE=$(echo "$WORK_RESPONSE" | tail -n1)
if [ "$WORK_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Work Experiences API accessible (200 OK)${NC}"
else
    echo -e "${RED}❌ Work Experiences API failed (HTTP $WORK_CODE)${NC}"
    echo "Response:"
    echo "$WORK_RESPONSE" | head -n-1 | python3 -m json.tool 2>/dev/null || echo "$WORK_RESPONSE"
fi
echo ""

# Test Blog endpoint
echo -e "${BLUE}4. Testing Blog API...${NC}"
BLOG_RESPONSE=$(curl -s -w "\n%{http_code}" "${STRAPI_URL}/api/blogs")
BLOG_CODE=$(echo "$BLOG_RESPONSE" | tail -n1)
if [ "$BLOG_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Blog API accessible (200 OK)${NC}"
else
    echo -e "${RED}❌ Blog API failed (HTTP $BLOG_CODE)${NC}"
    echo "Response:"
    echo "$BLOG_RESPONSE" | head -n-1 | python3 -m json.tool 2>/dev/null || echo "$BLOG_RESPONSE"
fi
echo ""

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if [ "$INTRO_CODE" = "200" ] && [ "$WORK_CODE" = "200" ] && [ "$BLOG_CODE" = "200" ]; then
    echo -e "${GREEN}🎉 All API endpoints are working!${NC}"
    echo ""
    echo "Your frontend should work now. Try: http://localhost:3000"
else
    echo -e "${RED}⚠️  Some API endpoints are not accessible${NC}"
    echo ""
    echo -e "${YELLOW}Please check Strapi permissions:${NC}"
    echo "1. Go to: ${STRAPI_URL}/admin"
    echo "2. Settings → Roles → Public"
    echo "3. Make sure these are checked:"
    echo "   Blog: find ✓, findOne ✓"
    echo "   Introduction: find ✓"
    echo "   Work-experience: find ✓, findOne ✓"
    echo "4. Click Save"
    echo "5. Restart Strapi if needed"
fi
echo ""


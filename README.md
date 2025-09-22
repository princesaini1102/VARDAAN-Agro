# Vardaan Agro Farm E-Commerce Platform

A production-ready, AI-powered e-commerce platform for organic farming products with 3D visualization and microservices architecture.

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT with Bcrypt
- **Validation**: Zod
- **Testing**: Jest + Supertest
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS + Styled-components
- **3D Graphics**: React Three Fiber + Drei
- **Animations**: Framer Motion + GSAP
- **State Management**: React Query
- **Validation**: Zod

### AI & Advanced Features
- **AI Chatbot**: OpenAI/Langchain integration
- **Recommendations**: AI-powered product suggestions
- **3D Models**: GLTF/GLB product viewers
- **Real-time**: WebSocket notifications

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Frontend Deployment**: Vercel
- **Backend Deployment**: Railway/AWS
- **Database**: MySQL (AWS RDS/Railway)

## 🏗️ Architecture

### Microservices
- User Management Service
- Product Service
- Cart Service
- Order Service
- Payment Service
- Review Service
- AI Recommendation Service
- Notification Service
- Admin/Analytics Service

## 📦 Installation

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- Docker & Docker Compose

### Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup
```bash
docker-compose up -d
```

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL="mysql://user:password@localhost:3306/vardaan_agro"
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
OPENAI_API_KEY="your-openai-key"
STRIPE_SECRET_KEY="your-stripe-key"
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-public-key"
```

## 🧪 Testing
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 API Documentation
- Swagger UI: `http://localhost:5000/api-docs`
- Postman Collection: `./docs/Vardaan-Agro-API.postman_collection.json`

## 🎯 Features

### Customer Features
- 3D Product Visualization
- AI-Powered Recommendations
- Smart Chatbot Assistant
- Secure Payment Processing
- Order Tracking
- Product Reviews & Ratings

### Admin Features
- Product Management
- Order Management
- User Management
- Analytics Dashboard
- Inventory Tracking

### Technical Features
- Responsive Design
- SEO Optimized
- Progressive Web App
- Real-time Notifications
- Advanced Animations
- Microservices Architecture

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License
MIT License - see LICENSE file for details
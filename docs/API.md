# Vardaan Agro Farm API Documentation

## Overview

The Vardaan Agro Farm API is a RESTful service built with Node.js, Express.js, and Prisma ORM. It provides comprehensive endpoints for managing an organic farming e-commerce platform.

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://api.vardaanagro.com/api`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the access token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Token Refresh

Access tokens expire after 15 minutes. Use the refresh token to get a new access token:

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

## API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+91-9876543210",
  "address": "123 Farm Street, Punjab, India"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout User
```http
POST /auth/logout
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

#### Change Password
```http
POST /auth/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### Products

#### Get All Products
```http
GET /products?page=1&limit=10&categoryId=cat123&search=tomato&sortBy=price&sortOrder=asc
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `categoryId` (optional): Filter by category
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `search` (optional): Search in name and description
- `inStock` (optional): Filter products in stock
- `isOrganic` (optional): Filter organic products
- `rating` (optional): Minimum rating filter
- `sortBy` (optional): Sort field (name, price, rating, createdAt)
- `sortOrder` (optional): Sort order (asc, desc)

#### Get Product by ID
```http
GET /products/{id}
```

#### Get Featured Products
```http
GET /products/featured?limit=8
```

#### Get Related Products
```http
GET /products/{id}/related?categoryId=cat123&limit=4
```

#### Search Products
```http
GET /products/search?q=organic&limit=10
```

#### Create Product (Admin Only)
```http
POST /products
Authorization: Bearer <admin_access_token>
Content-Type: application/json

{
  "name": "Organic Tomatoes",
  "description": "Fresh organic tomatoes grown without pesticides",
  "price": 80.00,
  "stock": 100,
  "categoryId": "cat123",
  "sku": "VEG-TOM-001",
  "weight": 1.0,
  "dimensions": {
    "length": 10,
    "width": 10,
    "height": 8
  },
  "images": [
    "https://example.com/tomato1.jpg",
    "https://example.com/tomato2.jpg"
  ],
  "model3D": "https://example.com/tomato.glb",
  "isOrganic": true
}
```

#### Update Product (Admin Only)
```http
PUT /products/{id}
Authorization: Bearer <admin_access_token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 90.00,
  "stock": 150
}
```

#### Delete Product (Admin Only)
```http
DELETE /products/{id}
Authorization: Bearer <admin_access_token>
```

### Categories

#### Get All Categories
```http
GET /categories
```

#### Get Category by ID
```http
GET /categories/{id}
```

#### Create Category (Admin Only)
```http
POST /categories
Authorization: Bearer <admin_access_token>
Content-Type: application/json

{
  "name": "Organic Vegetables",
  "description": "Fresh organic vegetables grown without pesticides",
  "image": "https://example.com/vegetables.jpg"
}
```

### Cart

#### Get User Cart
```http
GET /cart
Authorization: Bearer <access_token>
```

#### Add Item to Cart
```http
POST /cart/add
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "productId": "prod123",
  "quantity": 2
}
```

#### Update Cart Item
```http
PUT /cart/item/{productId}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove Item from Cart
```http
DELETE /cart/item/{productId}
Authorization: Bearer <access_token>
```

#### Clear Cart
```http
DELETE /cart/clear
Authorization: Bearer <access_token>
```

#### Validate Cart
```http
GET /cart/validate
Authorization: Bearer <access_token>
```

### Orders

#### Get User Orders
```http
GET /orders?page=1&limit=10
Authorization: Bearer <access_token>
```

#### Get Order by ID
```http
GET /orders/{id}
Authorization: Bearer <access_token>
```

#### Create Order
```http
POST /orders
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "shippingInfo": {
    "name": "John Doe",
    "phone": "+91-9876543210",
    "address": "123 Farm Street",
    "city": "Ludhiana",
    "state": "Punjab",
    "pincode": "141001"
  }
}
```

#### Update Order Status (Admin Only)
```http
PATCH /orders/{id}/status
Authorization: Bearer <admin_access_token>
Content-Type: application/json

{
  "status": "SHIPPED",
  "trackingId": "TRK123456789"
}
```

### Reviews

#### Get Product Reviews
```http
GET /reviews/product/{productId}
```

#### Create Review
```http
POST /reviews
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "productId": "prod123",
  "rating": 5,
  "comment": "Excellent quality product!",
  "images": [
    "https://example.com/review1.jpg"
  ]
}
```

#### Update Review
```http
PUT /reviews/{id}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "rating": 4,
  "comment": "Updated review comment"
}
```

#### Delete Review
```http
DELETE /reviews/{id}
Authorization: Bearer <access_token>
```

### AI Features

#### Get AI Recommendations
```http
GET /ai/recommendations/{userId}
Authorization: Bearer <access_token>
```

#### Chat with AI Assistant
```http
POST /ai/chatbot
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "message": "What organic vegetables do you recommend for beginners?",
  "sessionId": "chat123"
}
```

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "details": {
    // Additional error details
  }
}
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Unprocessable Entity
- `500` - Internal Server Error

## Rate Limiting

The API implements rate limiting:
- **Window**: 15 minutes
- **Max Requests**: 100 per IP address

## Pagination

List endpoints support pagination with these query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

## Filtering and Sorting

Many endpoints support filtering and sorting:
- Use query parameters for filtering
- Use `sortBy` and `sortOrder` for sorting
- Multiple filters can be combined

## File Uploads

File uploads are handled through Cloudinary integration. Upload endpoints return URLs that can be used in other API calls.

## WebSocket Events

Real-time features use WebSocket connections:
- Order status updates
- Chat messages
- Inventory updates

## Error Handling

The API provides detailed error messages and follows RESTful conventions. Always check the `success` field in responses.

## SDK and Libraries

- **JavaScript/TypeScript**: Use the provided API client
- **Postman Collection**: Available in `/docs/Vardaan-Agro-API.postman_collection.json`

## Support

For API support, contact:
- Email: api-support@vardaanagro.com
- Documentation: https://docs.vardaanagro.com
- Status Page: https://status.vardaanagro.com
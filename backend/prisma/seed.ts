import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Vegetables' },
      update: {},
      create: {
        name: 'Vegetables',
        description: 'Fresh organic vegetables grown without pesticides',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Fruits' },
      update: {},
      create: {
        name: 'Fruits',
        description: 'Sweet and nutritious organic fruits',
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Grains' },
      update: {},
      create: {
        name: 'Grains',
        description: 'Wholesome organic grains and cereals',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Fertilizers' },
      update: {},
      create: {
        name: 'Fertilizers',
        description: 'Natural organic fertilizers for healthy soil',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500'
      }
    })
  ]);

  console.log('✅ Categories created');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@vardaanagro.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@vardaanagro.com',
      password: hashedPassword,
      role: 'ADMIN',
      phone: '+91-9876543210',
      address: 'Vardaan Agro Farm, Punjab, India'
    }
  });

  console.log('✅ Admin user created');

  // Create sample products
  const products = [
    {
      name: 'Organic Tomatoes',
      description: 'Fresh, juicy organic tomatoes grown without any chemicals. Perfect for salads, cooking, and making sauces.',
      price: 80,
      stock: 100,
      images: ['https://images.unsplash.com/photo-1546470427-e5ac89cd0b31?w=500'],
      categoryId: categories[0].id,
      sku: 'VEG-TOM-001',
      weight: 1.0,
      isOrganic: true
    },
    {
      name: 'Organic Carrots',
      description: 'Sweet and crunchy organic carrots, rich in beta-carotene and vitamins.',
      price: 60,
      stock: 150,
      images: ['https://images.unsplash.com/photo-1445282768818-728615cc910a?w=500'],
      categoryId: categories[0].id,
      sku: 'VEG-CAR-001',
      weight: 1.0,
      isOrganic: true
    },
    {
      name: 'Organic Apples',
      description: 'Crisp and sweet organic apples, perfect for snacking or baking.',
      price: 120,
      stock: 80,
      images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500'],
      categoryId: categories[1].id,
      sku: 'FRT-APP-001',
      weight: 1.0,
      isOrganic: true
    },
    {
      name: 'Organic Bananas',
      description: 'Naturally ripened organic bananas, rich in potassium and energy.',
      price: 50,
      stock: 200,
      images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500'],
      categoryId: categories[1].id,
      sku: 'FRT-BAN-001',
      weight: 1.0,
      isOrganic: true
    },
    {
      name: 'Organic Brown Rice',
      description: 'Nutritious organic brown rice, unpolished and full of fiber.',
      price: 150,
      stock: 50,
      images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500'],
      categoryId: categories[2].id,
      sku: 'GRN-RIC-001',
      weight: 5.0,
      isOrganic: true
    },
    {
      name: 'Organic Wheat',
      description: 'Premium quality organic wheat, perfect for making flour and bread.',
      price: 200,
      stock: 30,
      images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500'],
      categoryId: categories[2].id,
      sku: 'GRN-WHT-001',
      weight: 10.0,
      isOrganic: true
    },
    {
      name: 'Organic Compost',
      description: 'Rich organic compost made from natural materials, perfect for garden soil.',
      price: 300,
      stock: 25,
      images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500'],
      categoryId: categories[3].id,
      sku: 'FRT-COM-001',
      weight: 20.0,
      isOrganic: true
    },
    {
      name: 'Organic Vermicompost',
      description: 'Premium vermicompost made with earthworms, excellent for plant growth.',
      price: 250,
      stock: 40,
      images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500'],
      categoryId: categories[3].id,
      sku: 'FRT-VER-001',
      weight: 15.0,
      isOrganic: true
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product
    });
  }

  console.log('✅ Products created');

  // Create sample customer
  const customerPassword = await bcrypt.hash('customer123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'customer@example.com',
      password: customerPassword,
      role: 'CUSTOMER',
      phone: '+91-9876543211',
      address: 'Delhi, India'
    }
  });

  console.log('✅ Sample customer created');

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📋 Sample credentials:');
  console.log('Admin: admin@vardaanagro.com / admin123');
  console.log('Customer: customer@example.com / customer123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
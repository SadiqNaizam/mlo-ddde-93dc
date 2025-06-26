import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import Custom and Shadcn Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FoodItemCard from '@/components/FoodItemCard';
import { Button } from '@/components/ui/button';

// Placeholder data for featured food items
const featuredItems = [
  {
    id: 1,
    name: 'Stellar Steak Frites',
    price: 29.99,
    imageUrl: 'https://images.pexels.com/photos/3662136/pexels-photo-3662136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    name: 'Cosmic Carbonara',
    price: 22.50,
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    name: 'Galaxy Glazed Salmon',
    price: 26.75,
    imageUrl: 'https://images.pexels.com/photos/3296279/pexels-photo-3296279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  const handleAddToCart = (id: string | number) => {
    // This is a placeholder. In a real app, this would trigger a state update in a global context or parent component.
    console.log(`Placeholder: Add item ${id} to cart.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero Section */}
        <section
          className="relative flex h-[85vh] min-h-[600px] w-full items-center justify-center bg-cover bg-fixed bg-center"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 text-center text-white p-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-4xl font-extrabold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
            >
              A Culinary Journey Beyond the Stars
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 drop-shadow-md"
            >
              Experience celestial flavors delivered right to your door. Our kitchen combines the finest ingredients with cosmic creativity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: 'backOut' }}
              className="mt-10"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-7 px-10 shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                <Link to="/menu">View Full Menu</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Featured Dishes Section */}
        <section className="py-20 sm:py-24 bg-background">
          <div className="container max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Creations</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A glimpse into our universe of taste. Hand-picked by our chefs for your delight.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredItems.map((item) => (
                <FoodItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
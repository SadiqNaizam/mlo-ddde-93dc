import React from 'react';
import { motion } from 'framer-motion';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FoodItemCard from '@/components/FoodItemCard';

// shadcn/ui Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

// Placeholder menu data
const menuItems = [
  { id: 'app1', name: 'Starlight Bruschetta', price: 14.50, imageUrl: 'https://images.pexels.com/photos/1437318/pexels-photo-1437318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'appetizers' },
  { id: 'app2', name: 'Galaxy Glazed Wings', price: 16.00, imageUrl: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'appetizers' },
  { id: 'main1', name: 'Cosmic Carbonara', price: 22.50, imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'mains' },
  { id: 'main2', name: 'Nebula Steak Frites', price: 34.00, imageUrl: 'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'mains' },
  { id: 'main3', name: 'Supernova Salmon', price: 28.00, imageUrl: 'https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'mains' },
  { id: 'main4', name: 'Meteorite Margherita Pizza', price: 19.00, imageUrl: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'mains' },
  { id: 'dessert1', name: 'Dark Matter Chocolate Cake', price: 12.00, imageUrl: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'desserts' },
  { id: 'dessert2', name: 'Solar Flare Cheesecake', price: 11.50, imageUrl: 'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'desserts' },
  { id: 'drink1', name: 'Orion Old Fashioned', price: 15.00, imageUrl: 'https://images.pexels.com/photos/1200348/pexels-photo-1200348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'drinks' },
];

const MenuPage = () => {
  console.log('MenuPage loaded');

  // Dummy function for the FoodItemCard onAddToCart prop
  const handleAddToCart = (id: string | number) => {
    console.log(`Adding item ${id} to cart`);
    // In a real app, this would update cart state
  };

  const renderMenuItems = (category: string) => {
    const items = menuItems.filter(item => item.category === category);
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <FoodItemCard
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              onAddToCart={handleAddToCart}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Header />
      <ScrollArea className="flex-1">
        <main className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Our Menu
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Explore a universe of flavors, crafted with passion and the finest ingredients.
            </p>
          </motion.div>

          <Tabs defaultValue="mains" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8">
              <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
              <TabsTrigger value="mains">Mains</TabsTrigger>
              <TabsTrigger value="desserts">Desserts</TabsTrigger>
              <TabsTrigger value="drinks">Drinks</TabsTrigger>
            </TabsList>
            <TabsContent value="appetizers" className="mt-8">
              {renderMenuItems('appetizers')}
            </TabsContent>
            <TabsContent value="mains" className="mt-8">
              {renderMenuItems('mains')}
            </TabsContent>
            <TabsContent value="desserts" className="mt-8">
              {renderMenuItems('desserts')}
            </TabsContent>
            <TabsContent value="drinks" className="mt-8">
              {renderMenuItems('drinks')}
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default MenuPage;
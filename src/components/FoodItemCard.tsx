import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface FoodItemCardProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  // A real implementation would likely pass the item itself or its ID
  onAddToCart: (id: string | number) => void;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ id, name, price, imageUrl, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log('FoodItemCard loaded for:', name);

  const handleAddToCartClick = () => {
    onAddToCart(id);
    toast.success(`${name} added to cart!`, {
      description: "You can view your order by clicking the cart icon in the header.",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo add to cart for item:", id), // Placeholder for undo logic
      },
    });
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full max-w-sm overflow-hidden rounded-lg border-neutral-800 bg-neutral-900 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
    >
      <div className="relative h-64 w-full">
        <img
          src={imageUrl || 'https://via.placeholder.com/400x400.png/000000/FFFFFF?text=Ecliptic+Eats'}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4">
        <CardContent className="p-0">
          <h3 className="text-xl font-bold text-white drop-shadow-md">{name}</h3>
          <p className="text-lg font-semibold text-purple-400 drop-shadow-md">${price.toFixed(2)}</p>
        </CardContent>

        <CardFooter className="mt-4 p-0">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full"
              >
                <Button onClick={handleAddToCartClick} className="w-full bg-purple-600 text-white hover:bg-purple-700">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </div>
    </Card>
  );
};

export default FoodItemCard;
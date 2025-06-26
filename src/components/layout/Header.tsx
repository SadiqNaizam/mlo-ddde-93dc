import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Eclipse, ShoppingCart, User, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  // Placeholder cart data
  const cartItems = [
    { id: 1, name: 'Stellar Steak Frites', price: 29.99, quantity: 1, image: '/placeholder-food-1.jpg' },
    { id: 2, name: 'Cosmic Carbonara', price: 22.50, quantity: 1, image: '/placeholder-food-2.jpg' },
  ];
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Eclipse className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Ecliptic Eats</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/menu" className={navLinkClasses}>
              Menu
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItems.length}
                </span>
                <span className="sr-only">Open Cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                <SheetTitle>Your Order</SheetTitle>
              </SheetHeader>
              <Separator />
              {cartItems.length > 0 ? (
                <div className="flex-1 overflow-y-auto -mx-6 px-6">
                  <div className="flex flex-col gap-4 py-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-md flex-shrink-0">
                           {/* In a real app, you'd use an <img /> tag here */}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground">Your cart is empty.</p>
                  <Button asChild>
                    <Link to="/menu">Start an Order</Link>
                  </Button>
                </div>
              )}
              <Separator />
              <SheetFooter className="mt-auto">
                <div className="w-full space-y-4">
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <Button asChild size="lg" className="w-full">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <Button variant="outline" size="icon" asChild>
            <Link to="/user-profile">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
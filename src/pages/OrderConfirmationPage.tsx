import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

const OrderConfirmationPage = () => {
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    console.log('OrderConfirmationPage loaded');
    // Generate a pseudo-random order number for display
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(`EE-${randomNumber}`);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-12">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-lg"
        >
          <Card className="w-full shadow-2xl shadow-primary/10">
            <CardHeader className="text-center items-center gap-4 pt-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
              >
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </motion.div>
              <CardTitle className="text-3xl font-bold">Order Confirmed!</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Thank you for your purchase. Your cosmic culinary journey is about to begin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8 py-6">
              <Separator />
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order Number:</span>
                  <span className="font-mono font-semibold text-primary">{orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Estimated Delivery:</span>
                  <span className="font-semibold">35-45 minutes</span>
                </div>
              </div>
              <p className="text-sm text-center text-muted-foreground pt-2">
                You will receive an email confirmation shortly with your order details.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 p-6 bg-muted/50">
              <Button size="lg" className="w-full sm:w-auto flex-1" disabled>Track Order (Coming Soon)</Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto flex-1">
                <Link to="/menu">Back to Menu</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
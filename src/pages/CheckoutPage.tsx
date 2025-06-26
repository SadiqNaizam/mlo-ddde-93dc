import React from 'react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import MultiStepCheckoutForm from '@/components/MultiStepCheckoutForm';

const CheckoutPage: React.FC = () => {
  console.log('CheckoutPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full">
        <div className="container max-w-7xl mx-auto flex flex-col items-center justify-center py-12 md:py-20 px-4">
          <div className="w-full text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Finalize Your Order</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Just a few more steps to a delicious meal.
            </p>
          </div>
          <MultiStepCheckoutForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
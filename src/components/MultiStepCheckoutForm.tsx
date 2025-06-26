import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronRight, CreditCard, Home, PartyPopper } from 'lucide-react';
import { toast } from 'sonner';

// Define Zod schemas for validation
const deliverySchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  zipCode: z.string().regex(/^\d{5}$/, { message: 'Please enter a valid 5-digit zip code.' }),
});

const paymentSchema = z.object({
  cardNumber: z.string().regex(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/, {
    message: 'Please enter a valid credit card number.',
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Invalid format. Use MM/YY.' }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: 'Invalid CVC.' }),
});

const checkoutSchema = deliverySchema.merge(paymentSchema);
type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const steps = [
  { id: 1, name: 'Delivery', fields: ['name', 'address', 'city', 'zipCode'] as const, icon: <Home className="h-4 w-4" /> },
  { id: 2, name: 'Payment', fields: ['cardNumber', 'expiryDate', 'cvc'] as const, icon: <CreditCard className="h-4 w-4" /> },
  { id: 3, name: 'Confirm', icon: <PartyPopper className="h-4 w-4" /> },
];

const MultiStepCheckoutForm: React.FC = () => {
  console.log('MultiStepCheckoutForm loaded');
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const navigate = useNavigate();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  });

  const { trigger, getValues } = form;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep(step => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep(step => step - 1);
    }
  };
  
  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Form submitted:', data);
    toast.success('Order placed successfully!');
    navigate('/order-confirmation');
  };
  
  const delta = currentStep - previousStep;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-900/50 border-gray-700 text-white backdrop-blur-sm">
      <CardHeader>
        <nav aria-label="Progress">
          <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map((step, index) => (
              <li key={step.name} className="md:flex-1">
                <div
                  className={`group flex flex-col border-l-4 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0 ${
                    currentStep > index ? 'border-indigo-500' : 
                    currentStep === index ? 'border-indigo-500' : 'border-gray-600 group-hover:border-gray-500'
                  }`}
                >
                  <span className={`text-sm font-medium transition-colors ${currentStep > index || currentStep === index ? 'text-indigo-400' : 'text-gray-400 group-hover:text-gray-300'}`}>
                    Step {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: delta >= 0 ? '50%' : '-50%' }}
                animate={{ opacity: 1, x: '0%' }}
                exit={{ opacity: 0, x: delta >= 0 ? '-50%' : '50%' }}
                transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <FormField name="name" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel><FormControl><Input {...field} placeholder="John Doe" /></FormControl><FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="address" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel><FormControl><Input {...field} placeholder="123 Galactic Way" /></FormControl><FormMessage />
                      </FormItem>
                    )} />
                    <div className="flex gap-4">
                      <FormField name="city" control={form.control} render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>City</FormLabel><FormControl><Input {...field} placeholder="Nebula City" /></FormControl><FormMessage />
                        </FormItem>
                      )} />
                      <FormField name="zipCode" control={form.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel><FormControl><Input {...field} placeholder="98765" /></FormControl><FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <FormField name="cardNumber" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel><FormControl><Input {...field} placeholder="**** **** **** ****" /></FormControl><FormMessage />
                      </FormItem>
                    )} />
                    <div className="flex gap-4">
                      <FormField name="expiryDate" control={form.control} render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Expiry Date</FormLabel><FormControl><Input {...field} placeholder="MM/YY" /></FormControl><FormMessage />
                        </FormItem>
                      )} />
                      <FormField name="cvc" control={form.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC</FormLabel><FormControl><Input {...field} placeholder="123" /></FormControl><FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Confirm Your Order</h3>
                    <div className="space-y-4 rounded-md border border-gray-700 p-4 bg-gray-800/50">
                        <div><Label className="text-gray-400">Name</Label><p>{getValues('name')}</p></div>
                        <Separator className="bg-gray-600" />
                        <div><Label className="text-gray-400">Address</Label><p>{`${getValues('address')}, ${getValues('city')}, ${getValues('zipCode')}`}</p></div>
                        <Separator className="bg-gray-600" />
                        <div><Label className="text-gray-400">Payment Method</Label><p>Card ending in ••••{getValues('cardNumber')?.slice(-4)}</p></div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" onClick={prev} variant="ghost" disabled={currentStep === 0}>
          Go Back
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} className="bg-indigo-600 hover:bg-indigo-500">
            Confirm & Pay
          </Button>
        ) : (
          <Button type="button" onClick={next} className="bg-indigo-600 hover:bg-indigo-500">
            Next Step <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MultiStepCheckoutForm;
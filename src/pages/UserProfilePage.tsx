import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Edit, Trash2 } from 'lucide-react';

// Form Schema for personal details
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
});

// Placeholder data for order history
const orders = [
  { id: "ORD001", date: "2023-10-26", total: "$42.50", status: "Delivered" },
  { id: "ORD002", date: "2023-10-28", total: "$29.99", status: "Delivered" },
  { id: "ORD003", date: "2023-11-05", total: "$75.00", status: "Processing" },
  { id: "ORD004", date: "2023-11-01", total: "$15.20", status: "Cancelled" },
];

const savedAddresses = [
    { id: 1, type: 'Home', address: '123 Cosmic Lane, Galaxy City, 12345' },
    { id: 2, type: 'Work', address: '456 Starship Ave, Nebula Town, 67890' },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
  });

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log("Form Submitted:", values);
    // Here you would typically call an API to update user details
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto py-8 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">My Account</h1>
          <Tabs defaultValue="order-history" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
              <TabsTrigger value="order-history">Order History</TabsTrigger>
              <TabsTrigger value="account-details">Account Details</TabsTrigger>
            </TabsList>
            
            {/* Order History Tab */}
            <TabsContent value="order-history">
              <Card>
                <CardHeader>
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription>A list of your past and current orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge variant={
                                order.status === 'Delivered' ? 'default' :
                                order.status === 'Processing' ? 'secondary' :
                                'destructive'
                            }>{order.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{order.total}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Account Details Tab */}
            <TabsContent value="account-details">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Personal Information Form Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your name and email address.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your full name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="your@email.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Save Changes</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    {/* Saved Addresses Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Saved Addresses</CardTitle>
                            <CardDescription>Manage your shipping addresses.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {savedAddresses.map(addr => (
                                <div key={addr.id} className="border p-4 rounded-md flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">{addr.type}</p>
                                        <p className="text-muted-foreground text-sm">{addr.address}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full mt-4">Add New Address</Button>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
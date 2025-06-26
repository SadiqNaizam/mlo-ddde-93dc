import React from 'react';
import { Link } from 'react-router-dom';
import { Eclipse, Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Socials */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Eclipse className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Ecliptic Eats</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              A premium digital dining experience.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center">
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-4">Navigation</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
                <Link to="/menu" className="text-sm text-muted-foreground hover:text-primary transition-colors">Menu</Link>
                <Link to="/user-profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Account</Link>
              </nav>
            </div>
          </div>
          
          {/* Legal Links */}
           <div className="flex justify-center md:justify-end">
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-4">Legal & Support</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Ecliptic Eats. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
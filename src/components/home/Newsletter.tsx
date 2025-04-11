
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for subscribing",
        description: "You've been added to our newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <section className="py-24 bg-white">
      <div className="container-custom text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-serif font-light mb-6 tracking-wider uppercase">Newsletter</h2>
          <p className="text-gray-600 mb-8 font-light">
            Subscribe to receive updates on new collections and exclusive offers.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-black text-white hover:bg-gray-900 py-3 uppercase tracking-wider font-light"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

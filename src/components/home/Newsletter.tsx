
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
        title: "Thank you for subscribing!",
        description: "You've been added to our newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <section className="bg-gucci-cream py-16">
      <div className="container-custom text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="section-title mb-4">JOIN OUR NEWSLETTER</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-gucci-black"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gucci-black text-white hover:bg-gucci-darkGray py-3 px-6"
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

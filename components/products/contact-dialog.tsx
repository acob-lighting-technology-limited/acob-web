'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

interface TextOptionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const TextOptionsDialog: React.FC<TextOptionsDialogProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  const phones = ['+234 704 920 2634', '+234 803 290 2825'];
  const primaryPhone = phones[0].replace(/\s/g, '');
  const message = productName
    ? `Hello, I'm interested in ${productName}`
    : 'Hello, I would like to inquire about your products';

  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${primaryPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleSMS = () => {
    const smsUrl = `sms:${primaryPhone}?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Text Option</DialogTitle>
          <DialogDescription>
            How would you like to send your message?
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              onClick={handleWhatsApp}
              className="w-full h-auto py-4 flex items-center justify-start gap-4 bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden transition-all duration-500 flex items-center justify-center flex-shrink-0 bg-white/20 group-hover:scale-110">
                {/* Animated fill effect */}
                <div className="absolute inset-0 bg-white/30 transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 transition-colors duration-500" />
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-lg">WhatsApp</div>
                <div className="text-sm text-white/80">Chat on WhatsApp</div>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={handleSMS}
              className="w-full h-auto py-4 flex items-center justify-start gap-4"
              variant="outline"
              size="lg"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden transition-all duration-500 flex items-center justify-center flex-shrink-0 bg-primary/10 group-hover:scale-110">
                {/* Animated fill effect */}
                <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-lg">SMS</div>
                <div className="text-sm text-muted-foreground">
                  Send a text message
                </div>
              </div>
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function ContactDialog({
  isOpen,
  onClose,
  productName,
}: ContactDialogProps) {
  const [isTextOptionsOpen, setIsTextOptionsOpen] = useState(false);

  const emails = ['info@acoblighting.com', 'infoacob@gmail.com'];
  const phone = '+234 704 920 2634';

  const handleEmail = (email: string) => {
    const subject = productName
      ? `Inquiry about ${productName}`
      : 'Product Inquiry';
    const body = productName
      ? `Hello,\n\nI'm interested in learning more about ${productName}.\n\nThank you.`
      : 'Hello,\n\nI would like to inquire about your products.\n\nThank you.';

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onClose();
  };

  const handleCall = () => {
    window.location.href = `tel:${phone.replace(/\s/g, '')}`;
    onClose();
  };

  const handleText = () => {
    onClose();
    setIsTextOptionsOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>
              {productName
                ? `Get in touch with us about ${productName}`
                : 'Choose how you would like to contact us'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {emails.map((email, index) => (
              <motion.div
                key={email}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => handleEmail(email)}
                  className="w-full h-auto py-4 flex items-center justify-start gap-4 group hover:shadow-md transition-all"
                  variant="outline"
                  size="lg"
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden transition-all duration-500 flex items-center justify-center flex-shrink-0 bg-primary/10 group-hover:scale-110">
                    {/* Animated fill effect */}
                    <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-500" />
                    </div>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-lg">
                      Email {index === 0 ? '' : '(Alternative)'}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {email}
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={handleCall}
                className="w-full h-auto py-4 flex items-center justify-start gap-4 group hover:shadow-md transition-all"
                variant="outline"
                size="lg"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden transition-all duration-500 flex items-center justify-center flex-shrink-0 bg-primary/10 group-hover:scale-110">
                  {/* Animated fill effect */}
                  <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-lg">Call</div>
                  <div className="text-sm text-muted-foreground">{phone}</div>
                </div>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={handleText}
                className="w-full h-auto py-4 flex items-center justify-start gap-4 group hover:shadow-md transition-all"
                variant="outline"
                size="lg"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden transition-all duration-500 flex items-center justify-center flex-shrink-0 bg-green-500/10 group-hover:scale-110">
                  {/* Animated fill effect */}
                  <div className="absolute inset-0 bg-green-600 dark:bg-green-500 transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-lg">Text</div>
                  <div className="text-sm text-muted-foreground">
                    WhatsApp or SMS
                  </div>
                </div>
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>

      <TextOptionsDialog
        isOpen={isTextOptionsOpen}
        onClose={() => setIsTextOptionsOpen(false)}
        productName={productName}
      />
    </>
  );
}

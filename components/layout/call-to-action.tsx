import { Leaf, Phone, Settings } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CallToAction = () => {
  return (
    <div className="bg-primary p-8 rounded-lg text-primary-foreground text-center">
      {/* Icon */}
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <Settings
            className="w-16 h-16 text-primary-foreground"
            strokeWidth={1.5}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Leaf className="w-8 h-8 text-primary-foreground" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Text */}
      <p className="text-base mb-8 leading-relaxed">
        As a world wide distributor of supplies we endeavor provide fast and
        knowledgeable service, we can get all the materials.
      </p>

      {/* Button */}
      <Link
        href="/contact/get-quote"
        className="inline-block border-2 border-primary-foreground text-primary-foreground px-6 py-2 rounded-lg font-semibold text-base hover:bg-primary-foreground hover:text-primary  mb-8"
      >
        Schedule An Appointment
      </Link>

      {/* Phone Numbers */}
      <div className="flex items-center justify-center space-x-2 text-lg font-semibold">
        <Phone className="w-6 h-6" />
        <div>
          <div>0704 920 2634,</div>
          <div>0803 290 2825</div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;

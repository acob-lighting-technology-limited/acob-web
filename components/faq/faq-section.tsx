'use client';

import { useState } from 'react';
import { faqData, faqCategories } from '@/lib/data/faq-data';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label="Search FAQs"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('All')}
            size="sm"
          >
            All
          </Button>
          {faqCategories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredFAQs.length} question
        {filteredFAQs.length !== 1 && 's'}
        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
      </div>

      {/* FAQ Accordion */}
      {filteredFAQs.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {filteredFAQs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-6 bg-card"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-start gap-3 text-left">
                  <span className="text-primary font-semibold text-sm mt-1">
                    Q.
                  </span>
                  <span className="font-medium">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-8 pr-4 pb-4 text-muted-foreground leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-semibold text-sm">A.</span>
                  <p>{faq.answer}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            No FAQs found matching your search.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/20 text-center">
        <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
        <p className="text-muted-foreground mb-6">
          Our solar energy experts are here to help you make the right decision
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href="/contact/quote">Request a Quote</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/contact/support">Contact Support</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

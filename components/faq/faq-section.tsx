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
    <div>
      {/* Search and filter */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="h-11 border-2 bg-background pl-10 transition-all duration-300 focus:border-primary"
            aria-label="Search FAQs"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
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

      {/* Result count */}
      <div className="mt-6 text-sm text-muted-foreground">
        Showing {filteredFAQs.length} question
        {filteredFAQs.length !== 1 && 's'}
        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
      </div>

      {/* FAQ accordion */}
      {filteredFAQs.length > 0 ? (
        <Accordion
          type="single"
          collapsible
          className="mt-4 w-full border-t border-border"
        >
          {filteredFAQs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-border"
            >
              <AccordionTrigger className="py-5 text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-sm font-extrabold text-primary">
                    Q.
                  </span>
                  <span className="text-base font-bold text-foreground md:text-lg">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="max-w-[68ch] pb-5 pl-7 leading-relaxed text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="text-sm font-extrabold text-primary">
                    A.
                  </span>
                  <p>{faq.answer}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-border py-12 text-center">
          <p className="mb-4 text-lg text-muted-foreground">
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
      <div className="mt-16 bg-primary px-6 py-10 text-center text-primary-foreground md:px-12 md:py-14">
        <h3 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
          Still have questions?
        </h3>
        <p className="mx-auto mt-3 max-w-[52ch] text-primary-foreground/90">
          Our solar energy experts are here to help you make the right decision.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant="secondary">
            <a href="/contact/quote">Request a Quote</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <a href="/contact/support">Contact Support</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wrench } from 'lucide-react';
import Link from 'next/link';

interface MaintenancePageProps {
  routeName: string;
  description?: string;
}

export function MaintenancePage({ 
  routeName, 
  description = "We're currently working on improving this page. Please check back soon!" 
}: MaintenancePageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <Card className="max-w-md mx-auto text-center">
        <CardContent className="p-8">
          <div className="mb-6">
            <Wrench className="h-16 w-16 mx-auto text-primary mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {routeName} Under Maintenance
            </h1>
            <p className="text-muted-foreground">
              {description}
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We're working hard to bring you an improved experience.
            </p>
            
            <div className="pt-4">
              <Link href="/">
                <Button className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

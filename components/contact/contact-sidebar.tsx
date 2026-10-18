import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants/app.constants';
import { contactLinks } from '@/lib/data/contact-data';

/** A labelled row inside a sidebar block: small uppercase label + value(s). */
function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-3.5">
      <div className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

interface QuickContactProps {
  /** Which email address to lead with (secondary email is always shown too). */
  emailAudience?: 'careers' | 'support' | 'general';
  /** Show both phone numbers, or just the primary one. */
  phones?: 'primary' | 'both';
  showAddress?: boolean;
  showHours?: boolean;
}

/** "Quick Contact" sidebar block — phone/email, optionally address/hours. */
export function QuickContact({
  emailAudience = 'general',
  phones = 'both',
  showAddress = false,
  showHours = false,
}: QuickContactProps) {
  const primaryEmail =
    emailAudience === 'careers'
      ? CONTACT_INFO.email.careers
      : emailAudience === 'support'
        ? CONTACT_INFO.email.support
        : CONTACT_INFO.email.general;

  return (
    <section>
      <div className="border-t border-border pt-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground">
          Quick Contact
        </h2>
      </div>

      <div className="mt-2 divide-y divide-border border-b border-border">
        <InfoRow label="Phone">
          <div className="flex flex-col gap-0.5">
            <a
              href={`tel:${CONTACT_INFO.phone.primary.replace(/\s/g, '')}`}
              className="block text-sm font-semibold tabular-nums text-foreground transition-colors hover:text-primary"
            >
              {CONTACT_INFO.phone.primary}
            </a>
            {phones === 'both' && (
              <a
                href={`tel:${CONTACT_INFO.phone.secondary.replace(/\s/g, '')}`}
                className="block text-sm font-semibold tabular-nums text-foreground transition-colors hover:text-primary"
              >
                {CONTACT_INFO.phone.secondary}
              </a>
            )}
          </div>
        </InfoRow>

        <InfoRow label="Email">
          <div className="flex flex-col gap-0.5">
            <a
              href={`mailto:${primaryEmail}`}
              className="block break-all text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              {primaryEmail}
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email.secondary}`}
              className="block break-all text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              {CONTACT_INFO.email.secondary}
            </a>
          </div>
        </InfoRow>

        {showAddress && (
          <InfoRow label="Address">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {CONTACT_INFO.address.full}
            </p>
          </InfoRow>
        )}

        {showHours && (
          <InfoRow label="Business Hours">
            <p className="text-sm font-medium text-foreground">
              {CONTACT_INFO.workHours.weekdays}
            </p>
          </InfoRow>
        )}
      </div>
    </section>
  );
}

interface MoreContactOptionsProps {
  /** Omit the link pointing back at the current page. */
  excludeHref?: string;
}

/** "More Contact Options" sidebar block — links to the other contact pages. */
export function MoreContactOptions({ excludeHref }: MoreContactOptionsProps) {
  const links = contactLinks.filter(link => link.href !== excludeHref);

  return (
    <section>
      <div className="border-t border-border pt-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground">
          More Contact Options
        </h2>
      </div>

      <div className="mt-2 border-b border-border">
        {links.map(({ href, label }, i) => (
          <Link
            key={href}
            href={href}
            className="group -mx-2 flex items-center gap-3 border-t border-border px-2 py-3.5 transition-colors first:border-t-0 hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="text-xs font-bold tabular-nums text-primary">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
              {label}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}

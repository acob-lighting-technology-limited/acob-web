#!/bin/bash

# PageHero Migration Script
# Converts old PageHero props (title/eyebrow) to new props (description/title)
# Title is now auto-generated from route, description is the short 1-line text

echo "🔄 Starting PageHero migration..."

# About Pages
echo "📝 Updating about pages..."

# app/about/certifications/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+\/\/ eyebrow="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Certified Excellence in Renewable Energy"\n        backgroundImage="$1"\n      \/>/g' app/about/certifications/page.tsx

# app/about/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Trusted Solar Infrastructure Across Nigeria"\n        backgroundImage="$1"\n      \/>/g' app/about/page.tsx

# Contact Pages
echo "📞 Updating contact pages..."

# app/contact/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Get in Touch with Our Team"\n        backgroundImage="$1"\n      \/>/g' app/contact/page.tsx

# app/contact/quote/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Request Your Custom Solar Solution"\n        backgroundImage="$1"\n      \/>/g' app/contact/quote/page.tsx

# app/contact/careers/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Join Our Mission to Power Nigeria"\n        backgroundImage="$1"\n      \/>/g' app/contact/careers/page.tsx

# app/contact/support/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="We'"'"'re Here to Help You"\n        backgroundImage="$1"\n      \/>/g' app/contact/support/page.tsx

# app/contact/locations/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Find Us Across Nigeria"\n        backgroundImage="$1"\n      \/>/g' app/contact/locations/page.tsx

# Projects Pages
echo "🏗️  Updating projects pages..."

# app/projects/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s*>/<PageHero\n        description="Transforming Communities with Solar Power"\n        backgroundImage="$1"\n      >/g' app/projects/page.tsx

# Services Pages
echo "⚡ Updating services pages..."

# app/services/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Comprehensive Solar Energy Solutions"\n        backgroundImage="$1"\n      \/>/g' app/services/page.tsx

# Updates Pages
echo "📰 Updating updates pages..."

# app/updates/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Latest News and Insights"\n        backgroundImage="$1"\n      \/>/g' app/updates/page.tsx

# app/updates/latest/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Stay Updated with Our Recent Work"\n        backgroundImage="$1"\n      \/>/g' app/updates/latest/page.tsx

# app/updates/press/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Official Press Releases and Announcements"\n        backgroundImage="$1"\n      \/>/g' app/updates/press/page.tsx

# app/updates/case-studies/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Real Impact Stories from the Field"\n        backgroundImage="$1"\n      \/>/g' app/updates/case-studies/page.tsx

# app/updates/gallery/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Explore Our Project Portfolio"\n        backgroundImage="$1"\n      \/>/g' app/updates/gallery/page.tsx

# Legal Pages
echo "⚖️  Updating legal pages..."

# app/privacy-policy/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="How We Protect Your Information"\n        backgroundImage="$1"\n      \/>/g' app/privacy-policy/page.tsx

# app/terms-of-service/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title="[^"]*"\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description="Terms and Conditions of Use"\n        backgroundImage="$1"\n      \/>/g' app/terms-of-service/page.tsx

# Dynamic Pages - Projects
echo "🔧 Updating dynamic project pages..."

# app/projects/[slug]/page.tsx - Keep title prop since it's dynamic
perl -i -0777 -pe 's/<PageHero\s+title=\{project\.title\}\s+backgroundImage=\{([^}]*)\}\s+\/>/<PageHero\n        title={project.title}\n        description={project.title}\n        backgroundImage={$1}\n      \/>/g' app/projects/[slug]/page.tsx

# app/projects/category/[category]/page.tsx
perl -i -0777 -pe 's/<PageHero title=\{info\.title\} backgroundImage=\{info\.image\}>/<PageHero description={info.title} backgroundImage={info.image}>/g' app/projects/category/[category]/page.tsx

# Dynamic Pages - Services
echo "⚡ Updating dynamic service pages..."

# app/services/[slug]/page.tsx
perl -i -0777 -pe 's/<PageHero title=\{service\.title\} backgroundImage=\{service\.image\} \/>/<PageHero description={service.title} backgroundImage={service.image} \/>/g' app/services/[slug]/page.tsx

# Dynamic Pages - Careers
echo "💼 Updating career pages..."

# app/contact/careers/[slug]/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title=\{job\.title\}\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        title="Careers"\n        description={job.title}\n        backgroundImage="$1"\n      \/>/g' app/contact/careers/[slug]/page.tsx

# app/contact/careers/[slug]/apply/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title=\{`Apply for \$\{job\.title\}`\}\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        title="Apply Now"\n        description={job.title}\n        backgroundImage="$1"\n      \/>/g' app/contact/careers/[slug]/apply/page.tsx

# Dynamic Pages - Updates
echo "📝 Updating dynamic update pages..."

# app/updates/category/[slug]/page.tsx
perl -i -0777 -pe 's/<PageHero\s+title=\{`\$\{slug\.replace\(\/\-\/g, '" '"' \)\} Updates`\}\s+backgroundImage="([^"]*)"\s+\/>/<PageHero\n        description={`${slug.replace(/-\/g, '"'"' '"'"')} Updates`}\n        backgroundImage="$1"\n      \/>/g' app/updates/category/[slug]/page.tsx

# Loading Pages - Simple updates
echo "⏳ Updating loading pages..."
find app -name "loading.tsx" -type f -exec perl -i -pe 's/title="Loading\.\.\."/description="Loading..."/' {} \;

echo "✅ PageHero migration complete!"
echo ""
echo "📊 Summary:"
echo "  - Updated prop names: eyebrow → title, title → description"
echo "  - Title now auto-generated from route (with bg-primary badge)"
echo "  - Description is short 1-line text with line-clamp-1"
echo ""
echo "🔍 Please review the changes before committing!"

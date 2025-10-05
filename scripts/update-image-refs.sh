#!/bin/bash

echo "🔄 Updating image references to WebP..."
echo ""

# Read the conversion log and update references
while IFS='|' read -r old_path new_path; do
    # Extract just the filename parts for replacement
    old_file=$(basename "$old_path")
    new_file=$(basename "$new_path")
    
    # Get the path without public/ prefix for imports
    old_import_path="${old_path#public/}"
    new_import_path="${new_path#public/}"
    
    echo "📝 Replacing: $old_file → $new_file"
    
    # Update all TypeScript/JavaScript files
    find app components lib -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" \) -exec sed -i '' "s|$old_import_path|$new_import_path|g" {} +
    find app components lib -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" \) -exec sed -i '' "s|/$old_import_path|/$new_import_path|g" {} +
    
done < image-conversions.txt

echo ""
echo "✅ All image references updated to WebP!"
echo ""
echo "🔍 Verifying remaining old references..."
echo ""

# Check for any remaining old image references
REMAINING=$(grep -r "\.jpg\|\.jpeg\|\.png" --include="*.tsx" --include="*.ts" --include="*.js" app/ components/ lib/ 2>/dev/null | grep -E "images/" | grep -v "webp" | grep -v "node_modules" | grep -v "placeholder" | grep -v "svg" | wc -l | tr -d ' ')

if [ "$REMAINING" -gt "0" ]; then
    echo "⚠️  Found $REMAINING remaining references to old image formats:"
    grep -r "\.jpg\|\.jpeg\|\.png" --include="*.tsx" --include="*.ts" --include="*.js" app/ components/ lib/ 2>/dev/null | grep -E "images/" | grep -v "webp" | grep -v "node_modules" | grep -v "placeholder" | grep -v "svg" | head -10
else
    echo "✅ No remaining old image format references found!"
fi

echo ""
echo "✨ Update complete!"

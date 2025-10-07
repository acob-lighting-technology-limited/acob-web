#!/bin/bash

# Convert all JPG, JPEG, and PNG images to WebP format
# This script will:
# 1. Convert images to WebP
# 2. Create a mapping file for reference updates
# 3. Delete original files after successful conversion

echo "🔄 Starting image conversion to WebP..."
echo ""

# Create a temporary file to store conversions
CONVERSION_LOG="image-conversions.txt"
> "$CONVERSION_LOG"

# Counter
TOTAL=0
SUCCESS=0
FAILED=0

# Find all images and convert them
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read -r img; do
    TOTAL=$((TOTAL + 1))
    
    # Get directory and filename without extension
    DIR=$(dirname "$img")
    FILENAME=$(basename "$img")
    NAME="${FILENAME%.*}"
    EXT="${FILENAME##*.}"
    
    # Output WebP filename
    WEBP_FILE="$DIR/$NAME.webp"
    
    # Skip if WebP already exists
    if [ -f "$WEBP_FILE" ]; then
        echo "⏭️  Skipping $img (WebP already exists)"
        continue
    fi
    
    echo "🔄 Converting: $img"
    
    # Convert to WebP with quality 85
    if cwebp -q 85 "$img" -o "$WEBP_FILE" > /dev/null 2>&1; then
        echo "✅ Created: $WEBP_FILE"
        
        # Log the conversion for reference updates
        echo "$img|$WEBP_FILE" >> "$CONVERSION_LOG"
        
        # Delete original file
        rm "$img"
        echo "🗑️  Deleted: $img"
        echo ""
        
        SUCCESS=$((SUCCESS + 1))
    else
        echo "❌ Failed to convert: $img"
        echo ""
        FAILED=$((FAILED + 1))
    fi
done

echo ""
echo "✨ Conversion complete!"
echo "📊 Total processed: $TOTAL"
echo "✅ Successful: $SUCCESS"
echo "❌ Failed: $FAILED"
echo ""
echo "📝 Conversion log saved to: $CONVERSION_LOG"

import os
import shutil
import random
from pathlib import Path

# Configuration
SOURCE_DIR = r"C:\Users\HomePC\Downloads\Cassava_Dataset"  # Update this path
DEST_DIR = r"C:\Users\HomePC\Desktop\cassava-disease-detection\dataset"

# Split ratios
TRAIN_RATIO = 0.7
VAL_RATIO = 0.2
TEST_RATIO = 0.1

# Disease mapping
DISEASE_MAPPING = {
    'Healthy': 'healthy',
    'CMV': 'cmd',      # Cassava Mosaic Virus = CMD
    'CBB': 'cbb'       # Cassava Bacterial Blight
}

def organize_dataset():
    print("=" * 60)
    print("📁 ORGANIZING CASSAVA DATASET")
    print("=" * 60)
    
    for source_folder, dest_folder in DISEASE_MAPPING.items():
        source_path = os.path.join(SOURCE_DIR, source_folder)
        
        if not os.path.exists(source_path):
            print(f"⚠️  Warning: {source_folder} folder not found!")
            continue
        
        # Get all images
        images = [f for f in os.listdir(source_path) 
                 if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        
        # Shuffle for random distribution
        random.shuffle(images)
        
        total_images = len(images)
        train_count = int(total_images * TRAIN_RATIO)
        val_count = int(total_images * VAL_RATIO)
        
        # Split images
        train_images = images[:train_count]
        val_images = images[train_count:train_count + val_count]
        test_images = images[train_count + val_count:]
        
        print(f"\n📊 {source_folder}:")
        print(f"   Total: {total_images}")
        print(f"   Train: {len(train_images)}")
        print(f"   Validation: {len(val_images)}")
        print(f"   Test: {len(test_images)}")
        
        # Copy to train folder
        for img in train_images:
            src = os.path.join(source_path, img)
            dst = os.path.join(DEST_DIR, 'train', dest_folder, img)
            shutil.copy2(src, dst)
        
        # Copy to validation folder
        for img in val_images:
            src = os.path.join(source_path, img)
            dst = os.path.join(DEST_DIR, 'validation', dest_folder, img)
            shutil.copy2(src, dst)
        
        # Copy to test folder
        for img in test_images:
            src = os.path.join(source_path, img)
            dst = os.path.join(DEST_DIR, 'test', dest_folder, img)
            shutil.copy2(src, dst)
    
    print("\n" + "=" * 60)
    print("✅ DATASET ORGANIZED SUCCESSFULLY!")
    print("=" * 60)
    print("\nNext step: Run python train_model.py")

if __name__ == "__main__":
    # Verify source directory exists
    if not os.path.exists(SOURCE_DIR):
        print(f"❌ Error: Source directory not found: {SOURCE_DIR}")
        print("Please update SOURCE_DIR in the script with your actual path")
        exit(1)
    
    # Set random seed for reproducibility
    random.seed(42)
    
    organize_dataset()
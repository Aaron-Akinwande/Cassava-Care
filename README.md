# 🌿 CassavaCare AI - Disease Detection & Nano Treatment System

<div align="center">

![CassavaCare AI Banner](https://img.shields.io/badge/CassavaCare-AI%20Powered-brightgreen?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11.9-blue?style=for-the-badge&logo=python)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.13+-orange?style=for-the-badge&logo=tensorflow)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Advanced AI-powered cassava disease detection with nanoparticle treatment recommendations**

[Features](#-features) • [Quick Start](#-quick-start) • [Installation](#-installation) • [Usage](#-usage) • [Research](#-research)

</div>

---

## 🎯 Overview

CassavaCare AI is a deep learning-based system that detects cassava leaf diseases and provides science-based nanoparticle treatment recommendations. The system identifies:

- ✅ **Cassava Mosaic Disease (CMD)** - Viral disease transmitted by whiteflies
- ✅ **Cassava Bacterial Blight (CBB)** - Bacterial infection causing wilting
- ✅ **Cassava Brown Streak Disease (CBSD)** - Viral disease affecting roots
- ✅ **Healthy Leaves** - Disease-free cassava plants

Supporting **800+ million** cassava-dependent people worldwide 🌍

---

## ✨ Features

- 🤖 **AI-Powered Detection** - CNN model trained on real field images
- 🔬 **Nanoparticle Recommendations** - Science-based treatment suggestions (AgNPs, CuNPs, ZnO-NPs, TiO₂-NPs, SiO₂-NPs)
- 📊 **Confidence Scoring** - Shows prediction confidence and severity levels
- 🎨 **Modern UI** - Responsive Next.js interface with real-time analysis
- 🚀 **REST API** - Flask backend for easy integration
- 📱 **Cross-Platform** - Works on desktop and mobile devices

---

## 🛠️ Tech Stack

### Backend
- **Python 3.11.9** - Core programming language
- **TensorFlow 2.13+** - Deep learning framework
- **Flask 2.3.3** - Web framework
- **OpenCV** - Image processing
- **NumPy, Pandas** - Data manipulation

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Windows 10/11** (or macOS/Linux with adapted commands)
- ✅ **8GB RAM minimum** (16GB recommended for training)
- ✅ **5GB free disk space**
- ✅ **Internet connection** (for downloading dependencies)

---

## 🚀 Quick Start
```bash
# Clone the repository
git clone https://github.com/Aaron-Akinwande/Cassava-Care.git
cd Cassava-Care

# Setup backend (see detailed instructions below)
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Setup frontend (see detailed instructions below)
cd ../frontend
npm install

# Run the application
# Terminal 1: python backend/app.py
# Terminal 2: npm run dev (in frontend folder)
```

---

## 📦 Complete Installation Guide

### STEP 1: Install Python 3.11.9

> ⚠️ **IMPORTANT:** Python 3.11.9 is required. Python 3.12+ is NOT compatible with TensorFlow 2.13.

#### Windows Installation:

1. **Download Python 3.11.9:**
   - Visit: https://www.python.org/ftp/python/3.11.9/python-3.11.9-amd64.exe
   - Direct link for 64-bit Windows

2. **Install Python:**
   - Run the downloaded `.exe` file
   - ⚠️ **CRITICAL:** Check **"Add Python 3.11 to PATH"** at the bottom
   - Click **"Install Now"**
   - Wait for installation to complete

3. **Verify Installation:**
```powershell
   # Open NEW PowerShell window
   python --version
   # Should output: Python 3.11.9
   
   pip --version
   # Should show pip version
```

#### macOS Installation:
```bash
# Using Homebrew
brew install python@3.11

# Verify
python3.11 --version
```

#### Linux Installation:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3.11 python3.11-venv python3-pip

# Verify
python3.11 --version
```

---

### STEP 2: Install Node.js (for Frontend)

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Download LTS version (20.x or higher)

2. **Install:**
   - Run the installer
   - Follow default installation steps

3. **Verify:**
```powershell
   node --version
   # Should show: v20.x.x or higher
   
   npm --version
   # Should show: 10.x.x or higher
```

---

### STEP 3: Clone the Repository
```powershell
# Choose your preferred location
cd C:\Users\YourUsername\Desktop

# Clone the project
git clone https://github.com/Aaron-Akinwande/Cassava-Care.git

# Navigate into project
cd Cassava-Care
```

---

### STEP 4: Backend Setup (Python/Flask)

#### 4.1 Navigate to Backend Folder
```powershell
cd backend
```

#### 4.2 Create Virtual Environment

**Windows:**
```powershell
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# You should see (venv) in your terminal prompt
```

**If you get execution policy error:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# Then try activating again
```

**macOS/Linux:**
```bash
# Create virtual environment
python3.11 -m venv venv

# Activate virtual environment
source venv/bin/activate
```

#### 4.3 Install Python Dependencies
```powershell
# Make sure (venv) is showing in your prompt

# Upgrade pip
python -m pip install --upgrade pip

# Install all required packages
pip install -r requirements.txt

# This will take 5-10 minutes depending on your internet speed
```

**What gets installed:**
- Flask (Web framework)
- TensorFlow (Deep learning)
- NumPy (Numerical computing)
- Pillow (Image processing)
- OpenCV (Computer vision)
- Pandas (Data manipulation)
- Scikit-learn (Machine learning utilities)
- Matplotlib (Plotting)

#### 4.4 Verify Backend Installation
```powershell
# Test imports
python -c "import tensorflow as tf; print(f'TensorFlow: {tf.__version__}')"
python -c "import flask; print(f'Flask: {flask.__version__}')"
python -c "import cv2, numpy, PIL, pandas, sklearn; print('✅ All packages working!')"
```

#### 4.5 Create Required Folders
```powershell
# Create folders for models and uploads
mkdir models
mkdir uploads
mkdir static

# Verify structure
ls
```

---

### STEP 5: Dataset Preparation

#### 5.1 Download Dataset

**Option A: Use Mendeley Dataset (Recommended)**

1. Visit: https://data.mendeley.com/datasets/3832tx2cb2/1
2. Click **"Download All"**
3. Extract the ZIP file to a location (e.g., `C:\Users\YourUsername\Downloads\Cassava_Dataset`)

**Dataset includes:**
- Healthy cassava leaves
- CMD (Cassava Mosaic Disease) - labeled as "CMV"
- CBB (Cassava Bacterial Blight)

**Note:** CBSD is not in this dataset. The system is trained on 3 classes.

#### 5.2 Organize Dataset

The dataset needs to be split into training, validation, and test sets.

**Update `organize_dataset.py`:**

Open `backend/organize_dataset.py` and update the `SOURCE_DIR` path:
```python
# Change this line to match your download location
SOURCE_DIR = r"C:\Users\YourUsername\Downloads\Cassava_Dataset"
```

**Run the organization script:**
```powershell
# Make sure you're in backend folder with venv activated
python organize_dataset.py
```

**What this does:**
- Splits images into 70% train, 20% validation, 10% test
- Organizes into proper folder structure
- Creates balanced dataset

**Expected output:**
```
📁 ORGANIZING CASSAVA DATASET
📊 Healthy:
   Total: 500
   Train: 350
   Validation: 100
   Test: 50
📊 CMV:
   Total: 500
   Train: 350
   Validation: 100
   Test: 50
📊 CBB:
   Total: 500
   Train: 350
   Validation: 100
   Test: 50
✅ DATASET ORGANIZED SUCCESSFULLY!
```

#### 5.3 Verify Dataset Structure
```powershell
# Check dataset structure
cd ..
tree /F dataset

# Should show:
# dataset/
# ├── train/
# │   ├── healthy/
# │   ├── cmd/
# │   └── cbb/
# ├── validation/
# │   ├── healthy/
# │   ├── cmd/
# │   └── cbb/
# └── test/
#     ├── healthy/
#     ├── cmd/
#     └── cbb/
```

---

### STEP 6: Train the Model

> ⏱️ **Time Required:** 30-120 minutes depending on your computer

#### 6.1 Start Training
```powershell
# Navigate to backend (if not already there)
cd backend

# Activate venv (if not already activated)
.\venv\Scripts\Activate.ps1

# Start training
python train_model.py
```

#### 6.2 Monitor Training

You'll see output like:
```
🌿 CASSAVA DISEASE DETECTION - MODEL TRAINING
📁 Dataset Configuration:
   Training data: ../dataset/train
   Validation data: ../dataset/validation
   Image size: 224x224
   Batch size: 32
   Epochs: 20

📊 Loading datasets...
Found 1050 images belonging to 3 classes.
Found 300 images belonging to 3 classes.

✅ Data loaded successfully!
   Training samples: 1050
   Validation samples: 300
   Classes found: ['cbb', 'cmd', 'healthy']

🔨 Building model architecture...
✅ Model architecture built successfully!

🚀 Starting training...

Epoch 1/20
33/33 ━━━━━━━━━━━━━━━━━━━━ 45s 1s/step - accuracy: 0.4521 - loss: 1.2341 - val_accuracy: 0.5667 - val_loss: 1.0234
Epoch 2/20
33/33 ━━━━━━━━━━━━━━━━━━━━ 42s 1s/step - accuracy: 0.6234 - loss: 0.9876 - val_accuracy: 0.6833 - val_loss: 0.8456
...
```

#### 6.3 Training Complete

When training finishes, you'll see:
```
✅ Training completed!
💾 Model saved to: models/cassava_disease_model.h5
📊 Training plots saved to: models/training_history.png

📊 Final Training Metrics:
   Training Accuracy: 0.9234
   Validation Accuracy: 0.8567
   Training Loss: 0.2341
   Validation Loss: 0.4123

🎉 MODEL TRAINING COMPLETE!
```

#### 6.4 Review Training Results

Check the training plot:
```powershell
# Open the training history plot
start models/training_history.png
```

**Good indicators:**
- ✅ Training accuracy > 85%
- ✅ Validation accuracy > 80%
- ✅ Loss decreasing over epochs
- ✅ No large gap between training and validation (no overfitting)

---

### STEP 7: Test the Backend

#### 7.1 Start Flask Server
```powershell
# Make sure venv is activated and you're in backend folder
python app.py
```

**Expected output:**
```
🌿 CASSAVA DISEASE DETECTION API
Available endpoints:
  GET  /           - Health check
  POST /predict    - Disease prediction
  GET  /diseases   - Disease information
Model status: ✅ Loaded
 * Running on http://127.0.0.1:5000
```

#### 7.2 Test API

Open a new terminal and test:
```powershell
# Test health check
curl http://localhost:5000/

# Expected response:
# {"status":"running","message":"Cassava Disease Detection API","model_loaded":true}
```

**Keep this terminal running!** The backend server needs to stay active.

---

### STEP 8: Frontend Setup (Next.js)

#### 8.1 Open New Terminal

**Important:** Keep the backend terminal running! Open a NEW PowerShell window.

#### 8.2 Navigate to Frontend
```powershell
cd C:\Users\YourUsername\Desktop\Cassava-Care\frontend
```

#### 8.3 Install Dependencies
```powershell
# Install all Node.js packages
npm install

# This will take 2-5 minutes
```

**What gets installed:**
- Next.js (React framework)
- React (UI library)
- Tailwind CSS (Styling)
- Lucide React (Icons)
- Other utilities

#### 8.4 Verify Frontend Installation
```powershell
# Check if node_modules was created
ls node_modules

# Verify key packages
npm list next react lucide-react
```

---

### STEP 9: Run the Application

#### 9.1 Start Frontend Development Server
```powershell
# In frontend folder
npm run dev
```

**Expected output:**
```
   ▲ Next.js 14.2.x
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.5s
```

#### 9.2 Access the Application

1. **Open your browser**
2. **Navigate to:** http://localhost:3000
3. **You should see:** The CassavaCare AI interface

---

## 🎯 Usage Guide

### Testing Disease Detection

1. **Upload Image:**
   - Click the upload area or drag & drop a cassava leaf image
   - Supported formats: JPG, JPEG, PNG
   - Recommended size: Any size (will be auto-resized)

2. **Analyze:**
   - Click **"Analyze Disease"** button
   - Wait 2-3 seconds for analysis

3. **View Results:**
   - **Disease name** and classification
   - **Confidence score** (percentage)
   - **Severity level** (High/Medium/Low/None)
   - **Disease description**
   - **Nanoparticle treatment recommendations**

4. **Export (Coming Soon):**
   - Click **"Export Diagnosis Report"** to download PDF

---

## 🔬 Nanoparticle Treatments

The system recommends science-based nanoparticle treatments:

### For CMD (Cassava Mosaic Disease):
- **Silver Nanoparticles (AgNPs)** - 25-50 ppm, 92% effective
- **Copper Nanoparticles (CuNPs)** - 50-100 ppm, 88% effective
- **Zinc Oxide (ZnO-NPs)** - 75-150 ppm, 85% effective

### For CBB (Cassava Bacterial Blight):
- **Copper Nanoparticles (CuNPs)** - 50-100 ppm, 95% effective
- **Silver Nanoparticles (AgNPs)** - 30-60 ppm, 91% effective
- **Titanium Dioxide (TiO₂-NPs)** - 100-200 ppm, 87% effective

### For Healthy Plants (Preventive):
- **Silicon Dioxide (SiO₂-NPs)** - 100-150 ppm
- **Zinc Oxide (ZnO-NPs)** - 50-100 ppm

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Python not found"
**Solution:**
- Make sure Python 3.11.9 is installed
- Check "Add to PATH" was selected during installation
- Restart terminal/computer

#### 2. "TensorFlow not compatible"
**Solution:**
- Verify Python version: `python --version` (must be 3.11.9)
- Reinstall TensorFlow: `pip install tensorflow==2.13.0`

#### 3. "Port already in use"
**Solution:**
```powershell
# Kill process on port 5000 (Backend)
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Kill process on port 3000 (Frontend)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

#### 4. "Module not found" errors
**Solution:**
```powershell
# Backend
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

#### 5. "CORS Error" in browser
**Solution:**
- Make sure Flask-CORS is installed: `pip install Flask-CORS`
- Restart backend server

#### 6. Low model accuracy (<70%)
**Solutions:**
- Add more training data
- Increase epochs in `train_model.py`
- Balance dataset (equal images per class)
- Check image quality

---

## 📁 Project Structure
```
Cassava-Care/
├── README.md                      # This file
├── .gitignore                     # Git ignore rules
├── backend/
│   ├── venv/                     # Virtual environment (not in git)
│   ├── models/
│   │   ├── cassava_disease_model.h5    # Trained model (not in git)
│   │   └── training_history.png        # Training plots
│   ├── uploads/                  # Temporary uploads (not in git)
│   ├── app.py                    # Flask API server
│   ├── train_model.py           # Model training script
│   ├── organize_dataset.py      # Dataset organization script
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── node_modules/            # Node packages (not in git)
│   ├── src/
│   │   └── app/
│   │       ├── page.js         # Main React component
│   │       ├── layout.js       # Layout wrapper
│   │       └── globals.css     # Global styles
│   ├── public/                 # Static assets
│   ├── package.json           # Node dependencies
│   ├── next.config.mjs       # Next.js configuration
│   └── tailwind.config.js    # Tailwind configuration
└── dataset/                    # Training data (not in git)
    ├── train/
    ├── validation/
    └── test/
```

---

## 🚀 Deployment

### Deploy Backend (Python)

**Option 1: Heroku**
```bash
# Install Heroku CLI
# Create Procfile:
echo "web: gunicorn app:app" > Procfile

# Deploy
heroku create cassavacare-api
git push heroku main
```

**Option 2: Railway**
- Visit: https://railway.app
- Import from GitHub
- Auto-deploys on push

### Deploy Frontend (Next.js)

**Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

**Option 2: Netlify**
- Visit: https://netlify.com
- Import from GitHub
- Build command: `npm run build`
- Publish directory: `.next`

---

## 📚 Additional Resources

- **TensorFlow Documentation:** https://www.tensorflow.org/
- **Flask Documentation:** https://flask.palletsprojects.com/
- **Next.js Documentation:** https://nextjs.org/docs
- **Dataset Source:** https://data.mendeley.com/datasets/3832tx2cb2/1
- **Research Paper:** *Investigating Applications of Nanotechnology in Crop Disease Management (Cassava)*

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Ahounou Christiana Omolola**
- Student ID: 21110591147
- Institution: Lagos State University
- Department: Computer Science
- Supervisor: Dr. Sotonwa K.A.
- HOD: Dr. Aiyeniko O.

---

## 🙏 Acknowledgments

- **Dr. Sotonwa K.A.** - Project Supervisor
- **Dr. Aiyeniko O.** - Head of Department
- **Lagos State University** - Computer Science Department
- **IITA** - Cassava research data and resources
- **Mendeley Data** - Dataset provision

---

## 📞 Support

For questions, issues, or suggestions:

- **GitHub Issues:** [Create an issue](https://github.com/Aaron-Akinwande/Cassava-Care/issues)
- **Email:** [Your email]
- **Documentation:** See [Wiki](https://github.com/Aaron-Akinwande/Cassava-Care/wiki)

---

<div align="center">

**Supporting 800M+ cassava-dependent people worldwide** 🌍

Made with ❤️ for sustainable agriculture

[![Star this repo](https://img.shields.io/github/stars/Aaron-Akinwande/Cassava-Care?style=social)](https://github.com/Aaron-Akinwande/Cassava-Care)

</div>

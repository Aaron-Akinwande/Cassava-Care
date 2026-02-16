from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MODEL_PATH = 'models/cassava_disease_model.h5'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs('models', exist_ok=True)

# Disease classes
DISEASE_CLASSES = {
    0: 'Healthy',
    1: 'Cassava Mosaic Disease (CMD)',
    2: 'Cassava Bacterial Blight (CBB)'
}

# Load model
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print(f"✅ Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"⚠️  Model not found. Using mock predictions. Error: {e}")
    model = None

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image, target_size=(224, 224)):
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = image.resize(target_size)
    img_array = np.array(image)
    img_array = img_array.astype('float32') / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def get_severity_level(confidence, disease_name):
    if disease_name == 'Healthy':
        return 'None'
    elif confidence >= 0.8:
        return 'High'
    elif confidence >= 0.6:
        return 'Medium'
    else:
        return 'Low'

def get_disease_description(disease_name):
    descriptions = {
        'Healthy': 'The cassava leaf appears healthy with no visible signs of disease. Continue regular monitoring, use disease-free planting materials, and implement preventive care to maintain plant health and maximize yield potential.',
        
        'Cassava Mosaic Disease (CMD)': 'A viral disease caused by cassava mosaic geminiviruses (CMVs) transmitted by whiteflies (Bemisia tabaci). Symptoms include mosaic-like leaf patterns, leaf distortion, and severe stunting, leading to yield losses of up to 95% in heavily affected fields.',
        
        'Cassava Bacterial Blight (CBB)': 'A bacterial disease caused by Xanthomonas axonopodis pv. manihotis, resulting in wilting, necrotic leaf spots, vascular necrosis, and stem dieback. The bacteria spread through contaminated tools, infected cuttings, and water splashes in humid environments.',
        
        'Cassava Brown Streak Disease (CBSD)': 'A viral disease causing brown streaks on stems and roots, leading to root necrosis and reduced starch quality. The disease significantly impacts cassava\'s commercial value for starch, flour, and ethanol production.'
    }
    return descriptions.get(disease_name, 'Unknown disease detected.')

def get_nanoparticle_recommendations(disease_name):
    recommendations = {
        'Healthy': [
            {
                'name': 'Silicon Dioxide Nanoparticles (SiO₂-NPs)',
                'type': 'Oxide-based',
                'concentration': '100-150 ppm',
                'effectiveness': 'N/A (Preventive)',
                'application': 'Monthly preventive foliar spray to boost plant immunity and stress resistance'
            },
            {
                'name': 'Zinc Oxide Nanoparticles (ZnO-NPs)',
                'type': 'Oxide-based',
                'concentration': '50-100 ppm',
                'effectiveness': 'N/A (Growth enhancement)',
                'application': 'Quarterly soil amendment to improve nutrient uptake and vigor'
            }
        ],
        'Cassava Mosaic Disease (CMD)': [
            {
                'name': 'Silver Nanoparticles (AgNPs)',
                'type': 'Metal-based',
                'concentration': '25-50 ppm',
                'effectiveness': '92%',
                'application': 'Foliar spray every 7-10 days to inhibit viral replication and control whitefly vectors'
            },
            {
                'name': 'Copper Nanoparticles (CuNPs)',
                'type': 'Metal-based',
                'concentration': '50-100 ppm',
                'effectiveness': '88%',
                'application': 'Root zone application twice weekly for systemic viral suppression'
            },
            {
                'name': 'Zinc Oxide Nanoparticles (ZnO-NPs)',
                'type': 'Oxide-based',
                'concentration': '75-150 ppm',
                'effectiveness': '85%',
                'application': 'Foliar application combined with whitefly vector control measures'
            }
        ],
        'Cassava Bacterial Blight (CBB)': [
            {
                'name': 'Copper Nanoparticles (CuNPs)',
                'type': 'Metal-based',
                'concentration': '50-100 ppm',
                'effectiveness': '95%',
                'application': 'Targeted spray on infected areas every 5-7 days to disrupt bacterial cell walls'
            },
            {
                'name': 'Silver Nanoparticles (AgNPs)',
                'type': 'Metal-based',
                'concentration': '30-60 ppm',
                'effectiveness': '91%',
                'application': 'Foliar and stem application to suppress Xanthomonas axonopodis'
            },
            {
                'name': 'Titanium Dioxide Nanoparticles (TiO₂-NPs)',
                'type': 'Oxide-based',
                'concentration': '100-200 ppm',
                'effectiveness': '87%',
                'application': 'UV-activated photocatalytic treatment during sunny periods for enhanced bacterial control'
            }
        ],
        'Cassava Brown Streak Disease (CBSD)': [
            {
                'name': 'Silicon Dioxide Nanoparticles (SiO₂-NPs)',
                'type': 'Oxide-based',
                'concentration': '150-250 ppm',
                'effectiveness': '83%',
                'application': 'Strengthens plant cell walls, apply as preventive bi-weekly foliar spray'
            },
            {
                'name': 'Zinc Oxide Nanoparticles (ZnO-NPs)',
                'type': 'Oxide-based',
                'concentration': '75-150 ppm',
                'effectiveness': '80%',
                'application': 'Enhances plant immunity through combined soil amendment and foliar spray'
            },
            {
                'name': 'Chitosan-Silver Hybrid NPs',
                'type': 'Bio-metallic',
                'concentration': '40-80 ppm',
                'effectiveness': '89%',
                'application': 'Controlled release formulation for sustained viral suppression and root protection'
            }
        ]
    }
    return recommendations.get(disease_name, [])

def mock_prediction(image):
    import random
    class_idx = random.randint(0, 3)
    confidence = random.uniform(0.75, 0.98)
    return np.array([[confidence if i == class_idx else random.uniform(0.01, 0.2) for i in range(4)]])

@app.route('/')
def home():
    return jsonify({
        'status': 'running',
        'message': 'Cassava Disease Detection API',
        'model_loaded': model is not None,
        'version': '1.0.0'
    })

@app.route('/predict', methods=['POST'])
def predict_disease():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Use PNG, JPG, or JPEG'}), 400
        
        try:
            image = Image.open(io.BytesIO(file.read()))
            processed_image = preprocess_image(image)
        except Exception as e:
            return jsonify({'error': f'Error processing image: {str(e)}'}), 400
        
        try:
            if model is not None:
                predictions = model.predict(processed_image)
            else:
                predictions = mock_prediction(processed_image)
            
            predicted_class_idx = np.argmax(predictions[0])
            confidence = float(predictions[0][predicted_class_idx])
            disease_name = DISEASE_CLASSES[predicted_class_idx]
            
            severity = get_severity_level(confidence, disease_name)
            description = get_disease_description(disease_name)
            nanoparticles = get_nanoparticle_recommendations(disease_name)
            
            response = {
                'disease': disease_name,
                'confidence': round(confidence, 3),
                'severity': severity,
                'description': description,
                'nanoparticles': nanoparticles,
                'all_predictions': {
                    DISEASE_CLASSES[i]: round(float(predictions[0][i]), 3) 
                    for i in range(len(predictions[0]))
                }
            }
            
            return jsonify(response)
            
        except Exception as e:
            return jsonify({'error': f'Prediction error: {str(e)}'}), 500
            
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/diseases', methods=['GET'])
def get_disease_info():
    diseases_info = []
    for class_idx, disease_name in DISEASE_CLASSES.items():
        disease_info = {
            'id': class_idx,
            'name': disease_name,
            'description': get_disease_description(disease_name),
            'nanoparticle_treatments': get_nanoparticle_recommendations(disease_name)
        }
        diseases_info.append(disease_info)
    
    return jsonify({
        'diseases': diseases_info,
        'total_classes': len(DISEASE_CLASSES)
    })

if __name__ == '__main__':
    print("=" * 60)
    print("🌿 CASSAVA DISEASE DETECTION API")
    print("=" * 60)
    print("Available endpoints:")
    print("  GET  /           - Health check")
    print("  POST /predict    - Disease prediction")
    print("  GET  /diseases   - Disease information")
    print("=" * 60)
    print(f"Model status: {'✅ Loaded' if model is not None else '⚠️  Mock mode (train model first)'}")
    print("=" * 60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
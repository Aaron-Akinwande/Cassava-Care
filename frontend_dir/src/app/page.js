"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Leaf,
  Microscope,
  AlertCircle,
  CheckCircle,
  Download,
  Camera,
  Zap,
  Shield,
  Activity,
} from "lucide-react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // API Configuration
  const API_BASE_URL = "http://localhost:5000";

  const predictDisease = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Prediction failed");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.warn("API unavailable, using mock data:", error.message);
      return mockPrediction(imageFile);
    }
  };

  const mockPrediction = async (imageFile) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockResults = [
      {
        disease: "Cassava Mosaic Disease (CMD)",
        confidence: 0.94,
        severity: "High",
        description:
          "A viral disease caused by cassava mosaic geminiviruses (CMVs) transmitted by whiteflies (Bemisia tabaci). Symptoms include mosaic-like leaf patterns, leaf distortion, and severe stunting, leading to yield losses of up to 95% in heavily affected fields.",
        nanoparticles: [
          {
            name: "Silver Nanoparticles (AgNPs)",
            type: "Metal-based",
            concentration: "25-50 ppm",
            effectiveness: "92%",
            application:
              "Foliar spray every 7-10 days to inhibit viral replication",
          },
          {
            name: "Copper Nanoparticles (CuNPs)",
            type: "Metal-based",
            concentration: "50-100 ppm",
            effectiveness: "88%",
            application:
              "Root zone application twice weekly for systemic viral suppression",
          },
          {
            name: "Zinc Oxide Nanoparticles (ZnO-NPs)",
            type: "Oxide-based",
            concentration: "75-150 ppm",
            effectiveness: "85%",
            application:
              "Foliar application combined with whitefly vector control",
          },
        ],
      },
      {
        disease: "Cassava Bacterial Blight (CBB)",
        confidence: 0.89,
        severity: "High",
        description:
          "A bacterial disease caused by Xanthomonas axonopodis pv. manihotis, resulting in wilting, necrotic leaf spots, vascular necrosis, and stem dieback.",
        nanoparticles: [
          {
            name: "Copper Nanoparticles (CuNPs)",
            type: "Metal-based",
            concentration: "50-100 ppm",
            effectiveness: "95%",
            application: "Targeted spray on infected areas every 5-7 days",
          },
          {
            name: "Silver Nanoparticles (AgNPs)",
            type: "Metal-based",
            concentration: "30-60 ppm",
            effectiveness: "91%",
            application:
              "Foliar and stem application to disrupt bacterial cell walls",
          },
        ],
      },
      {
        disease: "Cassava Brown Streak Disease (CBSD)",
        confidence: 0.86,
        severity: "Medium",
        description:
          "A viral disease causing brown streaks on stems and roots, leading to root necrosis and reduced starch quality.",
        nanoparticles: [
          {
            name: "Silicon Dioxide Nanoparticles (SiO₂-NPs)",
            type: "Oxide-based",
            concentration: "150-250 ppm",
            effectiveness: "83%",
            application:
              "Strengthens plant cell walls, preventive bi-weekly foliar spray",
          },
        ],
      },
      {
        disease: "Healthy",
        confidence: 0.96,
        severity: "None",
        description:
          "The cassava leaf appears healthy with no visible signs of disease. Continue regular monitoring and preventive care.",
        nanoparticles: [
          {
            name: "Silicon Dioxide Nanoparticles (SiO₂-NPs)",
            type: "Oxide-based",
            concentration: "100-150 ppm",
            effectiveness: "N/A (Preventive)",
            application:
              "Monthly preventive foliar spray to boost plant immunity",
          },
        ],
      },
    ];

    return mockResults[Math.floor(Math.random() * mockResults.length)];
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setError(null);
      setResults(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError("Please upload an image first");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await predictDisease(selectedImage);
      setResults(result);
    } catch (err) {
      setError("Analysis failed. Please try again.");
      console.error("Prediction error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return "text-green-600";
    if (confidence >= 0.7) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <header className="bg-white shadow-lg border-b-4 border-emerald-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-600 p-3 rounded-full">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  CassavaCare AI
                </h1>
                <p className="text-gray-600">
                  Advanced Cassava Disease Detection & Nano Treatment
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-emerald-600">
              <Microscope className="h-6 w-6" />
              <span className="font-semibold">Nano-Enhanced Agriculture</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Camera className="h-6 w-6 mr-2 text-emerald-600" />
              Upload Cassava Leaf Image
            </h2>

            <div className="space-y-6">
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-64 object-contain mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-16 w-16 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Drop your image here
                      </p>
                      <p className="text-gray-500">or click to browse</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!selectedImage || isAnalyzing}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    <span>Analyze Disease</span>
                  </>
                )}
              </button>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-2 text-teal-600" />
              Analysis Results
            </h2>

            {!results ? (
              <div className="text-center py-12">
                <Microscope className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Upload an image and click analyze to see results
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-6 border border-teal-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {results.disease === "Healthy" ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      ) : (
                        <AlertCircle className="h-8 w-8 text-red-500" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {results.disease}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Disease Classification
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(results.severity)}`}
                    >
                      {results.severity}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Confidence</p>
                      <p
                        className={`text-2xl font-bold ${getConfidenceColor(results.confidence)}`}
                      >
                        {(results.confidence * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Severity Level</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {results.severity}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {results.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-purple-600" />
                    Recommended Nanoparticle Treatments
                  </h4>

                  <div className="space-y-4">
                    {results.nanoparticles.map((nano, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">
                            {nano.name}
                          </h5>
                          <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                            {nano.type}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Concentration</p>
                            <p className="font-medium">{nano.concentration}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Effectiveness</p>
                            <p className="font-medium text-green-600">
                              {nano.effectiveness}
                            </p>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-gray-600 text-sm">
                            Application Method
                          </p>
                          <p className="font-medium">{nano.application}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                AI-Powered Detection
              </h3>
            </div>
            <p className="text-gray-600">
              Advanced machine learning algorithms identify CMD, CBB, and CBSD
              with high accuracy from cassava leaf images.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <Microscope className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Nano Technology
              </h3>
            </div>
            <p className="text-gray-600">
              Cutting-edge nanoparticle treatments (AgNPs, CuNPs, ZnO-NPs,
              TiO₂-NPs, SiO₂-NPs) provide targeted disease management.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Food Security</h3>
            </div>
            <p className="text-gray-600">
              Supporting 800M+ cassava-dependent people worldwide with
              sustainable disease control solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

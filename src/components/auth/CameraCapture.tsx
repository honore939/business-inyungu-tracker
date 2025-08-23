import React, { useState, useRef } from 'react';
import { Camera, Upload, X, RotateCcw, Smartphone } from 'lucide-react';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import Button from '../ui/Button';

interface CameraCaptureProps {
  onImageCapture: (file: File) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCapture, onClose }) => {
  const [isCamera, setIsCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gufungura kamera (Web)
  const startWebCamera = async () => {
    try {
      setIsLoading(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCamera(true);
    } catch (error) {
      console.error('Ikosa mu gufungura kamera:', error);
      alert('Ntibishoboka gufungura kamera. Emeza ko wemeye gukoresha kamera.');
    } finally {
      setIsLoading(false);
    }
  };

  // Gufungura kamera (Mobile - Capacitor)
  const startMobileCamera = async () => {
    try {
      setIsLoading(true);
      const image = await CapacitorCamera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image.dataUrl) {
        setCapturedImage(image.dataUrl);
      }
    } catch (error) {
      console.error('Ikosa mu gufungura kamera ya mobile:', error);
      alert('Ntibishoboka gufungura kamera. Emeza ko wemeye gukoresha kamera.');
    } finally {
      setIsLoading(false);
    }
  };

  // Gufunga kamera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCamera(false);
  };

  // Gufata ifoto (Web)
  const captureWebPhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);
        stopCamera();
      }
    }
  };

  // Guhitamo ifoto ku bwato
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ifoto ni nini cyane. Hitamo ifoto ntoya kuruta 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Guhitamo ifoto ya mobile gallery
  const selectFromGallery = async () => {
    try {
      setIsLoading(true);
      const image = await CapacitorCamera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      if (image.dataUrl) {
        setCapturedImage(image.dataUrl);
      }
    } catch (error) {
      console.error('Ikosa mu guhitamo ifoto:', error);
      alert('Ntibishoboka guhitamo ifoto. Ongera ugerageze.');
    } finally {
      setIsLoading(false);
    }
  };

  // Kwemeza ifoto
  const confirmImage = () => {
    if (capturedImage) {
      // Convert data URL to File
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'ifoto-yanjye.jpg', { type: 'image/jpeg' });
          onImageCapture(file);
          onClose();
        });
    }
  };

  // Kongera gufata ifoto
  const retakePhoto = () => {
    setCapturedImage(null);
    if (Capacitor.isNativePlatform()) {
      // Mobile - show options again
    } else {
      // Web - restart camera
      startWebCamera();
    }
  };

  const isMobile = Capacitor.isNativePlatform();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Shyiramo ifoto yawe
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Gutegura kamera...</p>
          </div>
        )}

        {!isCamera && !capturedImage && !isLoading && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Hitamo uburyo bwo kongeraho ifoto yawe
              </p>
              
              <div className="space-y-3">
                {isMobile ? (
                  <>
                    <Button
                      onClick={startMobileCamera}
                      className="w-full gap-2"
                      variant="primary"
                    >
                      <Camera className="h-5 w-5" />
                      Fata ifoto na kamera
                    </Button>
                    
                    <Button
                      onClick={selectFromGallery}
                      className="w-full gap-2"
                      variant="secondary"
                    >
                      <Upload className="h-5 w-5" />
                      Hitamo ifoto muri gallery
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={startWebCamera}
                      className="w-full gap-2"
                      variant="primary"
                    >
                      <Camera className="h-5 w-5" />
                      Fata ifoto na kamera
                    </Button>
                    
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full gap-2"
                      variant="secondary"
                    >
                      <Upload className="h-5 w-5" />
                      Hitamo ifoto ku bwato
                    </Button>
                  </>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {isMobile && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
                    <Smartphone className="h-4 w-4" />
                    <span className="text-sm">Ikora neza kuri smartphone</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {isCamera && !capturedImage && !isMobile && (
          <div className="space-y-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={stopCamera}
                variant="ghost"
                className="flex-1"
              >
                Hagarika
              </Button>
              <Button
                onClick={captureWebPhoto}
                variant="primary"
                className="flex-1 gap-2"
              >
                <Camera className="h-4 w-4" />
                Fata ifoto
              </Button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="space-y-4">
            <div className="text-center">
              <img
                src={capturedImage}
                alt="Ifoto yafashwe"
                className="w-full rounded-lg max-h-64 object-cover"
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={retakePhoto}
                variant="ghost"
                className="flex-1 gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Ongera ufate
              </Button>
              <Button
                onClick={confirmImage}
                variant="primary"
                className="flex-1"
              >
                Emeza ifoto
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
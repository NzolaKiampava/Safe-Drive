import { useEffect, useRef, useState } from 'react';
import { ObjectDetector, FilesetResolver, Detection } from '@mediapipe/tasks-vision';

export function useObjectDetection() {
  const [detector, setDetector] = useState<ObjectDetector | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initDetector() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        
        const objectDetector = await ObjectDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite`,
            delegate: "GPU"
          },
          scoreThreshold: 0.5,
          runningMode: "VIDEO"
        });

        setDetector(objectDetector);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to initialize ObjectDetector:", err);
        setError("Não foi possível carregar a IA de visão.");
        setIsLoading(false);
      }
    }

    initDetector();

    return () => {
      detector?.close();
    };
  }, []);

  return { detector, isLoading, error };
}

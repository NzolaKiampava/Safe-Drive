import { useEffect, useRef, useState } from 'react';
import { ObjectDetector, FilesetResolver } from '@mediapipe/tasks-vision';

export type DetectorStatus = 'idle' | 'loading' | 'ready' | 'error';

export function useObjectDetection() {
  const [detector, setDetector] = useState<ObjectDetector | null>(null);
  const [status, setStatus] = useState<DetectorStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const detectorRef = useRef<ObjectDetector | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initDetector() {
      setStatus('loading');
      setErrorMsg(null);

      try {
        console.log('[Vision] Loading WASM runtime...');

        // Use locally served WASM files (copied from node_modules by vite.config.ts)
        // This guarantees the WASM version always matches the installed package.
        const vision = await FilesetResolver.forVisionTasks('/mediapipe-wasm');

        console.log('[Vision] WASM loaded. Loading model...');

        const objectDetector = await ObjectDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite',
            // CPU is more compatible across iOS Safari, Android WebView, etc.
            delegate: 'CPU',
          },
          scoreThreshold: 0.35,
          maxResults: 5,
          runningMode: 'VIDEO',
        });

        if (cancelled) {
          objectDetector.close();
          return;
        }

        console.log('[Vision] Model ready!');
        detectorRef.current = objectDetector;
        setDetector(objectDetector);
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        console.error('[Vision] Failed to init detector:', msg);
        setErrorMsg(msg);
        setStatus('error');
      }
    }

    initDetector();

    return () => {
      cancelled = true;
      detectorRef.current?.close();
      detectorRef.current = null;
    };
  }, []);

  return {
    detector,
    status,
    isLoading: status === 'loading',
    isReady: status === 'ready',
    error: errorMsg,
  };
}

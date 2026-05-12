import { useEffect, useRef } from 'react';
import { ObjectDetector, Detection } from '@mediapipe/tasks-vision';

interface VisionOverlayProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  detector: ObjectDetector | null;
  enabled: boolean;
}

export function VisionOverlay({ videoRef, detector, enabled }: VisionOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    if (!enabled || !detector || !videoRef.current || !canvasRef.current) {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const animate = () => {
      if (!enabled || !detector || !video || !canvas || !ctx) return;

      if (video.readyState >= 2) { // HAVE_CURRENT_DATA
        // Sync canvas size with video
        if (canvas.width !== video.clientWidth || canvas.height !== video.clientHeight) {
          canvas.width = video.clientWidth;
          canvas.height = video.clientHeight;
        }

        const startTimeMs = performance.now();
        const results = detector.detectForVideo(video, startTimeMs);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        results.detections.forEach((detection: Detection) => {
          const { boundingBox, categories } = detection;
          if (!boundingBox) return;

          // Scale coordinates to canvas size
          const ratioX = canvas.width / (video.videoWidth || 1);
          const ratioY = canvas.height / (video.videoHeight || 1);

          const x = boundingBox.originX * ratioX;
          const y = boundingBox.originY * ratioY;
          const w = boundingBox.width * ratioX;
          const h = boundingBox.height * ratioY;

          // Draw Box
          ctx.strokeStyle = '#f59e0b'; // warning color
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, w, h);

          // Draw Label
          const label = categories[0].categoryName;
          const score = Math.round(categories[0].score * 100);
          ctx.fillStyle = '#f59e0b';
          ctx.font = 'bold 12px JetBrains Mono, monospace';
          const text = `${label} ${score}%`;
          const textWidth = ctx.measureText(text).width;
          
          ctx.fillRect(x, y - 20, textWidth + 10, 20);
          ctx.fillStyle = '#000';
          ctx.fillText(text, x + 5, y - 5);
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [enabled, detector, videoRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}

import { useEffect, useRef } from 'react';
import { ObjectDetector, Detection } from '@mediapipe/tasks-vision';

interface VisionOverlayProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  detector: ObjectDetector | null;
  enabled: boolean;
}

export function VisionOverlay({ videoRef, detector, enabled }: VisionOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!enabled || !detector) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLORS = ['#f59e0b', '#22d3ee', '#a78bfa', '#34d399', '#fb7185'];

    const animate = () => {
      // Video must be playing and have valid dimensions
      if (
        video.readyState < 2 ||
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      // Keep canvas pixel size in sync with its displayed size
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      if (
        canvas.width !== Math.round(rect.width * dpr) ||
        canvas.height !== Math.round(rect.height * dpr)
      ) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        ctx.scale(dpr, dpr);
      }

      // Logical display dimensions
      const displayW = rect.width;
      const displayH = rect.height;

      // The video is rendered with object-fit: cover — compute the actual
      // rendered region so bounding boxes map correctly onto the overlay.
      const videoAspect = video.videoWidth / video.videoHeight;
      const canvasAspect = displayW / displayH;

      let renderW: number, renderH: number, offsetX: number, offsetY: number;

      if (videoAspect > canvasAspect) {
        // Video is wider than canvas — crop sides
        renderH = displayH;
        renderW = displayH * videoAspect;
        offsetX = (displayW - renderW) / 2;
        offsetY = 0;
      } else {
        // Video is taller than canvas — crop top/bottom
        renderW = displayW;
        renderH = displayW / videoAspect;
        offsetX = 0;
        offsetY = (displayH - renderH) / 2;
      }

      const scaleX = renderW / video.videoWidth;
      const scaleY = renderH / video.videoHeight;

      let results;
      try {
        results = detector.detectForVideo(video, performance.now());
      } catch {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, displayW, displayH);

      results.detections.forEach((detection: Detection, i: number) => {
        const { boundingBox, categories } = detection;
        if (!boundingBox || !categories.length) return;

        const color = COLORS[i % COLORS.length];

        const x = boundingBox.originX * scaleX + offsetX;
        const y = boundingBox.originY * scaleY + offsetY;
        const w = boundingBox.width * scaleX;
        const h = boundingBox.height * scaleY;

        // Bounding box
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);

        // Semi-transparent fill
        ctx.fillStyle = color + '1A'; // 10% opacity
        ctx.fillRect(x, y, w, h);

        // Label background
        const label = categories[0].categoryName;
        const score = Math.round(categories[0].score * 100);
        const text = `${label} ${score}%`;
        ctx.font = 'bold 11px monospace';
        const textW = ctx.measureText(text).width;

        ctx.fillStyle = color;
        ctx.fillRect(x, y - 20, textW + 12, 20);

        // Label text
        ctx.fillStyle = '#000';
        ctx.fillText(text, x + 6, y - 5);

        // Corner brackets
        const bSize = 10;
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;

        // Top-left
        ctx.beginPath(); ctx.moveTo(x, y + bSize); ctx.lineTo(x, y); ctx.lineTo(x + bSize, y); ctx.stroke();
        // Top-right
        ctx.beginPath(); ctx.moveTo(x + w - bSize, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + bSize); ctx.stroke();
        // Bottom-left
        ctx.beginPath(); ctx.moveTo(x, y + h - bSize); ctx.lineTo(x, y + h); ctx.lineTo(x + bSize, y + h); ctx.stroke();
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(x + w - bSize, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - bSize); ctx.stroke();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      const ctx2 = canvas.getContext('2d');
      ctx2?.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [enabled, detector, videoRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}
    />
  );
}

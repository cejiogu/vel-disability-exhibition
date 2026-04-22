import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { exhibitionTitle } from "../lib/artists";
import { SiteNav } from "../components/site-nav";

import type { Route } from "./+types/scan";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Scan | Disability Exhibition" },
    {
      name: "description",
      content: "Scan exhibition QR codes with your camera.",
    },
  ];
}

type BarcodeDetectorLike = {
  detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue?: string }>>;
};

type BarcodeDetectorCtor = new (options?: {
  formats?: string[];
}) => BarcodeDetectorLike;

export default function Scan() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState("Ready to scan.");
  const [error, setError] = useState<string | null>(null);

  function stopScanner() {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  }

  async function startScanner() {
    setError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera access is not available in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsScanning(true);
      setStatus("Point your camera at a QR code.");

      const detectorCtor = (
        window as Window & { BarcodeDetector?: BarcodeDetectorCtor }
      ).BarcodeDetector;

      if (!detectorCtor) {
        setStatus(
          "Camera is on, but QR auto-detect is not supported in this browser."
        );
        return;
      }

      const detector = new detectorCtor({ formats: ["qr_code"] });

      const scanFrame = async () => {
        if (!videoRef.current) return;

        try {
          const detected = await detector.detect(videoRef.current);
          if (detected.length > 0) {
            const rawValue = detected[0]?.rawValue?.trim();
            if (rawValue) {
              stopScanner();
              navigate("/template");
              return;
            }
          }
        } catch {
          setStatus("Scanning...");
        }

        frameRef.current = requestAnimationFrame(scanFrame);
      };

      frameRef.current = requestAnimationFrame(scanFrame);
    } catch {
      setError("Unable to start camera. Please allow camera permissions.");
      stopScanner();
    }
  }

  useEffect(() => {
    void startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  return (
    <main className="site-shell">
      <SiteNav title={exhibitionTitle} showLogo />

      <header className="panel panel-strong">
        <p className="eyebrow">QR Scanner</p>
        <h1>Scan Exhibition QR Codes</h1>
        <p>
          Use the scanner to open linked AR content and related exhibition
          experiences.
        </p>
      </header>

      <section className="panel">
        <p className="field-note">{isScanning ? "Scanning is active." : status}</p>
        {error ? <p className="scan-error">{error}</p> : null}

        <div className="scan-video-wrap">
          <video ref={videoRef} className="scan-video" playsInline muted />
        </div>
      </section>
    </main>
  );
}

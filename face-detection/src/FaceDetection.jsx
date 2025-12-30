
import * as faceapi from "face-api.js";
import { useEffect, useRef } from "react";

const FaceDetection = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  // 1️⃣ لود مدل‌ها
  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    const MODEL_URL = "/models";

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);

    startVideo();
  };

  // 2️⃣ دسترسی به وبکم
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));
  };

  // 3️⃣ تشخیص چهره
  const handleVideoPlay = () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks();

      const canvas = canvasRef.current;
      canvas.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);

      faceapi.matchDimensions(canvas, {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      });

      const resized = faceapi.resizeResults(detections, {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      });

      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceLandmarks(canvas, resized);
    }, 300);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>تشخیص چهره با React 😎</h2>

      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          width="720"
          height="560"
          onPlay={handleVideoPlay}
          style={{ borderRadius: "10px" }}
        />

        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
    </div>
  );
};

export default FaceDetection;
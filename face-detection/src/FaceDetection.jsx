
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
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
    ]);

    startVideo();
  };

  // 2️⃣ دسترسی به وبکم

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
  };

  // 3️⃣ تشخیص چهره

  const handleVideoPlay = () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      const canvas = canvasRef.current;
      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      };

      faceapi.matchDimensions(canvas, displaySize);
      const resized = faceapi.resizeResults(detections, displaySize);

      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceLandmarks(canvas, resized);
      faceapi.draw.drawFaceExpressions(canvas, resized);

        // نمایش سن و جنسیت
        
      resized.forEach((det) => {
        const { age, gender, detection } = det;
        const box = detection.box;
        const text = `${Math.round(age)} سال - ${gender}`;

        new faceapi.draw.DrawTextField(
          [text],
          box.bottomLeft
        ).draw(canvas);
      });
    }, 400);
  };

  return (
    <div style={{ textAlign: "center" }}>
          <h2>تشخیص احساسات، سن و جنسیت 🧠</h2>

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
          style={{ position: "absolute", right:60,button:0 }}
        />
      </div>
    </div>
  );
};

export default FaceDetection;


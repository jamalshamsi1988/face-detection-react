// import { useRef, useState } from "react";

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// const recognition = new SpeechRecognition();

// recognition.lang = "fa-IR";
// recognition.continuous = false;
// recognition.interimResults = false;


// const VoiceToCode = () => {
//     const [text, setText] = useState("");
//     const [code, setCode] = useState("");
//     const [component, setComponent] = useState(null);
//     const listeningRef = useRef(false);
  
//     //Strart to listening

//     const startListening = () => {
//         recognition.start();
//         listeningRef.current = true;
//     }

//     // Reseve text voice
    
//     recognition.onresult = (event) => {
//         const speechText = e.results[0][0].transcript;
//         setText(speechText);
//         generateCode(speechText);
        
//     }

//     // convert text to code

//     const generateCode = (command) => {
//         if (command.includes("دکمه")) {
//             let color = "blue";
//             if (command.includes("قرمز")) color = "red";
//             if (command.includes("سبز")) color = "green";

//             const jsxCode = `
//             <button
//             style={{backgroundColor:"${color}", color:"white" , padding:"12px 20px", borderRadius:"8px",border:"none"
//             }} >
            
//             Click me
//             </button>
//             `;
//             setCode(jsxCode);
//             setComponent(
//                  <button
//             style={{backgroundColor:"${color}", color:"white" , padding:"12px 20px", borderRadius:"8px",border:"none"
//             }} >
            
//             Click me
//             </button>
//             )
//         }
//     }

//   return (
//       <div style={{ textAlign: "center", padding: "40px" }}>
//           <h2>Voice To Code</h2>
//           <button style={{ padding: "10px 20px" }} onClick={startListening}>Start Seeching</button>
//           <p><strong> دستور صحبت</strong></p>
//           <pre style={{
//               background: "#111",
//               color: "#0f0",
//               padding: "15px",
//               borderRadius: "8px",
//               textAlign: "left",
//               maxWidth: "600px",
//               margin:"20px auto"
              
//           }}>
//               {code}
//           </pre>
//           <div>{component }</div>
//     </div>
//   )
// }

// export default VoiceToCode

import { useRef, useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "fa-IR";
recognition.continuous = false;
recognition.interimResults = false;

const VoiceToCode = () => {
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [component, setComponent] = useState(null);
  const listeningRef = useRef(false);

  // 🎤 شروع گوش دادن
  const startListening = () => {
    recognition.start();
    listeningRef.current = true;
  };

  // 🧠 دریافت متن صدا
  recognition.onresult = (event) => {
    const speechText = event.results[0][0].transcript;
    setText(speechText);
    generateCode(speechText);
  };

  // ⚙️ تبدیل متن به کد
  const generateCode = (command) => {
    if (command.includes("دکمه")) {
      let color = "blue";

      if (command.includes("قرمز")) color = "red";
      if (command.includes("سبز")) color = "green";

      const jsxCode = `
<button style={{
  backgroundColor: "${color}",
  color: "white",
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none"
}}>
  Click me
</button>
      `;

      setCode(jsxCode);

      setComponent(
        <button
          style={{
            backgroundColor: color,
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Click me
        </button>
      );
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>🎤 Voice → Code</h2>

      <button onClick={startListening} style={{ padding: "10px 20px" }}>
        🎙 شروع صحبت
      </button>

      <p><strong>دستور صوتی:</strong> {text}</p>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "15px",
          borderRadius: "8px",
          textAlign: "left",
          maxWidth: "600px",
          margin: "20px auto",
        }}
      >
        {code}
      </pre>

      <div>{component}</div>
    </div>
  );
};

export default VoiceToCode;

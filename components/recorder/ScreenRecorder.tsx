'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Fullscreen } from 'lucide-react';

interface ScreenRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
}

const ScreenRecorder: React.FC<ScreenRecorderProps> = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(false);
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null); // State for live preview
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null); // Ref for preview video element

  // Function to start preview
  const startPreview = async () => {
    try {
      // Get screen capture stream
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setPreviewStream(stream);

      // Show the stream in the preview video element
      if (previewVideoRef.current) {
        previewVideoRef.current.srcObject = stream;
        previewVideoRef.current.play();  // Play the preview stream
      }
    } catch (err) {
      console.error('Error starting screen preview:', err);
    }
  };

  // Function to start recording after preview
  const startRecording = () => {
    if (!previewStream) return;

    const mediaRecorder = new MediaRecorder(previewStream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
      chunksRef.current = [];
      onRecordingComplete(blob); // Notify parent with the recorded video blob
    };

    mediaRecorder.start();
    setRecording(true);
  };

  // Function to stop the recording and preview
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);

      // Stop the preview stream
      if (previewStream) {
        previewStream.getTracks().forEach(track => track.stop());
        setPreviewStream(null);
      }
    }
  };

  useEffect(() => {
    // Ensure the mirror effect is applied when the preview is active
    if (previewVideoRef.current) {
      previewVideoRef.current.style.transform = 'scaleX(-1)';
    }
  }, [previewStream]);

  return (
    <div className="p-4">
      {/* Preview Button */}
      {!previewStream && !recording && !videoURL && (
        <div className='mt-3 flex flex-col items-center justify-center'>
          <div className='border w-fit px-4 py-1 rounded-md bg-stone-100 flex items-center justify-center gap-1'>
            <h1 className='font-semibold text-center'>demos4u</h1>
            <Fullscreen className='w-5 h-5 text-center' />
          </div>
          <div className='mt-5 h-[50rem] w-full bg-stone-800 border rounded-lg shadow'>

          </div>
          <Button onClick={startPreview} className='mt-5'>
          Select Screen for Preview
        </Button>
        </div>
      )}

      {/* Live Preview with Mirror Effect */}
      {previewStream && !recording && (
        <div className="mt-4 flex flex-col items-center justify-center">
          <div className='border w-fit px-4 py-1 rounded-md bg-stone-100 flex items-center justify-center gap-1'>
            <h1 className='font-semibold text-center'>Live Preview</h1>
            <Fullscreen className='w-5 h-5 text-center' />
          </div>
          <video
            ref={previewVideoRef}
            className="w-full mt-5 h-[50rem] bg-slate-950 border rounded-lg shadow"
            autoPlay
            muted
            style={{ transform: 'scaleX(-1)' }} // Apply mirror effect
          />
          <Button onClick={startRecording} className="mt-5">
            Start Recording
          </Button>
        </div>
      )}

      {/* Stop Recording Button */}
      {recording && (
       <div className='mt-3 flex flex-col items-center justify-center'>
       <div className='border w-fit px-4 py-1 rounded-md bg-stone-100 flex items-center justify-center gap-1'>
         <h1 className='font-semibold text-center'>demos4u</h1>
         <Fullscreen className='w-5 h-5 text-center' />
       </div>
       <div className='mt-5 h-[50rem] w-full bg-stone-800 border rounded-lg shadow'>

       </div>
       <Button onClick={stopRecording} className='mt-5'>
       Stop Recording
     </Button>
     </div>
      )}

      {/* Display the recorded video after stopping */}
      {videoURL && (
        <div className="mt-4 flex flex-col items-center justify-center">
        <div className='border w-fit px-4 py-1 rounded-md bg-stone-100 flex items-center justify-center gap-1'>
          <h1 className='font-semibold text-center'>Live Preview</h1>
          <Fullscreen className='w-5 h-5 text-center' />
        </div>
        <div className='w-full h-[50rem] flex items-center justify-center'>
          <video src={videoURL} controls className="w-full border rounded shadow" />
        </div>
          <Button onClick={startRecording} className="mt-5">
            Edit video
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScreenRecorder;

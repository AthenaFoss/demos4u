'use client'

import { useState, useRef } from 'react';
import { Button } from '../ui/button';

interface ScreenRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
}

const ScreenRecorder: React.FC<ScreenRecorderProps> = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 3840 },  // 4K width
          height: { ideal: 2160 }, // 4K height
          frameRate: { ideal: 60 } // 60 FPS for smoother motion
          
        }
      });

      // Show the screen in the video preview
      setPreviewStream(stream);

      const options = { mimeType: 'video/webm; codecs=vp9', videoBitsPerSecond: 20000000 }; // 20 Mbps bitrate
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        chunksRef.current = [];
        onRecordingComplete(blob);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Error starting screen recording:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      if (previewStream) {
        // Stop all tracks from the stream
        previewStream.getTracks().forEach(track => track.stop());
        setPreviewStream(null);
      }
    }
  };

  return (
    <div className="p-4 flex flex-col h-screen items-center justify-center">
      <Button
        onClick={recording ? stopRecording : startRecording}
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </Button>

      {/* Preview the selected screen */}
      {previewStream && (
        <div className="mt-4">
          <video
            autoPlay
            muted
            className="w-full h-96 object-contain transform scale-x-[-1]" // Mirror effect with CSS
            ref={(videoElement) => {
              if (videoElement && previewStream) {
                videoElement.srcObject = previewStream;
              }
            }}
          />
        </div>
      )}

      {/* Show the recorded video after stop */}
      {videoURL && (
        <div className="mt-4">
          <video src={videoURL} controls className="w-full" />
        </div>
      )}
    </div>
  );
};

export default ScreenRecorder;

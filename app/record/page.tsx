'use client'

import ScreenRecorder from "@/components/recorder/ScreenRecorder";



export default function Page() {
  const handleRecordingComplete = (blob: Blob) => {
    console.log('Recording complete. Blob:', blob);
    // Further processing like uploading or editing can be handled here
  };
  return (
    <div className="w-full h-screen mx-auto">
      <ScreenRecorder
      onRecordingComplete={handleRecordingComplete} 
      />
    </div>
  );
}

export type Options = Partial<{
  type: string;
  mimeType: string;
  recorderType: string;
  disableLogs: boolean;
  timeSlice: number;
  checkForInactiveTracks: boolean;
  bitsPerSecond: number;
  audioBitsPerSecond: number;
  videoBitsPerSecond: number;
  frameInterval: number;
  sampleRate: number;
  desiredSampRate: number;
  bufferSize: number;
  numberOfAudioChannels: number;
  frameRate: number;
  bitrate: number;
  elementClass: string;
  canvas: {
    width: number;
    height: number;
  };
  ondataAviable: () => void;
  onTimeStamp: (s: any) => void;
  previewStream: (s: any) => void;
}>;

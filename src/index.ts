import { Options } from "./utils/interface";
import { recordFiber } from "./fiber";
import { recordRtc } from "./rtc";

export const defaultOptions: Options = {
  type: "video",

  mimeType: "video",

  recorderType: "xx",

  disableLogs: true,

  timeSlice: 1000,

  ondataAviable: function () {},

  checkForInactiveTracks: false,

  onTimeStamp: function (timestamp) {},

  bitsPerSecond: 128000,

  audioBitsPerSecond: 128000,

  videoBitsPerSecond: 128000,

  frameInterval: 90,

  previewStream: function (stream) {},

  canvas: {
    width: 640,
    height: 480,
  },

  sampleRate: 96000,

  desiredSampRate: 16000,

  bufferSize: 16384,

  numberOfAudioChannels: 2,

  frameRate: 30,

  bitrate: 128000,

  elementClass: "multi-streams-mixer",
};

function RecordWeb(stream: any, options: Options) {
  const currentOptions = Object.assign({}, defaultOptions, options);
  if (!stream) {
    return recordFiber(currentOptions);
  }
  return recordRtc(currentOptions);
}

// version: "",

//   duration: 1000,

//   state: "init",

//   blob: "null",

//   startRecording: function () {},

//   stopRecording: function () {},

//   pauseRecording: function () {},

//   resumeRecording: function () {},

//   setRecordingDuration: function () {},

//   reset: function () {},

//   save: function () {},

//   getBlob: function () {},

//   toURL: function () {},

//   getDataURL: function () {},

//   initRecorder: function () {},

//   getState: function () {},

//   onStateChange: function (state) {},

//   writeTodisk: function () {},

//   getFromDisk: function () {},

//   clear: function () {},

//   filter: function () {},

//   replay: function () {},

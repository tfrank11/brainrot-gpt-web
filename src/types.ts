export enum VideoType {
  MINECRAFT = 0,
  SUBWAYSURFER = 1,
}

export type InputInfo = {
  uid: string;
  input_id: string;
  video_id: string;
  pdf_id: string;
  transcript: string;
  summary: string;
  video_type: VideoType;
};

export enum ServerRequestType {
  LOGIN = 0,
  HEARTBEAT = 1,
}

type NewVideoRequest = {
  type: ServerRequestType;
  token: string;
  pdf_id: string;
  video_type: VideoType;
};

type HeartbeatRequest = {
  type: ServerRequestType.HEARTBEAT;
};

export type IServerRequest = NewVideoRequest | HeartbeatRequest;

export enum ServerResponseType {
  ERROR = 0,
  LOGIN_OK = 1,
  TRANSCRIPT = 2,
  SUMMARY = 3,
  AUDIO_DONE = 4,
  WORD_TIMINGS_DONE = 5,
  PROCESS_VIDEO_DONE = 6,
  VIDEO_DONE = 7,
}

type LoginOkResponse = {
  type: ServerResponseType.LOGIN_OK;
};

type TranscriptResponse = {
  type: ServerResponseType.TRANSCRIPT;
  transcript: string;
};

type SummaryResponse = {
  type: ServerResponseType.SUMMARY;
  summary: string;
};

type AudioResponse = {
  type: ServerResponseType.AUDIO_DONE;
};

type VideoResponse = {
  type: ServerResponseType.VIDEO_DONE;
  video_id: string;
};

type ErrorResponse = {
  type: ServerResponseType.ERROR;
  reason: string;
};

export type IServerReponse =
  | LoginOkResponse
  | TranscriptResponse
  | SummaryResponse
  | AudioResponse
  | VideoResponse
  | ErrorResponse;

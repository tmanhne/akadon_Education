import { toast } from "react-toastify";
import TwilioVideo from "twilio-video";

function shareScreenHandler(room, t) {
  // 1. CHECK USER DEVICE'S MEDIA IS AVAILABLE
  let screenTrack = null;
  if (!room) {
    toast.error(t("toast:er_53"), {
      autoClose: false,
      className: "bg-hightlight-1 border-radius-1 text-light",
    });
    return true;
  }
  // 2. CREATE NEW LOCAL VIDEO TRACT FROM TWILIOVIDEO AND PUBLISH IT
  if (!screenTrack) {
    navigator.mediaDevices
      .getDisplayMedia()
      .then((stream) => {
        screenTrack = new TwilioVideo.LocalVideoTrack(stream.getTracks()[0]);
        room.localParticipant.publishTrack(screenTrack);
        // 3. ONSHARING SCREEN ENDED IMPLEMENT
        screenTrack.mediaStreamTrack.onended = () => {
          room.localParticipant.unpublishTrack(screenTrack);
          screenTrack.stop();
          screenTrack = null;
        };
      })
      .catch((error) => {
        toast.error(t("toast:er_54"), { autoClose: false });
      });
  }
}

function toogleMicrophone(room, mute) {
  if (!room) return;
  room.localParticipant.audioTracks.forEach((publication) => {
    mute ? publication.track.disable() : publication.track.enable();
  });
}

function toogleVideo(room, pause) {
  if (!room) return;
  room.localParticipant.videoTracks.forEach((publication) => {
    pause ? publication.track.disable() : publication.track.enable();
  });
}

async function joinTwilioVideo(
  t,
  detectCamera,
  setRoom,
  errorHandling,
  videoCredential,
  email,
  setWaitingForUserJoin,
  setLoading
) {
  const { token, roomName, users } = videoCredential;
  let config = {
    name: roomName,
    audio: true,
    video: { height: 720, frameRate: 24, width: 1280 },
    bandwidthProfile: {
      video: {
        mode: "grid",
        dominantSpeakerPriority: "standard",
      },
    },
    dominantSpeaker: true,
    maxAudioBitrate: 16000,
    networkQuality: { local: 1, remote: 1 },
    region: "sg1",
  };

  // Detect camera
  if (!detectCamera) {
    try {
      const tracks = await TwilioVideo.createLocalTracks({
        audio: true,
        video: false,
      });
      config.tracks = tracks;
    } catch (error) {
      toast.error("Thiết bị của bạn không thể tham gia cuộc gọi !");
      return;
    }
  }
  // 1. CONNECT TO TWILIOVIDEO TO GET OR CREATE A ROOM
  // 2. SET ROOM OBJECT TO COMPONENT STATE
  // 3. USE ROOM OBJECT TO LISTEN SOME EVENTS: PARTICIPANTCONNECTED, PARTICIPANTDISCONNECTED, DISCONNECTED
  setLoading(true);
  await TwilioVideo.connect(token, config)
    .then((room) => {
      setRoom(room);

      room.participants.forEach((participant) =>
        participantConnected(
          participant,
          users,
          email,
          t,
          setWaitingForUserJoin
        )
      );

      room.on("participantConnected", (participant) =>
        participantConnected(
          participant,
          users,
          email,
          t,
          setWaitingForUserJoin
        )
      );

      room.on("participantDisconnected", (participant) =>
        participantDisconnected(participant, t)
      );

      room.once("disconnected", (error) =>
        room.participants.forEach((participant) =>
          participantDisconnected(participant, t)
        )
      );

      toast.success(t("toast:er_52"), {
        className: "bg-hightlight-1 border-radius-1 text-light",
      });
    })
    .catch((error) => {
      console.log(error.message);
      if (error.message === "Requested device not found") {
        errorHandling();
      }
    });
  setLoading(false);
}

function participantConnected(
  participant,
  users,
  email,
  t,
  setWaitingForUserJoin
) {
  setWaitingForUserJoin(false);
  // GREETING
  const isParticipant = users.find((user) => user.email !== email);
  if (isParticipant) {
    toast.success(participant.identity + t("video:join_video"), {
      className: "bg-hightlight-1 border-radius-1 text-light",
    });
  }
  // CREATE A HTML TAG TO RENDER PARTICIPANT VIDEO
  const div = document.createElement("div");
  div.id = participant.sid;
  div.classList = "outer-remote-participants h-100 w-100";

  // HANDLE SUBSCRIBE AND UNSUBCRIBE EVENTS
  participant.on("trackSubscribed", (track) => trackSubscribed(div, track));
  participant.on("trackUnsubscribed", trackUnsubscribed);

  participant.tracks.forEach((publication) => {
    if (publication.isSubscribed) {
      trackSubscribed(div, publication.track);
    }
  });
  document.getElementById("remote-participants").appendChild(div);
}

function trackSubscribed(div, track) {
  div.appendChild(track.attach());
}

function trackUnsubscribed(track) {
  track.detach().forEach((element) => element.remove());
}

function participantDisconnected(participant, t) {
  // REMOVE DIV TAG WHICH RENDER CURRENT PARTICIPANT
  if (participant.state === "disconnected") {
    toast.success(participant.identity + t("video:leave_video"), {
      className: "bg-hightlight-1 border-radius-1 text-light",
    });
  }
  // lỗi  document.getElementById(participant.sid) undefine
  document.getElementById(participant.sid)?.remove();
}

export { shareScreenHandler, toogleMicrophone, toogleVideo, joinTwilioVideo };

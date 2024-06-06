import { Session, Chatbox } from "@talkjs/react";

export default function ChatTamplate() {
  return (
    <Session appId="tX0pYJ08" userId="sample_user_alice">
      <Chatbox conversationId="sample_conversation" />
    </Session>
  );
}
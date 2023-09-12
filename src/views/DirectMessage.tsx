import Talk from "talkjs";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../types/type";

function DirectMessage() {
  const data = useLocation();
  const otherUser = data.state;

  const currentUser = useSelector((state: RootState) => state.user.value);

  const chatboxEl = useRef<HTMLDivElement>(null);
  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!otherUser) {
      // Redirect to the dashboard/message panel if otherUser is null
      navigate("/dashboard/message-penal");
      return;
    }
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const me = new Talk.User({
        id: currentUser.id,
        name: currentUser.username,
        email: currentUser.email,
        photoUrl: currentUser.picture,
        welcomeMessage: "Hello!",
        role: "default",
      });

      const other = new Talk.User({
        id: otherUser.id,
        name: otherUser.username,
        email: otherUser.email,
        photoUrl: otherUser.picture,
        welcomeMessage: "Hello!",
        role: "default",
      });

      const session = new Talk.Session({
        appId: "tOv2gsZw",
        me: me,
      });

      const conversationId = Talk.oneOnOneId(me, other);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(me);
      conversation.setParticipant(other);

      const chatbox = session.createInbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [
    currentUser.email,
    currentUser.id,
    currentUser.picture,
    currentUser.username,
    navigate,
    otherUser,
    talkLoaded,
  ]);

  return (
    <div
      ref={chatboxEl}
      style={{ width: "90%", margin: "30px", height: "500px" }}
    />
  );
}

export default DirectMessage;

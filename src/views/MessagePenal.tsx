import Talk from "talkjs";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types/type";

function MessagePenal() {
  const currentUser = useSelector((state: RootState) => state.user.value);
  const chatboxEl = useRef<HTMLDivElement>(null);
  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState<boolean>(false);

  useEffect(() => {
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

      const session = new Talk.Session({
        appId: "tOv2gsZw",
        me: me,
      });

      const chatbox = session.createInbox();
      chatbox.mount(chatboxEl.current);
      return () => session.destroy();
    }
  }, [
    currentUser.email,
    currentUser.id,
    currentUser.picture,
    currentUser.username,
    talkLoaded,
  ]);

  return (
    <div
      ref={chatboxEl}
      style={{ width: "90%", margin: "30px", height: "500px" }}
    />
  );
}

export default MessagePenal;

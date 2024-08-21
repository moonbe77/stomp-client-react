import { useRef, useState } from "react";
import "./App.css";
import ChatPopupWrapper from "./ChatPopupWrapper";
import Events from "./Events";

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [chatId, setChatId] = useState<number | null>(null);

  const handleConnect = () => {
    if (ref.current) {
      const chatId = ref.current.value;

      if (chatId) {
        console.log({ chatId });
        setChatId(Number(chatId));
      } else {
        alert("add chat id to connect");
      }
    }
  };

  return (
    <ChatPopupWrapper chatId={chatId}>
      <div id="main-content" className="container">
        <div className="row">
          <div className="col-md-6">
            <form
              className="form-inline"
              onSubmit={(e) => {
                e.preventDefault();
                handleConnect();
              }}
            >
              <h4>WebSocket connection:</h4>
              <div
                className="form-group"
                style={{
                  display: "flex",
                  gap: 8,
                }}
              >
                <label>chat id</label>
                <input
                  ref={ref}
                  type="number"
                  id="chat_id"
                  className="form-control"
                  placeholder="chat id"
                  // onChange={(e) => setChatId(Number(e.target.value))}
                />
                <button id="connect" className="btn btn-default" type="submit">
                  Connect
                </button>
                <button
                  id="disconnect"
                  className="btn btn-default"
                  type="button"
                  onClick={() => setChatId(null)}
                >
                  Disconnect
                </button>
              </div>
            </form>
          </div>
          <hr />
          <Events chatId={chatId} />
        </div>
      </div>
    </ChatPopupWrapper>
  );
}

export default App;

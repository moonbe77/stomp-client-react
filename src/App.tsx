import { useRef, useState } from "react";
import "./App.css";
import ChatPopupWrapper from "./ChatPopupWrapper";
import Events from "./Events";

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const refUrl = useRef<HTMLInputElement>(null);
  const [chatId, setChatId] = useState<number | null>(null);
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  console.log({ token });

  const handleConnect = () => {
    if (ref.current && refUrl.current) {
      const chatId = ref.current.value;
      const connection = refUrl.current.value;

      if (chatId) {
        console.log({ chatId });
        setChatId(Number(chatId));
        setUrl(connection);
      } else {
        alert("add chat and connection url");
      }
    }
  };

  return (
    <ChatPopupWrapper chatId={chatId} url={url} token={token}>
      <div id="main-content" className="container">
        <div className="row">
          <div className="col-sm-12">
            <form
              className="form"
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
                  gap: 4,
                }}
              >
                <div className="row">
                  <div className="col-sm-12">
                    <label>ws url</label>
                    <input
                      ref={refUrl}
                      type="string"
                      id="url"
                      className="form-control"
                      placeholder="connection url"
                    />
                  </div>
                  <div className="col-sm-12">
                    <label>chat id</label>
                    <input
                      ref={ref}
                      type="number"
                      id="chat_id"
                      className="form-control"
                      placeholder="chat id"
                    />
                  </div>
                  <div className="col-sm-12">
                    <label>token</label>
                    <input
                      type="string"
                      id="token"
                      className="form-control"
                      placeholder="token"
                      onChange={(e) => setToken(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12">
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        marginTop: 16,
                      }}
                    >
                      <button
                        id="connect"
                        className="btn btn-default"
                        type="submit"
                      >
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
                  </div>
                </div>
              </div>
            </form>
          </div>
          <hr />
          <Events chatId={chatId} url={url} />
        </div>
      </div>
    </ChatPopupWrapper>
  );
}

export default App;

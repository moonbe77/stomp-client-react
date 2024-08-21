import { useState } from "react";
import { useStompClient, useSubscription } from "react-stomp-hooks";

interface Payload {
  event: "TYPING" | "NOT_TYPING";
  name: string;
}
function Events({ chatId, url }: { chatId: number | null; url: string }) {
  const [eventType, setEventType] = useState<Payload["event"]>("TYPING");
  const [name, setName] = useState<string>("DEMO NAME");
  const [events, setEvents] = useState<Payload[]>([]);
  const stompClient = useStompClient();

  useSubscription(`/topic/chat/typing/${chatId}`, (message) => {
    const payload: Payload = JSON.parse(message.body);

    setEvents((prev) => [...prev, payload]);
  });

  const handleSend = () => {
    console.log("CLICK SEND", stompClient);
    if (stompClient) {
      const payload: Payload = {
        event: eventType,
        name: name,
      };

      stompClient.publish({
        destination: `/events/chat/typing/${chatId}`,
        body: JSON.stringify(payload),
      });
    }
  };

  return (
    <div>
      <h5>
        {stompClient?.connected ? "CONNECTED" : "DISCONNECTED"}
        {" to "}
        {url && `> ${url}`}
        <br />
        {chatId && `chat id:${chatId}`}
      </h5>
      <div className="col-md-6">
        <form
          className="form-inline"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <div
            className="form-group"
            style={{
              display: "flex",
              gap: 4,
            }}
          >
            <div className="row from-group">
              <div className="col-sm-6">
                <label>EVENT</label>
                <br />

                <select
                  className="form-control"
                  onChange={(e) =>
                    setEventType(e.target.value as Payload["event"])
                  }
                  value={eventType}
                >
                  <option value="TYPING">TYPING</option>
                  <option value="NOT_TYPING">NOT TYPING</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label>Name</label>
                <br />
                <input
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                />
              </div>
            </div>
          </div>
          <code>{`"chatId":${name},"event":"${eventType}"`}</code>
          <button id="send" className="btn btn-default" type="submit">
            Send
          </button>
        </form>
      </div>

      <div className="row">
        <div className="col-md-12">
          {events.map((event) => {
            return (
              <div>
                <div>{event.name}</div>
                <div>{event.event}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Events;

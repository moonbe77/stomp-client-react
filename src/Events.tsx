import { useState } from "react";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { CHAT_EVENTS } from "./enums";

interface Payload {
  event: CHAT_EVENTS;
  userName: string;
}

type Event = Payload & { ts: string };

function Events({ chatId, url }: { chatId: number | null; url: string }) {
  const [eventType, setEventType] = useState<Payload["event"]>(
    CHAT_EVENTS.TYPING
  );
  const [name, setName] = useState<string>("DEMO NAME");
  const [events, setEvents] = useState<Event[]>([]);
  const stompClient = useStompClient();

  useSubscription(`/topic/chat/typing/${chatId}`, (message) => {
    const payload: Payload = JSON.parse(message.body);
    const date = new Date();
    setEvents((prev) => [
      ...prev,
      {
        ...payload,
        ts: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      },
    ]);
  });

  const handleSend = () => {
    if (stompClient) {
      const payload: Payload = {
        event: eventType,
        userName: name,
      };

      stompClient.publish({
        destination: `/events/chat/typing/${chatId}`,
        body: JSON.stringify(payload),
      });
    }
  };

  return (
    <div>
      <h6>
        {stompClient?.connected ? "CONNECTED" : "DISCONNECTED"}
        {" to "}
        {url && `> ${url}`}
        <br />
        {chatId && `chat id:${chatId}`}
      </h6>
      <div className="col-md-12">
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
                <label>Name</label>
                <br />
                <input
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                />
              </div>
              <div className="col-sm-12">
                <h6>SEND EVENTS</h6>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  {Object.keys(CHAT_EVENTS).map((key) => {
                    return (
                      <button
                        className="btn btn-primary m-2"
                        key={key}
                        onClick={() => setEventType(key as Payload["event"])}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <code>{`"chatId":${name},"event":"${eventType}"`}</code>
        </form>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h5>
            Subscribed Events
            <button className="btn ml-2" onClick={() => setEvents([])}>
              clear
            </button>
          </h5>
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              marginTop: 8,
            }}
          >
            {events.map((event) => {
              return (
                <div>
                  {event.ts}:{event.userName}:{event.event}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;

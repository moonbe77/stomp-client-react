import { useState } from "react";
import { useStompClient, useSubscription } from "react-stomp-hooks";

interface Payload {
  ts: string;
  chatId: number;
  event: "TYPING" | "NOT_TYPING";
}
function Events({ chatId }: { chatId: number | null }) {
  const [eventType, setEventType] = useState<string>("TYPING");
  const [events, setEvents] = useState<Payload[]>([]);
  const stompClient = useStompClient();

  useSubscription(`/topic/chat/typing/${chatId}`, (message) => {
    const payload: {
      ts: string;
      chatId: number;
      event: "TYPING" | "NOT_TYPING";
    } = JSON.parse(message.body);

    console.log(message);
    console.log(payload);

    setEvents((prev) => [...prev, payload]);
  });

  const handleSend = () => {
    console.log("SEND", stompClient);
    if (stompClient) {
      const now = new Date();
      const payload = {
        ts: now.toISOString(),
        chatId,
        event: eventType,
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
        {stompClient?.active ? "CONNECTED" : "DISCONNECTED"}{" "}
        {chatId && `:${chatId}`}
      </h5>
      <div className="col-md-6">
        <form
          className="form-inline"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <div className="form-group">
            <label>EVENT to send TYPING | NOT_TYPING</label>
            <select
              className="form-control"
              onChange={(e) => setEventType(e.target.value)}
              value={eventType}
            >
              <option value="TYPING">TYPING</option>
              <option value="NOT_TYPING">NOT TYPING</option>
            </select>
          </div>
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
                <div>{event.event}</div>
                <div>{event.chatId}</div>
                <div>{event.ts}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Events;

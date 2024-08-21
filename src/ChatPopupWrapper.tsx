import React from "react";
import { StompSessionProvider } from "react-stomp-hooks";

const token = "123456";
const WS_URL = "wss://api-test.ivehub.com.au/app-phantom-api/v1/nt/websocket";

function ChatPopupWrapper({
  children,
  chatId,
}: {
  children: React.ReactNode;
  chatId: number | null;
}) {
  const enableWSConnection = Boolean(chatId);

  return (
    <StompSessionProvider
      url={WS_URL}
      enabled={enableWSConnection && !!token && !!chatId}
      connectHeaders={{
        token: token ?? "",
      }}
      logRawCommunication={true}
      debug={(debug) => {
        console.log({ debug });
      }}
      // onConnect={(state) => {
      // 	console.log('onConnect', state)
      // }}
      // onWebSocketError={(error) => {
      // 	console.log('onWebSocketError', error)
      // }}
      // onStompError={(err) => {
      // 	console.error('STOMP ERROR', err)
      // }}
      // onWebSocketClose={(reason) => {
      // 	console.log('WebSocketClose', reason)
      // }}
    >
      {children}
    </StompSessionProvider>
  );
}

export default ChatPopupWrapper;

import React from "react";
import { StompSessionProvider } from "react-stomp-hooks";

const token = "123456";
// const WS_URL = "wss://api-test.ivehub.com.au/app-phantom-api/v1/nt/websocket";

function ChatPopupWrapper({
  children,
  chatId,
  url,
}: {
  children: React.ReactNode;
  chatId: number | null;
  url: string;
}) {
  const enableWSConnection = Boolean(chatId) && Boolean(url);

  return (
    <StompSessionProvider
      url={url}
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

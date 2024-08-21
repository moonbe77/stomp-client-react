import React from "react";
import { StompSessionProvider } from "react-stomp-hooks";

function ChatPopupWrapper({
  children,
  chatId,
  url,
  token,
}: {
  children: React.ReactNode;
  chatId: number | null;
  url: string;
  token: string;
}) {
  const enableWSConnection = Boolean(chatId) && Boolean(url);

  return (
    <StompSessionProvider
      url={url}
      enabled={enableWSConnection && !!chatId}
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

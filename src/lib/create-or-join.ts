import { MutableRefObject } from 'react';
import { sharedWebSockets } from './globals';
import { ReadyStateState, Options } from './types';
import { ReadyState } from './constants';

export const createOrJoinSocket = (
  webSocketRef: MutableRefObject<WebSocket>,
  url: string,
  setReadyState: (callback: (prev: ReadyStateState) => ReadyStateState) => void,
  options: Options
) => {
  if (options.share) {
    if (sharedWebSockets[url] === undefined) {
      setReadyState(prev => Object.assign({}, prev, {[url]: ReadyState.CONNECTING }));
      sharedWebSockets[url] = new WebSocket(url);
    }
    webSocketRef.current = sharedWebSockets[url];
  } else {
    setReadyState(prev => Object.assign({}, prev, {[url]: ReadyState.CONNECTING }));
    webSocketRef.current = new WebSocket(url);
  }
};

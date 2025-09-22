import { useEffect, useRef, useState, useCallback } from 'react';

export function useWebSocket(
  url: string,
  onMessage: (data: any) => void,
  protocols?: string | string[],
  autoReconnect = true
) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const reconnectRef = useRef({ attempts: 0 });

  const connect = useCallback(() => {
    try {
      wsRef.current = new WebSocket(url, protocols as any);
      wsRef.current.onopen = () => {
        setConnected(true);
        reconnectRef.current.attempts = 0;
      };
      wsRef.current.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          onMessage(data);
        } catch (e) {
          onMessage(ev.data);
        }
      };
      wsRef.current.onclose = () => {
        setConnected(false);
        if (autoReconnect) {
          reconnectRef.current.attempts += 1;
          const timeout = Math.min(30000, 500 * 2 ** reconnectRef.current.attempts);
          setTimeout(connect, timeout);
        }
      };
      wsRef.current.onerror = () => {
        // noop
      };
    } catch (e) {
      // noop
    }
  }, [url, onMessage, protocols, autoReconnect]);

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const send = useCallback((payload: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  }, []);

  const close = useCallback(() => {
    if (wsRef.current) wsRef.current.close();
  }, []);

  return { connected, send, close };
}

type messageType =
  | { type: "nav"; location: string; stackLength: number }
  | {
      type: "push_topic";
      id: string;
    };

export function postMessageToWebview(message: messageType) {
  // @ts-ignore
  if (window.ReactNativeWebView) {
    // @ts-ignore
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        ...message,
      })
    );
  }
}

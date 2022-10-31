import { useState, useEffect } from 'react';

export default function StreamByTheSecond(props) {
  const [stream, setStream] = useState(props.stream);
  useEffect(() => {
    const streamUpdate = setInterval(
      () => setStream(prevStream => (prevStream += 0.00000000000001)),
      200
    );
    return () => clearInterval(streamUpdate);
  });
  return <p>{stream} MATIC</p>;
}

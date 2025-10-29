import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const RemoteLottie = ({ url }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie JSON", err));
  }, [url]);

  return (
    animationData && (
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ height: 160, width: 140 }}
      />
    )
  );
};

export default RemoteLottie;

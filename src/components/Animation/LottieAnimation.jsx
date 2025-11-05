"use client";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LottieAnimation = ({ animationData, loop, autoplay }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        animationData: animationData,
        renderer: "svg",
        loop,
        autoplay,
      });

      return () => {
        animation.destroy();
      };
    }
  }, [animationData]);

  return <div ref={containerRef} style={{ width: "200px", height: "200px" }} />;
};

export default LottieAnimation;

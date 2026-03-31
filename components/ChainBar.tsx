"use client";

const styles = (
  <style jsx global>{`
    .chain-bar {
      position: fixed;
      left: 0;
      top: 0;
      width: 3px;
      height: 100vh;
      background: linear-gradient(
        to bottom,
        #FF5F1F, 
        #9B59F5, 
        #00D4FF
      );
      z-index: 50;
      opacity: 0.6;
      pointer-events: none;
    }
  `}</style>
);

export default function ChainBar() {
  return (
    <>
      <div className="chain-bar" aria-hidden="true" />
      {styles}
    </>
  );
}

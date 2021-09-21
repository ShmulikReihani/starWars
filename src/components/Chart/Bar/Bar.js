import React, { useEffect } from "react";

function Bar({ height, name, population }) {
  useEffect(() => {
    console.log("height", height);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <div style={{ marginBottom: "15px" }}>{population}</div>
      <div
        style={{
          height: height,
          width: "80px",
          background: "lightskyblue",
          border: "solid 1px black",
          boxSizing: "border-box",
        }}
      ></div>
      <div style={{ marginTop: "15px" }}>{name}</div>
    </div>
  );
}

export default Bar;

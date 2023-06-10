import React from "react";
import yellowToken from "../../assets/yellow.svg";
import redToken from "../../assets/red.svg";

interface SlotProps {
  player: string | null;
  y: number;
  x: number;
}

const Slot: React.FC<SlotProps> = ({ player, y, x }) => {
  return (
    <div className="slot" x={x} y={y}>
      {player && (
        <img
          src={player === "player1" ? yellowToken : redToken}
          width="100%"
          height="100%"
          className="token"
        />
      )}
    </div>
  );
};

export default Slot;

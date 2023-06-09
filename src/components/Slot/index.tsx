import React from "react";
import redToken from "../../assets/red token.svg";
import blackToken from "../../assets/black token.svg";

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
          src={player === "player1" ? redToken : blackToken}
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};

export default Slot;

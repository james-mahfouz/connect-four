import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface ChildProps {
  activateFunction: () => void;
}

const PlayerName: React.FC<ChildProps> = ({ activateFunction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const local_player1 = localStorage.getItem("player1");
  const [player1, setPlayer1] = useState(
    local_player1 == null ? "player1" : local_player1
  );

  const local_player2 = localStorage.getItem("player2");
  const [player2, setPlayer2] = useState(
    local_player2 == null ? "player2" : local_player2
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSave = async () => {
    await localStorage.setItem("player1", player1);
    await localStorage.setItem("player2", player2);
    handleClose();
    activateFunction();
  };
  return (
    <>
      <Button onClick={handleOpen}>Change Names</Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose your Names</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Text mb="8px">Player 1</Text>
              <Input
                value={player1}
                onChange={(event) => setPlayer1(event.target.value)}
                placeholder="Player 1 Name"
              />
            </>
            <div className="player2-input">
              <Text mb="8px">Player 2</Text>
              <Input
                value={player2}
                onChange={(event) => setPlayer2(event.target.value)}
                placeholder="Player 2 Name"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="rgb(142, 0, 245)"
              color={"#fff"}
              mr={3}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button variant="ghost" onClick={handleSave}>
              Save Names
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlayerName;

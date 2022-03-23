/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";
import { useAwarenessMethods } from "contexts/awareness";
import Modal from "components/Modal";

const WRAPPER_HEIGHT = 140;

const LoginModal = ({ show, onHide }: any) => {
  const [name, setName] = useState("");
  const { login, updateName } = useAwarenessMethods();

  const handleSubmit = () => {
    updateName(name);
    login();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <div
        css={css`
          position: relative;
          height: ${WRAPPER_HEIGHT}px;
          width: 240px;
          overflow: hidden;
        `}
      >
        <AnimatePresence initial={false}>
          <motion.div
            css={css`
              height: ${WRAPPER_HEIGHT}px;
              width: 100%;
              position: absolute;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `}
          >
            <div>
              <b>What's your name?</b>
            </div>
            <input
              autoFocus
              placeholder="Anonymous"
              value={name}
              maxLength={40}
              css={css`
                padding: 12px;
                border-radius: 8px;
              `}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key !== "Enter") return;
                handleSubmit();
              }}
            />
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 8px;
              `}
            >
              <button
                css={css`
                  background: var(--color-green);
                  color: var(--color-black0);
                `}
                onClick={handleSubmit}
              >
                Let's go!
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default LoginModal;

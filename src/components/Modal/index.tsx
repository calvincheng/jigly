/** @jsxImportSource @emotion/react */
import React from "react";
import { createPortal } from "react-dom";
import { css } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  show: boolean;
  onHide: () => void;
  onBackdropClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  minWidth?: number;
  children: React.ReactNode;
};

const TRANSITION_DURATION = 0.35;

const modalBodyAnimateProps = {
  initial: { y: "-55%", x: "-50%", opacity: 0 },
  animate: { y: "-50%", x: "-50%", opacity: 1 },
  exit: { y: "-55%", x: "-50%", opacity: 0 },
  transition: { duration: TRANSITION_DURATION },
};

const modalBackdropAnimateProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: TRANSITION_DURATION },
};

const Modal = ({
  show,
  onHide = () => {
    console.warn("Please implement onHide handler");
  },
  minWidth = 240,
  children,
}: ModalProps) => {
  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          key="modal-backdrop"
          css={css`
            height: 100%;
            width: 100%;
            position: fixed;
            z-index: 0;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.45);
          `}
          {...modalBackdropAnimateProps}
          // onClick={handleBackdropClick}
        >
          <motion.div
            key="modal-body"
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              display: flex;
              flex-direction: column;
              gap: 20px;
              padding: 20px;
              border-radius: 10px;
              overflow: hidden;
              min-width: ${minWidth}px;
              outline: 0;
              color: white;
              background: var(--color-black3);
            `}
            {...modalBodyAnimateProps}
            onClick={(event: any) => event.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Modal.Header = ({ children }) => {
//   return (
//     <div
//       className={css`
//         display: flex;
//         flex-direction: column;
//         gap: 10px;
//       `}
//     >
//       {children}
//     </div>
//   );
// };

// Modal.Title = ({ children, className = "" }) => {
//   return (
//     <div
//       className={`${css`
//         font-size: 16px;
//         font-weight: bold;
//       `} ${className}`}
//     >
//       {children}
//     </div>
//   );
// };

// Modal.Subtitle = ({ children }) => {
//   return (
//     <div
//       className={css`
//         font-size: 14px;
//         color: #9e9e9e;
//       `}
//     >
//       {children}
//     </div>
//   );
// };

// Modal.Content = ({ children }) => {
//   return (
//     <div
//       className={css`
//         font-size: 14px;
//         line-height: 1.3;
//       `}
//     >
//       {children}
//     </div>
//   );
// };

// Modal.Footer = ({ children }) => {
//   return (
//     <div
//       className={css`
//         display: flex;
//         justify-content: flex-end;
//       `}
//     >
//       {children}
//     </div>
//   );
// };

// Modal.CloseButton = ({ onHide }) => {
//   return (
//     <div
//       className={css`
//         position: absolute;
//         top: 12px;
//         right: 12px;
//         padding: 8px;
//         cursor: pointer;
//         color: #9e9e9e;
//         border-radius: 4px;
//       `}
//       onClick={() => {
//         onHide();
//       }}
//     >
//       <FontAwesomeIcon icon={["fas", "times"]} />
//     </div>
//   );
// };

export default Modal;

import React from "react";
import PropTypes from "prop-types";
import classes from "./Drawer.module.scss";
import { FaX } from "react-icons/fa6";

import { changeAnchor } from "./helper";
import Button from "../Button";
interface DrawerProps {
  open: boolean;
  anchor: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  anchor,
  onClose,
  children,
}) => {
  const {
    drawer,
    animate,
    hidden,
    overlay,
    overlayOpen,
    overlayHidden,
    header,
  } = classes;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleButtonClick = () => {
    onClose();
  };

  return (
    <>
      <div
        className={`${overlay} ${!open ? overlayHidden : overlayOpen}`}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        tabIndex={-1}
        className={`${drawer} ${open ? animate : hidden} ${changeAnchor(
          anchor,
          classes
        )}`}
      >
        <div className={header}>
          <h5>Menu</h5>
          <Button onClick={handleButtonClick}>
            <FaX />
          </Button>
        </div>

        {children}
      </div>
    </>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  anchor: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

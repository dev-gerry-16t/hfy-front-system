import React from "react";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const CustomDialog = (props) => {
  const { isVisibleDialog, onClose, children, full = "sm" } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(full));
  return (
    <Dialog className="onboarding-dialog" open={isVisibleDialog} onClose={onClose} fullScreen={fullScreen}>
      {children}
    </Dialog>
  );
};

export default CustomDialog;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import styles from "./ImageDialog.module.css";

export type ImageDialogProps = {
  imgSrc: string;
  onCloseRequested: () => void;
};

export const ImageDialog: React.FC<ImageDialogProps> = ({
  imgSrc,
  onCloseRequested,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={!!imgSrc}
      onClose={onCloseRequested}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Image preview</DialogTitle>
      <DialogContent>
        <img className={styles.image} src={imgSrc} />
        <DialogActions>
          <Button onClick={onCloseRequested} color="primary">
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

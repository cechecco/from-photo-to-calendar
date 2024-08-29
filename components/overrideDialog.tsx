import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OverrideDialogProps {
  showOverwriteDialog: boolean;
  setShowOverwriteDialog: (show: boolean) => void;
  handleOverwriteConfirm: (overwrite: boolean) => void;
}

const OverrideDialog: React.FC<OverrideDialogProps> = ({
  showOverwriteDialog,
  setShowOverwriteDialog,
  handleOverwriteConfirm
}) => {
  return (
    <Dialog open={showOverwriteDialog} onOpenChange={setShowOverwriteDialog}>
      <DialogContent>
        <DialogTitle>Overwrite Existing Images?</DialogTitle>
        <DialogDescription>
          <p>
            You have already extracted data from images. Do you want to
            overwrite the existing images and data with the new ones?
          </p>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => handleOverwriteConfirm(false)}>No</Button>
          <Button onClick={() => handleOverwriteConfirm(true)}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OverrideDialog;


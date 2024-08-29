import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InvalidFilesDialogProps {
  showInvalidFilesDialog: boolean;
  setShowInvalidFilesDialog: (show: boolean) => void;
  invalidFiles: { name: string; reason: string }[];
}

const InvalidFilesDialog: React.FC<InvalidFilesDialogProps> = ({
  showInvalidFilesDialog,
  setShowInvalidFilesDialog,
  invalidFiles
}) => {
  return (
    <Dialog
      open={showInvalidFilesDialog}
      onOpenChange={setShowInvalidFilesDialog}
    >
      <DialogContent>
        <DialogTitle>Invalid Files</DialogTitle>
        <DialogDescription>
          <ul>
            {invalidFiles.map((file, index) => (
              <li key={index}>
                {file.name} - {file.reason}
              </li>
            ))}
          </ul>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setShowInvalidFilesDialog(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvalidFilesDialog;

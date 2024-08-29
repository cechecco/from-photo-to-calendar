import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InfoDialogProps {
  showInfoDialog: boolean;
  setShowInfoDialog: (show: boolean) => void;
}

const InfoDialog: React.FC<InfoDialogProps> = ({ showInfoDialog, setShowInfoDialog }) => {
  return (
    <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>PHOTO-to-CALENDAR</DialogTitle>
          <DialogDescription>
            <div className="space-y-4">
              <p>
                <span className="inline-block mr-2">🚀</span>
                This is a demonstration project that allows you to try the tool for free.
              </p>
              
              <p>
                <span className="inline-block mr-2">💡</span>
                This is just an example, and it&apos;s possible to build customized products. If you&apos;re interested in purchasing, want more information, or have a specific project in mind, feel free to contact me:
              </p>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('desalvadorfrancesco@gmail.com');
                }}
                className="flex items-center text-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span className="inline-block mr-2">✉️</span>
                <strong>desalvadorfrancesco@gmail.com</strong>
              </button>

              <p>
                <span className="inline-block mr-2">📂</span>
                You can find the source code for this project on GitHub:
              </p>
              <a 
                href="https://github.com/cechecco/from-photo-to-calendar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
              >
                <span className="inline-block mr-2">🔗</span>
                <strong>github.com/cechecco/from-photo-to-calendar</strong>
              </a>

              <p className="italic font-semibold text-yellow-600 bg-yellow-100 p-3 rounded-lg">
                <span className="inline-block mr-2">⚠️</span>
                I kindly ask you to use the service sparingly, as I am covering the costs for testing, and each use incurs expenses.
              </p>

              <p>
                <span className="inline-block mr-2">🌟</span>
                Feel free to explore, and if you find it useful, don&apos;t hesitate to reach out for purchases or collaborations.
              </p>

              <p className="font-medium">
                <span className="inline-block mr-2">🙏</span>
                Thank you for your understanding!
              </p>
            </div>

          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Got it, thanks!
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
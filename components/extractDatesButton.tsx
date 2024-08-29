import React from 'react';
import { Button } from "@/components/ui/button";

interface ExtractDatesButtonProps {
  handleSubmit: () => void;
  isExporting: boolean;
  selectedFiles: any[];
}

const ExtractDatesButton: React.FC<ExtractDatesButtonProps> = ({
  handleSubmit,
  isExporting,
  selectedFiles
}) => {
  return (
    <div className="w-full">
      <Button
        onClick={handleSubmit}
        disabled={isExporting || selectedFiles.length === 0}
        className="text-foreground bg-background w-full font-bold rounded-lg shadow-lg transform transition-all duration-150 ease-in-out active:scale-95 active:shadow-md"
      >
        {isExporting ? (
          <>
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          </>
        ) : (
          "Extract Dates"
        )}
      </Button>
    </div>
  );
};

export default ExtractDatesButton;

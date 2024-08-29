import React, { useRef } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onPaste: (event: React.ClipboardEvent<HTMLDivElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  handleFileSelect,
  onDrop,
  onPaste,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="h-2/5 flex flex-col items-center space-y-4 flex-grow"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onPaste={onPaste}
    >
      <Label
        htmlFor="photo-upload"
        className="w-full flex-grow flex flex-col"
      >
        <div
          className={'cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg'}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ImageIcon className="w-8 h-8 mb-4 text-gray-400" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span>{" "}
              or drag and drop or paste
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG (MAX. 2MB)
            </p>
          </div>
        </div>
      </Label>
      <Input
        id="photo-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
        aria-label="Upload photos"
        ref={fileInputRef}
      />
    </div>
  );
};

export default ImageUploader;

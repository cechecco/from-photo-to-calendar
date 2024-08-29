import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, ImageIcon, AlertCircle } from "lucide-react";
import { UploadedFile } from "@/types";

interface ImagePreviewProps {
  uploadedFiles: UploadedFile[];
  currentFileIndex: number;
  setCurrentFileIndex: React.Dispatch<React.SetStateAction<number>>;
  handleRemoveFile: (index: number) => void;
  errors: { [key: string]: string };
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  uploadedFiles,
  currentFileIndex,
  setCurrentFileIndex,
  handleRemoveFile,
  errors,
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dialogImageIndex, setDialogImageIndex] = React.useState(0);

  React.useEffect(() => {
    if (uploadedFiles.length > 0) {
      setCurrentFileIndex(uploadedFiles.length - 1);
    }
  }, [uploadedFiles, setCurrentFileIndex]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setDialogImageIndex(0);
  };

  return (
    <div className="relative w-full h-3/5 rounded-lg border flex flex-col items-center justify-center overflow-hidden">
      {uploadedFiles.length > 0 ? (
        <>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Image
                src={uploadedFiles[currentFileIndex].url}
                alt={`Preview ${currentFileIndex + 1}`}
                layout="fill"
                objectFit="contain"
                className="rounded-lg cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              />
            </DialogTrigger>
            <DialogContent className="max-w-3xl h-[80vh]" onInteractOutside={handleDialogClose}>
              {uploadedFiles.length > 0 && (
                <div className="relative h-[calc(80vh-100px)]">
                  <Image
                    src={uploadedFiles[dialogImageIndex].url}
                    alt={`Preview ${dialogImageIndex + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                  {uploadedFiles.length > 1 && (
                    <>
                      <Button
                        size="icon"
                        className="absolute top-1/2 left-2 transform -translate-y-1/2"
                        onClick={() => setDialogImageIndex((prev) => (prev - 1 + uploadedFiles.length) % uploadedFiles.length)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2"
                        onClick={() => setDialogImageIndex((prev) => (prev + 1) % uploadedFiles.length)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              )}
              <div>
                <p className="text-center">Image {dialogImageIndex + 1} of {uploadedFiles.length}</p>
                <p className="text-center mt-1 text-sm text-muted-foreground">{uploadedFiles[dialogImageIndex].name}</p>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={() => handleRemoveFile(currentFileIndex)}
          >
            <X className="h-4 w-4" />
          </Button>
          {uploadedFiles.length > 1 && (
            <>
              <Button
                size="icon"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
                onClick={() => setCurrentFileIndex((prev) => (prev - 1 + uploadedFiles.length) % uploadedFiles.length)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10"
                onClick={() => setCurrentFileIndex((prev) => (prev + 1) % uploadedFiles.length)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <p className="text-center text-sm">Image {currentFileIndex + 1} of {uploadedFiles.length}</p>
            <p className="text-center text-xs truncate">{uploadedFiles[currentFileIndex].name}</p>
            <p className={`text-center text-xs text-white bg-red-600 p-1 text-nowrap mt-0.5 rounded-full ${errors[uploadedFiles[currentFileIndex].name] ? "" : "invisible"}`}>
              <AlertCircle className="inline-block w-4 h-4 mr-1" />
              {errors[uploadedFiles[currentFileIndex].name] || ""}
            </p>
          </div>
        </>
      ) : (
        <>
          <ImageIcon className="w-16 h-16 text-gray-400 mb-2" />
          <p className="text-sm text-muted-foreground">No image selected</p>
        </>
      )}
    </div>
  );
};

export default ImagePreview;

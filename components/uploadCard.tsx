import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import About from "@/components/about";
import Rules from "@/components/rules";
import ImageUploader from "@/components/imageUploader";
import ImagePreview from "@/components/imagePreview";
import ExtractDatesButton from "@/components/extractDatesButton";
import { UploadedFile } from "@/types";
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { Button } from './ui/button';

interface UploadCardProps {
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handlePaste: (event: React.ClipboardEvent<HTMLDivElement>) => void;
  uploadedFiles: UploadedFile[];
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  handleRemoveImage: (index: number) => void;
  errors: { [key: string]: string };
  handleSubmit: () => void;
  isExporting: boolean;
  showDownloadCard: boolean;
  setShowDownloadCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadCard: React.FC<UploadCardProps> = ({
  handleFileSelect,
  handleDrop,
  handlePaste,
  uploadedFiles,
  currentImageIndex,
  setCurrentImageIndex,
  handleRemoveImage,
  errors,
  handleSubmit,
  isExporting,
  showDownloadCard,
  setShowDownloadCard,
}) => {
  return (
    <Card className={`bg-foreground text-background w-full h-[100vh] lg:h-auto lg:w-[400px] flex flex-col flex-shrink-0 ${showDownloadCard ? 'hidden lg:flex' : 'flex'}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 justify-between">
        <div className="flex-col items-center">
            <p>Upload Photos</p>
          </div>
          <Button 
              className="lg:hidden flex items-center" 
              onClick={() => setShowDownloadCard(true)} 
              size="sm"
            >
              Events
              <ArrowBigRight className="ml-1" />
            </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col space-y-4">
        <Rules />
        <div className="flex flex-col h-full space-y-4">
          <ImageUploader
            handleFileSelect={handleFileSelect}
            onDrop={handleDrop}
            onPaste={handlePaste}
          />
          <ImagePreview
            uploadedFiles={uploadedFiles}
            currentFileIndex={currentImageIndex}
            setCurrentFileIndex={setCurrentImageIndex}
            handleRemoveFile={handleRemoveImage}
            errors={errors}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4">
        <ExtractDatesButton
          handleSubmit={handleSubmit}
          isExporting={isExporting}
          selectedFiles={uploadedFiles}
        />
      </CardFooter>
    </Card>
  );
};

export default UploadCard;

"use client";

import { useState, useEffect, useCallback } from "react";
import { compute } from "@/app/actions/compute";
import OverrideDialog from "@/components/overrideDialog";
import InvalidFilesDialog from "@/components/invalidFileDialog";
import UploadCard from "@/components/uploadCard";
import DownloadCard from "@/components/downloadCard";
import { UploadedFile, ParsedEvent } from "@/types";
import InfoDialog from "@/components/infoDialog";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [result, setResult] = useState("");
  const [parsedResult, setParsedResult] = useState<ParsedEvent[]>([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [showOverwriteDialog, setShowOverwriteDialog] = useState(false);
  const [tempFiles, setTempFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [invalidFiles, setInvalidFiles] = useState<
    Array<{ name: string; reason: string }>
  >([]);
  const [showInvalidFilesDialog, setShowInvalidFilesDialog] = useState(false);
  const [hasExtracted, setHasExtracted] = useState(false);
  const [showDownloadCard, setShowDownloadCard] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(true);
  const [noDataFound, setNoDataFound] = useState(false);

  const handleFiles = useCallback(
    (files: File[]) => {
      if (isExporting) return;

      Promise.all(
        files.map(
          (file) =>
            new Promise<UploadedFile>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const base64 = reader.result as string;
                resolve({
                  name: file.name,
                  url: URL.createObjectURL(file),
                  base64: base64.split(",")[1],
                  type: base64.split(";")[0].split("/")[1],
                  lastModified: file.lastModified,
                });
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            })
        )
      ).then((newFiles) => {
        const validFiles: UploadedFile[] = [];
        const invalidFiles: { name: string; reason: string }[] = [];

        newFiles.forEach((file) => {
          if (file.base64.length > 2 * 1024 * 1024) {
            invalidFiles.push({
              name: file.name,
              reason: "File size exceeds 2MB",
            });
          } else if (!["png", "jpg", "jpeg"].includes(file.type)) {
            invalidFiles.push({ name: file.name, reason: "Invalid file type" });
          } else if (uploadedFiles.some((f) => f.base64 === file.base64)) {
            invalidFiles.push({ name: file.name, reason: "Duplicate file" });
          } else {
            validFiles.push(file);
          }
        });

        if (invalidFiles.length > 0) {
          setInvalidFiles(invalidFiles);
          setShowInvalidFilesDialog(true);
        }

        if (validFiles.length > 0) {
          if (hasExtracted && parsedResult.length > 0) {
            setTempFiles(validFiles);
            setShowOverwriteDialog(true);
          } else {
            addNewFiles(validFiles);
          }
          setNoDataFound(false); // Reset noDataFound when new files are added
        }
      });
    },
    [isExporting, hasExtracted, parsedResult, uploadedFiles]
  );

  const addNewFiles = (newFiles: UploadedFile[]) => {
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleOverwriteConfirm = (overwrite: boolean) => {
    if (overwrite) {
      setUploadedFiles(tempFiles);
    } else {
      addNewFiles(tempFiles);
    }
    setTempFiles([]);
    setShowOverwriteDialog(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(Array.from(files));
      event.target.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const items = event.clipboardData.items;
    const imageFiles = Array.from(items)
      .filter((item) => item.type.indexOf("image") !== -1)
      .map((item) => item.getAsFile())
      .filter((file): file is File => file !== null);

    handleFiles(imageFiles);
  };

  const handleRemoveImage = (index: number) => {
    setUploadedFiles((prevImages) => prevImages.filter((_, i) => i !== index));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[uploadedFiles[index].name];
      return newErrors;
    });
    if (currentFileIndex >= uploadedFiles.length - 1) {
      setCurrentFileIndex(Math.max(0, uploadedFiles.length - 2));
    }
    if (uploadedFiles.length === 1) {
      setNoDataFound(false); // Reset noDataFound when the last image is removed
    }
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      return;
    }

    try {
      setIsExporting(true);
      setErrors({});
      let newResults: any[] = [];
      let newErrors = {};

      for (const file of uploadedFiles) {
        try {
          const response = await compute([file]);
          if (response && response !== "[") {
            const parsed = JSON.parse(response);
            console.log('parsed', parsed);
            newResults = [...newResults, ...parsed];
          }
        } catch (error) {
          console.error(`Error processing ${file.name}`);
          newErrors = { ...newErrors, [file.name]: "Error processing file" };
        }
      }

      // Combine new results with existing results
      const combinedResults = [...parsedResult, ...newResults];

      setResult(JSON.stringify(combinedResults));
      setParsedResult(combinedResults.map(item => ({
        ...item,
        checked: true,
      })));
      setErrors(newErrors);
      setHasExtracted(true);
      setShowDownloadCard(true);
      setNoDataFound(combinedResults.length === 0);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const updateResultItem = (
    index: number,
    field: string,
    value: string
  ) => {
    setParsedResult((prevResult) => {
      const newResult = [...prevResult];
      newResult[index] = { ...newResult[index], [field]: value };
      return newResult;
    });
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    setParsedResult((prevResult) => {
      const newResult = [...prevResult];
      newResult[index] = { ...newResult[index], checked };
      return newResult;
    });
  };

  const addNewRow = () => {
    if (parsedResult.length === 0 || parsedResult.every((item) => item.date)) {
      setParsedResult((prev) => [
        ...prev,
        { date: "", hour: "", title: "", summary: "", location: "", description: "", status: "", checked: false },
      ]);
    } else {
      alert(
        "Please fill in the date for the existing row before adding a new one."
      );
    }
  };

  const clearAllData = () => {
    setUploadedFiles([]);
    setParsedResult([]);
    setResult("");
    setHasExtracted(false);
  };

  useEffect(() => {
    if (result && result !== "[") {
      try {
        const parsed = JSON.parse(result);
        setParsedResult(
          parsed.map((item: any) => ({
            date: item.date || "",
            hour: item.hour || "",
            title: item.title || "",
            summary: item.summary || "",
            location: item.location || "",
            description: item.description || "",
            status: item.status || "",
            checked: true,
          }))
        );
      } catch (error) {
        console.error("Error parsing result:", error);
        setParsedResult([]);
      }
    } else {
      setParsedResult([]);
    }
  }, [result]);

  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const items = e.clipboardData?.items;
      if (items) {
        const imageItems = Array.from(items).filter(
          (item) => item.type.indexOf("image") !== -1
        );
        if (imageItems.length > 0) {
          const imageFiles = imageItems
            .map((item) => item.getAsFile())
            .filter((file): file is File => file !== null);
          handleFiles(imageFiles);
        }
      }
    };

    document.addEventListener("paste", handleGlobalPaste);

    return () => {
      document.removeEventListener("paste", handleGlobalPaste);
    };
  }, [handleFiles]);

  useEffect(() => {
    setShowInfoDialog(true);
  }, []);

  return (
    <>
    <div className="bg-background w-full lg:h-[100vh] lg:p-4 flex flex-col lg:flex-row lg:space-x-4 lg:space-y-0">
      <UploadCard
        handleFileSelect={handleFileSelect}
        handleDrop={handleDrop}
        handlePaste={handlePaste}
        uploadedFiles={uploadedFiles}
        currentImageIndex={currentFileIndex}
        setCurrentImageIndex={setCurrentFileIndex}
        handleRemoveImage={handleRemoveImage}
        errors={errors}
        handleSubmit={handleSubmit}
        isExporting={isExporting}
        showDownloadCard={showDownloadCard}
        setShowDownloadCard={setShowDownloadCard}
      />
      <DownloadCard
        parsedResult={parsedResult}
        updateResultItem={updateResultItem}
        handleCheckboxChange={handleCheckboxChange}
        addNewRow={addNewRow}
        clearAllData={clearAllData}
        showDownloadCard={showDownloadCard}
        setShowDownloadCard={setShowDownloadCard}
        noDataFound={noDataFound}
      />
      <OverrideDialog showOverwriteDialog={showOverwriteDialog} setShowOverwriteDialog={setShowOverwriteDialog} handleOverwriteConfirm={handleOverwriteConfirm} />
      <InvalidFilesDialog showInvalidFilesDialog={showInvalidFilesDialog} setShowInvalidFilesDialog={setShowInvalidFilesDialog} invalidFiles={invalidFiles} />
    </div>
    <InfoDialog 
      showInfoDialog={showInfoDialog} 
      setShowInfoDialog={setShowInfoDialog} 
    />
    </>
  );
}

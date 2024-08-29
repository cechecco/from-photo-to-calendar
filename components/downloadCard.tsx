import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import ExportToICSButton from "@/components/exportToIcsButton";
import TableEvents from "./tableEvents";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface DownloadCardProps {
  parsedResult: Array<{
    date: string;
    title: string;
    hour: string;
    checked: boolean;
  }>;
  updateResultItem: (index: number, field: string, value: string) => void;
  handleCheckboxChange: (index: number, checked: boolean) => void;
  addNewRow: () => void;
  clearAllData: () => void;
  showDownloadCard: boolean;
  setShowDownloadCard: (show: boolean) => void;
  noDataFound: boolean;
}

export default function DownloadCard({
  parsedResult,
  updateResultItem,
  handleCheckboxChange,
  addNewRow,
  clearAllData,
  showDownloadCard,
  setShowDownloadCard,
  noDataFound,
}: DownloadCardProps) {
  return (
    <Card
      className={`flex-grow flex flex-col w-full h-[100vh] lg:h-full lg:w-[400px] flex-shrink-0 ${
        showDownloadCard ? "flex" : "hidden lg:flex"
      }`}
    >
      <CardHeader className="">
        <CardTitle className="flex items-center justify-between">
          <div className="flex-col items-center">
            <p>Extracted Events</p>
          </div>
          
          <Button
              className="lg:hidden flex items-center"
              onClick={() => setShowDownloadCard(false)}
              variant="outline"
              size="sm"
            >
              <ArrowBigLeft className="mr-1" />
              <p>Upload</p>
            </Button>
          
        </CardTitle>
        <div className="flex space-x-2 w-full">
            <Button onClick={addNewRow} variant="outline" size="sm" className="w-1/2">
              Add Row
            </Button>
            <Button onClick={clearAllData} variant="outline" size="sm" className="w-1/2">
              Clear All
            </Button>
          </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col overflow-y-scroll relative">
        {noDataFound ? (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Data Found</AlertTitle>
            <AlertDescription>
              No events were extracted from the uploaded images. Please try again with different images or check the image quality.
            </AlertDescription>
          </Alert>
        ) : parsedResult.length > 0 ? (
          <TableEvents
            parsedResult={parsedResult}
            updateResultItem={updateResultItem}
            handleCheckboxChange={handleCheckboxChange}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <p className="text-muted-foreground text-lg">No events extracted yet</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <ExportToICSButton parsedResult={parsedResult} />
      </CardFooter>
    </Card>
  );
}

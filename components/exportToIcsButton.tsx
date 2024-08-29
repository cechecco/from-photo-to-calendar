import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToICS } from "@/app/utils";

interface ExportToICSProps {
  parsedResult: Array<{
    date: string;
    title: string;
    hour: string;
    checked: boolean;
  }>;
}

const ExportToICS: React.FC<ExportToICSProps> = ({ parsedResult }) => {
  return (
    <Button
      onClick={() => exportToICS(parsedResult)}
      disabled={parsedResult.length === 0}
      className="font-bold w-full"
    >
      <Download className="w-3 h-3 md:mr-2" />
      <span className="hidden md:inline">Download ICS File</span>
    </Button>
  );
};

export default ExportToICS;

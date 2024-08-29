export interface UploadedFile {
  name: string;
  url: string;
  base64: string;
  type: string;
  lastModified: number;
}

export interface ParsedEvent {
  date: string;
  hour: string;
  title: string;
  summary?: string;
  location?: string;
  description?: string;
  status?: string;
  checked: boolean;
}
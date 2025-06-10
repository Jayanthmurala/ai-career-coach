import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Delete, File, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
const ResumeUpload = ({ open, setOpen }) => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = useUser();
  const userId = user?.id;
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const recordId = uuid();
      const formData = new FormData();
      formData.append("recordId", recordId);
      formData.append("file", selectedFile);
      formData.append("userId", userId);

      const res = await axios.post("/api/ai-resume-agent", formData);
      console.log("Resume analysis result:", res.data);
      if (res.status !== 200) return;

      router.push(`/resume-analyzer/${recordId}`);

      // Optionally handle this data in UI (e.g., pass to parent)
      setSelectedFile(null);
      setOpen(false);
    } catch (err) {
      console.error("Error analyzing resume:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Resume PDF</DialogTitle>
          <DialogDescription>
            <label
              htmlFor="file-input"
              className="flex cursor-pointer justify-center items-center rounded-lg border border-dashed border-primary/50 bg-card px-6 py-3 text-center text-sm font-medium text-primary hover:bg-accent hover:text-accent-foreground"
            >
              <File className="mr-2 h-10 w-10" />
              {selectedFile ? selectedFile.name : "Upload file"}
            </label>
            <input
              type="file"
              id="file-input"
              className="sr-only"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between items-center">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setSelectedFile(null)}
          >
            Cancel
          </Button>

          <Button
            className="cursor-pointer"
            onClick={handleAnalyze}
            disabled={!selectedFile || loading}
          >
            {loading ? (
              "Analyzing..."
            ) : (
              <>
                <Sparkles className="mr-2" /> Analyze
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUpload;

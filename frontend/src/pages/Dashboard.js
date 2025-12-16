import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, LogOut, History, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.name.toLowerCase();
      if (!fileType.endsWith('.pdf') && !fileType.endsWith('.docx')) {
        toast.error('Please upload a PDF or DOCX file');
        return;
      }
      setFile(selectedFile);
      toast.success(`File "${selectedFile.name}" selected`);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please select a resume file');
      return;
    }
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('job_description', jobDescription);

      const response = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Analysis failed');
      }

      const result = await response.json();
      toast.success('Analysis complete!');
      navigate(`/results/${result.analysis_id}`);
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error.message || 'Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-white border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <span className="text-accent font-mono font-bold text-xl">R</span>
              </div>
              <span className="font-heading font-bold text-xl text-primary tracking-tight">ResuMatch AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/history')}
                variant="ghost"
                data-testid="history-button"
                className="hover:bg-primary/5 text-primary rounded-none px-4 py-2 font-medium"
              >
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                data-testid="logout-button"
                className="hover:bg-primary/5 text-primary rounded-none px-4 py-2 font-medium"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-primary mb-4">
            Analyze Your Resume
          </h1>
          <p className="text-lg text-primary/70">
            Upload your resume and paste the job description to get AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Upload */}
          <div className="bg-white border border-primary/10 p-8" data-testid="resume-upload-section">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-primary">
                Your Resume
              </h2>
            </div>

            <div className="border-2 border-dashed border-primary/20 p-12 text-center hover:border-primary/40 transition-colors">
              <input
                type="file"
                id="resume-upload"
                data-testid="resume-file-input"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer block"
              >
                <Upload className="h-12 w-12 text-primary/40 mx-auto mb-4" />
                {file ? (
                  <div>
                    <p className="font-mono text-sm text-accent mb-2">File Selected:</p>
                    <p className="font-medium text-primary" data-testid="selected-file-name">{file.name}</p>
                    <p className="text-xs text-primary/60 mt-2">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-primary mb-2">
                      Click to upload resume
                    </p>
                    <p className="text-sm text-primary/60">
                      PDF or DOCX (Max 10MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white border border-primary/10 p-8" data-testid="job-description-section">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-primary">
                Job Description
              </h2>
            </div>

            <Textarea
              data-testid="job-description-input"
              placeholder="Paste the job description here...

Example:
We are looking for a Senior Software Engineer with:
- 5+ years of experience in React and Node.js
- Strong knowledge of AWS cloud services
- Experience with CI/CD pipelines
- Excellent problem-solving skills"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="rounded-none border-2 border-primary/10 bg-white px-4 py-3 focus:border-primary focus:ring-0 font-mono text-sm min-h-[300px] resize-none"
            />
          </div>
        </div>

        {/* Analyze Button */}
        <div className="mt-12 text-center">
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !file || !jobDescription.trim()}
            data-testid="analyze-button"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-12 py-8 font-mono uppercase tracking-wider text-lg shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
          >
            {isAnalyzing ? (
              <>
                <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-3"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-5 w-5" />
                Analyze Resume
              </>
            )}
          </Button>
          <p className="text-sm text-primary/60 mt-4 font-mono">
            Analysis typically takes 5-10 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

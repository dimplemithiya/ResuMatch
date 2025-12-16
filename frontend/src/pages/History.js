import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Trash2, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { format } from 'date-fns';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const History = () => {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/analyses`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analyses');
      }

      const data = await response.json();
      setAnalyses(data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load analysis history');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (analysisId) => {
    if (!window.confirm('Are you sure you want to delete this analysis?')) {
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/analyses/${analysisId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete analysis');
      }

      toast.success('Analysis deleted successfully');
      setAnalyses(analyses.filter(a => a.analysis_id !== analysisId));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete analysis');
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#CCFF00';
    if (score >= 60) return '#FFD700';
    return '#FF4D00';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-primary font-mono text-sm">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-white border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              data-testid="back-to-dashboard-button"
              className="hover:bg-primary/5 text-primary rounded-none px-4 py-2 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-primary mb-4">
            Analysis History
          </h1>
          <p className="text-lg text-primary/70">
            View and manage your past resume analyses
          </p>
        </div>

        {analyses.length === 0 ? (
          <div className="bg-white border border-primary/10 p-12 text-center" data-testid="empty-history-state">
            <FileText className="h-16 w-16 text-primary/20 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-semibold text-primary mb-2">
              No Analyses Yet
            </h2>
            <p className="text-primary/60 mb-6">
              Start by analyzing your first resume
            </p>
            <Button
              onClick={() => navigate('/dashboard')}
              data-testid="start-first-analysis-button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-4 font-mono uppercase tracking-wider text-sm shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-hover transition-all"
            >
              Analyze Resume
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6" data-testid="analyses-list">
            {analyses.map((analysis) => (
              <div
                key={analysis.analysis_id}
                data-testid={`analysis-card-${analysis.analysis_id}`}
                className="bg-white border border-primary/10 p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="text-4xl font-heading font-extrabold"
                        style={{ color: getScoreColor(analysis.overall_score) }}
                      >
                        {analysis.overall_score}%
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-primary mb-1">
                          {analysis.resume_filename}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-primary/60 font-mono">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(analysis.created_at), 'MMM dd, yyyy HH:mm')}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                          Skills
                        </div>
                        <div className="font-heading text-xl font-bold text-primary">
                          {analysis.skill_match_score}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                          Experience
                        </div>
                        <div className="font-heading text-xl font-bold text-primary">
                          {analysis.experience_score}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                          ATS
                        </div>
                        <div className="font-heading text-xl font-bold text-primary">
                          {analysis.ats_score}%
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-primary/70 line-clamp-2">
                      {analysis.matched_skills.length} matched skills • {analysis.missing_skills.length} missing skills
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => navigate(`/results/${analysis.analysis_id}`)}
                      data-testid={`view-analysis-${analysis.analysis_id}`}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-6 py-3 font-mono uppercase tracking-wider text-xs shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-hover transition-all"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      onClick={() => handleDelete(analysis.analysis_id)}
                      variant="outline"
                      data-testid={`delete-analysis-${analysis.analysis_id}`}
                      className="bg-white border-2 border-destructive text-destructive hover:bg-destructive/5 rounded-none px-6 py-3 font-mono uppercase tracking-wider text-xs transition-all"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
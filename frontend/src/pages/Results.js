import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, TrendingUp, FileText, Target, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Results = () => {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/analyses/${analysisId}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch analysis');
        }

        const data = await response.json();
        setAnalysis(data);
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Failed to load analysis results');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [analysisId, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-primary font-mono text-sm">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#CCFF00';
    if (score >= 60) return '#FFD700';
    return '#FF4D00';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Work';
  };

  const radarData = [
    { subject: 'Skills', value: analysis.skill_match_score, fullMark: 100 },
    { subject: 'Experience', value: analysis.experience_score, fullMark: 100 },
    { subject: 'ATS', value: analysis.ats_score, fullMark: 100 },
  ];

  const barData = [
    { name: 'Skill Match', score: analysis.skill_match_score },
    { name: 'Experience', score: analysis.experience_score },
    { name: 'ATS Score', score: analysis.ats_score },
  ];

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
              New Analysis
            </Button>
            <Button
              onClick={() => navigate('/history')}
              variant="ghost"
              data-testid="view-history-button"
              className="hover:bg-primary/5 text-primary rounded-none px-4 py-2 font-medium"
            >
              <History className="h-4 w-4 mr-2" />
              View History
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overall Score */}
        <div className="mb-12">
          <div className="bg-white border border-primary/10 p-12 shadow-brutal">
            <div className="text-center">
              <div className="inline-block px-4 py-2 border border-primary/20 bg-secondary mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-primary">Analysis Results</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-heading font-extrabold tracking-tighter mb-4" style={{ color: getScoreColor(analysis.overall_score) }}>
                {analysis.overall_score}%
              </h1>
              <p className="text-2xl font-heading font-semibold text-primary mb-2">
                {getScoreLabel(analysis.overall_score)} Match
              </p>
              <p className="text-primary/60 font-mono text-sm">
                Resume: {analysis.resume_filename}
              </p>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-primary/10 p-6" data-testid="skill-match-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Skill Match</div>
                <div className="font-heading text-3xl font-bold text-primary">{analysis.skill_match_score}%</div>
              </div>
            </div>
            <Progress value={analysis.skill_match_score} className="h-2" />
          </div>

          <div className="bg-white border border-primary/10 p-6" data-testid="experience-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Experience</div>
                <div className="font-heading text-3xl font-bold text-primary">{analysis.experience_score}%</div>
              </div>
            </div>
            <Progress value={analysis.experience_score} className="h-2" />
          </div>

          <div className="bg-white border border-primary/10 p-6" data-testid="ats-score-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">ATS Score</div>
                <div className="font-heading text-3xl font-bold text-primary">{analysis.ats_score}%</div>
              </div>
            </div>
            <Progress value={analysis.ats_score} className="h-2" />
          </div>
        </div>

        {/* Visual Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-primary/10 p-8" data-testid="radar-chart-section">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-6">Performance Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#0F291E" strokeOpacity={0.1} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#0F291E', fontSize: 14 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#0F291E', fontSize: 12 }} />
                <Radar name="Score" dataKey="value" stroke="#CCFF00" fill="#CCFF00" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-primary/10 p-8" data-testid="bar-chart-section">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-6">Score Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0F291E" strokeOpacity={0.1} />
                <XAxis dataKey="name" tick={{ fill: '#0F291E', fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#0F291E', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#F5F5F0', border: '1px solid #0F291E' }} />
                <Bar dataKey="score" radius={[0, 0, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-primary/10 p-8" data-testid="matched-skills-section">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-heading font-semibold text-primary">
                Matched Skills ({analysis.matched_skills.length})
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.matched_skills.map((skill, index) => (
                <div
                  key={index}
                  data-testid={`matched-skill-${index}`}
                  className="px-4 py-2 bg-accent/20 border border-accent text-primary font-mono text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-primary/10 p-8" data-testid="missing-skills-section">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="h-6 w-6 text-destructive" />
              <h2 className="text-2xl font-heading font-semibold text-primary">
                Missing Skills ({analysis.missing_skills.length})
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.missing_skills.map((skill, index) => (
                <div
                  key={index}
                  data-testid={`missing-skill-${index}`}
                  className="px-4 py-2 bg-destructive/10 border border-destructive text-primary font-mono text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-white border border-primary/10 p-8" data-testid="suggestions-section">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-accent flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-heading font-semibold text-primary">
              AI-Powered Suggestions
            </h2>
          </div>
          <div className="space-y-4">
            {analysis.suggestions.map((suggestion, index) => (
              <div
                key={index}
                data-testid={`suggestion-${index}`}
                className="flex gap-4 p-4 bg-secondary border border-primary/10"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-accent flex items-center justify-center font-mono font-bold text-primary">
                  {index + 1}
                </div>
                <p className="text-primary/80 leading-relaxed flex-1">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

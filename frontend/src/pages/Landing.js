import { ArrowRight, Sparkles, Target, BarChart3, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const handleLogin = () => {
    const redirectUrl = window.location.origin + '/dashboard';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>
        
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <span className="text-accent font-mono font-bold text-xl">R</span>
              </div>
              <span className="font-heading font-bold text-xl text-primary tracking-tight">ResuMatch AI</span>
            </div>
            <Button
              onClick={handleLogin}
              data-testid="login-button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6 font-mono uppercase tracking-wider text-sm shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-hover transition-all"
            >
              Sign In
            </Button>
          </div>
        </nav>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <div className="inline-block mb-6 px-4 py-2 border border-primary/20 bg-white">
                <span className="text-xs font-mono uppercase tracking-widest text-primary">AI-Powered Analysis</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter text-primary mb-6">
                Match Your Resume to Any Job
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-primary/80 mb-8 max-w-2xl">
                Get instant AI-powered insights on how your resume stacks up against job descriptions. Discover skill gaps, boost your ATS score, and get actionable suggestions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleLogin}
                  data-testid="get-started-button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6 font-mono uppercase tracking-wider text-sm shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-hover transition-all"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  data-testid="learn-more-button"
                  className="bg-white border-2 border-primary text-primary hover:bg-primary/5 rounded-none px-8 py-6 font-mono uppercase tracking-wider text-sm transition-all"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-5">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/10 blur-3xl"></div>
                <div className="relative bg-white border border-primary/10 p-8 shadow-brutal">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Match Score</div>
                        <div className="font-heading text-3xl font-bold text-primary">87%</div>
                      </div>
                    </div>
                    <div className="h-px bg-primary/10"></div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Analysis Preview</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent"></div>
                          <span className="text-primary/70">15 matched skills</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-destructive"></div>
                          <span className="text-primary/70">3 missing skills</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary"></div>
                          <span className="text-primary/70">92% ATS compatible</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-primary mb-4">
              Powerful Analysis Features
            </h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">
              Everything you need to optimize your resume and land your dream job
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary border border-primary/10 p-8 hover:border-primary/30 transition-colors group" data-testid="feature-semantic-matching">
              <div className="w-12 h-12 bg-accent flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-3">
                Semantic Matching
              </h3>
              <p className="text-primary/70 leading-relaxed">
                AI understands meaning, not just keywords. Detects transferable skills and synonyms for accurate matching.
              </p>
            </div>

            <div className="bg-secondary border border-primary/10 p-8 hover:border-primary/30 transition-colors group" data-testid="feature-visual-analytics">
              <div className="w-12 h-12 bg-accent flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-3">
                Visual Analytics
              </h3>
              <p className="text-primary/70 leading-relaxed">
                Interactive charts and heatmaps show exactly where you stand and what to improve.
              </p>
            </div>

            <div className="bg-secondary border border-primary/10 p-8 hover:border-primary/30 transition-colors group" data-testid="feature-instant-insights">
              <div className="w-12 h-12 bg-accent flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-3">
                Instant Insights
              </h3>
              <p className="text-primary/70 leading-relaxed">
                Get actionable suggestions in seconds. Know exactly what to add, remove, or improve.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 md:py-32 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-primary-foreground mb-6">
            Ready to Stand Out?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
            Join thousands of job seekers who improved their resumes with AI-powered insights
          </p>
          <Button
            onClick={handleLogin}
            data-testid="cta-start-button"
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-12 py-8 font-mono uppercase tracking-wider text-base shadow-[4px_4px_0px_0px_#F5F5F0] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#F5F5F0] transition-all"
          >
            Start Analyzing Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-secondary border-t border-primary/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-primary/60 font-mono">
            © 2025 ResuMatch AI. Powered by Gemini 2.5 Flash.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
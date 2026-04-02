import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Activity, Zap, Shield, Heart, User, LogIn, UserPlus,
  LogOut, ChevronRight, AlertCircle, ShieldCheck,
  ArrowRight, Sparkles, Database, BarChart3, Atom,
  Droplet, Scale, Hash, Calendar, Github, Twitter, Linkedin, Mail,
  Utensils, Accessibility, Coffee, Wind, BookOpen,
  Pill, Stethoscope, Briefcase, FileText
} from 'lucide-react';

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// --- Shared Components ---

function Navbar({ user, onLogout }) {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6 font-['Inter']">
      <div className="max-w-7xl mx-auto flex justify-between items-center glass-card px-8 py-4 rounded-3xl">
        <Link to="/" className="flex items-center gap-3 active:scale-95 transition-transform">
          <div className="bg-gradient-to-tr from-purple-600 to-pink-500 p-2 rounded-xl shadow-lg shadow-purple-500/20">
            <Atom className="text-white animate-spin-slow" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">DIA<span className="text-purple-500">LAB</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Platform</Link>
          <Link to="/analysis" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Diagnostics</Link>
          {user ? (
            <div className="flex items-center gap-6 pl-8 border-l border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="text-sm font-bold text-white">{user.name}</span>
              </div>
              <button onClick={onLogout} className="text-slate-400 hover:text-rose-500 transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-slate-300 hover:text-white">Sign In</Link>
              <Link to="/register" className="px-6 py-2 glow-btn text-white rounded-xl text-sm font-black shadow-xl shadow-purple-500/20">
                GET STARTED
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="relative mt-32 px-6 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

      <div className="max-w-7xl mx-auto pt-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-tr from-purple-600 to-pink-500 p-2 rounded-xl">
                <Atom className="text-white" size={20} />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">DIA<span className="text-purple-500">LAB</span></span>
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
              New-generation health screening infrastructure. Powering clinical intelligence through advanced neural networks and real-time data analysis.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8">Platform</h4>
            <ul className="space-y-4">
              {['Neural Engine', 'Diagnostics', 'API Access', 'Enterprise'].map((item) => (
                <li key={item}><Link to="#" className="text-slate-500 hover:text-purple-400 text-sm font-bold transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8">Resources</h4>
            <ul className="space-y-4">
              {['Documentation', 'Safety Protocols', 'Community', 'Support'].map((item) => (
                <li key={item}><Link to="#" className="text-slate-500 hover:text-purple-400 text-sm font-bold transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-8 rounded-[2rem] border-purple-500/20">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap size={16} className="text-purple-500" />
              SYSTEM STATUS
            </h4>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-emerald-500 text-xs font-black uppercase tracking-tighter">App Online</span>
            </div>
            <p className="text-slate-500 text-xs font-medium mb-6">Receive real-time updates on clinical model releases and system maintenance.</p>
            <div className="relative">
              <input type="email" placeholder="Email" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:border-purple-500 outline-none transition-all" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-500 hover:text-white transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-800/50 gap-6">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
            © 2026 DIALAB BIOTECH INDUSTRIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
              <Link key={item} to="#" className="text-slate-600 hover:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Page: Home ---

function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative pt-44 pb-32 px-6">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-bold mb-8 animate-fade-in">
          <Sparkles size={16} />
          <span>PROPOWERED HEALTH INTELLIGENCE</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
          SMART DIABETES<br />
          <span className="gradient-text uppercase">PREDICTION.</span>
        </h1>

        <p className="max-w-3xl mx-auto text-xl text-slate-400 mb-12 font-medium leading-relaxed">
          The ultimate health analysis platform. Leveraging neural networks to provide clinical-grade predictions with lightning speed. Designed for the bold.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => navigate('/analysis')}
            className="w-full sm:w-auto px-10 py-5 glow-btn text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl active:scale-95"
          >
            START ANALYSIS
            <ArrowRight size={24} />
          </button>
          <button
            onClick={() => navigate('/docs')}
            className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center gap-3"
          >
            <BookOpen size={24} />
            DOCS
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40">
          {[
            { icon: Atom, title: "NEURAL CORE", desc: "Complex algorithms analyzing 8 critical biomarkers simultaneously.", color: "from-purple-600 to-blue-600" },
            { icon: Database, title: "DATA DRIVEN", desc: "Trained on massive clinical datasets for unparalleled accuracy scores.", color: "from-blue-600 to-cyan-500" },
            { icon: BarChart3, title: "RESULT VIZ", desc: "Clear, actionable insights presented through a premium interface.", color: "from-pink-600 to-purple-600" }
          ].map((f, i) => (
            <div key={i} className="glass-card p-10 rounded-[2.5rem] text-left group hover:translate-y-[-10px] transition-all duration-500">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-8 shadow-2xl`}>
                <f.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{f.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreventionDocs() {
  const navigate = useNavigate();
  return (
    <div className="relative pt-44 pb-32 px-6">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-white mb-12 font-black uppercase tracking-widest text-xs transition-colors"
        >
          <ChevronRight size={16} className="rotate-180" />
          Return to Lab
        </button>

        <div className="mb-20">
          <h2 className="text-6xl font-black text-white mb-6 tracking-tighter uppercase italic">Prevention <span className="text-emerald-500 italic">Protocols</span></h2>
          <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl uppercase tracking-wider text-xs opacity-60">
            Clinical guidance for metabolic optimization and risk factor mitigation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Utensils,
              title: "NUTRITIONAL CONTROL",
              steps: [
                "Reduce refined carbohydrates & processed sugars",
                "Prioritize high-fiber complex grains",
                "Implement intermittent fasting windows",
                "Monitor glycemic index of all intake"
              ],
              color: "emerald"
            },
            {
              icon: Accessibility,
              title: "PHYSICAL ACTIVATION",
              steps: [
                "150 minutes of moderate aerobic activity weekly",
                "High-intensity interval training (HIIT)",
                "Resistance training to improve insulin sensitivity",
                "Reduce sedentary time; move every 30 mins"
              ],
              color: "blue"
            },
            {
              icon: Scale,
              title: "WEIGHT OPTIMIZATION",
              steps: [
                "Target a 5-7% reduction in total body weight",
                "Monitor visceral fat index regularly",
                "Maintain a consistent caloric deficit",
                "Track BMI and waist-to-hip ratios"
              ],
              color: "purple"
            },
            {
              icon: Coffee,
              title: "METABOLIC REST",
              steps: [
                "Ensure 7-9 hours of synchronized circadian sleep",
                "Manage cortisol through deep breathing tech",
                "Eliminate late-night glucose spikes",
                "Maintain consistent hydration levels"
              ],
              color: "pink"
            }
          ].map((item, i) => (
            <div key={i} className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-emerald-500/30 transition-all duration-500 group">
              <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/20 text-${item.color}-400 flex items-center justify-center mb-8 border border-${item.color}-500/20 shadow-lg`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-black text-white mb-6 tracking-tight">{item.title}</h3>
              <ul className="space-y-4">
                {item.steps.map((step, si) => (
                  <li key={si} className="flex gap-4 text-slate-400 text-sm font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 glass-card rounded-[3rem] border-emerald-500/20 bg-emerald-500/5 text-center">
          <ShieldCheck size={48} className="text-emerald-500 mx-auto mb-6" />
          <h4 className="text-white font-black text-2xl mb-4 uppercase tracking-tighter italic">Clinical Commitment</h4>
          <p className="text-slate-400 font-medium mb-8">Early detection and consistent lifestyle modulation are the primary defenses against Type 2 Diabetes.</p>
          <button
            onClick={() => navigate('/analysis')}
            className="px-8 py-4 glow-btn text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-xl"
          >
            Run Diagnostic Scan
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultSolution() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state?.formData || {};

  const getDynamicTips = () => {
    const tips = [];
    if (parseFloat(data.Glucose) > 140) tips.push("High Glucose detected: Implement a strict low-glycemic diet and eliminate liquid sugars.");
    if (parseFloat(data.BMI) > 25) tips.push("Elevated BMI: Focus on a sustainable caloric deficit and regular strength training.");
    if (parseFloat(data.BloodPressure) > 85) tips.push("Arterial Pressure Alert: Reduce sodium intake and monitor levels twice daily.");
    if (parseFloat(data.Insulin) > 160) tips.push("Insulin Resistance: Consider intermittent fasting to improve metabolic flexibility.");

    if (tips.length === 0) {
      tips.push("Consistency is key: Maintain your current nutritional protocols.");
      tips.push("Active Recovery: Ensure daily movement of at least 30 minutes.");
      tips.push("Sleep Hygiene: Target 8 hours of restorative sleep for hormonal balance.");
    }
    return tips;
  };

  const tips = getDynamicTips();

  return (
    <div className="relative pt-44 pb-32 px-6">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/analysis')}
          className="flex items-center gap-2 text-slate-500 hover:text-white mb-12 font-black uppercase tracking-widest text-xs transition-colors"
        >
          <ChevronRight size={16} className="rotate-180" />
          Back to Analysis
        </button>

        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest mb-6">
            <AlertCircle size={14} />
            PERSONALISED CLINICAL ADVISORY
          </div>
          <h2 className="text-6xl font-black text-white mb-6 tracking-tighter uppercase italic">YOUR <span className="text-rose-500 italic">ACTION PLAN</span></h2>
          <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl uppercase tracking-wider text-xs opacity-60">
            Based on your uploaded clinical biomarkers, our AI has generated a targeted management strategy.
          </p>
        </div>

        {/* Personalized Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tips.map((tip, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border-rose-500/10 flex items-center gap-4 group hover:border-rose-500/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <p className="text-slate-300 text-sm font-bold">{tip}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Stethoscope,
              title: "CLINICAL STEP",
              desc: "Consult a specialized endocrinologist for a comprehensive HbA1c screening immediately.",
              color: "rose"
            },
            {
              icon: Pill,
              title: "MEDICATION",
              desc: "Discuss pharmacological interventions like Metformin or insulin management with your doctor.",
              color: "orange"
            },
            {
              icon: Activity,
              title: "MONITORING",
              desc: "Initialize a continuous glucose monitoring (CGM) system to track real-time fluctuations.",
              color: "blue"
            }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-[2.5rem] border-white/5">
              <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/20 text-${item.color}-400 flex items-center justify-center mb-6`}>
                <item.icon size={24} />
              </div>
              <h4 className="text-lg font-black text-white mb-3 tracking-tight">{item.title}</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-12 rounded-[3.5rem] border-rose-500/20 bg-rose-500/5 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Shield size={200} />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white mb-8 tracking-tighter italic uppercase">Management Roadmap</h3>
            <div className="space-y-6">
              {[
                "Initialize a Zero-Sugar, Low-Glycemic nutritional environment immediately.",
                "Execute 30 minutes of resistance training to enhance peripheral insulin sensitivity.",
                "Implement strict hydration protocols (3L+ daily) to assist renal glucose clearance.",
                "Maintain a detailed digital log of all blood glucose measurements for clinical review."
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                    0{i + 1}
                  </div>
                  <p className="text-slate-300 font-bold leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button className="flex-1 px-10 py-5 glow-btn text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3">
            <Briefcase size={20} />
            Find Specialist
          </button>
          <button className="flex-1 px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
            <FileText size={20} />
            Download PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Page: Auth (Login/Register) ---

function AuthPage({ mode, onLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'register') {
        await axios.post(`${API_BASE}/register`, formData);
      }
      const resp = await axios.post(`${API_BASE}/login`, { email: formData.email, password: formData.password });
      onLogin(resp.data.user);
      navigate('/analysis');
    } catch (err) {
      setError(err.response?.data?.error || "Process failed. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-32">
      <div className="w-full max-w-lg glass-card p-12 rounded-[3rem] animate-slide-up relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/30 rounded-full blur-[80px]"></div>

        <div className="relative text-center mb-10">
          <h2 className="text-5xl font-black text-white tracking-tighter mb-2">
            {mode === 'login' ? 'WELCOME BACK' : 'JOIN THE CORE'}
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            {mode === 'login' ? 'Enter credentials to access analysis' : 'Create your secure health profile'}
          </p>
        </div>

        {error && <div className="mb-8 p-5 bg-rose-500/10 border border-rose-500/50 text-rose-400 rounded-2xl text-sm font-bold flex items-center gap-3"><AlertCircle size={20} /> {error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input-field" placeholder="Full Name" />
            </div>
          )}
          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Email</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input-field" placeholder="email@proxy.com" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Password</label>
            <input type="password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="input-field" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} className="w-full py-5 glow-btn text-white rounded-2xl font-black text-lg shadow-2xl mt-4 active:scale-95 disabled:opacity-50">
            {loading ? 'PROCESSING...' : (mode === 'login' ? 'SIGN IN' : 'CONNECT NOW')}
          </button>
        </form>

        <p className="mt-10 text-center text-slate-500 font-bold uppercase tracking-widest text-xs">
          {mode === 'login' ? "New here?" : "Already member?"}
          <Link to={mode === 'login' ? '/register' : '/login'} className="text-purple-400 ml-2 hover:text-purple-300 transition-colors">
            {mode === 'login' ? 'Create Account' : 'Back to Login'}
          </Link>
        </p>
      </div>
    </div>
  );
}

// --- Page: Analysis ---

function Analysis() {
  const [formData, setFormData] = useState({
    Pregnancies: '', Glucose: '', BloodPressure: '', SkinThickness: '',
    Insulin: '', BMI: '', DiabetesPedigreeFunction: '', Age: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultRef = React.useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    const processed = {};
    Object.keys(formData).forEach(k => processed[k] = formData[k] === '' ? 0.0 : parseFloat(formData[k]));
    try {
      const resp = await axios.post(`${API_BASE}/predict`, processed);
      setResult(resp.data.result);
    } catch (err) {
      setError("AI Core Offline. Please check server status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-44 pb-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        {/* Decoration */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] -z-10"></div>

        <div className="lg:col-span-12 mb-10 text-center">
          <h2 className="text-6xl font-black text-white tracking-widest uppercase italic">Diagnostic Lab</h2>
          <p className="text-slate-400 font-bold mt-4 tracking-widest uppercase text-xs">Precision AI Medical Screening Environment</p>
        </div>

        {/* Input Terminal */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="glass-card p-12 rounded-[3.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Activity size={120} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {[
                { id: 'Pregnancies', label: 'Pregnancy Cycle', icon: User },
                { id: 'Glucose', label: 'Glucose Levels', icon: Droplet },
                { id: 'BloodPressure', label: 'Blood Pressure', icon: Activity },
                { id: 'SkinThickness', label: 'Skin Thickness', icon: Hash },
                { id: 'Insulin', label: 'Serum Insulin', icon: Zap },
                { id: 'BMI', label: 'Mass Index (BMI)', icon: Scale },
                { id: 'DiabetesPedigreeFunction', label: 'Diabetes Pedigree Function', icon: Atom },
                { id: 'Age', label: 'Age', icon: Calendar },
              ].map((f) => (
                <div key={f.id}>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-3 flex items-center gap-2">
                    <f.icon size={14} className="text-purple-500" />
                    {f.label}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData[f.id]}
                    onChange={e => setFormData({ ...formData, [f.id]: e.target.value })}
                    placeholder="INIT 0.0"
                    className="input-field"
                  />
                </div>
              ))}
            </div>

            <button type="submit" disabled={loading} className="w-full h-20 mt-12 glow-btn text-white font-black text-xl rounded-[2rem] flex items-center justify-center gap-4 shadow-2xl tracking-widest active:scale-95 disabled:opacity-50 transition-all">
              {loading ? <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div> : (
                <>
                  <Activity size={24} className="animate-pulse" />
                  ANALYZE DATA NOW
                </>
              )}
            </button>
          </form>
        </div>

        <div ref={resultRef} className="lg:col-span-4">
          <div className={`h-full flex flex-col items-center justify-center glass-card p-12 rounded-[3.5rem] border-2 transition-all duration-500 ${result ? (result === 'Diabetic' ? 'border-rose-500 shadow-rose-500/20' : 'border-emerald-500 shadow-emerald-500/20') : 'border-slate-800'}`}>
            {!result && !error && (
              <div className="text-center animate-pulse-slow">
                <BarChart3 size={80} className="text-slate-700 mx-auto mb-8" />
                <h3 className="text-2xl font-black text-white mb-2">AWAITING DATA</h3>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">System standby</p>
              </div>
            )}

            {error && (
              <div className="text-center text-rose-500">
                <AlertCircle size={80} className="mx-auto mb-6" />
                <p className="font-black tracking-widest uppercase">Connectivity error</p>
              </div>
            )}

            {result && (
              <div className="text-center animate-fade-in">
                <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center mb-8 shadow-2xl ${result === 'Diabetic' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white animate-pulse'}`}>
                  {result === 'Diabetic' ? <AlertCircle size={64} /> : <ShieldCheck size={64} />}
                </div>
                <h4 className="text-slate-500 font-bold uppercase tracking-[0.3em] mb-2 text-xs">Diagnosis Output</h4>
                <p className={`text-6xl font-black mb-6 tracking-tighter ${result === 'Diabetic' ? 'text-rose-500' : 'text-emerald-400'}`}>{result.toUpperCase()}</p>
                <div className="w-12 h-1 bg-slate-800 mx-auto rounded-full mb-8"></div>

                {result === 'Diabetic' && (
                  <button
                    onClick={() => navigate('/solution', { state: { formData } })}
                    className="w-full py-4 mb-6 bg-rose-500 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    View Action Plan
                  </button>
                )}

                <button onClick={() => setResult(null)} className="text-[10px] font-black tracking-widest text-slate-500 hover:text-white transition-colors uppercase">
                  Terminal Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main App ---

function App() {
  const [user, setUser] = useState(null);

  // Persist session (simple)
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Global Dark Gradient Background */}
        <div className="fixed inset-0 bg-[#0F172A] -z-20"></div>
        <div className="fixed inset-0 bg-gradient-to-tr from-purple-900/10 via-slate-900 to-pink-900/10 -z-10"></div>

        <Navbar user={user} onLogout={handleLogout} />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage mode="login" onLogin={setUser} />} />
          <Route path="/register" element={<AuthPage mode="register" onLogin={setUser} />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/docs" element={<PreventionDocs />} />
          <Route path="/solution" element={<ResultSolution />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

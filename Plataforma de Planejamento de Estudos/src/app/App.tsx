import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Home, Calendar, TrendingUp, Zap, BookOpen, Video, BarChart3 } from 'lucide-react';
import HomeTab from './components/HomeTab';
import CreateScheduleTab from './components/CreateScheduleTab';
import CalendarTab from './components/CalendarTab';
import ProgressTab from './components/ProgressTab';
import FinalStretchTab from './components/FinalStretchTab';
import VlogTab from './components/VlogTab';
import DashboardTab from './components/DashboardTab';

export type DifficultyLevel = 'high' | 'medium' | 'low';

export interface Subject {
  name: string;
  difficulty: DifficultyLevel;
  progress: number;
}

export interface ScheduleConfig {
  vestibular: string;
  hoursPerDay: number;
  freeDays: string[];
  essayGoal: number;
  subjects: Subject[];
}

export interface StudyBlock {
  id: string;
  day: string;
  time: string;
  subject: string;
  type: 'study' | 'review' | 'exam' | 'rest' | 'essay';
  difficulty?: DifficultyLevel;
  durationHours?: number;
}

export type ExamScores = Record<string, number>;

type TabValue = 'home' | 'dashboard' | 'create' | 'calendar' | 'progress' | 'final' | 'vlog';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabValue>('home');
  const [scheduleConfig, setScheduleConfig] = useState<ScheduleConfig | null>(null);
  const [studyBlocks, setStudyBlocks] = useState<StudyBlock[]>([]);
  const [completedBlockIds, setCompletedBlockIds] = useState<string[]>([]);
  const [examScores, setExamScores] = useState<ExamScores>({});

  const toggleBlockCompleted = (blockId: string) => {
    setCompletedBlockIds(prev =>
      prev.includes(blockId) ? prev.filter(id => id !== blockId) : [...prev, blockId]
    );
  };

  const updateExamScore = (blockId: string, score: number | null) => {
    setExamScores(prev => {
      const next = { ...prev };
      if (score === null) {
        delete next[blockId];
      } else {
        next[blockId] = score;
      }
      return next;
    });
  };

  return (
    <div className="size-full bg-slate-50 overflow-auto">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="w-full h-full flex flex-col">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-white" size={22} />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">Planner Vestibular</h1>
                  <p className="text-xs text-slate-500">Sistema de Planejamento de Estudos</p>
                </div>
              </div>
            </div>
            <TabsList className="flex gap-1 pb-0 overflow-x-auto">
              <TabsTrigger
                value="home"
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 data-[state=inactive]:text-slate-600 hover:text-slate-900 data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent whitespace-nowrap"
              >
                <Home size={18} />
                Início
              </TabsTrigger>
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 data-[state=inactive]:text-slate-600 hover:text-slate-900 data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent whitespace-nowrap"
              >
                <BarChart3 size={18} />
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="create"
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 data-[state=inactive]:text-slate-600 hover:text-slate-900 data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent whitespace-nowrap"
              >
                <BookOpen size={18} />
                Criar Cronograma
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 data-[state=inactive]:text-slate-600 hover:text-slate-900 data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent whitespace-nowrap"
              >
                <Calendar size={18} />
                Calendário
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 data-[state=inactive]:text-slate-600 hover:text-slate-900 data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent whitespace-nowrap"
              >
                <TrendingUp size={18} />
                Progresso
              </TabsTrigger>
              <TabsTrigger
                value="final"
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all data-[state=active]:text-rose-700 data-[state=active]:border-b-2 data-[state=active]:border-rose-700 data-[state=inactive]:text-slate-600 hover:text-slate-900 data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent whitespace-nowrap"
              >
                <Zap size={18} />
                Reta Final
              </TabsTrigger>
              <TabsTrigger
                value="vlog"
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 data-[state=inactive]:text-slate-600 hover:text-slate-900 data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent whitespace-nowrap"
              >
                <Video size={18} />
                Vlog
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="home" className="h-full">
            <HomeTab onNavigate={setActiveTab} />
          </TabsContent>
          <TabsContent value="dashboard" className="h-full">
            <DashboardTab scheduleConfig={scheduleConfig} studyBlocks={studyBlocks} />
          </TabsContent>
          <TabsContent value="create" className="h-full">
            <CreateScheduleTab
              onScheduleCreated={(config, blocks) => {
                setScheduleConfig(config);
                setStudyBlocks(blocks);
                setCompletedBlockIds([]);
                setExamScores({});
                setActiveTab('calendar');
              }}
            />
          </TabsContent>
          <TabsContent value="calendar" className="h-full">
            <CalendarTab
              scheduleConfig={scheduleConfig}
              studyBlocks={studyBlocks}
              completedBlockIds={completedBlockIds}
              examScores={examScores}
              onToggleBlockCompleted={toggleBlockCompleted}
              onExamScoreChange={updateExamScore}
            />
          </TabsContent>
          <TabsContent value="progress" className="h-full">
            <ProgressTab
              subjects={scheduleConfig?.subjects || []}
              studyBlocks={studyBlocks}
              completedBlockIds={completedBlockIds}
              examScores={examScores}
            />
          </TabsContent>
          <TabsContent value="final" className="h-full">
            <FinalStretchTab scheduleConfig={scheduleConfig} />
          </TabsContent>
          <TabsContent value="vlog" className="h-full">
            <VlogTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

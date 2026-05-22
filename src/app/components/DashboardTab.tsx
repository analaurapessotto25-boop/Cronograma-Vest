import { BarChart3, Calendar, Clock, Target, TrendingUp, BookOpen, CheckCircle2 } from 'lucide-react';
import type { ScheduleConfig, StudyBlock } from '../App';
import StatsCard from './StatsCard';

interface Props {
  scheduleConfig: ScheduleConfig | null;
  studyBlocks: StudyBlock[];
}

export default function DashboardTab({ scheduleConfig, studyBlocks }: Props) {
  if (!scheduleConfig) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-md">
          <BarChart3 size={64} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">Dashboard Vazio</h3>
          <p className="text-slate-500">Crie um cronograma para visualizar suas estatísticas</p>
        </div>
      </div>
    );
  }

  const totalHoursWeek = scheduleConfig.hoursPerDay * (7 - scheduleConfig.freeDays.length);
  const studyBlocksCount = studyBlocks.filter(b => b.type === 'study').length;
  const reviewBlocksCount = studyBlocks.filter(b => b.type === 'review').length;
  const examBlocksCount = studyBlocks.filter(b => b.type === 'exam').length;
  const highPriorityCount = scheduleConfig.subjects.filter(s => s.difficulty === 'high').length;
  const avgProgress = scheduleConfig.subjects.reduce((sum, s) => sum + s.progress, 0) / scheduleConfig.subjects.length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">Dashboard</h2>
        <p className="text-sm text-slate-600">Visão geral do seu planejamento de estudos</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={<Target className="text-blue-600" size={20} />}
          label="Vestibular"
          value={scheduleConfig.vestibular}
          iconBgColor="bg-blue-50"
        />
        <StatsCard
          icon={<Clock className="text-indigo-600" size={20} />}
          label="Horas por Semana"
          value={`${totalHoursWeek}h`}
          iconBgColor="bg-indigo-50"
        />
        <StatsCard
          icon={<BookOpen className="text-purple-600" size={20} />}
          label="Total de Matérias"
          value={scheduleConfig.subjects.length}
          iconBgColor="bg-purple-50"
        />
        <StatsCard
          icon={<TrendingUp className="text-emerald-600" size={20} />}
          label="Progresso Médio"
          value={`${avgProgress.toFixed(0)}%`}
          iconBgColor="bg-emerald-50"
        />
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-4">Atividades da Semana</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm text-slate-700">Sessões de Estudo</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">{studyBlocksCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-sm text-slate-700">Revisões</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">{reviewBlocksCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-sm text-slate-700">Simulados</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">{examBlocksCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm text-slate-700">Meta de Redações</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">{scheduleConfig.essayGoal}/semana</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-4">Prioridades</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-md">
              <span className="text-sm font-medium text-red-900">Alta Prioridade</span>
              <span className="text-sm font-semibold text-red-700">{highPriorityCount} matérias</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-100 rounded-md">
              <span className="text-sm font-medium text-amber-900">Média Prioridade</span>
              <span className="text-sm font-semibold text-amber-700">
                {scheduleConfig.subjects.filter(s => s.difficulty === 'medium').length} matérias
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-100 rounded-md">
              <span className="text-sm font-medium text-emerald-900">Baixa Prioridade</span>
              <span className="text-sm font-semibold text-emerald-700">
                {scheduleConfig.subjects.filter(s => s.difficulty === 'low').length} matérias
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <CheckCircle2 size={20} />
          Próximos Passos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm font-medium text-white mb-1">Revisar Cronograma</p>
            <p className="text-xs text-slate-400">Confira seu calendário semanal</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm font-medium text-white mb-1">Acompanhar Progresso</p>
            <p className="text-xs text-slate-400">Monitore sua evolução por matéria</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm font-medium text-white mb-1">Modo Reta Final</p>
            <p className="text-xs text-slate-400">Intensifique seus estudos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

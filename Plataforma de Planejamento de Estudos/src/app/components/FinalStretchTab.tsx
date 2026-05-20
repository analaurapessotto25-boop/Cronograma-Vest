import { Zap, Target, RefreshCw, FileCheck, Clock, AlertCircle } from 'lucide-react';
import type { ScheduleConfig } from '../App';

interface Props {
  scheduleConfig: ScheduleConfig | null;
}

export default function FinalStretchTab({ scheduleConfig }: Props) {
  const highPrioritySubjects = scheduleConfig?.subjects.filter(s => s.difficulty === 'high') || [];
  const mediumPrioritySubjects = scheduleConfig?.subjects.filter(s => s.difficulty === 'medium') || [];

  const exercises = [
    { subject: 'Matemática', total: 150, completed: 87 },
    { subject: 'Física', total: 120, completed: 65 },
    { subject: 'Química', total: 100, completed: 72 },
    { subject: 'Português', total: 80, completed: 58 },
    { subject: 'História', total: 90, completed: 43 }
  ];

  const upcomingExams = [
    { name: 'Simulado ENEM', date: '20 Mai', time: '08:00' },
    { name: 'Prova de Matemática', date: '22 Mai', time: '14:00' },
    { name: 'Simulado Completo', date: '25 Mai', time: '08:00' }
  ];

  if (!scheduleConfig) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Zap size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Modo Reta Final Inativo</h3>
          <p className="text-gray-500">Crie um cronograma primeiro</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="bg-gradient-to-br from-rose-600 to-orange-600 border border-rose-700 rounded-lg p-8 text-white mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Modo Reta Final</h2>
            <p className="text-sm text-rose-100">Intensifique seus estudos com foco estratégico</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Priority Subjects */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="text-red-600" size={20} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Prioridade Máxima</h3>
          </div>
          <div className="space-y-2">
            {highPrioritySubjects.length === 0 ? (
              <p className="text-slate-500 text-sm">Nenhuma matéria de alta dificuldade</p>
            ) : (
              highPrioritySubjects.map((subject, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-md">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="font-medium text-slate-900 text-sm">{subject.name}</span>
                  <span className="ml-auto text-xs text-red-700">Alta</span>
                </div>
              ))
            )}
            {mediumPrioritySubjects.slice(0, 2).map((subject, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-100 rounded-md">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="font-medium text-slate-900 text-sm">{subject.name}</span>
                <span className="ml-auto text-xs text-amber-700">Média</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center">
              <FileCheck className="text-purple-600" size={20} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Próximos Simulados</h3>
          </div>
          <div className="space-y-2">
            {upcomingExams.map((exam, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-100 rounded-md">
                <div className="flex-shrink-0">
                  <div className="text-center bg-purple-600 text-white rounded px-2 py-1.5 min-w-[50px]">
                    <div className="text-xs font-medium">{exam.date}</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 text-sm">{exam.name}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-600 mt-0.5">
                    <Clock size={12} />
                    {exam.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Progress */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
            <Target className="text-blue-600" size={20} />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Progresso de Exercícios</h3>
        </div>
        <div className="space-y-4">
          {exercises.map((exercise, i) => {
            const percentage = (exercise.completed / exercise.total) * 100;
            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900 text-sm">{exercise.subject}</span>
                  <span className="text-xs text-slate-600">
                    {exercise.completed}/{exercise.total} questões
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
            <RefreshCw className="text-white" size={20} />
          </div>
          <h3 className="text-base font-semibold text-white">Revisões Automáticas Hoje</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-xl font-semibold text-white mb-1">08:00</p>
            <p className="text-sm text-slate-200">Matemática - Funções</p>
            <p className="text-xs mt-2 text-slate-400">50 questões</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-xl font-semibold text-white mb-1">14:00</p>
            <p className="text-sm text-slate-200">Física - Mecânica</p>
            <p className="text-xs mt-2 text-slate-400">30 questões</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-xl font-semibold text-white mb-1">19:00</p>
            <p className="text-sm text-slate-200">Química - Orgânica</p>
            <p className="text-xs mt-2 text-slate-400">40 questões</p>
          </div>
        </div>
      </div>
    </div>
  );
}

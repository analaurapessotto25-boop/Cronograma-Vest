import { BookOpen, RefreshCw, FileText, Zap, Coffee } from 'lucide-react';
import type { StudyBlock, DifficultyLevel } from '../App';

interface Props {
  studyBlocks: StudyBlock[];
}

const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export default function CalendarTab({ studyBlocks }: Props) {
  const getBlockColor = (type: StudyBlock['type'], difficulty?: DifficultyLevel) => {
    if (type === 'rest') return 'bg-slate-100 text-slate-700 border border-slate-200';
    if (type === 'exam') return 'bg-purple-50 text-purple-900 border border-purple-200';
    if (type === 'essay') return 'bg-blue-50 text-blue-900 border border-blue-200';
    if (type === 'review') return 'bg-orange-50 text-orange-900 border border-orange-200';

    // Study blocks colored by difficulty
    return {
      high: 'bg-red-50 text-red-900 border border-red-200',
      medium: 'bg-amber-50 text-amber-900 border border-amber-200',
      low: 'bg-emerald-50 text-emerald-900 border border-emerald-200'
    }[difficulty || 'medium'];
  };

  const getBlockIcon = (type: StudyBlock['type']) => {
    switch (type) {
      case 'study': return <BookOpen size={16} />;
      case 'review': return <RefreshCw size={16} />;
      case 'essay': return <FileText size={16} />;
      case 'exam': return <Zap size={16} />;
      case 'rest': return <Coffee size={16} />;
    }
  };

  const getTypeLabel = (type: StudyBlock['type']) => {
    return {
      study: 'Estudo',
      review: 'Revisão',
      essay: 'Redação',
      exam: 'Simulado',
      rest: 'Descanso'
    }[type];
  };

  const blocksByDay = DAYS.map(day => ({
    day,
    blocks: studyBlocks.filter(b => b.day === day).sort((a, b) => a.time.localeCompare(b.time))
  }));

  if (studyBlocks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum cronograma criado</h3>
          <p className="text-gray-500">Vá para "Criar Cronograma" para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold text-slate-900 mb-1">Calendário Semanal</h2>
      <p className="text-sm text-slate-600 mb-8">Visualize sua programação de estudos organizada por dia</p>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {blocksByDay.map(({ day, blocks }) => (
          <div key={day} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 text-slate-900 text-center py-2.5 text-sm font-medium">
              {day}
            </div>
            <div className="p-2.5 space-y-2 min-h-[400px]">
              {blocks.length === 0 ? (
                <div className="text-center text-slate-400 text-xs pt-4">Sem atividades</div>
              ) : (
                blocks.map(block => (
                  <div
                    key={block.id}
                    className={`${getBlockColor(block.type, block.difficulty)} rounded-md p-2.5`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {getBlockIcon(block.type)}
                      <span className="text-xs font-medium">{block.time}</span>
                    </div>
                    <div className="text-sm font-medium mb-0.5">{block.subject}</div>
                    <div className="text-xs opacity-80">{getTypeLabel(block.type)}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white border border-slate-200 rounded-lg p-5">
        <h3 className="text-sm font-medium text-slate-900 mb-4">Legenda</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-red-50 border border-red-200 rounded flex items-center justify-center">
              <BookOpen size={14} className="text-red-700" />
            </div>
            <span className="text-xs text-slate-700">Estudo (Alta)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-50 border border-amber-200 rounded flex items-center justify-center">
              <BookOpen size={14} className="text-amber-700" />
            </div>
            <span className="text-xs text-slate-700">Estudo (Média)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-center">
              <BookOpen size={14} className="text-emerald-700" />
            </div>
            <span className="text-xs text-slate-700">Estudo (Baixa)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-50 border border-orange-200 rounded flex items-center justify-center">
              <RefreshCw size={14} className="text-orange-700" />
            </div>
            <span className="text-xs text-slate-700">Revisão</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-50 border border-blue-200 rounded flex items-center justify-center">
              <FileText size={14} className="text-blue-700" />
            </div>
            <span className="text-xs text-slate-700">Redação</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-purple-50 border border-purple-200 rounded flex items-center justify-center">
              <Zap size={14} className="text-purple-700" />
            </div>
            <span className="text-xs text-slate-700">Simulado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-100 border border-slate-200 rounded flex items-center justify-center">
              <Coffee size={14} className="text-slate-700" />
            </div>
            <span className="text-xs text-slate-700">Descanso</span>
          </div>
        </div>
      </div>
    </div>
  );
}

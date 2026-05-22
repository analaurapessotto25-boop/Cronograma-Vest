import { useState, useEffect } from 'react';
import { Progress } from '@radix-ui/react-progress';
import { TrendingUp, Award, Target } from 'lucide-react';
import type { Subject, DifficultyLevel } from '../App';

interface Props {
  subjects: Subject[];
}

export default function ProgressTab({ subjects }: Props) {
  const [animatedSubjects, setAnimatedSubjects] = useState<Subject[]>(subjects);

  useEffect(() => {
    // Simulate progress over time
    const interval = setInterval(() => {
      setAnimatedSubjects(prev =>
        prev.map(subject => ({
          ...subject,
          progress: Math.min(subject.progress + Math.random() * 3, 100)
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAnimatedSubjects(subjects);
  }, [subjects]);

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    return {
      high: 'text-red-700 bg-red-50 border border-red-200',
      medium: 'text-amber-700 bg-amber-50 border border-amber-200',
      low: 'text-emerald-700 bg-emerald-50 border border-emerald-200'
    }[difficulty];
  };

  const getDifficultyBg = (difficulty: DifficultyLevel) => {
    return {
      high: 'bg-red-500',
      medium: 'bg-amber-500',
      low: 'bg-emerald-500'
    }[difficulty];
  };

  const getDifficultyLabel = (difficulty: DifficultyLevel) => {
    return {
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa'
    }[difficulty];
  };

  const averageProgress = animatedSubjects.length > 0
    ? animatedSubjects.reduce((sum, s) => sum + s.progress, 0) / animatedSubjects.length
    : 0;

  const completedSubjects = animatedSubjects.filter(s => s.progress >= 80).length;

  if (subjects.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <TrendingUp size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum progresso registrado</h3>
          <p className="text-gray-500">Crie um cronograma para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold text-slate-900 mb-1">Acompanhamento de Progresso</h2>
      <p className="text-sm text-slate-600 mb-8">Monitore seu desempenho e evolução por disciplina</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Target size={20} className="text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-slate-600">Progresso Médio</h3>
          </div>
          <p className="text-3xl font-semibold text-slate-900">{averageProgress.toFixed(0)}%</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Award size={20} className="text-emerald-600" />
            </div>
            <h3 className="text-sm font-medium text-slate-600">Matérias Avançadas</h3>
          </div>
          <p className="text-3xl font-semibold text-slate-900">{completedSubjects}/{animatedSubjects.length}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-indigo-600" />
            </div>
            <h3 className="text-sm font-medium text-slate-600">Total de Matérias</h3>
          </div>
          <p className="text-3xl font-semibold text-slate-900">{animatedSubjects.length}</p>
        </div>
      </div>

      {/* Progress bars */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-5">Progresso por Disciplina</h3>
        <div className="space-y-5">
          {animatedSubjects.map((subject, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-medium text-slate-900 text-sm">{subject.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${getDifficultyColor(subject.difficulty)} bg-opacity-10`}>
                    {getDifficultyLabel(subject.difficulty)}
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-900">{subject.progress.toFixed(0)}%</span>
              </div>
              <Progress
                value={subject.progress}
                className="h-2 bg-slate-100 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full ${getDifficultyBg(subject.difficulty)} transition-all duration-500 rounded-full`}
                  style={{ width: `${subject.progress}%` }}
                />
              </Progress>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-base font-semibold mb-5 flex items-center gap-2 text-white">
          <Award size={20} />
          Conquistas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">🎯</div>
            <p className="font-medium text-white text-sm">Primeira Semana</p>
            <p className="text-xs text-slate-400 mt-1">Complete 7 dias de estudo</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">📚</div>
            <p className="font-medium text-white text-sm">Disciplinado</p>
            <p className="text-xs text-slate-400 mt-1">Estude todos os dias da semana</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">🚀</div>
            <p className="font-medium text-white text-sm">Reta Final</p>
            <p className="text-xs text-slate-400 mt-1">Complete 10 simulados</p>
          </div>
        </div>
      </div>
    </div>
  );
}

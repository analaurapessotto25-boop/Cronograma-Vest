import { Progress } from '@radix-ui/react-progress';
import { TrendingUp, Award, Target, CheckCircle2, ClipboardList } from 'lucide-react';
import type { ExamScores, Subject, DifficultyLevel, StudyBlock } from '../App';

interface Props {
  subjects: Subject[];
  studyBlocks: StudyBlock[];
  completedBlockIds: string[];
  examScores: ExamScores;
}

export default function ProgressTab({ subjects, studyBlocks, completedBlockIds, examScores }: Props) {
  const completedSet = new Set(completedBlockIds);
  const scoredExams = Object.values(examScores);
  const examAverage = scoredExams.length > 0
    ? scoredExams.reduce((sum, score) => sum + score, 0) / scoredExams.length
    : null;

  const trackedBlocks = studyBlocks.filter(block =>
    block.type === 'study' || block.type === 'review' || block.type === 'essay'
  );
  const completedBlocks = trackedBlocks.filter(block => completedSet.has(block.id));
  const lessonCompletion = trackedBlocks.length > 0
    ? (completedBlocks.length / trackedBlocks.length) * 100
    : 0;

  const subjectProgress = subjects.map(subject => {
    const subjectBlocks = trackedBlocks.filter(block => block.subject === subject.name);
    const completedSubjectBlocks = subjectBlocks.filter(block => completedSet.has(block.id));
    const lessonProgress = subjectBlocks.length > 0
      ? (completedSubjectBlocks.length / subjectBlocks.length) * 100
      : 0;
    const progress = examAverage === null
      ? lessonProgress
      : (lessonProgress * 0.8) + (examAverage * 0.2);

    return {
      ...subject,
      progress: Math.min(100, progress),
      completedClasses: completedSubjectBlocks.length,
      totalClasses: subjectBlocks.length
    };
  });

  const averageProgress = subjectProgress.length > 0
    ? subjectProgress.reduce((sum, subject) => sum + subject.progress, 0) / subjectProgress.length
    : 0;
  const completedSubjects = subjectProgress.filter(subject => subject.progress >= 80).length;

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
      <p className="text-sm text-slate-600 mb-8">Baseado nas aulas concluídas no calendário e nas notas dos simulados</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
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
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
            <h3 className="text-sm font-medium text-slate-600">Aulas Concluídas</h3>
          </div>
          <p className="text-3xl font-semibold text-slate-900">{completedBlocks.length}/{trackedBlocks.length}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <ClipboardList size={20} className="text-purple-600" />
            </div>
            <h3 className="text-sm font-medium text-slate-600">Média Simulados</h3>
          </div>
          <p className="text-3xl font-semibold text-slate-900">{examAverage === null ? '--' : `${examAverage.toFixed(0)}%`}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Award size={20} className="text-indigo-600" />
            </div>
            <h3 className="text-sm font-medium text-slate-600">Matérias Avançadas</h3>
          </div>
          <p className="text-3xl font-semibold text-slate-900">{completedSubjects}/{subjectProgress.length}</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-5">Progresso por Disciplina</h3>
        <div className="space-y-5">
          {subjectProgress.map((subject, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-medium text-slate-900 text-sm">{subject.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${getDifficultyColor(subject.difficulty)} bg-opacity-10`}>
                    {getDifficultyLabel(subject.difficulty)}
                  </span>
                  <span className="text-xs text-slate-500">
                    {subject.completedClasses}/{subject.totalClasses} aulas
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

      <div className="mt-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2 text-white">
          <TrendingUp size={20} />
          Como o rendimento é calculado
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="font-medium text-white text-sm">Aulas</p>
            <p className="text-xs text-slate-400 mt-1">Marque as atividades no calendário para avançar.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="font-medium text-white text-sm">Simulados</p>
            <p className="text-xs text-slate-400 mt-1">Notas registradas ajustam o rendimento geral.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="font-medium text-white text-sm">Peso</p>
            <p className="text-xs text-slate-400 mt-1">80% aulas concluídas e 20% média dos simulados.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

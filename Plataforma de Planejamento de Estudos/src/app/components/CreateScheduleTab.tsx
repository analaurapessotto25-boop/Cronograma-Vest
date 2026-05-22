import { useState } from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import type { ScheduleConfig, Subject, StudyBlock, DifficultyLevel } from '../App';

interface Props {
  onScheduleCreated: (config: ScheduleConfig, blocks: StudyBlock[]) => void;
}

const DEFAULT_SUBJECTS = [
  'Matemática', 'Física', 'Química', 'Biologia', 'Português',
  'Literatura', 'Redação', 'História', 'Geografia', 'Inglês'
];

const VESTIBULARES = ['ENEM', 'FUVEST', 'UNICAMP', 'UNESP', 'UERJ', 'ITA', 'IME'];
const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export default function CreateScheduleTab({ onScheduleCreated }: Props) {
  const [vestibular, setVestibular] = useState('ENEM');
  const [hoursPerDay, setHoursPerDay] = useState(6);
  const [freeDays, setFreeDays] = useState<string[]>([]);
  const [essayGoal, setEssayGoal] = useState(2);
  const [subjects, setSubjects] = useState<Subject[]>(
    DEFAULT_SUBJECTS.map(name => ({ name, difficulty: 'medium' as DifficultyLevel, progress: 0 }))
  );

  const toggleFreeDay = (day: string) => {
    setFreeDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const updateSubjectDifficulty = (index: number, difficulty: DifficultyLevel) => {
    setSubjects(prev => prev.map((s, i) => i === index ? { ...s, difficulty } : s));
  };

  const addSubject = () => {
    setSubjects(prev => [...prev, { name: 'Nova Matéria', difficulty: 'medium', progress: 0 }]);
  };

  const removeSubject = (index: number) => {
    setSubjects(prev => prev.filter((_, i) => i !== index));
  };

  const updateSubjectName = (index: number, name: string) => {
    setSubjects(prev => prev.map((s, i) => i === index ? { ...s, name } : s));
  };

  const generateSchedule = () => {
    const blocks: StudyBlock[] = [];
    const times = ['07:00', '08:00', '10:00', '14:00', '16:00', '19:00', '21:00'];
    const studyDays = DAYS.filter(day => !freeDays.includes(day));
    const activeSubjects = subjects
      .map(subject => ({ ...subject, name: subject.name.trim() }))
      .filter(subject => subject.name.length > 0);

    const config: ScheduleConfig = {
      vestibular,
      hoursPerDay,
      freeDays,
      essayGoal,
      subjects: activeSubjects
    };

    const restBlocks: StudyBlock[] = freeDays.map(day => ({
      id: `rest-${day}`,
      day,
      time: '10:00',
      subject: 'Descanso',
      type: 'rest',
      durationHours: 0
    }));

    if (activeSubjects.length === 0 || studyDays.length === 0) {
      onScheduleCreated(config, restBlocks);
      return;
    }

    const difficultyWeight: Record<DifficultyLevel, number> = {
      high: 3,
      medium: 2,
      low: 1
    };
    const subjectRotation = activeSubjects.flatMap(subject =>
      Array.from({ length: difficultyWeight[subject.difficulty] }, () => subject)
    );
    const essayCount = Math.min(essayGoal, studyDays.length);
    const essayDays = new Set(
      Array.from({ length: essayCount }, (_, index) => studyDays[Math.floor((index * studyDays.length) / essayCount)])
    );

    let blockId = 0;
    let subjectIndex = 0;
    studyDays.forEach(day => {
      let remainingHours = hoursPerDay;
      const isWeekend = day === 'Sáb' || day === 'Dom';
      const hasEssayToday = essayDays.has(day);

      if (isWeekend && remainingHours >= 2) {
        blocks.push({
          id: `block-${blockId++}`,
          day,
          time: times[0],
          subject: `${vestibular} - Simulado`,
          type: 'exam',
          durationHours: 2
        });
        remainingHours -= 2;
      }

      if (hasEssayToday && remainingHours >= 1) {
        blocks.push({
          id: `block-${blockId++}`,
          day,
          time: times[isWeekend ? 1 : 0],
          subject: 'Redação',
          type: 'essay',
          durationHours: 1
        });
        remainingHours -= 1;
      }

      const startIndex = (isWeekend ? 1 : 0) + (hasEssayToday ? 1 : 0);
      for (let i = startIndex; remainingHours > 0 && i < times.length; i++) {
        const subject = subjectRotation[subjectIndex % subjectRotation.length];
        const durationHours = Math.min(2, remainingHours);

        blocks.push({
          id: `block-${blockId++}`,
          day,
          time: times[i],
          subject: subject.name,
          type: 'study',
          difficulty: subject.difficulty,
          durationHours
        });

        remainingHours -= durationHours;
        subjectIndex += 1;

        if (subjectIndex % 3 === 0 && remainingHours > 0 && i + 1 < times.length) {
          blocks.push({
            id: `block-${blockId++}`,
            day,
            time: times[++i],
            subject: subject.name,
            type: 'review',
            difficulty: subject.difficulty,
            durationHours: 1
          });
          remainingHours -= 1;
        }
      }
    });

    onScheduleCreated(config, [...blocks, ...restBlocks]);
  };

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    return {
      high: 'bg-red-500',
      medium: 'bg-amber-500',
      low: 'bg-emerald-500'
    }[difficulty];
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white border border-slate-200 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">Criar Cronograma</h2>
        <p className="text-sm text-slate-600 mb-8">Configure seu plano de estudos personalizado</p>

        {/* Vestibular */}
        <div className="mb-7">
          <label className="block text-sm font-medium text-slate-900 mb-3">Vestibular</label>
          <div className="grid grid-cols-4 gap-2">
            {VESTIBULARES.map(v => (
              <button
                key={v}
                onClick={() => setVestibular(v)}
                className={`py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                  vestibular === v
                    ? 'bg-blue-600 text-white border border-blue-600'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Hours per day */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-900">Horas de estudo por dia</label>
            <span className="text-sm font-semibold text-blue-600">{hoursPerDay}h</span>
          </div>
          <input
            type="range"
            min="2"
            max="12"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Free days */}
        <div className="mb-7">
          <label className="block text-sm font-medium text-slate-900 mb-3">Dias livres</label>
          <div className="flex gap-2">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => toggleFreeDay(day)}
                className={`flex-1 py-2.5 px-3 rounded-md text-sm font-medium transition-all ${
                  freeDays.includes(day)
                    ? 'bg-indigo-600 text-white border border-indigo-600'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Essay goal */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-900">Meta de redações por semana</label>
            <span className="text-sm font-semibold text-blue-600">{essayGoal}</span>
          </div>
          <input
            type="range"
            min="0"
            max="7"
            value={essayGoal}
            onChange={(e) => setEssayGoal(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Subjects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-900">Matérias e Nível de Dificuldade</label>
            <button
              onClick={addSubject}
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus size={16} /> Adicionar
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md">
                <input
                  type="text"
                  value={subject.name}
                  onChange={(e) => updateSubjectName(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex gap-1.5">
                  <button
                    onClick={() => updateSubjectDifficulty(index, 'high')}
                    className={`w-9 h-9 rounded-md transition-all ${
                      subject.difficulty === 'high' ? 'bg-red-500 ring-2 ring-red-200' : 'bg-red-200 hover:bg-red-300'
                    }`}
                    title="Alta"
                  />
                  <button
                    onClick={() => updateSubjectDifficulty(index, 'medium')}
                    className={`w-9 h-9 rounded-md transition-all ${
                      subject.difficulty === 'medium' ? 'bg-amber-500 ring-2 ring-amber-200' : 'bg-amber-200 hover:bg-amber-300'
                    }`}
                    title="Média"
                  />
                  <button
                    onClick={() => updateSubjectDifficulty(index, 'low')}
                    className={`w-9 h-9 rounded-md transition-all ${
                      subject.difficulty === 'low' ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-emerald-200 hover:bg-emerald-300'
                    }`}
                    title="Baixa"
                  />
                </div>
                <button
                  onClick={() => removeSubject(index)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={generateSchedule}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles size={18} />
          Gerar Cronograma
        </button>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white border border-slate-200 rounded-lg p-5">
        <h3 className="text-sm font-medium text-slate-900 mb-3">Legenda de Dificuldade</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-500 rounded" />
            <span className="text-sm text-slate-700">Alta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-amber-500 rounded" />
            <span className="text-sm text-slate-700">Média</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-emerald-500 rounded" />
            <span className="text-sm text-slate-700">Baixa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

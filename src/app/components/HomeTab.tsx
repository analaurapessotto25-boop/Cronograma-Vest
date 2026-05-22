import { Target, Calendar, TrendingUp, BookOpen, ArrowRight, CheckCircle, Users } from 'lucide-react';

export default function HomeTab() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          Plataforma de Estudos
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-4 leading-tight">
          Planejamento Inteligente<br />para Vestibulares
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-6">
          Organize, acompanhe e otimize sua rotina de estudos com cronogramas personalizados e métricas de progresso
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
            Começar Agora
            <ArrowRight size={18} />
          </button>
          <button className="bg-white text-slate-700 px-6 py-3 rounded-md font-medium border border-slate-300 hover:border-slate-400 transition-colors">
            Ver Demonstração
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-sm transition-all">
          <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <Target className="text-blue-600" size={20} />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-2">Metas Personalizadas</h3>
          <p className="text-slate-600 text-sm leading-relaxed">Defina seu vestibular e objetivos acadêmicos</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-sm transition-all">
          <div className="w-11 h-11 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
            <Calendar className="text-indigo-600" size={20} />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-2">Cronograma Visual</h3>
          <p className="text-slate-600 text-sm leading-relaxed">Calendário inteligente e organizado por prioridade</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-sm transition-all">
          <div className="w-11 h-11 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="text-emerald-600" size={20} />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-2">Acompanhamento</h3>
          <p className="text-slate-600 text-sm leading-relaxed">Monitore seu progresso em tempo real por disciplina</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-sm transition-all">
          <div className="w-11 h-11 bg-rose-50 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="text-rose-600" size={20} />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-2">Modo Reta Final</h3>
          <p className="text-slate-600 text-sm leading-relaxed">Revisões intensivas e simulados focados</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-10 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-8">Como funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center mb-4 text-white text-sm font-semibold">1</div>
            <h4 className="text-base font-semibold text-white mb-2">Configure seu plano</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Escolha o vestibular, horas disponíveis e nível de dificuldade por matéria</p>
          </div>
          <div>
            <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center mb-4 text-white text-sm font-semibold">2</div>
            <h4 className="text-base font-semibold text-white mb-2">Receba seu cronograma</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Sistema gera automaticamente um plano de estudos otimizado</p>
          </div>
          <div>
            <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center mb-4 text-white text-sm font-semibold">3</div>
            <h4 className="text-base font-semibold text-white mb-2">Acompanhe e evolua</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Monitore métricas e ajuste sua estratégia conforme necessário</p>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recursos Principais</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium text-slate-900">Cronograma Automático</p>
                <p className="text-xs text-slate-600">Geração inteligente baseada nas suas preferências</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium text-slate-900">Calendário Visual</p>
                <p className="text-xs text-slate-600">Visualize toda sua semana de estudos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium text-slate-900">Métricas de Progresso</p>
                <p className="text-xs text-slate-600">Acompanhe sua evolução por disciplina</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium text-slate-900">Modo Reta Final</p>
                <p className="text-xs text-slate-600">Intensifique revisões próximo à prova</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Estatísticas</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">Vestibulares Suportados</span>
                <span className="text-2xl font-bold text-indigo-600">7+</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">Disciplinas</span>
                <span className="text-2xl font-bold text-purple-600">10+</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">Horas de Planejamento</span>
                <span className="text-2xl font-bold text-blue-600">2-12h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-3">Pronto para começar?</h3>
          <p className="text-blue-100 mb-6">
            Crie seu cronograma personalizado agora e organize seus estudos de forma inteligente
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
            Criar Meu Cronograma
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

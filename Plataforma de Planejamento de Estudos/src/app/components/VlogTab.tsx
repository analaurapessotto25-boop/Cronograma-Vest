import { useState } from 'react';
import { Play, Target, Clock, BookOpen, Calendar, Lightbulb, Search, Code, Video } from 'lucide-react';

type VlogSection = 'inicio' | 'projeto' | 'vlog' | 'bastidores' | 'contato';

export default function VlogTab() {
  const [activeSection, setActiveSection] = useState<VlogSection>('inicio');

  const sections = [
    { id: 'inicio' as VlogSection, label: 'Início' },
    { id: 'projeto' as VlogSection, label: 'Sobre o Projeto' },
    { id: 'vlog' as VlogSection, label: 'Vlog' },
    { id: 'bastidores' as VlogSection, label: 'Bastidores' },
    { id: 'contato' as VlogSection, label: 'Contato' }
  ];

  return (
    <div className="min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">CronoVest</h1>
          <p className="text-lg text-indigo-100">Vlog oficial do projeto de cronograma automático para vestibulares</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex flex-wrap justify-center gap-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Início */}
        {activeSection === 'inicio' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-white border border-slate-200 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Estude melhor com organização</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                O CronoVest é uma plataforma criada para ajudar estudantes de vestibular a montar cronogramas automáticos, personalizados e visuais.
              </p>
              <button
                onClick={() => setActiveSection('vlog')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
              >
                <Play size={18} />
                Assistir Vlog
              </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen size={64} className="text-indigo-600" />
                </div>
                <p className="text-sm text-slate-600 font-medium">Plataforma de Estudos</p>
              </div>
            </div>
          </div>
        )}

        {/* Projeto */}
        {activeSection === 'projeto' && (
          <div>
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Sobre o Projeto</h2>
              <p className="text-slate-600 leading-relaxed">
                O CronoVest permite que o estudante escolha o vestibular, informe sua rotina, defina metas de redação e marque o nível de dificuldade em cada matéria. A partir dessas informações, o sistema cria um cronograma automático com estudos, revisões, simulados e descanso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Target className="text-blue-600" size={24} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Escolha o vestibular</h3>
                <p className="text-sm text-slate-600 leading-relaxed">ENEM, FUVEST, UNICAMP, UNESP ou outro processo seletivo.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Informe sua rotina</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Horas disponíveis, dias livres e metas semanais.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="text-purple-600" size={24} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Marque dificuldades</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Vermelho, amarelo e verde indicam prioridade de estudo.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Receba o cronograma</h3>
                <p className="text-sm text-slate-600 leading-relaxed">O sistema monta uma agenda visual automaticamente.</p>
              </div>
            </div>
          </div>
        )}

        {/* Vlog */}
        {activeSection === 'vlog' && (
          <div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-8">
              <div className="aspect-video bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Play size={80} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">Vlog: Apresentação do CronoVest</h2>
              <p className="text-slate-300 leading-relaxed">
                Conte aqui a história do projeto, o problema dos estudantes e como a plataforma ajuda na organização dos estudos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-3">
                  <Video className="text-red-600" size={20} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Episódio 1</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Apresentação da ideia e do problema enfrentado pelos vestibulandos.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <Video className="text-blue-600" size={20} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Episódio 2</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Explicação das funcionalidades principais do CronoVest.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-3">
                  <Video className="text-purple-600" size={20} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Episódio 3</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Demonstração do cronograma automático e calendário visual.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bastidores */}
        {activeSection === 'bastidores' && (
          <div>
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Bastidores do Projeto</h2>
              <p className="text-slate-600 leading-relaxed">
                Área destinada para mostrar o processo de criação do site, pesquisas, testes, ideias iniciais e evolução da interface.
              </p>
            </div>

            <div className="border-l-4 border-indigo-600 pl-6 space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">1. Ideia inicial</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Criação de uma solução para organizar os estudos de vestibular.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Search className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">2. Pesquisa</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Análise das dificuldades dos estudantes e das necessidades do público-alvo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">3. Desenvolvimento</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Construção da interface, abas, calendário, progresso e modo reta final.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">4. Apresentação</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Uso do vlog para explicar o funcionamento e a importância do projeto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contato */}
        {activeSection === 'contato' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Contato e Divulgação</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Use esta área para colocar o nome da equipe, redes sociais, QR Code do vlog ou link para assistir à apresentação completa.
              </p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
                <Play size={18} />
                Acessar Vlog
              </button>
            </div>

            <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-8 text-center">
              <p className="text-slate-300 text-sm">CronoVest © 2026 | Projeto Escolar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

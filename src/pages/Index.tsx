import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Index = () => {
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [currentDialogStep, setCurrentDialogStep] = useState(0);
  const [showAchievementDialog, setShowAchievementDialog] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  const grammarLessons = [
    {
      id: 1,
      title: 'Алфавит и произношение',
      progress: 100,
      completed: true,
      content: 'В турецком языке 29 букв: 8 гласных и 21 согласная. Произношение близко к написанию.',
      examples: ['A a - [а]', 'E e - [э]', 'I ı - [ы]', 'İ i - [и]', 'O o - [о]']
    },
    {
      id: 2,
      title: 'Порядок слов в предложении',
      progress: 60,
      completed: false,
      content: 'Базовый порядок: Подлежащее + Дополнение + Сказуемое (SOV)',
      examples: ['Ben elma yerim - Я яблоко ем', 'O kitap okuyor - Он книгу читает']
    },
    {
      id: 3,
      title: 'Настоящее время',
      progress: 30,
      completed: false,
      content: 'Настоящее длительное время образуется с помощью суффиксов -yor/-iyor',
      examples: ['gidiyorum - я иду', 'geliyorsun - ты приходишь', 'yapıyor - он делает']
    }
  ];

  const readingTexts = [
    {
      id: 1,
      title: 'Merhaba! (Привет!)',
      level: 'Начальный',
      turkish: 'Merhaba! Benim adım Ayşe. Ben öğrenciyim. İstanbul\'da yaşıyorum.',
      russian: 'Привет! Меня зовут Айше. Я студентка. Я живу в Стамбуле.',
      words: ['Merhaba - Привет', 'Benim adım - Меня зовут', 'Öğrenci - Студент']
    },
    {
      id: 2,
      title: 'Kahvaltı (Завтрак)',
      level: 'Начальный',
      turkish: 'Her sabah kahvaltı yaparım. Ekmek, peynir ve çay severim.',
      russian: 'Каждое утро я завтракаю. Я люблю хлеб, сыр и чай.',
      words: ['Her sabah - Каждое утро', 'Kahvaltı - Завтрак', 'Severim - Я люблю']
    }
  ];

  const dialogSteps = [
    {
      speaker: 'Ahmet',
      turkish: 'Merhaba, nasılsın?',
      russian: 'Привет, как дела?',
      audio: '🔊'
    },
    {
      speaker: 'Sen',
      options: [
        { turkish: 'İyiyim, teşekkürler!', russian: 'Хорошо, спасибо!' },
        { turkish: 'Fena değil.', russian: 'Неплохо.' },
        { turkish: 'Çok iyiyim!', russian: 'Очень хорошо!' }
      ]
    },
    {
      speaker: 'Ahmet',
      turkish: 'Ne yapıyorsun?',
      russian: 'Что делаешь?',
      audio: '🔊'
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Как будет "Я люблю кофе" на турецком?',
      options: [
        'Kahve severim',
        'Ben kahve',
        'Kahve içiyorum',
        'Seviyorum kahve'
      ],
      correct: 0
    },
    {
      id: 2,
      question: 'Что означает "Teşekkürler"?',
      options: ['Пожалуйста', 'Спасибо', 'Извините', 'До свидания'],
      correct: 1
    }
  ];

  const userProgress = {
    lessonsCompleted: 1,
    totalLessons: 3,
    wordsLearned: 45,
    streak: 7,
    level: 'A1',
    totalPoints: 385
  };

  const achievements = [
    {
      id: 1,
      title: 'Первые шаги',
      description: 'Завершите первый урок',
      icon: '🎯',
      unlocked: true,
      progress: 100,
      reward: 50,
      date: '12.12.2024'
    },
    {
      id: 2,
      title: 'Неделя силы',
      description: 'Занимайтесь 7 дней подряд',
      icon: '🔥',
      unlocked: true,
      progress: 100,
      reward: 100,
      date: '15.12.2024'
    },
    {
      id: 3,
      title: 'Словарный запас',
      description: 'Выучите 50 слов',
      icon: '📚',
      unlocked: false,
      progress: 90,
      reward: 75,
      date: null
    },
    {
      id: 4,
      title: 'Мастер грамматики',
      description: 'Пройдите все уроки грамматики',
      icon: '⭐',
      unlocked: false,
      progress: 33,
      reward: 150,
      date: null
    },
    {
      id: 5,
      title: 'Разговорчивый',
      description: 'Завершите 10 диалогов',
      icon: '💬',
      unlocked: false,
      progress: 20,
      reward: 80,
      date: null
    },
    {
      id: 6,
      title: 'Читатель',
      description: 'Прочитайте 5 текстов',
      icon: '📖',
      unlocked: false,
      progress: 40,
      reward: 60,
      date: null
    }
  ];

  const handleAchievementClick = (achievement: any) => {
    setSelectedAchievement(achievement);
    setShowAchievementDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                🇹🇷
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Турецкий язык
              </h1>
            </div>
            <Badge variant="secondary" className="text-base px-4 py-2">
              Уровень {userProgress.level}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Icon name="BookOpen" className="text-primary" size={20} />
                <CardTitle className="text-lg">Уроков</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {userProgress.lessonsCompleted}/{userProgress.totalLessons}
              </div>
              <Progress value={(userProgress.lessonsCompleted / userProgress.totalLessons) * 100} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Icon name="Brain" className="text-secondary" size={20} />
                <CardTitle className="text-lg">Слов изучено</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{userProgress.wordsLearned}</div>
              <p className="text-sm text-muted-foreground mt-2">Продолжай в том же духе!</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Icon name="Flame" className="text-orange-500" size={20} />
                <CardTitle className="text-lg">Серия дней</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">{userProgress.streak} 🔥</div>
              <p className="text-sm text-muted-foreground mt-2">Не прерывай!</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="grammar" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto">
            <TabsTrigger value="grammar" className="flex items-center gap-2 py-3">
              <Icon name="BookText" size={18} />
              <span className="hidden sm:inline">Грамматика</span>
            </TabsTrigger>
            <TabsTrigger value="reading" className="flex items-center gap-2 py-3">
              <Icon name="FileText" size={18} />
              <span className="hidden sm:inline">Чтение</span>
            </TabsTrigger>
            <TabsTrigger value="dialog" className="flex items-center gap-2 py-3">
              <Icon name="MessageCircle" size={18} />
              <span className="hidden sm:inline">Диалоги</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2 py-3">
              <Icon name="ClipboardCheck" size={18} />
              <span className="hidden sm:inline">Тесты</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2 py-3">
              <Icon name="Trophy" size={18} />
              <span className="hidden sm:inline">Награды</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grammar" className="space-y-4 animate-fade-in">
            <div className="grid gap-4">
              {grammarLessons.map((lesson) => (
                <Card key={lesson.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          lesson.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-primary'
                        }`}>
                          {lesson.completed ? <Icon name="Check" size={24} /> : <Icon name="BookOpen" size={24} />}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{lesson.title}</CardTitle>
                          <CardDescription>Прогресс: {lesson.progress}%</CardDescription>
                        </div>
                      </div>
                      <Button
                        onClick={() => setActiveLesson(activeLesson === lesson.id ? null : lesson.id)}
                        variant={activeLesson === lesson.id ? "secondary" : "default"}
                      >
                        {activeLesson === lesson.id ? 'Свернуть' : 'Изучить'}
                      </Button>
                    </div>
                    <Progress value={lesson.progress} className="mt-4" />
                  </CardHeader>
                  {activeLesson === lesson.id && (
                    <CardContent className="animate-accordion-down">
                      <div className="space-y-4">
                        <p className="text-base leading-relaxed">{lesson.content}</p>
                        <div className="bg-muted p-4 rounded-lg space-y-2">
                          <p className="font-semibold text-sm mb-3">Примеры:</p>
                          {lesson.examples.map((example, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Icon name="ChevronRight" size={16} className="text-primary mt-1" />
                              <p className="text-sm">{example}</p>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full" size="lg">
                          Продолжить урок <Icon name="ArrowRight" size={18} className="ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reading" className="space-y-4 animate-fade-in">
            {readingTexts.map((text) => (
              <Card key={text.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{text.title}</CardTitle>
                    <Badge>{text.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-primary">
                    <p className="text-lg font-medium mb-2">{text.turkish}</p>
                  </div>
                  <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-secondary">
                    <p className="text-base text-muted-foreground">{text.russian}</p>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="words">
                      <AccordionTrigger className="text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <Icon name="BookMarked" size={16} />
                          Ключевые слова
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {text.words.map((word, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded">
                              <Icon name="Dot" size={16} className="text-primary" />
                              <span className="text-sm">{word}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="dialog" className="animate-fade-in">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Icon name="MessageSquare" className="text-primary" />
                  Практика диалога с носителем
                </CardTitle>
                <CardDescription>Выберите подходящий ответ и продолжите разговор</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {dialogSteps.slice(0, currentDialogStep + 1).map((step, idx) => (
                  <div key={idx} className="space-y-3 animate-fade-in">
                    {step.speaker !== 'Sen' ? (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                          A
                        </div>
                        <div className="bg-primary/10 rounded-2xl rounded-tl-none p-4 max-w-md">
                          <p className="font-medium mb-1">{step.turkish}</p>
                          <p className="text-sm text-muted-foreground">{step.russian}</p>
                          <Button variant="ghost" size="sm" className="mt-2 h-8">
                            {step.audio}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end gap-2 pl-12">
                        {step.options?.map((option, optIdx) => (
                          <Button
                            key={optIdx}
                            variant="outline"
                            className="bg-white hover:bg-secondary hover:text-white text-left justify-start w-full max-w-md"
                            onClick={() => {
                              if (currentDialogStep < dialogSteps.length - 1) {
                                setCurrentDialogStep(currentDialogStep + 1);
                              }
                            }}
                          >
                            <div className="text-left w-full">
                              <p className="font-medium">{option.turkish}</p>
                              <p className="text-xs text-muted-foreground">{option.russian}</p>
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {currentDialogStep === dialogSteps.length - 1 && (
                  <div className="text-center pt-4">
                    <Button onClick={() => setCurrentDialogStep(0)} variant="secondary" size="lg">
                      <Icon name="RotateCcw" size={18} className="mr-2" />
                      Начать заново
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz" className="animate-fade-in">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Icon name="Trophy" className="text-secondary" />
                  Проверка знаний
                </CardTitle>
                <CardDescription>Ответьте на вопросы и проверьте свой уровень</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 font-bold">
                        {idx + 1}
                      </div>
                      <p className="font-medium text-base pt-1">{q.question}</p>
                    </div>
                    <div className="grid gap-2 ml-11">
                      {q.options.map((option, optIdx) => (
                        <Button
                          key={optIdx}
                          variant="outline"
                          className="justify-start text-left hover:bg-primary hover:text-white transition-colors"
                        >
                          <span className="mr-2 font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                <Button className="w-full" size="lg">
                  Проверить ответы <Icon name="CheckCircle" size={18} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="animate-fade-in">
            <div className="mb-6">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Icon name="Award" className="text-primary" size={28} />
                        Мои достижения
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Всего очков: <span className="font-bold text-primary">{userProgress.totalPoints}</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-secondary">
                        {achievements.filter(a => a.unlocked).length}/{achievements.length}
                      </div>
                      <p className="text-sm text-muted-foreground">Разблокировано</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-white to-primary/5 border-primary/30 shadow-lg'
                      : 'opacity-60 hover:opacity-80'
                  }`}
                  onClick={() => handleAchievementClick(achievement)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`text-5xl ${achievement.unlocked ? 'scale-110' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          {achievement.unlocked && (
                            <Badge variant="secondary" className="ml-2">
                              <Icon name="Check" size={12} className="mr-1" />
                              Получено
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm">
                          {achievement.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-bold">{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1 text-sm">
                          <Icon name="Coins" size={16} className="text-yellow-500" />
                          <span className="font-bold text-yellow-600">+{achievement.reward}</span>
                        </div>
                        {achievement.unlocked && achievement.date && (
                          <span className="text-xs text-muted-foreground">{achievement.date}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showAchievementDialog} onOpenChange={setShowAchievementDialog}>
        <DialogContent className="sm:max-w-md">
          {selectedAchievement && (
            <>
              <DialogHeader>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="text-7xl animate-bounce">
                    {selectedAchievement.icon}
                  </div>
                  <DialogTitle className="text-2xl">
                    {selectedAchievement.title}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedAchievement.description}
                  </DialogDescription>
                </div>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Прогресс</span>
                    <span className="text-sm font-bold">{selectedAchievement.progress}%</span>
                  </div>
                  <Progress value={selectedAchievement.progress} className="h-2" />
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-200">
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="Coins" size={24} className="text-yellow-600" />
                    <span className="text-xl font-bold text-yellow-700">
                      +{selectedAchievement.reward} очков
                    </span>
                  </div>
                </div>
                {selectedAchievement.unlocked ? (
                  <div className="text-center">
                    <Badge variant="secondary" className="text-base px-6 py-2">
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      Разблокировано {selectedAchievement.date}
                    </Badge>
                  </div>
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    Продолжай заниматься, чтобы разблокировать!
                  </div>
                )}
                <Button
                  className="w-full"
                  onClick={() => setShowAchievementDialog(false)}
                >
                  Закрыть
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
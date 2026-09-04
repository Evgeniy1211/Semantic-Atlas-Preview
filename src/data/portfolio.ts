import type { PortfolioProject } from '../types'

export const portfolio: PortfolioProject[] = [
  {
    id: 'semantic', name: 'Semantic', role: 'Логический анализ', accent: '#8b7cff', status: 'production',
    capabilities: [
      { id: 'input', name: 'Входные данные', technology: 'JSON', description: 'Факты, правила и сценарии', rationale: 'Универсальный и проверяемый формат', maturity: 3 },
      { id: 'parsing', name: 'Парсинг и валидация', technology: 'logic_checker.py', description: 'Проверка логических правил', rationale: 'Полный детерминированный контур', maturity: 3 },
      { id: 'logic', name: 'Логический анализ', technology: 'Probabilistic', description: 'Вероятностная оценка связей', rationale: 'Уникальное ядро проекта', maturity: 3 },
      { id: 'graph', name: 'Построение графа', technology: 'NetworkX', description: 'Направленные зависимости', rationale: 'Зрелая модель графовых операций', maturity: 3 },
      { id: 'visualization', name: 'Визуализация', technology: 'PyVis', description: 'Интерактивный force-граф', rationale: 'Рабочий исторический visual layer', maturity: 3 },
      { id: 'output', name: 'Экспорт', technology: 'HTML / SVG / DOT', description: 'Несколько форматов результата', rationale: 'Подходит для просмотра и архивации', maturity: 3 }
    ]
  },
  {
    id: 'secretary', name: 'secretary-fastapi', role: 'Экспериментальная площадка', accent: '#ff6b9c', status: 'experimental',
    capabilities: [
      { id: 'input', name: 'Входные данные', technology: 'Telegram', description: 'Webhook-сообщения', rationale: 'Прямой пользовательский вход', maturity: 2 },
      { id: 'parsing', name: 'Парсинг', technology: 'FastAPI', description: 'Разбор входного payload', rationale: 'Быстрый асинхронный backend', maturity: 2 },
      { id: 'notion', name: 'Notion', technology: 'Caching proxy', description: 'Кэширующий прокси', rationale: 'Самая развитая Notion-интеграция линии', maturity: 3 },
      { id: 'memory', name: 'Векторная память', technology: 'Weaviate', description: 'Внешний graph/vector service', rationale: 'Гибко, но инфраструктурно тяжело', maturity: 3 },
      { id: 'output', name: 'Выход', technology: 'Telegram text', description: 'Текстовый ответ', rationale: 'Минимально достаточный интерфейс', maturity: 2 }
    ]
  },
  {
    id: 'leya', name: 'Leya', role: 'Production-оптимизированный агент', accent: '#31d7ff', status: 'production',
    capabilities: [
      { id: 'input', name: 'Мультимодальный вход', technology: 'Telegram', description: 'Текст, голос и изображения', rationale: 'Полный пользовательский канал', maturity: 3 },
      { id: 'parsing', name: 'Безопасный парсинг', technology: 'Handlers + whitelist', description: 'Валидация и маршрутизация', rationale: 'Production-контур доступа', maturity: 3 },
      { id: 'memory', name: 'Память', technology: 'PostgreSQL + pgvector', description: 'История и семантический поиск', rationale: 'Простая единая инфраструктура', maturity: 3 },
      { id: 'agents', name: 'Агенты', technology: '6 specialist agents', description: 'Жёсткая маршрутизация ролей', rationale: 'Надёжность выше гибкости', maturity: 3 },
      { id: 'output', name: 'Интерфейс', technology: 'Telegram + keyboard', description: 'Ответы и inline-действия', rationale: 'Оптимизированный рабочий UX', maturity: 3 }
    ]
  },
  {
    id: 'knowledge', name: 'KnowledgeGrapher', role: 'Граф-визуализатор', accent: '#32e6b0', status: 'production',
    capabilities: [
      { id: 'input', name: 'Входные данные', technology: 'ChatGPT export', description: 'JSON-корпус диалогов', rationale: 'Богатый источник семантических связей', maturity: 3 },
      { id: 'parsing', name: 'Парсинг', technology: 'TypeScript', description: 'Типизация и валидация', rationale: 'Предсказуемый data pipeline', maturity: 3 },
      { id: 'memory', name: 'Хранилище связей', technology: 'PostgreSQL', description: 'Диалоги, сообщения и отношения', rationale: 'Реляционный фундамент графа', maturity: 3 },
      { id: 'graph', name: 'Семантический граф', technology: 'Embeddings', description: 'Similarity-связи сообщений', rationale: 'Автоматическое построение отношений', maturity: 3 },
      { id: 'visualization', name: 'Визуализация', technology: 'D3.js + React', description: 'Force simulation, zoom и search', rationale: 'Самый развитый visual UX в портфеле', maturity: 3 }
    ]
  },
  {
    id: 'telegram', name: 'TelegramIntelligence', role: 'Real-time платформа', accent: '#d577ff', status: 'prototype',
    capabilities: [
      { id: 'input', name: 'Вход', technology: 'Telegram WebApp', description: 'Нативный Mini App API', rationale: 'Глубокая интеграция с платформой', maturity: 3 },
      { id: 'parsing', name: 'Валидация', technology: 'Express', description: 'Проверка initData и payload', rationale: 'Безопасный boundary', maturity: 3 },
      { id: 'memory', name: 'Память', technology: 'PostgreSQL + pgvector', description: 'Полная модель данных', rationale: 'Масштабируемое семантическое хранение', maturity: 3 },
      { id: 'agents', name: 'Ассистенты', technology: 'Multi-assistant', description: 'Динамические специализации', rationale: 'Баланс гибкости и структуры', maturity: 3 },
      { id: 'realtime', name: 'Real-time', technology: 'WebSocket', description: 'Живые обновления интерфейса', rationale: 'Наиболее сильный live-контур', maturity: 3 },
      { id: 'graph', name: 'Граф памяти', technology: 'Knowledge graph', description: 'Связи памяти и ассистентов', rationale: 'Перспективный развивающийся слой', maturity: 2 }
    ]
  }
]

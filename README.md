# metaformtodo

Проверка гипотез создания приложения Metarhia корпоративного уровня

* Модульная загрузка приложения
* Увеличение абстракций работы с БД
* Подходы к Metaform
* Разработка прикладного ПО в одном месте

## Последовательность загрузки

- формирование среды окружения приложения appSandbox
  - metadata - метаданные приложения
  - rootPath - путь к месту запуска приложения
  - appPath - путь к приложению (теоретически, приложений может быть несколько)
  - modulesPath - путь к модулям приложения
  - startAfterInit - массив сервисов, запускаемых после инициализауии
  - node - модули подгруженные из node js: fs, path и другие
  - npm - модули загруженные из зависимостей приложения (package.json)dependencies
  - console - логер прилодения, по умолчанию console 
- Загрузка зависимостей npm пакетов (appSandbox.npm)
- Загрузка конфигураций /app/config // TODO: тут скорее всего надо вынести отдельным файлом конфиг выше (/config.js), который будет определять из какого каталога загружать приложения, их может быть несколько, и откуда для каждого приложения брать начальный конфиг, например, для продакшина и разрабоки могут быть разные директории конфигурации
- Инициализация приложения. Конфигурации инициализации находятся в metadata.config.initializers. Формат инициализации:
  - initializerPath - путь к модулю инициализации
  - параметры инициализируемого модуля
   
  модуль инициализации может содержать три процедуры:
  - beforeInit - процедуры запускаемые до инициализации
  - init - инициализация
  - afterInit - процедуры запускаемые после инициализации

  при этом каждая процедура всех модулей инициализации выполняется в свою очередь. Сначала вызовутся проуедуры beforeInit всех модулей инициализации, затем вызовутся процедуры init всех модулей инициализации, и в конце вызовутся все процедуры afterInit всех модулей инициализации

  инициализация может записать в массив appSandbox.startAfterInit процедуры, которые запустятся после инициализации, например, стартуют http сервисы
- Запуск процедур из массива appSandbox.startAfterInit

## Абстракции

### metadata - метаданные приложения

```javascript
({
  keyMetadata: {
    keyResource: {},
  },
});
```

* keyMetadata - ключь в который дополняются данные из файлов
* keyResource - имя ресурса (модуля, сервиса, конфигурации). Имя ресурса должно быть уникальным во всех файлах для приложения.

#### зарезарвированные ключи метаданных keyMetadata
app - данные о приложении
config - конфигурация приложения

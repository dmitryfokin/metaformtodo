# metaformtodo

Проверка гипотез создания приложения Metarhia корпоративного уровня

* Модульная загрузка приложения
* Увеличение абстракций работы с БД
* Подходы к Metaform
* Разработка прикладного ПО в одном месте

## Последовательность загрузки

- Загрузка метаданных из дирректории /app/config
- Загрузка из дирректорий, уазанных в keyMetadata 'kind'
- Подключение модулей
- Запуск сервисов

## Абстракции

### metadata - метаданные приложения

```javascript
({
  metadata: {
    keyMetadata: {
      keyResource: {},
    },
  },
});
```

* keyMetadata - ключь в который дополняются данные из файлов
* keyResource - имя ресурса (модуля, сервиса, конфигурации). Имя ресурса должно быть уникальным во всех файлах для приложения.

#### зарезарвированные ключи метаданных keyMetadata
app - данные о приложении
config - конфигурация приложения
kind - дирректории с метаданными
modules - подключаемые модули
services - запускаемые сервисы

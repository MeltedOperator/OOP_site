const STORAGE_KEY = "oopoman.exam.v1";
const ATTEMPT_MS = 60 * 60 * 1000;
const ALLOWED_NAMES = ["Мухитов Арсений", "Куандыков Жасулан", "Саржан Аубакиров"];
const app = document.getElementById("exam-app");

const QUESTIONS = [
  { id: "q01", module: 1, prompt: "У двух карт совпадают баланс и статус. Что всё равно может отличать один объект от другого?", options: ["Их текущее состояние.", "Набор доступных методов.", "Идентичность — уникальный адрес или идентификатор экземпляра.", "Класс, который служит шаблоном."], answer: 2 },
  { id: "q02", module: 1, prompt: "Какое правило является инвариантом транспортной карты?", options: ["Баланс не меньше нуля, а заблокированная карта не выполняет списание.", "Баланс всегда равен базовой стоимости маршрута.", "Любое поле карты можно менять напрямую.", "Карта обязана хранить список всех автобусов."], answer: 0 },
  { id: "q03", module: 1, prompt: "Какой пример ближе к богатой доменной модели?", options: ["Карта — пассивный словарь, а десятки сервисов меняют её баланс.", "Все правила карты вынесены в один глобальный if.", "Каждый вызвавший код сам проверяет блокировку и пересчитывает баланс.", "Карта сама выполняет предметную операцию и защищает свои правила."], answer: 3 },
  { id: "q04", module: 1, prompt: "Какой вызов лучше следует принципу Tell, Don’t Ask при оплате проезда?", options: ["Считать баланс и статус, решить снаружи и переписать баланс.", "Попросить карту выполнить charge_fare(fare).", "Открыть внутренний словарь карты и изменить поле.", "Скопировать все поля карты в контроллер."], answer: 1 },
  { id: "q05", module: 1, prompt: "Принтер получает билет параметром метода и не сохраняет ссылку после печати. Как называется такая связь?", options: ["Композиция: билет создаётся внутри принтера.", "Агрегация: билет живёт только вместе с принтером.", "Зависимость: объект кратковременно используется как аргумент.", "Наследование: принтер является разновидностью билета."], answer: 2 },
  { id: "q06", module: 1, prompt: "Автобус хранит ссылку на маршрут, но автобус и маршрут могут существовать независимо. Это пример…", options: ["агрегации — часть и целое имеют отдельные жизненные циклы.", "композиции — удаление маршрута уничтожает автобус.", "наследования — автобус является маршрутом.", "зависимости — ссылка не хранится в поле."], answer: 0 },
  { id: "q07", module: 1, prompt: "Почему независимые политики тарифа удобно передавать FareCalculator как компоненты?", options: ["Чтобы объявить все сочетания тарифов подклассами одного типа.", "Чтобы не иметь контрактов между объектами.", "Чтобы запретить заменять политику после запуска.", "Чтобы комбинировать поведение из отдельных компонентов без взрыва подклассов."], answer: 3 },
  { id: "q08", module: 1, prompt: "В чём главное отличие typing.Protocol от абстрактного базового класса в лекции?", options: ["Protocol требует явного наследования и проверяет контракт при создании.", "Protocol применим только к объектам с одинаковым классом.", "Protocol задаёт структурный контракт без обязательного явного наследования.", "Protocol сам создаёт реализацию методов."], answer: 2 },
  { id: "q09", module: 2, prompt: "Какой баланс назван желательным при проектировании модулей?", options: ["Низкая внутренняя связанность и высокое зацепление.", "Высокая внутренняя связанность и низкое зацепление.", "Высокие оба показателя во всех классах.", "Низкие оба показателя, даже если класс делает несвязанные задачи."], answer: 1 },
  { id: "q10", module: 2, prompt: "Что означает принцип Open/Closed?", options: ["Класс должен отвечать за все изменения в своём модуле.", "Каждое новое требование требует переписать общий процессор.", "Модуль открыт для чтения и закрыт для тестирования.", "Поведение можно расширять новым вариантом, не меняя уже проверенный код."], answer: 3 },
  { id: "q11", module: 2, prompt: "Как проверить, соблюдает ли подкласс принцип подстановки Лисков?", options: ["Подставить его вместо базового типа и убедиться, что ожидания клиента сохраняются.", "Проверить, что он добавляет больше публичных методов.", "Убедиться, что его предусловия строже базовых.", "Потребовать проверять конкретный тип перед каждым вызовом."], answer: 0 },
  { id: "q12", module: 2, prompt: "Как лучше применить ISP к компактному валидатору без принтера чеков?", options: ["Оставить толстый интерфейс и реализовать печать пустым методом.", "Добавить все устройства в один базовый класс.", "Разбить контракт на узкие ролевые протоколы и подключать нужные.", "Заставить валидатор наследоваться от класса принтера."], answer: 2 },
  { id: "q13", module: 2, prompt: "Как отличается внедрение зависимости от создания её внутри сервиса?", options: ["Сервис всегда создаёт конкретный Postgres-клиент сам.", "Зависимость передаётся снаружи через конструктор, чтобы можно было менять реализацию.", "Все зависимости доступны через глобальный словарь.", "Сервис импортирует конкретные драйверы в каждом методе."], answer: 1 },
  { id: "q14", module: 2, prompt: "Какой вариант описывает Factory Method?", options: ["Подкласс или фабричная функция выбирает конкретный создаваемый объект.", "Один объект оборачивает другой и добавляет поведение.", "Один интерфейс создаёт семейство взаимосвязанных объектов.", "Объект по шагам собирает сложный отчёт."], answer: 0 },
  { id: "q15", module: 2, prompt: "Когда Builder полезен при создании отчёта?", options: ["Когда нужно выбрать одну реализацию через наследование.", "Когда объект должен быть глобальным singleton.", "Когда нужно заменить интерфейс сторонней библиотеки.", "Когда сложную конфигурацию удобнее собирать пошагово, а не передавать много параметров."], answer: 3 },
  { id: "q16", module: 3, prompt: "Внешний банковский SDK использует другой метод и формат аргументов. Что делает Adapter?", options: ["Скрывает подсистемы под одной точкой входа.", "Добавляет аудит, сохраняя тот же интерфейс.", "Преобразует внешний интерфейс к тому, который ожидает клиент.", "Создаёт объект при первом обращении."], answer: 2 },
  { id: "q17", module: 3, prompt: "Что позволяет сделать Decorator?", options: ["Заменить один интерфейс несовместимым внешним.", "Динамически добавить поведение, обернув объект тем же интерфейсом.", "Создать семейство взаимосвязанных объектов.", "Передавать запрос обработчикам до отказа."], answer: 1 },
  { id: "q18", module: 3, prompt: "Какую задачу решает Facade в терминале оплаты?", options: ["Сохраняет отдельный жизненный цикл частей.", "Подменяет объект для контроля доступа.", "Публикует событие независимым подписчикам.", "Предоставляет простой единый вызов поверх нескольких подсистем."], answer: 3 },
  { id: "q19", module: 3, prompt: "Чем Observer отличается от Chain of Responsibility?", options: ["Observer уведомляет подписчиков о событии, Chain передаёт запрос обработчикам по очереди.", "Observer прерывает запрос на первом отказе, Chain рассылает события.", "Оба паттерна только создают объекты.", "Chain требует параллельного запуска обработчиков."], answer: 0 },
  { id: "q20", module: 3, prompt: "Куда направлены исходные зависимости в Clean Architecture?", options: ["От домена к базам данных и веб-фреймворкам.", "От внешних драйверов к UI, а затем к базе.", "Внутрь, к политикам высокого уровня; внутренние слои не знают внешних деталей.", "В любом направлении, если используется один язык."], answer: 2 },
];

const PRACTICALS = [
  {
    id: "easy", title: "Маршрут", points: 4,
    description: "Реализуй Route(route_number, base_fare, stops). Отклоняй пустой после strip номер, нулевую и отрицательную цену, меньше двух остановок и соседние повторы. Сохраняй порядок остановок; несоседние повторы допустимы.",
    requirements: ["Пустой или пробельный номер отклоняется.", "Нулевая и отрицательная цена отклоняются.", "Одна остановка отклоняется, две упорядоченные принимаются.", "Соседние повторы отклоняются; несоседние допустимы с сохранением порядка."],
    starter: ["from decimal import Decimal", "", "class Route:", "    def __init__(self, route_number: str, base_fare: Decimal, stops: list[str]):", "        # Проверь инварианты и сохрани поля объекта.", "        pass"].join("\n"),
  },
  {
    id: "medium", title: "Транспортная карта", points: 6,
    description: "Реализуй TransitCard(balance, blocked=False) и pay(fare). Успешная оплата возвращает True и списывает fare; отказ возвращает False, не меняя баланс. Нельзя оплатить заблокированной картой, при нехватке средств или нулевой/отрицательной цене.",
    requirements: ["Начальное состояние сохраняет balance и blocked=False по умолчанию.", "Оплата при достаточном балансе успешна.", "Успешная оплата списывает точную сумму.", "Недостаточный баланс отклоняет оплату без изменения баланса.", "Заблокированная карта отклоняет оплату без изменения баланса.", "Нулевая и отрицательная цена отклоняются без изменения баланса."],
    starter: ["class TransitCard:", "    def __init__(self, balance, blocked=False):", "        pass", "", "    def pay(self, fare):", "        pass"].join("\n"),
  },
  {
    id: "advanced", title: "Цепочка проверки оплаты", points: 10,
    description: "Собери цепочку StopListHandler → BalanceHandler → ExecutionHandler. handle(request, trace) добавляет имя этапа; request содержит blocked, balance, fare. Заблокированная карта возвращает blacklisted/refused и останавливает цепочку. Недостаток средств возвращает insufficient_balance/refused без списания. Успех возвращает accepted и списывает fare. Реализуй build_chain().",
    requirements: ["Заблокированная карта возвращает причину blacklisted.", "Заблокированная карта возвращает статус отказа.", "При блокировке trace содержит только stop_list.", "Недостаточный баланс возвращает insufficient_balance.", "Отказ не меняет balance.", "Достаточный баланс возвращает accepted.", "Успешная оплата списывает точный fare.", "Успешный trace: stop_list → balance → execution.", "Цепочка начинается с StopListHandler.", "Узлы связаны в порядке StopListHandler → BalanceHandler → ExecutionHandler."],
    starter: ["class ValidationHandler:", "    def __init__(self, next_handler=None):", "        self._next_handler = next_handler", "", "    def set_next(self, handler):", "        self._next_handler = handler", "        return handler", "", "    def forward(self, request, trace):", "        raise NotImplementedError", "", "class StopListHandler(ValidationHandler):", "    def handle(self, request, trace):", "        raise NotImplementedError", "", "class BalanceHandler(ValidationHandler):", "    def handle(self, request, trace):", "        raise NotImplementedError", "", "class ExecutionHandler(ValidationHandler):", "    def handle(self, request, trace):", "        raise NotImplementedError", "", "def build_chain():", "    raise NotImplementedError"].join("\n"),
  },
];
const freshState = () => ({schemaVersion:1,phase:"ready",name:"",answers:{},code:Object.fromEntries(PRACTICALS.map((task)=>[task.id,task.starter])),startedAt:null,deadlineAt:null,result:null,rating:null});
let state;
try { const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)); state=saved&&saved.schemaVersion===1?saved:freshState(); } catch { state=freshState(); }
let worker=null, ready=false, activeRequest=null, activeResolve=null, timer=null, stale=0, readyWaiters=[];
const waitForReady=()=>ready?Promise.resolve(true):new Promise((resolve)=>{readyWaiters.push(resolve);setTimeout(()=>resolve(false),120000);});
const escapeHtml=(value)=>String(value).replace(/[&<>"']/g,(char)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const save=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
const status=(message)=>{const el=document.getElementById("exam-status"); if(el) el.textContent=message;};
const createWorker=()=>{
  if(location.protocol!=="http:"&&location.protocol!=="https:"){status("Для экзамена откройте размещённую страницу по HTTP(S). Файл file:// не поддерживается.");return;}
  try { worker=new Worker(new URL("./exam-worker.js",import.meta.url),{type:"module"});
    worker.onmessage=({data})=>{
      if(data.type==="ready"){ready=true;readyWaiters.splice(0).forEach((resolve)=>resolve(true));const b=document.getElementById("start-exam");if(b)b.disabled=!ALLOWED_NAMES.includes(state.name);if(state.phase==="ready")status("Среда Python готова. Можно начать экзамен.");return;}
      if(data.type==="load-error"){ready=false;readyWaiters.splice(0).forEach((resolve)=>resolve(false));status("Не удалось загрузить Python из CDN. Попробуйте открыть размещённую страницу позже.");const b=document.getElementById("start-exam");if(b)b.disabled=true;return;}
      if(data.requestId!==activeRequest||data.requestId!==stale)return;
      clearTimeout(timer);timer=null;activeRequest=null;const resolve=activeResolve;activeResolve=null;
      if(data.kind==="runtime-error") resolve({error:data.message}); else resolve({criteria:data.criteria});
    };
    worker.onerror=()=>{ready=false;readyWaiters.splice(0).forEach((resolve)=>resolve(false));if(activeResolve){const resolve=activeResolve;activeResolve=null;activeRequest=null;clearTimeout(timer);timer=null;resolve({error:"Рабочий поток Python завершился с ошибкой."});}status("Рабочий поток Python завершился с ошибкой. Перезагрузите страницу.");};
  } catch { status("Не удалось запустить рабочий поток. Откройте экзамен по HTTP(S) в современном браузере."); }
};
const replaceWorker=()=>{if(activeResolve){activeResolve({error:"Выполнение прервано отправкой экзамена."});activeResolve=null;activeRequest=null;}if(worker)worker.terminate();worker=null;ready=false;createWorker();};
async function runTask(task,source,timeout=10000){
 if(!ready&&!await waitForReady())return {error:"Среда Python недоступна."};
 if(!worker)return {error:"Рабочий поток недоступен."};
 return new Promise((resolve)=>{
  const id=++stale;activeRequest=id;activeResolve=resolve;
  timer=setTimeout(()=>{if(activeRequest!==id)return;activeRequest=null;activeResolve=null;replaceWorker();resolve({error:"Время выполнения истекло (10 секунд); рабочий поток перезапущен."});},timeout);
  worker.postMessage({type:"run",requestId:id,task,source});
});}
function renderStart(){
 app.innerHTML=`<section class="exam-panel"><p class="eyebrow">ИТОГОВАЯ РАБОТА · OOPOMAN</p><h1 id="exam-title">Экзамен курса</h1><p class="exam-lead">Проверьте знания и примените ООП на трёх практических задачах.</p><div class="exam-rules"><h2>Правила</h2><ul><li>Время: 60 минут; отсчёт начнётся после нажатия кнопки.</li><li>Без учебных материалов. Статическая страница не может технически обеспечить это правило.</li><li>20 вопросов — до 20 баллов; три практики — до 20 баллов; максимум 40.</li><li>Для сдачи нужно не менее 30 баллов.</li></ul><p>Результат хранится только в этом браузере. Код и ответы проверяются на клиенте и могут быть просмотрены; результат не подтверждает личность или подлинность. Не вводите секретные данные.</p></div><label class="exam-field">Выберите имя<select id="student-name"><option value="">Выберите…</option>${ALLOWED_NAMES.map((n)=>`<option>${escapeHtml(n)}</option>`).join("")}</select></label><p id="exam-status" class="runtime-status" role="status">Загружаем Python 3.14. Таймер не запущен.</p><button id="start-exam" class="button button-primary" disabled>Начать экзамен</button></section>`;
 const select=document.getElementById("student-name");select.value=state.name||"";select.onchange=()=>{state.name=select.value;save();const start=document.getElementById("start-exam");if(start)start.disabled=!ready||!ALLOWED_NAMES.includes(state.name);};
 const button=document.getElementById("start-exam");button.disabled=!ready||!ALLOWED_NAMES.includes(state.name);button.onclick=()=>{if(!ready||!ALLOWED_NAMES.includes(state.name))return;state.phase="active";state.startedAt=Date.now();state.deadlineAt=state.startedAt+ATTEMPT_MS;save();renderAttempt();};
}
function renderAttempt(){
 if(Date.now()>=state.deadlineAt){finishExam();return;}
 app.innerHTML=`<section class="exam-panel"><div class="exam-head"><div><p class="eyebrow">ЭКЗАМЕН · ${escapeHtml(state.name)}</p><h1>Ваши ответы</h1></div><p class="exam-clock" id="exam-clock" role="timer"></p></div><p id="exam-status" class="runtime-status" role="status">Ответы и код автоматически сохраняются в браузере.</p><div class="exam-questions">${QUESTIONS.map((q,i)=>`<fieldset class="exam-question"><legend>${i+1}. ${escapeHtml(q.prompt)}</legend>${q.options.map((o,j)=>`<label><input type="radio" name="${q.id}" value="${j}" ${Number(state.answers[q.id])===j?"checked":""}> ${escapeHtml(o)}</label>`).join("")}</fieldset>`).join("")}</div><h2>Практические задачи</h2><p>Каждый критерий оценивается отдельно. Задача считается выполненной только при прохождении всех обязательных критериев.</p><div class="exam-practicals">${PRACTICALS.map((t)=>`<article class="exam-task"><h3>${escapeHtml(t.title)} <span>${t.points} баллов</span></h3><p>${escapeHtml(t.description)}</p><label class="exam-field">Код решения<textarea data-code="${t.id}" spellcheck="false">${escapeHtml(state.code[t.id]||t.starter)}</textarea></label><button class="button exam-run" data-run="${t.id}" type="button">Проверить код</button><div id="run-${t.id}" class="exam-run-result" aria-live="polite"></div></article>`).join("")}</div><button id="submit-exam" class="button button-primary" type="button">Завершить экзамен</button></section>`;
 document.querySelectorAll('.exam-question input').forEach((input)=>input.onchange=()=>{state.answers[input.name]=Number(input.value);save();});
 document.querySelectorAll('[data-code]').forEach((area)=>area.oninput=()=>{state.code[area.dataset.code]=area.value;save();});
 document.querySelectorAll('[data-run]').forEach((button)=>button.onclick=async()=>{if(activeRequest!==null||state.phase!=="active"){status("Дождитесь окончания текущей проверки.");return;}save();const task=button.dataset.run;const out=document.getElementById(`run-${task}`);button.disabled=true;out.textContent="Проверяем…";const result=await runTask(task,state.code[task]);out.innerHTML=renderCriteria(result,task);if(button.isConnected&&state.phase==="active")button.disabled=false;});
 document.getElementById("submit-exam").onclick=()=>finishExam();tick();
}
function renderCriteria(result,task){if(result.error)return `<p class="exam-fail">${escapeHtml(result.error)} Все критерии этого запуска не подтверждены.</p>`;const rows=result.criteria||[];const passed=rows.filter((x)=>x.passed).length;return `<p>Критерии: ${passed}/${rows.length}. Задача ${passed===rows.length?"выполнена":"не выполнена"}.</p><ul>${rows.map((x)=>`<li class="${x.passed?"exam-pass":"exam-fail"}">${x.passed?"✓":"✗"} ${escapeHtml(x.label)}${x.passed?"":` — ${escapeHtml(x.detail)}`}</li>`).join("")}</ul>`;}
function tick(){const clock=document.getElementById("exam-clock");if(!clock)return;const left=Math.max(0,state.deadlineAt-Date.now());clock.textContent=`Осталось ${String(Math.floor(left/60000)).padStart(2,"0")}:${String(Math.floor(left%60000/1000)).padStart(2,"0")}`;if(left===0){finishExam();return;}setTimeout(tick,Math.min(1000,left));}
async function finishExam(){
 if(state.phase==="submitted"||state.phase==="grading")return;
 state.phase="grading";save();if(timer){clearTimeout(timer);timer=null;replaceWorker();}
 status("Время истекло или экзамен отправлен. Зафиксированы последние сохранённые ответы и код; выполняется ограниченная проверка…");
 document.querySelectorAll("input,textarea,button").forEach((el)=>el.disabled=true);
 const answers={...state.answers}, codes={...state.code};
 let theory=0;for(const q of QUESTIONS)if(Number(answers[q.id])===q.answer)theory++;
 const tasks=[];for(const task of PRACTICALS){const run=await runTask(task.id,codes[task.id]||"",10000);const criteria=run.criteria||[];const passed=criteria.filter((x)=>x.passed).length;tasks.push({id:task.id,points:passed,possible:task.points,complete:criteria.length===task.requirements.length&&passed===criteria.length,criteria,error:run.error||null});}
 const score=theory+tasks.reduce((sum,t)=>sum+t.points,0);state.result={name:state.name,theory,score,tasks,submittedAt:Date.now(),passed:score>=30};state.phase="submitted";save();renderResult();
}
function renderResult(){
 const result=state.result;if(!result){renderStart();return;}
 const success=result.passed?`<p class="exam-success">Поздравляем, ${escapeHtml(result.name)}! Вы успешно сдали экзамен и завершили курс OOPoman. Результат: ${result.score}/40.</p>`:`<p class="exam-fail">Экзамен не сдан. Для сдачи нужно 30 из 40 баллов.</p>`;
 app.innerHTML=`<section class="exam-panel"><p class="eyebrow">РЕЗУЛЬТАТ · ${escapeHtml(result.name)}</p><h1>${result.score} / 40</h1>${success}<p>Теория: ${result.theory}/20.</p><div class="exam-result-tasks">${result.tasks.map((t)=>`<article class="exam-task"><h2>${escapeHtml(PRACTICALS.find((x)=>x.id===t.id).title)}: ${t.points}/${t.possible}</h2><p>Задача ${t.complete?"выполнена":"не выполнена"}.</p>${t.error?`<p class="exam-fail">${escapeHtml(t.error)}</p>`:""}<ul>${(t.criteria||[]).filter((x)=>!x.passed).map((x)=>`<li class="exam-fail">${escapeHtml(x.label)} — ${escapeHtml(x.detail)}</li>`).join("")}</ul></article>`).join("")}</div>${result.passed?`<fieldset class="exam-rating"><legend>Оцените курс от 1 до 5</legend>${[1,2,3,4,5].map((n)=>`<label><input type="radio" name="rating" value="${n}" ${state.rating===n?"checked":""}> ${n} ★</label>`).join(" ")}</fieldset>`:""}<p class="runtime-status">Результат и оценка хранятся в этом профиле браузера. Очистка данных браузера может удалить их.</p></section>`;
 document.querySelectorAll('[name="rating"]').forEach((el)=>el.onchange=()=>{state.rating=Number(el.value);save();});
}
if(state.phase==="active"&&state.deadlineAt){if(Date.now()>=state.deadlineAt)finishExam();else renderAttempt();}
else if(state.phase==="grading"){state.phase="active";save();finishExam();}
else if(state.phase==="submitted")renderResult();
else renderStart();
createWorker();


document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&state.phase==="active"&&Date.now()>=state.deadlineAt)finishExam();});

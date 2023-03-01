let tasks = [
  {
    content: "Minimalny level 6.1",
    done: true,
    comment: "",
  },
  {
    content: "Min 3 lata doświadczenia w obszarze obróbki skrawaniem",
    done: true,
    comment:
      "Posiadam ponad 10 lat doświadczenia w obszarze obróbki skrawaniem",
  },
  {
    content: "Minimalnie 3 uruchomione projekty w obszarze obróbki skrawaniem.",
    done: true,
    comment:
      "Przykładowe projekty, które wdrożyłem to: L538, Foton, J11. Projekty uruchamiane zarównoe w Krośnie jak i w Fangshan",
  },
  {
    content: "Doświadczenie w procesach cięcia, toczenia i wytaczania",
    done: true,
    comment: "",
  },
  {
    content: "Bardzo dobra znajomość tworzenia G-Codów.",
    done: true,
    comment:
      "Pisałem samodzielnie programy na obróbkę oraz uruchamiałem je na tokarkach dwu-głowicowych i dwu wrzecionowych CNC TW-8 oraz FAST-CUT",
  },
  {
    content: `Odbyte szkolenia z obsługi i programowania jednego ze sterowników:<br><br>
     -Sinumerik<br>
     -Mazatrol`,
    done: true,
    comment:
      'Posiadam formalne szkolenia z obu sterowników potwierdzone zdobyciem certyfikatów świadczących o ukończeniu kursu, ponadto odbyłem szkolenie z obsługi i programowania maszyn dwu-wrzecionowych ze sterownikiem "Fanuc".',
  },
  {
    content: `Odbyte szkolenia i/lub praktyka z doboru odpowiednich narzędzi, systemu mocowania oraz parametrów skrawania dla trzech z sześciu zabiegów:<br><br>
      -Wiercenia,<br>
      -Rozwiercania,<br>
      -Dłutowanie obrotowe Hex/Torx,<br>
      -Nagniatania gwintów zewnętrznych i wewnętrznych,<br>
      -Toczenia poligoniczne,<br>
      -Frezowania.
    `,
    done: true,
    comment:
      "Posiadam formalne szkolenie (Metal Cutting Technology E-Learning) w tym zakresie oraz praktykę zdobytą podczas uruchamiania wielu projektów.",
  },
  {
    content:
      "Umiejętności pomiarowe dla wytworzonych charakterystyk z powyższych zabiegów (uwzględniając: pomiar gwintu, chropowatość powierzchni, mikroskop Shaftscope).",
    done: true,
    comment: "",
  },
  {
    content:
      "Znajomość konstrukcji maszyn wielowrzecionowych oraz ich specyfiki i ograniczeń.",
    done: true,
    comment: "",
  },
  {
    content:
      "Umiejętność projektowania sekwencji i parametrów obróbki tłoczysk na maszynach wielowrzecionowych.",
    done: true,
    comment: "",
  },
  {
    content:
      "Umiejętność doboru narzędzi i pozostałych elementów łańcucha kinematycznego dla obróbki z napędem.",
    done: true,
    comment: "",
  },
  {
    content:
      "Umiejętność szacowania czasu przezbrojenia dla różnych konstrukcji obrabianego wyrobu.",
    done: true,
    comment: "",
  },
  {
    content:
      "Znajomość specyfiki różnych metod walcowania i praktyczna umiejętność ustawiania głowic.",
    done: true,
    comment: "",
  },
  {
    content: "Znajomość weryfikacji zużycia narzędzia skrawającego.",
    done: true,
    comment: "",
  },
  {
    content: "Znajomość wstępnej weryfikacji serwisowej maszyn CNC.",
    done: true,
    comment: "",
  },
  {
    content:
      "Uczestnictwo w specyfikowaniu wymagań dla maszyn przeznaczonych do obróbki skrawaniem.",
    done: true,
    comment:
      "Przygotowywałem specyfikacje wymagań na maszyny CNC 2-wrzecionowe (Nakamura TW-8) oraz 6-wrzecionowe (AS-25 oraz Metra)",
  },
  {
    content: "Opublikowane karty Lesson Learnt w zakresie obróbki skrawaniem.",
    done: false,
    comment: "",
  },
  {
    content:
      "Udział w tworzeniu lub aktualizacji BOP w zakresie obróbki skrawaniem.",
    done: true,
    comment: `Jestem autorem BOP-a do procesu szlifowania (ścierna obróbka skrawaniem), natomiast nie brałem udziału w tworzeniu lub aktualizacji BOP-a dotyczącego obróbki tokarskiej (wiórowa obróbka skrawaniem) bo ktoś inny został do tego wyznaczony. Przygotowywałem specyficzne procesy prototypowe pod "Dual Rida" ponieważ przygotowany wcześniej BOP prototypowy nie uwzględniał zabiegów wytaczania oraz gwintowania wewnętrznego (wcześniej nie było takiego designu). Przygotowałem również "generic CP" na obszar obróbki CNC w Fangshan w celu ustandaryzowania planów kontroli pod nowe projekty w na tym obszarze.`,
  },
  {
    content:
      "Prowadzenie szkoleń stanowiskowych z zakresu maszyn przeznaczonych do obróbki skrawaniem.",
    done: true,
    comment: `Prowadziłem szkolenia z zakresu obsługi i programowania tokarek Nakamura TW-8 w Fangshan dla członkow zespołu - tzw."training on the job"`,
  },
  {
    content:
      "Gotowość do pracy w zespole międzynarodowym i wsparcia technicznego fabryk BWI na całym świecie.",
    done: true,
    comment: "",
  },
];

let notMetSpanActive = false;
let metSpanActive = false;
let allSpanActive = true;
let showHideSwitch = true;
const checkIcon = `<i class="fa-solid fa-check"></i>`;

const tasksList = document.querySelector(".js-tasksSection__tasksList");
const tasksNavigation = document.querySelector(".js-tasksSection__navigation");

const resetTasksList = () => {
  tasksList.innerHTML = "";
};

const toggleTaskDone = (index) => {
  tasks = [
    ...tasks.slice(0, index),
    {
      ...tasks[index],
      done: ![...tasks][index].done,
    },
    ...tasks.slice(index + 1),
  ];
};

const finishAllTasks = () => {
  tasks = [...tasks];
  [...tasks].forEach((task) => (task.done = true));
  bindEvents();
  renderNavElements();
  selectAndAddListenersToNavSpans();
};

const removeTaskFromTasksArray = (index) => {
  tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
};

const bindEvents = () => {
  resetTasksList();
  render();
};

const toggleCheckButton = () => {
  const tasksListItemCheckButtons = document.querySelectorAll(
    ".tasksListItem__checkButton"
  );
  tasksListItemCheckButtons.forEach((taskButton, index) => {
    taskButton.addEventListener("click", () => {
      toggleTaskDone(index);
      bindEvents();
      renderNavElements();
      selectAndAddListenersToNavSpans();
    });
  });
};

const removeTask = () => {
  const tasksListItemRemoveButtons = document.querySelectorAll(
    ".tasksListItem__removeButton"
  );
  tasksListItemRemoveButtons.forEach((task, index) => {
    task.addEventListener("click", () => {
      removeTaskFromTasksArray(index);
      bindEvents();
      renderNavElements();
      selectAndAddListenersToNavSpans();
    });
  });
};

const selectAndAddListenersToNavSpans = () => {
  const comments = document.querySelector(".tasksSection__comments");
  if (comments !== null) {
    comments.addEventListener("click", toggleShowHideComments);
  }
  const metRequirements = document.querySelector(".tasksSection__met");
  if (metRequirements !== null) {
    metRequirements.addEventListener("click", showMet);
  }
  const notMetRequirements = document.querySelector(".tasksSection__notMet");
  if (notMetRequirements !== null) {
    notMetRequirements.addEventListener("click", showNotMet);
  }
  const allRequirements = document.querySelector(".tasksSection__all");
  if (allRequirements !== null) {
    allRequirements.addEventListener("click", showAll);
  }
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const newTaskInput = document.querySelector(".js-form__newTaskInput");
  newTaskInput.focus();
  const newTask = { content: newTaskInput.value.trim(), done: false };
  if (!newTask.content) return;
  tasks = [...tasks, newTask];
  bindEvents();
  renderNavElements();
  selectAndAddListenersToNavSpans();
  newTaskInput.value = "";
};

const init = () => {
  const form = document.querySelector(".js-form");
  form.addEventListener("submit", onFormSubmit);
  render();
  renderNavElements();
  selectAndAddListenersToNavSpans();
};

const toggleShowHideComments = () => {
  showHideSwitch = !showHideSwitch;
  const labels = document.querySelectorAll(".label");
  console.log(labels);
  for (const label of labels) {
    label.classList.toggle("hidden");
  }
  renderNavElements();
  selectAndAddListenersToNavSpans();
};

const showNotMet = () => {
  // const tasksListItems = document.querySelectorAll(".tasksListItem");
  const tasksContainers = document.querySelectorAll(".taskContainer");
  notMetSpanActive = true;
  metSpanActive = false;
  allSpanActive = false;
  tasksContainers.forEach((item) =>
    item.firstElementChild.textContent !== "X"
      ? item.parentElement.classList.add("hidden")
      : item.parentElement.classList.remove("hidden")
  );
  renderNavElements();
  selectAndAddListenersToNavSpans();
};

const showMet = () => {
  // const tasksListItems = document.querySelectorAll(".tasksListItem");
  // console.log(tasksListItems);
  const tasksContainers = document.querySelectorAll(".taskContainer");
  notMetSpanActive = false;
  metSpanActive = true;
  allSpanActive = false;
  tasksContainers.forEach((item) =>
    item.firstElementChild.textContent === "X"
      ? item.parentElement.classList.add("hidden")
      : item.parentElement.classList.remove("hidden")
  );
  renderNavElements();
  selectAndAddListenersToNavSpans();
};

const showAll = () => {
  const tasksListItems = document.querySelectorAll(".tasksListItem");
  notMetSpanActive = false;
  metSpanActive = false;
  allSpanActive = true;
  tasksListItems.forEach((item) => item.classList.remove("hidden"));
  renderNavElements();
  selectAndAddListenersToNavSpans();
};

const render = () => {
  tasks.forEach((task) => {
    tasksList.innerHTML += `
    <li class="tasksListItem">
      <div class="taskContainer">
        <button class="tasksListItem__checkButton ${
          task.done ? "" : "notDone"
        }">${task.done ? checkIcon : "X"}</button>
        <span class="${task.done ? "" : ""}
          tasksListItem__contentSpan">${task.content}
        </span>
        <button class="tasksListItem__removeButton">
          <i class="fa-regular fa-trash-can"></i>
        </button> 
      </div>
      <label class="label ${
        task.comment === "" ? "hiddenEmptyComments" : null
      }">
      Komentarz <textarea disabled class="comments">${task.comment}</textarea>
    </label>
    </li>
    `;
  });

  // showMet();
  // showNotMet();
  // showAll();
  toggleCheckButton();
  removeTask();
};

const renderNavElements = () => {
  if (tasksList.innerHTML === "") {
    tasksNavigation.innerHTML = `<h2 class="tasksSection__header">Lista zadań</h2>`;
  } else if (tasksList.innerHTML !== "") {
    tasksNavigation.innerHTML = `
    <h2 class="tasksSection__header">Lista wymagań</h2>
    <span class="tasksSection__comments"
    >${!showHideSwitch ? "Pokaż komentarze" : "Ukryj komentarze"}</span>
    <span class="tasksSection__notMet ${notMetSpanActive ? "active" : ""}"
    >Pokaż niespełnione<button class="tasksListItem__removeButton--special ${
      notMetSpanActive ? "disabled" : ""
    }">X</button>
    </span>
    <span class="tasksSection__met ${metSpanActive ? "active" : ""}"
    >Pokaż spełnione<button class="tasksListItem__checkButton--special ${
      metSpanActive ? "disabled" : ""
    }"
    >${checkIcon}</button></span>
    <span class="tasksSection__all ${allSpanActive ? "active" : ""}"
    >Pokaż wszystkie</span>`;
  }
};

init();

const textAreas = document.querySelectorAll(".comments");
console.log(textAreas);

const textAreaAdjust = () => {
  const textAreas = document.querySelectorAll(".comments");
  console.log(textAreas);
  textAreas.forEach((area) => {
    area.style.height = "1px";
    area.style.minHeight = area.scrollHeight;
    area.style.height = 30 + area.scrollHeight + "px";
  });
};

window.addEventListener("load", () => textAreaAdjust());

// textAreas.forEach((area) =>
//   area.addEventListener("keyup", () => textAreaAdjust(area))
// );
// selectAndAddListenersToNavSpans();

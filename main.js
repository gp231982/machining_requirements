let tasks = [
  {
    content: "Minimalny level 6.1",
    done: true,
    comment: "",
  },
  {
    content: "Min 3 lata doświadczenia w obszarze obróbki skrawaniem",
    done: true,
    comment: "Ponad 10 lat doświadczenia w obszarze obróbki skrawaniem",
  },
  {
    content: "Minimalnie 3 uruchomione projekty w obszarze obróbki skrawaniem.",
    done: false,
    comment:
      "Przykładowe projekty to: L538, Foton, J11. Projekty uruchamiane zarównoe w Krośnie jak i w Fangshan",
  },
  {
    content: "Doświadczenie w procesach cięcia, toczenia i wytaczania",
    done: false,
    comment:
      "Np. specyfikowania piły do cięcia prętów na protytpownię Fangshan, specyfikowanie listy narzędzi uzbrajanie CNC Nakamura, wytaczak piko do MR-owych tłoczysk",
  },
  {
    content: "Bardzo dobra znajomość tworzenia G-Codów.",
    done: false,
    comment: "",
  },
  {
    content: `Odbyte szkolenia z obsługi i programowania jednego ze sterowników:<br><br>
     -Sinumerik<br>
     -Mazatrol`,
    done: false,
    comment: "Posiadam formalne szkolenia z obu sterowników",
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
    done: false,
    comment: "Posiadam formalne szkolenie w tym zakresie oraz doświadczenie",
  },
  {
    content:
      "Umiejętności pomiarowe dla wytworzonych charakterystyk z powyższych zabiegów (uwzględniając: pomiar gwintu, chropowatość powierzchni, mikroskop Shaftscope).",
    done: false,
    comment: "",
  },
  {
    content:
      "Znajomość konstrukcji maszyn wielowrzecionowych oraz ich specyfiki i ograniczeń.",
    done: false,
    comment: "",
  },
  {
    content:
      "Umiejętność projektowania sekwencji i parametrów obróbki tłoczysk na maszynach wielowrzecionowych.",
    done: false,
    comment: "",
  },
  {
    content:
      "Umiejętność doboru narzędzi i pozostałych elementów łańcucha kinematycznego dla obróbki z napędem.",
    done: false,
    comment: "",
  },
  {
    content:
      "Umiejętność szacowania czasu przezbrojenia dla różnych konstrukcji obrabianego wyrobu.",
    done: false,
    comment: "",
  },
  {
    content:
      "Znajomość specyfiki różnych metod walcowania i praktyczna umiejętność ustawiania głowic.",
    done: false,
    comment: "",
  },
  {
    content: "Znajomość weryfikacji zużycia narzędzia skrawającego.",
    done: false,
    comment: "",
  },
  {
    content: "Znajomość wstępnej weryfikacji serwisowej maszyn CNC.",
    done: false,
    comment: "",
  },
  {
    content:
      "Uczestnictwo w specyfikowaniu wymagań dla maszyn przeznaczonych do obróbki skrawaniem.",
    done: false,
    comment: "",
  },
  {
    content: "Opublikowane karty Lesson Learnt w zakresie obróbki skrawaniem.",
    done: false,
    comment: "",
  },
  {
    content:
      "Udział w tworzeniu lub aktualizacji BOP w zakresie obróbki skrawaniem.",
    done: false,
    comment:
      "Przygotowywanie BOP-a na szlifowanie, oraz przygotowania procesów prototypowych dotyczących operacji tokarskich w TCK",
  },
  {
    content:
      "Prowadzenie szkoleń stanowiskowych z zakresu maszyn przeznaczonych do obróbki skrawaniem.",
    done: false,
    comment: `Prowadzenie szkoleń z zakresu obsługi i programowania tokarek Nakamur TW-8 w Fangshan dla członkow zespołu - tzw."training on the job"`,
  },
  {
    content:
      "Gotowość do pracy w zespole międzynarodowym i wsparcia technicznego fabryk BWI na całym świecie.",
    done: false,
    comment: "",
  },
];

let notMetSpanActive = false;
let metSpanActive = false;
let allSpanActive = true;
let showHideSwitch = true;

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
  const checkIcon = `<i class="fa-solid fa-check"></i>`;
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
      <label class="label">Komentarz <textarea class="comments">${
        task.comment
      }</textarea>
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
    <span class="tasksSection__notMet ${notMetSpanActive ? "Active" : ""}"
    >Pokaż niespełnione</span>
    <span class="tasksSection__met ${metSpanActive ? "Active" : ""}"
    >Pokaż spełnione</span>
    <span class="tasksSection__all ${allSpanActive ? "Active" : ""}"
    >Pokaż wszystkie</span>`;
  }
};

init();
selectAndAddListenersToNavSpans();

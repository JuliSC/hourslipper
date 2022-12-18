<template>
  <div class="text-4xl md:text-9xl mb-7 text-white text-shadow-md-offset">
    ⌚ Hourslipper ⌚
  </div>
  <div class="block md:flex flex-row items-start">
    <div class="card relative">
      <div class="card-title">Fetch Entries</div>
      <article class="card-body">
        <div class="card-row">
          <InputField
            class="px-1"
            title="API Key"
            type="password"
            placeholder="Ex: HS73HD9GHBF74GFDVFSD"
            v-model="savedSettings.apiKey"
          >
            Get your API key
            <a
              class="link"
              target="_blank"
              href="https://track.toggl.com/profile"
              >here</a
            >
          </InputField>
        </div>
        <div class="card-row">
          <div class="flex-grow px-1">
            <DateField
              title="From"
              dateType="start"
              :value="lastMonth.toDateString()"
              @update-date="updateDate($event)"
            />
          </div>
          <div class="flex-grow px-1">
            <DateField
              title="To"
              dateType="end"
              :value="today.toDateString()"
              @update-date="updateDate($event)"
            />
          </div>
        </div>
      </article>
      <div class="card-title">Options</div>
      <article class="card-body">
        <div class="card-row">
          <div class="px-1">
            <InputField
              title="Date Header"
              placeholder="Ex: Date"
              v-model="savedSettings.dateHeader"
            />
          </div>
          <div class="px-1">
            <InputField
              title="Hours Header"
              placeholder="Ex: Hours"
              v-model="savedSettings.hoursHeader"
            />
          </div>
        </div>
        <div class="card-row">
          <InputField
            class="px-1"
            title="Hours Appended Text"
            placeholder="Ex: Work Hours"
            v-model="savedSettings.hoursAppend"
          />
        </div>
        <div class="card-row">
          <SelectField
            class="px-1"
            title="Date Format"
            v-model="savedSettings.dateFormat"
            :options="dateFormatOptions"
          />
          <InputField
            class="px-1 flex-grow-0"
            v-model="savedSettings.separator"
            title="separator"
          />
        </div>
        <div class="card-row">
          <SelectField
            class="px-1"
            title="Weekday"
            v-model="savedSettings.weekdayFormat"
            :options="weekdayOptions"
          />
          <SelectField
            class="px-1"
            title="Language"
            v-model="savedSettings.language"
            :options="langOptions"
          />
        </div>
      </article>
      <div class="card-actions">
        <button class="btn" @click="generateEntryTable">
          Fetch Time Entries
        </button>
      </div>
    </div>
    <div class="card fine-scrollbar max-h-500 relative overflow-y-scroll">
      <div class="card-body">
        <div class="card-title">
          <span @click="copyTable('#entry-table')" class="btn-emoji">📋</span>
        </div>

        <table class="data-table" id="entry-table">
          <tr class="text-left">
            <th colspan="2">
              Total
              {{
                savedSettings.hoursHeader.trim().length > 0
                  ? savedSettings.hoursHeader
                  : "Hours"
              }}
            </th>
          </tr>
          <tr>
            <td>{{ total }} {{ savedSettings.hoursAppend }}</td>
          </tr>
          <tr class="text-left">
            <th>
              {{
                savedSettings.dateHeader.trim().length > 0
                  ? savedSettings.dateHeader
                  : "Date"
              }}
            </th>
            <th>
              {{
                savedSettings.hoursHeader.trim().length > 0
                  ? savedSettings.hoursHeader
                  : "Hours"
              }}
            </th>
          </tr>
          <template v-if="entries.length > 0">
            <tr v-for="entry in entries" :key="entry.start">
              <td>{{ entry.start }}</td>
              <td class="text-right">
                {{ `${entry.duration} ${savedSettings.hoursAppend}` }}
              </td>
            </tr>
          </template>
          <template v-if="entries.length === 0">
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import axios from "axios";
import DateField from "@/components/DateField.vue";
import InputField from "@/components/InputField.vue";
import SelectField from "@/components/SelectField.vue";
import { NumberHelper } from "@/utils/NumberHelper";
import { DateHelper } from "@/utils/DateHelper";
import { ArrayHelper } from "@/utils/ArrayHelper";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

// Types
type Entry = {
  start: string;
  duration: number;
};

const today = new Date();
const lastMonth = new Date();
// this day last month
lastMonth.setMonth(today.getMonth() - 1);

// Required for entries

const startDate = ref<string>("");
const endDate = ref<string>("");
const entries = ref<Entry[]>([]);

// Options

const settings = ref<{
  apiKey: string;
  hoursAppend: string;
  dateHeader: string;
  hoursHeader: string;
  dateFormat: { name: string; value: string };
  separator: string;
  weekdayFormat: { name: string; value: string };
  language: { name: string; value: string };
}>({
  apiKey: "",
  hoursAppend: "",
  dateHeader: "",
  hoursHeader: "",
  dateFormat: {
    name: "DD-MM-YYYY",
    value: "en-UK",
  },
  separator: "-",
  weekdayFormat: {
    name: "Not included",
    value: "",
  },
  language: {
    name: "English",
    value: "en",
  },
});
// const apiKey = ref<string>("");
// const hoursAppend = ref<string>("");
// const dateHeader = ref<string>("");
// const hoursHeader = ref<string>("");
// const dateFormat = ref<{ name: string; value: string }>({
//   name: "DD-MM-YYYY",
//   value: "en-UK",
// });
const dateFormatOptions = ref<Array<{ name: string; value: string }>>([
  {
    name: "DD-MM-YYYY",
    value: "en-UK",
  },
  {
    name: "MM-DD-YYYY",
    value: "en-US",
  },
  {
    name: "YYYY-MM-DD",
    value: "en-CA",
  },
]);
// const separator = ref<string>("-");
// const weekdayFormat = ref<{ name: string; value: string }>({
//   name: "Not included",
//   value: "none",
// });
const weekdayOptions = ref<Array<{ name: string; value: string }>>([
  {
    name: "Not included",
    value: "none",
  },
  {
    name: "Short (Mon, Tue...)",
    value: "short",
  },
  {
    name: "Full (Monday, Tuesday...)",
    value: "long",
  },
]);
// const language = ref<{ name: string; value: string }>({
//   name: "English",
//   value: "en-US",
// });
const langOptions = ref<Array<{ name: string; value: string }>>([
  {
    name: "English",
    value: "english",
  },
  {
    name: "Danish",
    value: "da-DK",
  },
]);
const total = ref<number>(0);

// Computed
const savedSettings = computed(() => {
  if (userStore.user.settings) {
    return userStore.user.settings;
  }
  return settings.value;
});

// Functions
function updateDate(e: Record<string, unknown>) {
  switch (e.dateType) {
    case "start":
      startDate.value = e.date as string;
      break;
    case "end":
      endDate.value = e.date as string;
      break;
    default:
      break;
  }
}

async function generateEntryTable() {
  const togglEntries: Entry[] = await getEntries();
  entries.value = formatEntries(togglEntries);
  entries.value = groupEntries(entries.value);
  const list: number[] = getListOfAttr(entries.value, "duration") as number[];
  total.value = ArrayHelper.getTotal(list);
}

async function getEntries() {
  const entries: Entry[] = await axios("http://localhost:3000/toggl", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": true,
    },
    data: {
      username:
        savedSettings.value.apiKey.length > 0
          ? savedSettings.value.apiKey
          : import.meta.env.VITE_API_KEY,
      startDate: startDate.value,
      endDate: endDate.value,
    },
  }).then(res => {
    return res.data;
  });

  return entries;
}

function formatEntries(entries: Entry[]) {
  const formattedEntries: Entry[] = [];

  entries.forEach(entry => {
    const formattedEntry = { ...objWithPropsFromObj(entry) };
    const entryDate = formattedEntry.start;

    // Formatting date
    formattedEntry.start = DateHelper.formatDate(
      entryDate,
      savedSettings.value.dateFormat.value,
    );

    // Setting separator
    formattedEntry.start = DateHelper.setSeparator(
      formattedEntry.start,
      savedSettings.value.separator,
    );

    // Getting weekday
    if (savedSettings.value.weekdayFormat.value !== "none") {
      const weekDay = DateHelper.getWeekDay(
        entryDate,
        savedSettings.value.weekdayFormat.value,
        savedSettings.value.language.value,
      );
      formattedEntry.start = `${weekDay} ${formattedEntry.start}`;
    }

    formattedEntry.duration = formatDuration(formattedEntry.duration);

    formattedEntries.push(formattedEntry);
  });

  return formattedEntries;
}

function objWithPropsFromObj(entry: Entry) {
  const formattedEntry = {
    start: entry.start,
    duration: entry.duration,
  };

  return formattedEntry;
}

function groupEntries(entries: Entry[]) {
  const groupedEntries: Entry[] = [];

  entries.forEach((entry: Entry) => {
    const groupedDate = groupedEntries.find(newEntry => {
      return newEntry.start === entry.start;
    });

    if (groupedDate) {
      groupedDate.duration += entry.duration;
    } else {
      groupedEntries.push(entry);
    }
  });

  return groupedEntries;
}

function getListOfAttr(arr: { [key: string]: unknown }[], attr: string) {
  const list: unknown[] = [];

  arr.forEach(el => {
    if (el.hasOwnProperty(attr) && typeof attr === "string")
      list.push(el[attr as keyof typeof el]);
  });

  return list;
}

function formatDuration(duration: number) {
  return NumberHelper.round(duration / 60 / 60, 0.5);
}

function copyTable(tableId: string) {
  selectTable(tableId);
  let dataStr = `${savedSettings.value.dateHeader}\t${savedSettings.value.hoursHeader}\n`;
  entries.value.forEach(entry => {
    dataStr += `${entry.start}\t${entry.duration} ${savedSettings.value.hoursAppend}\n`;
  });
  navigator.clipboard.writeText(dataStr);
}

function selectTable(tableId: string) {
  const el: HTMLElement = document.querySelector(tableId) as HTMLElement;
  const range: Range = document.createRange(),
    sel: Selection = window.getSelection() as Selection;
  sel.removeAllRanges();
  try {
    range.selectNodeContents(el);
    sel.addRange(range);
  } catch (e) {
    range.selectNode(el);
    sel.addRange(range);
  }
}
</script>

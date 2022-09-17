<template>
  <div class="header">⌚ Hourslipper ⌚</div>
  <div class="flex flex-row items-start">
    <div class="card relative">
      <div class="card-title">Fetch Entries</div>
      <article class="card-body">
        <div class="card-row">
          <InputField
            class="px-1"
            title="API Key"
            placeholder="Ex: HS73HD9GHBF74GFDVFSD"
            v-model="apiKey"
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
              @update-date="updateDate($event)"
            />
          </div>
          <div class="flex-grow px-1">
            <DateField
              title="To"
              dateType="end"
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
              v-model="dateHeader"
            />
          </div>
          <div class="px-1">
            <InputField
              title="Hours Header"
              placeholder="Ex: Hours"
              v-model="hoursHeader"
            />
          </div>
        </div>
        <div class="card-row">
          <InputField
            class="px-1"
            title="Hours Appended Text"
            placeholder="Ex: Work Hours"
            v-model="hoursAppend"
          />
        </div>
        <div class="card-row">
          <SelectField
            class="px-1"
            title="Date Format"
            v-model="dateFormat"
            :options="dateFormatOptions"
          />
          <InputField
            class="px-1 flex-grow-0"
            v-model="separater"
            title="Separater"
          />
        </div>
        <div class="card-row">
          <SelectField
            class="px-1"
            title="Weekday"
            v-model="weekdayFormat"
            :options="weekdayOptions"
          />
        </div>
      </article>
      <div class="card-actions">
        <button class="btn" @click="generateEntryTable">
          Fetch Time Entries
        </button>
      </div>
    </div>
    <div class="card max-h-500 relative overflow-y-scroll">
      <div class="card-body">
        <div class="card-title">
          <span @click="copyTable('#entry-table')" class="btn-emoji">📋</span>
        </div>

        <table class="data-table" id="entry-table">
          <tr class="text-left">
            <th colspan="2">
              Total {{ hoursHeader.trim().length > 0 ? hoursHeader : "Hours" }}
            </th>
          </tr>
          <tr>
            <td>{{ total }} {{ hoursAppend }}</td>
          </tr>
          <tr class="text-left">
            <th>{{ dateHeader.trim().length > 0 ? dateHeader : "Date" }}</th>
            <th>{{ hoursHeader.trim().length > 0 ? hoursHeader : "Hours" }}</th>
          </tr>
          <template v-if="entries.length > 0">
            <tr v-for="entry in entries" :key="entry.start">
              <td>{{ entry.start }}</td>
              <td class="text-right">
                {{ `${entry.duration} ${hoursAppend}` }}
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
import { ref } from "vue";
import axios from "axios";
import DateField from "@/components/DateField.vue";
import InputField from "@/components/InputField.vue";
import SelectField from "@/components/SelectField.vue";

// Required for entries
const apiKey = ref<string>("");
const startDate = ref<string>("");
const endDate = ref<string>("");
const entries = ref<{ start: string; duration: number }[]>([]);

// Options
const hoursAppend = ref<string>("");
const dateHeader = ref<string>("");
const hoursHeader = ref<string>("");
const dateFormat = ref<string>("DD-MM-YYYY");
const dateFormatOptions = ref<Array<string>>([
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  "YYYY-MM-DD",
]);
const separater = ref<string>("-");
const weekdayFormat = ref<string>("Not included");
const weekdayOptions = ref<Array<string>>([
  "Not included",
  "Short (Mon, Tue...)",
  "Full (Monday, Tuesday...)",
]);
const total = ref<number>(0);

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
  const togglEntries: { start: string; duration: number }[] =
    await getEntries();
  entries.value = formatEntries(togglEntries);
  entries.value = groupEntries(entries.value);
  const list: number[] = getListOfAttr(entries.value, "duration") as number[];
  total.value = getTotal(list);
  console.log(total.value);
}

async function getEntries() {
  const entries: { start: string; duration: number }[] = await axios(
    "https://api.track.toggl.com/api/v8/time_entries",
    {
      method: "GET",
      params: {
        start_date: `${startDate.value}T00:00:00+00:00`,
        end_date: `${endDate.value}T23:59:59+00:00`,
      },
      auth: {
        username:
          apiKey.value.length > 0
            ? apiKey.value
            : "7dfe5d3ff1b0d0016c7863f92e99a736",
        password: "api_token",
      },
    },
  )
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });

  return entries;
}

function formatEntries(entries: { start: string; duration: number }[]) {
  const formattedEntries: { start: string; duration: number }[] = [];
  entries.forEach(entry => {
    const formattedEntry = { ...objWithPropsFromObj(entry) };
    formattedEntry.start = formatDate(
      formattedEntry.start,
      dateFormat.value,
      weekdayFormat.value,
    );
    formattedEntry.duration = formatDuration(formattedEntry.duration);

    formattedEntries.push(formattedEntry);
  });

  return formattedEntries;
}

function objWithPropsFromObj(entry: { start: string; duration: number }) {
  const formattedEntry = {
    start: entry.start,
    duration: entry.duration,
  };

  return formattedEntry;
}

function groupEntries(entries: { start: string; duration: number }[]) {
  const groupedEntries: { start: string; duration: number }[] = [];

  entries.forEach((entry: { start: string; duration: number }) => {
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

function formatDate(date: string, dateFormat: string, weekdayFormat: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  options.weekday = getWeekdayFormat(weekdayFormat);
  const locale: string = getLocale(dateFormat);

  let formattedDate: string = new Date(date).toLocaleString(locale, options);

  if (separater.value.length > 0) {
    formattedDate = fixLocaleDifferences(formattedDate);
  }

  return formattedDate;
}

function getWeekdayFormat(format: string) {
  switch (format) {
    case "Not included":
      return undefined;
    case "Short (Mon, Tue...)":
      return "short";
    case "Full (Monday, Tuesday...)":
      return "long";
    default:
      return undefined;
  }
}

function getLocale(format: string) {
  if (navigator.languages[navigator.languages.length - 1] === "da") {
    return "da-DK";
  }

  switch (format) {
    case "DD-MM-YYYY":
      return "en-UK";
    case "MM-DD-YYYY":
      return "en-US";
    case "YYYY-MM-DD":
      return "en-CA";
    default:
      return "en-US";
  }
}

function fixLocaleDifferences(str: string) {
  const splitStr: Array<string> = str.split(" ");

  console.log(splitStr);

  let day = "";
  let date = "";
  switch (splitStr.length) {
    case 2:
      day = `${capitalize(splitStr[0])} `;
    case 1:
      date = splitStr[splitStr.length - 1].replace(/-|\/|\./g, separater.value);
      break;
    default:
      break;
  }

  return `${day}${date}`;
}

function round(value: number, step: number) {
  step || (step = 1.0);
  const inv: number = 1.0 / step;
  return Math.round(value * inv) / inv;
}

function getListOfAttr(arr: { [key: string]: unknown }[], attr: string) {
  const list: unknown[] = [];

  arr.forEach(el => {
    if (el.hasOwnProperty(attr) && typeof attr === "string")
      list.push(el[attr as keyof typeof el]);
  });

  return list;
}

function getTotal(arr: number[]) {
  let total = 0;
  arr.forEach(num => {
    total += num;
  });

  return total;
}

function formatDuration(duration: number) {
  return round(duration / 60 / 60, 0.5);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function copyTable(tableId: string) {
  selectTable(tableId);
  let dataStr = `${dateHeader.value}\t${hoursHeader.value}\n`;
  entries.value.forEach(entry => {
    dataStr += `${entry.start}\t${entry.duration} ${hoursAppend.value}\n`;
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

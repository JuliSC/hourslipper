<template>
  <div class="header">⌚ Welcome to Hourslipper ⌚</div>
  <div class="card relative">
    <div class="card-title">Fetch Entries</div>
    <article class="card-body">
      <div class="card-row">
        <InputField
          class="px-1"
          title="API Key"
          placeholder="Ex: HS73HD9GHBF74GFDVFSD"
          v-model="apiKey"
        />
      </div>
      <div class="card-row">
        <div class="flex-grow px-1">
          <DateField
            title="From"
            dateType="start"
            @update-date="updateDate($event)"
          ></DateField>
        </div>
        <div class="flex-grow px-1">
          <DateField
            title="To"
            dateType="end"
            @update-date="updateDate($event)"
          ></DateField>
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
      </div>
    </article>
    <div class="card-actions">
      <button class="btn" @click="getTogglData">Fetch Time Entries</button>
    </div>
  </div>
  <div class="card relative">
    <div class="card-body">
      <div class="card-title text-end">
        <span @click="copyTable()" class="btn-emoji">📋</span>
      </div>

      <table class="data-table">
        <tr class="text-left">
          <th>{{ dateHeader.trim().length > 0 ? dateHeader : "Date" }}</th>
          <th>{{ hoursHeader.trim().length > 0 ? hoursHeader : "Hours" }}</th>
        </tr>
        <tr v-for="entry in entries" :key="entry.start">
          <td>{{ entry.start }}</td>
          <td class="text-right">{{ `${entry.duration} ${hoursAppend}` }}</td>
        </tr>
      </table>
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

function getTogglData() {
  axios("https://api.track.toggl.com/api/v8/time_entries", {
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
  })
    .then(res => {
      entries.value = res.data;
      entries.value = formatEntries(entries.value);
      entries.value = groupEntries(entries.value);
    })
    .catch(err => {
      console.log(err);
    });
}

function formatEntries(entries: { start: string; duration: number }[]) {
  const formattedEntries: { start: string; duration: number }[] = [];
  entries.forEach(entry => {
    const formattedEntry = { ...objWithPropsFromObj(entry) };
    formattedEntry.start = formatDate(formattedEntry.start, dateFormat.value);
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

function formatDate(date: string, format: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  let locale = "";
  switch (format) {
    case "DD-MM-YYYY":
      locale = "en-UK";
      break;
    case "MM-DD-YYYY":
      locale = "en-US";
      break;
    case "YYYY-MM-DD":
      locale = "en-CA";
      break;
    default:
      break;
  }

  const formattedDate: string = new Date(date).toLocaleString(locale, options);
  return formattedDate;
}

function round(value: number, step: number) {
  step || (step = 1.0);
  const inv: number = 1.0 / step;
  return Math.round(value * inv) / inv;
}

function formatDuration(duration: number) {
  return round(duration / 60 / 60, 0.5);
}

function copyTable() {
  let dataStr = "Date\tHours\n";
  entries.value.forEach(entry => {
    dataStr += `${entry.start}\t${entry.duration}\n`;
  });
  navigator.clipboard.writeText(dataStr);
}
</script>

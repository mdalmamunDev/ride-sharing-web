<template>
  <div class="min-h-screen p-4 md:px-24 space-y-4">
    <!-- Top Bar -->
    <div class="flex flex-wrap justify-between items-center bg-1 text-white px-1 rounded">
      <div class="flex gap-2">
        <button class="bg-2 px-8 py-3 rounded">Select All</button>
        <button class="bg-2 px-8 py-3 rounded">Deselect All</button>
      </div>
      <button class="bg-2 px-8 py-3 rounded">Views</button>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 md:grid-cols-9 gap-2">
      <!-- Left: Reports List -->
      <div class="md:col-span-3">
        <h1 class="bg-[#436496] text-white p-2 text-center">Reports</h1>
        <div class="space-y-4 bg-[#F3F3FB] h-full p-4">
          <div
            v-for="(report, index) in reports"
            :key="index"
            class="relative bg-white shadow rounded overflow-hidden cursor-pointer"
            @click="selectReport(report)"
          >
            <img src="/images/report.png" alt="Report preview" class="w-full rounded" />
            <div class="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-90 text-white p-3">
              <div class="font-semibold text-base">{{ report.title }}</div>
              <div class="text-sm">{{ report.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Middle: Selected Report Preview -->
      <div class="md:col-span-4">
        <h1 class="bg-[#436496] text-white p-2 text-center">{{ selectedReport?.title || 'Report Details' }}</h1>
        <div class="bg-[#F3F3FB] min-h-[300px] md:min-h-full shadow flex justify-center text-gray-800 text-lg font-medium p-4">
          <div v-if="selectedReport && reportData" class="" ref="printArea">
            <div class="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 via-blue-400 to-yellow-500 text-white rounded-md shadow">
              <!-- Logo -->
              <img :src="asset(reportLogo)" alt="Report Logo" @error="onImageError" class="w-14 h-14 object-contain rounded bg-white p-1 shadow-inner" />

              <!-- Title -->
              <h3 class="text-lg md:text-xl font-semibold tracking-wide">{{ selectedReport.title }}</h3>
            </div>
            <report-summary v-if="reportData.key === 'summary'" :report="reportData"/>
            <report-defective v-if="reportData.key === 'defective'" :report="reportData" />
            <report-work-order-detail v-if="reportData.key === 'detail'" :report="reportData"/>
          </div>
          <div v-else>Select report to begin</div>
        </div>
      </div>

      <!-- Right: Report Options and Warning -->
      <div class="md:col-span-2">
        <h1 class="bg-[#436496] text-white p-2 text-center">Report Options</h1>
        <div class="flex flex-col justify-between bg-[#F3F3FB] min-h-[300px] md:min-h-full shadow p-4">
          <div>
            <p class="text-sm">Because you selected one location and one nest, this report will be organized by group</p>
            <div class="mt-4">
              <div class="my-8 text-sm font-semibold grid grid-cols-2 items-center gap-8">
                <span>{{ new Date().toLocaleDateString() }}</span> <i class="fas fa-calendar-alt text-xl"></i>
                <span>Full Color Version</span> 
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span>Full Color Version</span>
                 <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row md:flex-col justify-between gap-2">
              <a-button class="w-full" type="primary">Schedule This Report</a-button>
              <a-button v-if="reportData" @click="printArea(reportData.name, 'printArea')" class="w-full" type="primary">Print Report</a-button>
            </div>
          </div>

          <div v-if="selectedReport" class="mt-6 bg-yellow-100 text-yellow-700 text-sm p-3 rounded border border-yellow-300">
            ⚠️ Please verify the report before scheduling or generating.
          </div>

          <div class="text-sm text-blue-700 text-center mt-8">
            <a href="#" class="">Email Us</a>
            <span class="mx-2 text-black">|</span>
            <span>(269)123541654</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ReportDefective from '@/components/ReportDefective.vue';
import ReportSummary from '@/components/ReportSummary.vue';
import ReportWorkOrderDetail from '@/components/ReportWorkOrderDetail.vue';
import * as XLSX from 'xlsx';
// import fs from 'fs';

export default {
  name: "ReportPage",
  components: {
    ReportSummary,
    ReportDefective,
    ReportWorkOrderDetail,
  },
  data() {
    return {
      clientId: null,
      selectedReport: null,
      reportData: null,
      reportLogo: null,
      reports: [
        {
          key: 'summary',
          title: "Steam Step Executive Summary",
          description: "Provides a totalized summary of selected data in a number of categories.",
        },
        {
          key: 'defective',
          title: "Work Order / Defective Trap Report",
          description: "A list of all the defective traps for selected parameters.",
        },
        {
          key: 'detail',
          title: "Report Work Order Detail",
          description: "A list of all the traps with detail.",
        },
        {
          key: 'excel',
          title: "Export All Steam Trap Data",
          description: "Microsoft Excel Spreadsheet of all the data that was entered for all traps within selected parameters.",
        },
      ],
    };
  },
  methods: {
    selectReport(report) {
      this.selectedReport = report;
      this.httpReq({
        urlSuffix: `${report.key}/${this.clientId}`,
        method: 'get',
        callback: (data) => {
          this.reportData = data;

          if (report.key === 'excel') {
            this.generateExcel(data);
          }
        }
      });
    },

    generateExcel(data) {
      const normalizedData = data.map(item => {
        const flat = {};
        for (const key in item) {
          const value = item[key];
          flat[key] = Array.isArray(value)
            ? value.join(', ')
            : typeof value === 'boolean'
            ? value ? 'Yes' : 'No'
            : value instanceof Date
            ? value.toISOString()
            : value ?? '';
        }
        return flat;
      });

      const worksheet = XLSX.utils.json_to_sheet(normalizedData);

      // ✅ Add styles to header row
      const headerKeys = Object.keys(normalizedData[0] || {});
      const range = XLSX.utils.decode_range(worksheet['!ref']);

      // Bold & color header row
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
        const cell = worksheet[cellAddress];
        if (cell) {
          cell.s = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4F81BD" } }, // Blue background
            border: {
              top: { style: "thin", color: { auto: 1 } },
              bottom: { style: "thin", color: { auto: 1 } },
              left: { style: "thin", color: { auto: 1 } },
              right: { style: "thin", color: { auto: 1 } },
            }
          };
        }
      }

      // ✅ Auto-size all columns
      worksheet['!cols'] = headerKeys.map(k => {
        const maxLen = Math.max(
          ...normalizedData.map(row => (row[k]?.toString()?.length || 10)),
          k.length
        );
        return { wch: maxLen + 2 };
      });

      // ✅ Freeze header row
      worksheet['!freeze'] = { xSplit: 0, ySplit: 1 };

      // ✅ Apply borders to all cells
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
          const cell = worksheet[cellAddress];
          if (cell && !cell.s) {
            cell.s = {
              border: {
                top: { style: "thin", color: { auto: 1 } },
                bottom: { style: "thin", color: { auto: 1 } },
                left: { style: "thin", color: { auto: 1 } },
                right: { style: "thin", color: { auto: 1 } },
              }
            };
          }
        }
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Equipment Report');

      // ✅ Write styled file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0,19);
      XLSX.writeFile(workbook, `equipment_report_full_${timestamp}.xlsx`, {
        cellStyles: true
      });
    }
  },
  mounted() {
    this.clientId = this.$route.query.cid;
    this.httpReq({customUrl: 'settings/appLogoReport', method: 'get', callback: (data) => {
      this.reportLogo = data.value;
    }})
  },
};
</script>

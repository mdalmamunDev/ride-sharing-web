<template>
  <div>
    <!-- Page Title -->
    <div class="bg-1 text-white py-3 text-center text-lg font-medium">
      Equipments
    </div>

    <!-- Filters + Table -->
    <div class="px-24 mt-6">
      <div class="flex items-center gap-4">
        <div class="me-2">
          <a-button @click="selectedLocations = locations.map(loc => loc.id)" type="primary" class="bg-2">Select All</a-button>
          <a-button @click="selectedLocations = []" type="primary" class="bg-2 ms-2">Deselect All</a-button>
        </div>
        <label v-for="location in locations" :key="location.id" class="cursor-pointer flex items-center gap-2 text-2">
          <input id="default-checkbox" type="checkbox" v-model="selectedLocations" :value="location.id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2">
          {{ location.name }}({{ location.equipmentsCount || 0 }})
        </label>
        <!-- <router-link :to="`equipment-details?clientId=${clientId}`"> -->
          <a-button type="primary" @click="$router.push(`equipment-details?clientId=${this.clientId}`)" class="bg-2 ms-auto">Add New</a-button>
        <!-- </router-link> -->
      </div>
      <div class="flex justify-center">
        <div class="overflow-x-auto mb-6 min-h-[60vh]">
          <table class="min-w-max whitespace-nowrap table-auto text-left border-separate text-center">
            <thead>
              <tr class="bg-1 text-white rounded">
                <th class="py-2 px-3 border" v-resizable>
                  <label class="cursor-pointer flex items-center gap-2">
                    <input id="default-checkbox" type="checkbox" @change="selectAll" :checked="isAllSelected" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2">
                  </label>
                </th>
                <th id="th-tagNo" class="col-tagNo py-2 px-3 border" v-resizable>Tag Number <sort-drop-down field="tagNo" :hidden="false"/> </th>
                <th id="th-manufacturer" class="col-manufacturer py-2 px-3 border" v-resizable>Manufacturer <sort-drop-down field="manufacturer"/> </th>
                <th id="th-model" class="col-model py-2 px-3 border" v-resizable>Model <sort-drop-down field="model"/> </th>
                <th id="th-lastReading" class="col-lastReading py-2 px-3 border" v-resizable>Last Reading <sort-drop-down field="lastReading" :filterFields="['lastReadingFrom', 'lastReadingTo']"/> </th>
                <th id="th-physicalLocation" class="col-physicalLocation py-2 px-3 border" v-resizable>Physical Location <sort-drop-down field="physicalLocation"/> </th>
                <th id="th-condition" class="col-condition py-2 px-3 border" v-resizable>Condition <sort-drop-down field="condition"/> </th>
                <th id="th-steamLoss" class="col-steamLoss py-2 px-3 border" v-resizable>Steam Loss (lb/yr) <sort-drop-down field="steamLoss" :filterFields="['steamLossFrom', 'steamLossTo']"/> </th>
                <th id="th-annualLoss" class="col-annualLoss py-2 px-3 border" v-resizable>Estimated Annual Loss <sort-drop-down field="annualLoss"/> </th>
                <th id="th-fuelUsed" class="col-fuelUsed py-2 px-3 border" v-resizable>Fuel Used (MMBTU/yr) <sort-drop-down field="fuelUsed" :filterFields="['fuelUsedFrom', 'fuelUsedTo']"/> </th>
                <th id="th-co2Emissions" class="col-co2Emissions py-2 px-3 border" v-resizable>CO2 Emissions (lb/yr) <sort-drop-down field="co2Emissions" :filterFields="['co2EmissionsFrom', 'co2EmissionsTo']"/> </th>
                <th id="th-repairCost" class="col-repairCost py-2 px-3 border" v-resizable>Repair Cost <sort-drop-down field="repairCost"/> </th>
                <th id="th-paybackPeriod" class="col-paybackPeriod py-2 px-3 border" v-resizable>Payback Period(months) <sort-drop-down field="paybackPeriod" :filterFields="['paybackPeriodFrom', 'paybackPeriodTo']"/> </th>
                <th id="th-pressureIn" class="col-pressureIn py-2 px-3 border" v-resizable>Pressure In <sort-drop-down field="pressureIn" :filterFields="['pressureInFrom', 'pressureInTo']"/> </th>
                <th id="th-lastResolve" class="col-lastResolve py-2 px-3 border" v-resizable>Last Resolve <sort-drop-down field="lastResolve" :filterFields="['lastResolveFrom', 'lastResolveTo']"/> </th>
              </tr>
              <tr class="text-sm text-gray-700">
                <!--  -->
                <th class="px-3"></th>
                <!-- tagNo -->
                <th class="px-3 col-tagNo">
                  <a-input type="text" v-model:value="filters.tagNo" @keyup.enter="fetchData({page: 1})" placeholder="Contains" class="w-full border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                </th>
                <!-- manufacturer -->
                <th class="px-3 col-manufacturer">
                  <a-input type="text" v-model:value="filters.manufacturer" @keyup.enter="fetchData({page: 1})" placeholder="Contains" class="w-full border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                </th>
                <!-- model -->
                <th class="px-3 col-model">
                  <a-input type="text" v-model:value="filters.model" @keyup.enter="fetchData({page: 1})" placeholder="Contains" class="w-full border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                </th>
                <!-- lastReading -->
                <th class="px-3 col-lastReading">
                  <div class="flex gap-1 w-full">
                    <a-input type="date" v-model:value="filters.lastReadingFrom" @change="fetchData({page: 1})" placeholder="On or After" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                    <a-input type="date" v-model:value="filters.lastReadingTo" @change="fetchData({page: 1})" placeholder="Before" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center"/>
                  </div>
                </th>
                <!-- physicalLocation -->
                <th class="px-3 col-physicalLocation">
                  <a-input type="text" v-model:value="filters.physicalLocation" @keyup.enter="fetchData({page: 1})" placeholder="Contains" class="w-full border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                </th>
                <!-- condition -->
                <th class="px-3 col-condition">
                  <select
                    v-model="filters.condition"
                    @change="fetchData({page: 1})"
                    class="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <option :value="undefined" >SELECT</option>
                    <option v-for="(color, key) in conditionColorMap" :key="key" :value="key" :class="`text-[${color}]`">{{ key }}</option>
                  </select>
                </th>
                <!-- steamLoss -->
                <th class="px-3 col-steamLoss">
                  <div class="flex gap-1">
                    <a-input type="number" min="0" v-model:value="filters.steamLossFrom" @keyup.enter="fetchData({page: 1})" placeholder="Greater than" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                    <a-input type="number" min="0" v-model:value="filters.steamLossTo" @keyup.enter="fetchData({page: 1})" placeholder="Less than or equal" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                  </div>
                </th>
                <!-- annualLoss -->
                <th class="col-annualLoss"></th>
                <!-- fuelUsed -->
                <th class="px-3 col-fuelUsed">
                  <div class="flex gap-1">
                    <a-input type="number" min="0" v-model:value="filters.fuelUsedFrom" @keyup.enter="fetchData({page: 1})" placeholder="Greater than" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                    <a-input type="number" min="0" v-model:value="filters.fuelUsedTo" @keyup.enter="fetchData({page: 1})" placeholder="Less than or equal" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                  </div>
                </th>
                <!-- co2Emissions -->
                <th class="px-3 col-co2Emissions">
                  <div class="flex gap-1">
                    <a-input type="number" min="0" v-model:value="filters.co2EmissionsFrom" @keyup.enter="fetchData({page: 1})" placeholder="Greater than" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                    <a-input type="number" min="0" v-model:value="filters.co2EmissionsTo" @keyup.enter="fetchData({page: 1})" placeholder="Less than or equal" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                  </div>
                </th>
                <!-- repairCost -->
                <th class="col-repairCost"></th> 
                <!-- paybackPeriod -->
                <th class="px-3 col-paybackPeriod">
                  <div class="flex gap-1">
                    <a-input type="number" min="0" v-model:value="filters.paybackPeriodFrom" @keyup.enter="fetchData({page: 1})" placeholder="Greater than" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                    <a-input type="number" min="0" v-model:value="filters.paybackPeriodTo" @keyup.enter="fetchData({page: 1})" placeholder="Less than or equal" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                  </div>
                </th>
                <!-- pressureIn -->
                <th class="px-3 col-pressureIn">
                  <div class="flex gap-1">
                    <a-input type="number" min="0" v-model:value="filters.pressureInFrom" @keyup.enter="fetchData({page: 1})" placeholder="Greater than" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                    <a-input type="number" min="0" v-model:value="filters.pressureInTo" @keyup.enter="fetchData({page: 1})" placeholder="Less than or equal" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                  </div>
                </th>
                <!-- Last Resolve  -->
                <th class="px-3 col-lastResolve">
                  <div class="flex gap-1">
                    <a-input type="date" v-model:value="filters.lastResolveFrom" @change="fetchData({page: 1})" placeholder="On or After" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                    <a-input type="date" v-model:value="filters.lastResolveTo" @change="fetchData({page: 1})" placeholder="Before" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, i) in dataList?.data" :key="i" :class="i % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-sky-50 hover:bg-sky-100'" >
                <td :class="`border-e-[5px] border-[${conditionColorMap[data.condition] || 'gray-300'}]`" class="px-3 py-4">
                  <input id="default-checkbox" type="checkbox" @change="selectItem(data.id)" :checked="isAllSelected || selected.includes(data.id)" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2">
                </td>
                <td class="col-tagNo px-3 py-2">
                  <router-link :to="`equipment-details?id=${data.id}&clientId=${clientId}`">{{data.tagNo}}</router-link>
                </td>
                <td class="col-manufacturer px-3 py-2">{{data.manufacturer || '-'}}</td>
                <td class="col-model px-3 py-2">{{data.model || '-'}}</td>
                <td class="col-lastReading px-3 py-2">{{formatDate(data.lastReading) || '-'}}</td>
                <td class="col-physicalLocation px-3 py-2">{{data.physicalLocation || '-'}}</td>
                <td class="col-condition px-3 py-2" :class="`text-[${conditionColorMap[data.condition]}]`">{{data.condition || '-'}}</td>
                <td class="col-steamLoss px-3 py-2">{{data.steamLoss    ? data.steamLoss?.toFixed(2)     :  '-'}}</td>
                <td class="col-annualLoss px-3 py-2">{{data.annualLoss   ? data.annualLoss?.toFixed(2)    :  '-'}}</td>
                <td class="col-fuelUsed px-3 py-2">{{data.fuelUsed     ? data.fuelUsed?.toFixed(2)      :  '-'}}</td>
                <td class="col-co2Emissions px-3 py-2">{{data.co2Emissions ? data.co2Emissions?.toFixed(2)  :  '-'}}</td>
                <td class="col-repairCost px-3 py-2">{{data.repairCost   ? data.repairCost?.toFixed(2)    :  '-'}}</td>
                <td class="col-paybackPeriod px-3 py-2">{{data.paybackPeriod || '-'}}</td>
                <td class="col-pressureIn px-3 py-2">{{data.pressureIn || '-'}}</td>
                <td class="col-lastResolve px-3 py-2">{{formatDate(data.lastResolve) || '-'}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mb-12">
        <div>Selected <span class="border border-blue-300 rounded p-2 px-3 mx-2">
          {{ isAllSelected ? dataList?.pagination?.totalCount || 0 : selected.length  }}</span> out of 
          {{ dataList?.pagination?.totalCount || 0 }}</div>
        <button :disabled="!selected.length" @click="toggleAllModal" class="bg-2 ms-64 w-48 py-3 rounded-lg text-white hover:bg-blue-600">Edit Selected</button>
        <pagination-comp />
      </div>

      <!-- edit selected modal -->
      <div v-if="openAllModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
          <div class="flex items-center justify-between mb-4">
              <span class="font-semibold text-lg">Edit Selected {{ isAllSelected ? dataList?.pagination?.totalCount || 0 : selected.length }}</span>
              <button class="text-2xl text-gray-500 hover:text-black" @click="toggleAllModal">
                &times;
              </button>
          </div>
          <form @submit.prevent="submitSelected" class="m-2 p-2 border-2 rounded overflow-y-auto max-h-[80vh]">
            <div class="space-y-4 text-sm">
              <!-- Manufacturer -->
              <div class="flex items-center gap-4">
                <label class="w-48 text-end">Manufacturer:</label>
                <a-input v-model:value="formData.manufacturer" class="flex-1" placeholder="Manufacturer" />
              </div>

              <!-- Type -->
              <div class="flex items-center gap-4">
                <label class="w-48 text-end">Type:</label>
                <select
                  v-model="formData.type"
                  class="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                        focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                  <option v-for="(type, index) in eqTypes" :key="index" :value="type">{{ type }}</option>
                </select>
              </div>

              <!-- Model -->
              <div class="flex items-center gap-4">
                <label class="w-48 text-end">Model:</label>
                <a-input v-model:value="formData.model" class="flex-1" placeholder="Model" />
              </div>

              <!-- Connection Size -->
              <div class="flex items-center gap-4">
                <label class="w-48 text-end">Connection Size<sup>"</sup>:</label>
                <a-input
                  type="number"
                  step="0.01"
                  min="0"
                  :value="formData.connectionSize"
                  @input="formData.connectionSize = parseFloat($event.target.value) || 0"
                  class="flex-1"
                />
              </div>

              <!-- Connection Type -->
              <div class="flex items-center gap-4">
                <label class="w-48 text-end">Connection Type:</label>
                <select
                  v-model="formData.connectionType"
                  class="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                        focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                  <option v-for="(type, index) in eqConnectionType" :key="index" :value="type">{{ type }}</option>
                </select>
              </div>

              <!-- Standard -->
              <div class="flex items-center gap-4">
                <label class="w-48 text-end">Standard:</label>
                <select
                  v-model="formData.standard"
                  class="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                        focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                  <option v-for="(value, index) in eqStandard" :key="index" :value="value">{{ value }}</option>
                </select>
              </div>

              <!-- Standard -->
              <div class="flex items-center gap-4">
                <label class="w-48 text-end">Location:</label>
                <select
                  v-model="formData.locationId"
                  class="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                        focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                  <option v-for="(data, index) in locations" :key="index" :value="data.id">{{ data.name }}</option>
                </select>
              </div>

              <!-- Bolt -->
              <div class="flex items-center gap-4">
                <label class="w-48 text-end">Bolt:</label>
                <a-input
                  type="number"
                  min="0"
                  :value="formData.bolt"
                  @input="formData.bolt = parseInt($event.target.value) || 0"
                  class="flex-1"
                />
              </div>

              <!-- Rating -->
              <div class="flex items-center gap-4">
                <label class="w-48 text-end">Class/Connection/Rating:</label>
                <a-input v-model:value="formData.rating" class="flex-1" placeholder="Rating" />
              </div>

              <!-- PMO -->
              <div class="flex items-center gap-4">
                <label class="w-48 text-end">PMO:</label>
                <a-input
                  type="number"
                  step="0.01"
                  min="0"
                  :value="formData.pmo"
                  @input="formData.pmo = parseFloat($event.target.value) || 0"
                  class="flex-1"
                />
              </div>

              <div class="flex items-center gap-4">
                <label class="w-48 text-end">Condition:</label>
                <select
                  v-model="formData.condition"
                  class="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                        focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                  <option v-for="(color, key) in conditionColorMap" :key="key" :value="key" :class="`text-[${color}]`">{{ key }}</option>
                </select>
              </div>

              <!-- Installation Date -->
              <div class="flex items-center gap-4">
                <label class="w-48 text-end">Installation Date:</label>
                <a-input type="date" v-model:value="formData.installationDate" class="flex-1" />
              </div>

              <!-- Comment -->
              <div class="flex items-start gap-4">
                <label class="w-48 text-end pt-2">Comment:</label>
                <textarea
                  v-model="formData.comment"
                  rows="4"
                  class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 shadow-sm
                        focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none"
                  placeholder="Enter comment"
                ></textarea>
              </div>

              <!-- Recommendation -->
              <div class="flex items-start gap-4">
                <label class="w-48 text-end pt-2">Recommendation:</label>
                <textarea
                  v-model="formData.recommendation"
                  rows="4"
                  class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 shadow-sm
                        focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none"
                  placeholder="Enter recommendation"
                ></textarea>
              </div>
            </div>
            <div class="flex justify-end mt-4">
              <button type="button" class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2" @click="toggleAllModal">Cancel</button>
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationComp from "../components/PaginationComp.vue";
import SortDropDown from "../components/SortDropDown.vue";
import Resizable from '../directives/resizable';

export default {
  name: "EquipmentsPage",
  components: {
    PaginationComp,
    SortDropDown
  },
  directives: {
    resizable: Resizable,
  },
  data() {
    return {
      clientId: null,
      isAllSelected: false,
      selected: [],
      locations: [],
      selectedLocations: [],
      openAllModal: false,
    };
  },
  methods: {
    selectAll() {
      this.isAllSelected = !this.isAllSelected;
      this.selected = [];
      if (this.isAllSelected) {
        this.selected = this.dataList?.data.map(item => item.id);
      }
    },
    selectItem(id) {
      const index = this.selected.indexOf(id);
      if (index > -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(id);
      }

      // select all if all items are selected
      this.isAllSelected = this.selected.length === this.dataList?.pagination?.totalCount;
    },
    toggleAllModal() {
      this.openAllModal = !this.openAllModal;
    },
    submitSelected() {
      this.formData.clientId = this.clientId;
      this.formData.selected = this.selected;
      this.formData.isAllSelected = this.isAllSelected;
      this.formData.selectedLocationId = this.locations?.map(loc => loc.id) || [];

      this.httpReq({urlSuffix: 'update-all', callback: () => {
        this.fetchData();
        this.toggleAllModal();
        this.$store.commit('setFormData', {});
        this.selected = [];
        this.isAllSelected = false;
      }})
    },
  },
  mounted() {
    this.$store.commit('setDataList', null);
    this.clientId = this.$route.query.id;
    this.$store.commit('setFilters', {clientId:this.clientId});
    this.$store.commit('setFormData', {});
    // this.fetchData();
    this.httpReq({customUrl: 'clients/locations', urlSuffix: this.clientId, method: 'get', callback: (data) => {
      this.locations = data;
      this.selectedLocations = data.map(loc => loc.id) || [];
    }})
  },
  watch: {
    selectedLocations(newVal) {
      this.filters.locationIds = newVal.join(',');
      this.fetchData();
    }
  }
};
</script>

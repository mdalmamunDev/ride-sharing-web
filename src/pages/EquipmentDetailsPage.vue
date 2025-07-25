<template>
  <div class="min-h-screen p-4 md:px-24">
    <!-- Top Bar -->
    <div class="flex flex-wrap justify-between items-center bg-1 text-white rounded p-1.5 mb-0.5">
      <button @click="cancelAlert" class="px-3"><i class="fa-solid fa-caret-left"></i> Back </button>
      <div class="flex gap-2">
        <!-- <button class="px-3"><i class="fa-solid fa-gear me-1"></i>Settings</button>
        <button class="px-3 text-gray-300"><i class="fa-solid fa-clock-rotate-left me-1"></i>Resolve History</button>
        <button class="px-3 text-gray-300"><i class="fa-solid fa-clock-rotate-left me-1"></i>History</button> -->
        EQUIPMENT DETAILS
      </div>
      <button @click="duplicate" class="px-3">Duplicate</button>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 md:grid-cols-10 gap-2 bg-gray-200">
      <!-- Left: Reports List -->
      <div class="md:col-span-3 h-full">
        <!-- <h1 class="bg-[#436496] text-white p-2 text-center">Reports</h1> -->
        <div class="space-y-4 bg-[#F3F3FB] shadow">
          <div class="col-span-3 space-y-4">
            <div class="grid grid-cols-5 gap-1 p-4 rounded shadow">
              <!-- Left: Thumbnails (1 column on desktop) -->
              <div class="flex flex-col gap-y-1 col-span-1">
                <img v-for="(img, index) in formData.images" :key="index" :src="asset(img)" @click="selectedImage = img" @error="onImageError" :class="[
                    'w-24 md:w-full object-cover cursor-pointer rounded border',
                    selectedImage === img ? 'border-blue-500' : 'border-gray-300'
                  ]" />
              </div>

              <!-- Right: Large Preview + Buttons -->
              <div class="col-span-4">
                <!-- Main Preview Image -->
                <img :src="asset(selectedImage)" @error="onImageError" alt="Selected" class="max-h-[400px] w-auto rounded shadow-md mx-auto" />

                <!-- Buttons -->
                <div class="inline-flex flex-wrap gap-4 mt-10 w-full items-end justify-between">
                  <div class="inline-flex flex-col gap-4">
                    <file-uploader @uploaded="addImage" accept="image/*">
                      <a-button type="primary" class="bg-2">Add image</a-button>
                    </file-uploader>
                    <a-button @click="setAsDefault" :class="{'opacity-50': !selectedImage}">Set as default</a-button>
                  </div>
                  <div>
                    <a-button @click="deleteImage" :class="{'opacity-50': !selectedImage}" type="primary" danger>Delete image</a-button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-sm bg-5 mb-1 text-white text-center p-2">ANNUAL LOSS</h3>
              <div class="space-y-1 text-sm bg-4 p-2 text-gray-200">
                <div class="flex justify-between">
                  <span>Steam Loss</span><span>{{ formData.steamLoss?.toFixed(2) || 'N/A' }} lb</span>
                </div>
                <div class="flex justify-between">
                  <span>Steam Loss Cost</span><span>{{ formData.annualLoss?.toFixed(2) || 'N/A' }} USD</span>
                </div>
                <div class="flex justify-between">
                  <span>Fuel Used</span><span>{{ formData.fuelUsed?.toFixed(2) || 'N/A' }} MMBTU</span>
                </div>
                <div class="flex justify-between">
                  <span>CO2 Emissions</span><span>{{ formData.co2Emissions?.toFixed(2) || 'N/A' }} lb</span>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-5 lg:hidden">
            <h3 class="text-sm bg-5 mb-1 text-white text-center p-2">CONDITION</h3>
            <div class="flex flex-col justify-between bg-[#F3F3FB] min-h-[300px] md:min-h-full shadow p-4">
              <button type="primary" @click="showModal" class="w-full mt-6 p-2 bg-green-500 text-white">{{ formData.condition }}</button>

              <!-- Warning section -->
              <div v-if="selectedReport"
                class="mt-6 bg-yellow-100 text-yellow-700 text-sm p-3 rounded border border-yellow-300">
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

      <!-- Middle: Selected Report Preview -->
      <form ref="myForm" class="md:col-span-7 lg:col-span-5 bg-[#F3F3FB] w-full">
        <!-- Header -->
        <div class="bg-5 text-white p-1 grid grid-cols-6">
          <button class="w-24 text-sm" @click="activeKey = []">Collapse All</button>
          <div class="col-span-4 text-center">
            <h3>{{ formData.location?.name || 'NA' }} - {{ formData.tagNo }}</h3>
            <p class="text-xs font-light text-gray-300">{{formData.physicalLocation}}</p>
          </div>
        </div>

        <!-- Collapsible Sections -->
        <a-collapse v-model:activeKey="activeKey" class="mt-4 bg-6" expand-icon-position="end">
          <!-- Profile Section -->
          <a-collapse-panel key="1">
            <template #header>
              <div class="flex items-center gap-2">
                <img src="/images/ic-4.svg" class="w-5"/>
                <span>Profile</span>
              </div>
            </template>
            <section class="space-y-4">
              <div class="grid grid-cols-3 gap-4 text-sm items-center">
                <label class="text-end ">Physical Location</label>
                <a-textarea v-model:value="formData.physicalLocation" required class="col-span-2 border p-2 bg-white w-full" placeholder="Physical Location" />

                <label class="text-end">Client Location</label>
                <select
                  v-model="formData.locationId"
                  required
                  class="col-span-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                        focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                  <!-- <option value="" disabled hidden>Select</option> -->
                  <option v-for="(location, index) in clientLocations" :key="index" :value="location.id">{{ location.name }}</option>
                </select>

                <label class="text-end ">Last Update</label>
                <div class="col-span-2 flex flex-wrap items-center gap-2">
                  <a-input type="date" :value="inputDate(formData.updatedAt)" required readonly class="w-full sm:w-auto"/>
                  <div class="hidden 2xl:block ml-auto flex">
                    <label class="">Tag Number</label>
                    <a-input v-model:value="formData.tagNo" required class="max-w-32 border p-1 bg-white ms-2" />
                  </div>
                </div>

                <label class="2xl:hidden text-end ">Tag Number</label>
                <a-input v-model:value="formData.tagNo" required class="2xl:hidden w-full col-span-2 border p-1 bg-white" />
              </div>
            </section>
          </a-collapse-panel>

          <!-- Device Information Section -->
          <a-collapse-panel key="2">
            <template #header>
              <div class="flex items-center gap-2">
                <img src="/images/ic-4.svg" class="w-5"/>
                <span>Device Information</span>
              </div>
            </template>
            <section class="rounded space-y-4">
              <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 text-sm items-center">
                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Manufacturer</label>
                  <a-input v-model:value="formData.manufacturer" required class="col-span-2 xl:col-span-1" placeholder="Manufacturer" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Type</label>
                  <select
                    v-model="formData.type"
                    required
                    class="col-span-2 xl:col-span-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <!-- <option value="" disabled hidden>Select</option> -->
                    <option v-for="(type, index) in eqTypes" :key="index" :value="type">{{ type }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Model</label>
                  <a-input v-model:value="formData.model" required class="col-span-2 xl:col-span-1" placeholder="Model" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Connection Size<sup>"</sup></label>
                  <a-input type="number" step='0.01' min="0" :value="formData.connectionSize" @input="formData.connectionSize = parseFloat($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="0" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Connection Type</label>
                  <select
                    v-model="formData.connectionType"
                    required
                    class="col-span-2 xl:col-span-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <!-- <option value="" disabled hidden>Select</option> -->
                    <option v-for="(type, index) in eqConnectionType" :key="index" :value="type">{{ type }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Standard</label>
                  <select
                    v-model="formData.standard"
                    required
                    class="col-span-2 xl:col-span-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <!-- <option value="" disabled hidden>Select</option> -->
                    <option v-for="(value, index) in eqStandard" :key="index" :value="value">{{ value }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Bolt</label>
                  <a-input type="number" min="0" :value="formData.bolt" @input="formData.bolt = parseInt($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="0" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Class/Connection/Rating</label>
                  <a-input v-model:value="formData.rating" required class="col-span-2 xl:col-span-1" placeholder="Rating" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">PMO</label>
                  <a-input type="number" step='0.01' min="0" :value="formData.pmo" @input="formData.pmo = parseFloat($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="0" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Orifice Area (in.<sup>2</sup>)</label>
                  <a-input type="number" step='0.01' min="0" :value="formData.orificeArea" @input="formData.orificeArea = parseFloat($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="0" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Installation Date</label>
                  <a-input type="date" class="col-span-2 xl:col-span-1" v-model:value="formData.installationDate" required />
                </div>
              </div>
            </section>
          </a-collapse-panel>

          <!-- Equipment Service Details -->
          <a-collapse-panel key="3">
            <template #header>
              <div class="flex items-center gap-2">
                <img src="/images/ic-4.svg" class="w-5"/>
                <span>Equipment Service Details</span>
              </div>
            </template>
            <section class="space-y-4">
              <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 text-sm items-center">
                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Application</label>
                  <select
                    v-model="formData.application"
                    required
                    class="col-span-2 xl:col-span-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <!-- <option value="" disabled hidden>Select</option> -->
                    <option v-for="(app, index) in eqApplication" :key="index" :value="app">{{ app }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Equipment Service</label>
                  <select
                    v-model="formData.service"
                    required
                    class="col-span-2 xl:col-span-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <!-- <option value="" disabled hidden>Select</option> -->
                    <option v-for="(service, index) in eqServices" :key="index" :value="service">{{ service }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Steam Pressure In (psig)</label>
                  <a-input type="number" step='0.01' min="0" :value="formData.pressureIn" @input="formData.pressureIn = parseFloat($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="100" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Pressure Out (psig)</label>
                  <a-input type="number" step='0.01' min="0" :value="formData.pressureOut" @input="formData.pressureOut = parseFloat($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="0" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Supply</label>
                  <select
                    v-model="formData.supply"
                    required
                    class="col-span-2 xl:col-span-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <!-- <option value="" disabled hidden>Select</option> -->
                    <option v-for="(supply, index) in eqSupply" :key="index" :value="supply">{{ supply }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Time In Service</label>
                  <a-input type="number" step='0.01' min="0" :value="formData.timeInService" @input="formData.timeInService = parseFloat($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="0" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Est. Installation Cost (USD)</label>
                  <a-input type="number" step='0.01' min="0" :value="formData.esInstallationCost" @input="formData.esInstallationCost = parseFloat($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="100" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Est. Replacement Cost (USD)</label>
                  <a-input type="number" step='0.01' min="0" :value="formData.esReplacementCost" @input="formData.esReplacementCost = parseFloat($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="100" />
                </div>
              </div>
            </section>
          </a-collapse-panel>

          <!-- Steam Section -->
          <a-collapse-panel key="4">
            <template #header>
              <div class="flex items-center gap-2">
                <img src="/images/ic-4.svg" class="w-5"/>
                <span>Steam</span>
              </div>
            </template>
            <section class="space-y-4">
              <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 text-sm items-center">
                
                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Discharge</label>
                  <select
                    v-model="formData.discharge"
                    required
                    class="col-span-2 xl:col-span-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <!-- <option value="" disabled hidden>Select discharge</option> -->
                    <option v-for="(discharge, index) in eqDischarge" :key="index" :value="discharge">{{ discharge }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Condensate Load (lb/hr)</label>
                  <a-input type="number" step='0.01' min="0" :value="formData.condensate" @input="formData.condensate = parseFloat($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="0" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Superheat</label>
                  <a-switch v-model:checked="formData.superheat" class="w-fit"/>
                </div>

              </div>
            </section>
          </a-collapse-panel>

          <!-- Installation Section -->
          <a-collapse-panel key="5">
            <template #header>
              <div class="flex items-center gap-2">
                <img src="/images/ic-4.svg" class="w-5"/>
                <span>Installation</span>
              </div>
            </template>
            <section class="space-y-4">
              <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 text-sm items-center">
                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Line Size In</label>
                  <select
                    v-model="formData.lineSizeIn"
                    required
                    class="col-span-2 xl:col-span-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <!-- <option value="" disabled hidden>Select</option> -->
                    <option v-for="(size, index) in eqLineSize" :key="index" :value="size">{{ size }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Line Size Out</label>
                  <select
                    v-model="formData.lineSizeOut"
                    required
                    class="col-span-2 xl:col-span-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <!-- <option value="" disabled hidden>Select</option> -->
                    <option v-for="(size, index) in eqLineSize" :key="index" :value="size">{{ size }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Pipe Orientation</label>
                  <select
                    v-model="formData.pipeOrientation"
                    required
                    class="col-span-2 xl:col-span-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <!-- <option value="" disabled hidden>Select</option> -->
                    <option v-for="(orientation, index) in eqPipeOrientation" :key="index" :value="orientation">{{ orientation }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Condensate Lift (ft)</label>
                  <a-input type="number" step='0.01' min="0" :value="formData.condensateLift" @input="formData.condensateLift = parseFloat($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="0" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Elevation (ft)</label>
                  <a-input type="number" step='0.01' min="0" :value="formData.elevation" @input="formData.elevation = parseFloat($event.target.value) || 0" required class="col-span-2 xl:col-span-1" placeholder="1" />
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Insulation Type</label>
                  <select
                    v-model="formData.insulationType"
                    required
                    class="col-span-2 xl:col-span-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm
                          focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <!-- <option value="" disabled hidden>Select</option> -->
                    <option v-for="(type, index) in eqInsulationTypes" :key="index" :value="type">{{ type }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Outside</label>
                  <a-switch v-model:checked="formData.outside" class="w-fit"/>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <label class="col-span-1 xl:col-span-2 text-end ">Shutdown Required</label>
                  <a-switch v-model:checked="formData.shutdownReq" class="w-fit"/>
                </div>
              </div>
            </section>
          </a-collapse-panel>
        </a-collapse>
      </form>




      <!-- Right: Report Options and Warning -->
      <div class="hidden lg:block col-span-2 min-h-[300px] md:min-h-full">
        <div class="flex flex-col justify-between shadow h-full max-h-[60vh] bg-[#F3F3FB]">
          <div>
            <h1 class="bg-[#436496] text-white p-3 text-center">CONDITION</h1>
            <div class="m-2">
              <button type="primary" @click="showModal" class="w-full mt-6 p-2 text-white" :class="`bg-[${conditionColorMap[formData.condition] || '#454443'}]`">{{ formData.condition }}</button>
            </div>
          </div>
          <div class="text-sm text-blue-700 text-center my-3">
            <a href="#" class="">Email Us</a>
            <span class="mx-2 text-black">|</span>
            <span>(269)123541654</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#f3f3f0] py-4 px-6 mt-4">
      <div class="flex justify-between items-center max-w-full">
        <a-button @click="cancelAlert" type="primary" class="bg-2">Cancel</a-button>

        <div class="flex gap-4">
          <a-button @click="goTo('prev')" class="btn-outline">Previous</a-button>
          <a-button @click="goTo('next')" type="primary" class="bg-2">Next</a-button>
        </div>

        <div class="flex gap-4">
          <a-button @click="handleSave(false)" class="btn-outline">Save</a-button>
          <a-button @click="handleSave(true)" type="primary" class="bg-2">Save & Exit</a-button>
        </div>
      </div>
    </div>

    <!-- Condition modal -->
    <a-modal v-model:open="modalOpen" :footer="null" centered width="500"  :closable="false">
      <template #title>
         <h1 class="bg-[#436496] text-white p-3 text-center">CONDITION</h1>
      </template>
      <!-- Conditions Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-2">
        <button v-for="(color, key) in conditionColorMap" :key="key" @click="selectCondition(key)"
          class="border border-gray-400 text-xs hover:bg-blue-100 transition h-24 w-24 text-center"
          :class="`text-[${color}]`"
        >
          {{ key }}
        </button>
      </div>

      <!-- Info Text -->
      <div class="text-center text-sm mt-4 text-gray-600">
        Selected condition is saved immediately
      </div>

      <!-- Cancel Button -->
      <div class="flex justify-center py-4">
        <button @click="modalOpen = false" class="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100" >
          Cancel
        </button>
      </div>
    </a-modal>
  </div>
</template>


<script>
import FileUploader from '@/components/FileUploader.vue';
import Swal from 'sweetalert2';

export default {
  name: "EquipmentDetailsPage",
  components: {
    FileUploader
  },
  data() {
    return {
      equipmentId: null,
      clientId: null,
      selectedReport: null,
      checked: true,
      checked2: true,
      modalOpen: false,
      activeKey: ['1', '2', '3', '4', '5'],
      selectedImage: null,
      clientLocations: [],
    };
  },
  methods: {
    selectReport(report) {
      this.selectedReport = report;
    },
    collapseAll() {
      this.activeKey = []
    },
    showModal() {
      this.modalOpen = true;
    },
    selectCondition(condition) {
      this.formData.condition = condition;
      this.modalOpen = false;
    },
    addImage({path}) {
      if (!this.formData.images) {
        this.formData.images = [];
      }

      this.selectedImage = path;
      this.formData.images?.push(path);
    },
    deleteImage() {
      if (this.selectedImage) {
        this.formData.images = this.formData.images.filter(img => img !== this.selectedImage);
        this.selectedImage = this.formData.images[0] || null;
      }
    },
    setAsDefault() {
      if (this.selectedImage) {
        this.formData.images = this.formData.images.filter(img => img !== this.selectedImage);
        this.formData.images.unshift(this.selectedImage);
      }
    },
    handleSave(exit = false) {
      if (!this.$refs.myForm.checkValidity()) {
        this.$refs.myForm.reportValidity();
        return;
      }

      if(!this.formData.locationId) {
        this.showToast("Location is required", 'warning');
        return;
      }

      let method = 'post';

      if (this.equipmentId) {
        method = 'put';
      }


      this.formData.images = this.formData.images || [];
      this.formData.id = undefined;
      this.formData.client = undefined;
      this.formData.location = undefined;
      this.formData.updatedAt = undefined;

      this.httpReq({
        urlSuffix: this.equipmentId ,
        method: method,
        data: this.formData,
        callback: (data) => {
          this.$store.commit('setFormData', data);
          this.equipmentId = data.id;
          if (exit) {
            this.$router.push(`equipments?id=${this.clientId}`);
          }
        }
      });
    },
    cancelAlert() {
      Swal.fire({
        title: 'Discard Changes!',
        text: 'Do you want to Discard Changes?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cancel',
        cancelButtonText: 'Discard',
      }).then((result) => {
        if (!result.isConfirmed) {
          this.$router.push(`equipments?id=${this.clientId}`);
        }
      });
    },
    goTo(direction = 'next') {
      Swal.fire({
        title: 'Discard Changes!',
        text: 'Do you want to Discard Changes?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cancel',
        cancelButtonText: `Discard and ${direction}`,
      }).then((result) => {
        if (!result.isConfirmed) {
          this.httpReq({urlSuffix: `nav?crr=${this.equipmentId}&dir=${direction}`, method: 'get', callback: (data) => {
            this.$store.commit('setFormData', data);
            this.selectedImage = data.images[0];
            this.equipmentId = data.id;
            this.$router.push(`equipment-details?id=${data.id}&clientId=${this.clientId}`);
          }});
        }
      });
      
    },
    duplicate() {
      this.formData.id = undefined;
      this.equipmentId = undefined;
      this.showToast('The equipment duplicated.',);
    }
  },
  mounted() {
    this.clientId = Number(this.$route.query.clientId);
    this.equipmentId = this.$route.query.id;
    if(this.equipmentId) {
      this.httpReq({urlSuffix: this.equipmentId, method: 'get', callback: (data) => {
        this.$store.commit('setFormData', data);
        this.selectedImage = data.images[0];
      }});
    } else {
      this.$store.commit('setFormData', {
        condition: 'GOOD',
        images: [],
        clientId: this.clientId,
        // manufacturer: '',
        // type: this.eqTypes[0],
        // model: '',
        // connectionSize: 0,
        // connectionType: this.eqConnectionType[0],
        // standard: this.eqStandard[0],
        // bolt: 0,
        // rating: '',
        // pmo: 0,
        // installationDate: '',
        // physicalLocation: '',
        // locationId: '',
        // tagNo: '',
        // application: this.eqApplication[0],
        // service: this.eqServices[0],
        // pressureIn: 0,
        // pressureOut: 0,
        // supply: this.eqSupply[0],
        // timeInService: 0,
        // esInstallationCost: 0,
        // esReplacementCost: 0,
        // discharge: this.eqDischarge[0],
        // condensate: 0,
        superheat: false,
        // lineSizeIn: this.eqLineSize[0],
        // lineSizeOut: this.eqLineSize[0],
        // pipeOrientation: this.eqPipeOrientation[0],
        // condensateLift: 0,
        // elevation: 0,
        // insulationType: this.eqInsulationTypes[0],
        outside: false,
        shutdownReq: false,
        // steamLoss: 0,
        // annualLoss: 0,
        // fuelUsed: 0,
        // co2Emissions: 0,
        // updatedAt: '',
      });
    }

    this.httpReq({customUrl: 'clients/locations', urlSuffix: this.clientId, method: 'get', callback: (data) => {
      this.clientLocations = data;
    }})
  },
};
</script>

<style>
.ant-collapse-content {
  background:  transparent !important;
}
/* .ant-modal-content {
  padding: 0 !important;
} */
</style>

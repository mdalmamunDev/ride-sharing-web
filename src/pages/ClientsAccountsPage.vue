<template>
  <div>
    <!-- Page Title -->
    <div class="bg-1 text-white py-3 text-center text-lg font-medium">
      Clients Accounts
    </div>

    <!-- Filters + Table -->
    <div class="px-24">
      <div class="flex justify-center">
        <div class="overflow-x-auto py-6 min-h-[60vh]">
          <!-- <pre>{{ formData }}</pre> -->
          <table
            class="min-w-max whitespace-nowrap table-auto text-left border-separate text-center">
            <thead>
              <tr class="bg-1 text-white rounded">
                <th class="col-name py-2 px-3 border" id="th-name" v-resizable>Client's Name <sort-drop-down :hidden="false" field="name"/></th>
                <th class="col-location py-2 px-3 border" id="th-location" v-resizable>Location <sort-drop-down field="location" :sortable="false" /></th>
                <th class="col-createdAt py-2 px-3 border" id="th-createdAt" v-resizable>Created <sort-drop-down field="createdAt" :filterFields="['createdFrom', 'createdTo']" /> </th>
                <th class="col-lastEqUpdate py-2 px-3 border" id="th-lastEqUpdate" v-resizable>Last Equipment Update <sort-drop-down field="lastEqUpdate" :filterFields="['lastEqUpdateFrom', 'lastEqUpdateTo']" /> </th>
                <th class="col-contacts py-2 px-3 border" id="th-contacts" v-resizable>Contacts <sort-drop-down field="contacts" :sortable="false" /></th>
              </tr>
              <tr class="text-sm text-gray-700">
                <!-- name -->
                <th class="col-name px-3">
                  <a-input type="text" v-model:value="filters.name" @keyup.enter="fetchData({page: 1})" placeholder="Contains" class="w-full border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                </th>
                <!-- location -->
                <th class="col-location px-3">
                  <div class="flex gap-1">
                    <a-input type="text" v-model:value="filters.location" @keyup.enter="fetchData({page: 1})" placeholder="Contains" class="w-full border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                  </div>
                </th>
                <!-- createdAt -->
                <th class="col-createdAt px-3">
                  <div class="flex gap-1 w-full">
                    <a-input type="date" v-model:value="filters.createdFrom" @change="fetchData({page: 1})" placeholder="On or After" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                    <a-input type="date" v-model:value="filters.createdTo" @change="fetchData({page: 1})" placeholder="Before" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                  </div>
                </th>
                <!-- lastEqUpdate -->
                <th class="col-lastEqUpdate px-3">
                  <div class="flex gap-1">
                    <a-input type="date" v-model:value="filters.lastEqUpdateFrom" @change="fetchData({page: 1})" placeholder="On or After" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                    <a-input type="date" v-model:value="filters.lastEqUpdateTo" @change="fetchData({page: 1})" placeholder="Before" class="w-32 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
                  </div>
                </th>
                <!-- contacts -->
                <th class="col-contacts px-3">
                  <!-- <a-input type="text" placeholder="Contains" class="w-full border border-gray-300 rounded px-2 py-1 text-sm text-center" /> -->
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(client, i) in dataList?.data" :key="client.name" :class="i % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-sky-50 hover:bg-sky-100'">
                <td class="col-name px-3 py-4 flex justify-between">
                  <router-link :to="`/equipments?id=${client.id}`">{{ printStr(client.name) }}</router-link>
                  <a href="#" class="underline" @click="showModal(client)">Edit</a>
                </td>
                <td class="col-location px-3 py-2">{{ client.locationsCount || 0 }}
                  <i class="fa fa-eye ms-2 cursor-pointer" @click="openLocationsModal(client.locations)"></i>
                </td>
                <td class="col-createdAt px-3 py-2">{{ formatDate(client.createdAt) || "-" }}</td>
                <td class="col-lastEqUpdate px-3 py-2">{{ formatDate(client.lastEqUpdate) || "-" }}</td>
                <td class="col-contacts px-3 py-2">{{ client.contactsCount || 0 }}
                  <i class="fa fa-eye ms-2 cursor-pointer" @click="openContactsModal(client.contacts)"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <pagination-comp />
    </div>

    <!-- Add Accounts -->
    <div @click="showModal({})" class="bg-2 text-white text-center py-3 mt-6 cursor-pointer">
      + Add Accounts
    </div>

    <!-- Custom Modal for Add/Edit Account -->
    <div v-if="openClientModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        <div class="flex items-center justify-between mb-4">
          <span class="font-semibold text-lg">{{ formData.id ? 'Edit' : 'Add' }} Clients Account</span>
          <button class="text-2xl text-gray-500 hover:text-black" @click="handleCancel()">
            &times;
          </button>
        </div>
        <form @submit.prevent="handleClientOk" class="mx-8">
          <div class="mb-4">
            <label class="block font-medium mb-1">Name<span class="text-red-500">*</span></label>
            <input v-model="formData.name" type="text" placeholder="Enter client name" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block font-medium mb-1">Note</label>
            <textarea v-model="formData.note" placeholder="Enter note here" class="w-full border rounded px-3 py-2"></textarea>
          </div>
          <div class="flex" :class="{ 'justify-between': formData.id, 'justify-end': !formData.id }">
            <button v-if="formData.id" type="button" @click="handleCancel(formData.id)" class="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Custom Modal for Contact -->
    <ModalComp :show-header="false">
      <div v-for="(contact, index) in formData.contacts" :key="index" class="m-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-bold">{{ index === 0 ? 'Primary' : 'Additional' }} Contact</h3>
          <button v-if="formData.contacts.length > 1" type="button" class="text-red-500" @click="removeItem(formData.contacts, index)">
            <i class="fa fa-trash"></i>
          </button>
        </div>
        <input type="text" required class="mb-2 w-full border rounded px-2 py-1" v-model="contact.name" placeholder="Contact name" />
        <input type="email" required class="mb-2 w-full border rounded px-2 py-1" v-model="contact.email" placeholder="Contact email" />
        <input type="tel" required class="mb-2 w-full border rounded px-2 py-1" v-model="contact.phone" placeholder="Contact phone" />
      </div>
      <button v-if="formData?.contacts?.length < 5" type="button" class="bg-blue-600 text-white px-3 py-1 rounded mb-2" @click="addItem(formData.contacts, {name: '', email: '', phone: ''})">
        <i class="fa fa-plus me-2"></i>
        Add More Contact
      </button>

      <div class="m-4 mt-10">
        <h2 class="font-bold">Locations</h2>
        <div v-for="(location, index) in formData.locations" :key="index" class="flex items-center justify-between mb-2">
          <input type="text" required class="w-full border rounded px-2 py-1" v-model="location.name" placeholder="Location name" />
          <button v-if="formData.locations.length > 1" type="button" class="text-red-500 ms-2" @click="removeItem(formData.locations, index)">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
      <button v-if="formData?.locations?.length < 5" type="button" class="bg-blue-600 text-white px-3 py-1 rounded mb-2" @click="addItem(formData.locations, {name: ''})">
        <i class="fa fa-plus me-2"></i>
        Add More Location
      </button>
    </ModalComp>

    <!-- Custom Modal for View Locations -->
     <DetailsModal :open="showLocationModal" @close="showLocationModal = false">
        <h2 class="font-bold text-xl mb-4">Client Locations</h2>
        <div v-if="locationList?.length">
            <ul class="list-disc pl-6">
            <li v-for="(location, index) in locationList" :key="index" class="mb-2">
              {{ location.name }}
            </li>
            </ul>
        </div>
        <div v-else class="text-gray-500">No locations found.</div>
     </DetailsModal>

    <!-- Custom Modal for View Contacts -->
     <DetailsModal :open="showContactsModal" @close="showContactsModal = false">
        <div v-if="contactList?.length">
          <div v-for="(contact, index) in contactList" :key="contact.id" class="mb-4 border-b pb-2">
            <h3 class="font-bold text-xl">{{ index === 0 ? 'Primary' : 'Additional' }} Contact</h3>
            <div class="p-2">
              <div><b>Name:</b> {{ contact.name }}</div>
              <div><b>Email:</b> {{ contact.email }}</div>
              <div><b>Phone:</b> {{ contact.phone }}</div>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500">No contacts found.</div>
     </DetailsModal>
  </div>
</template>

<script>
import ModalComp from "@/components/ModalComp.vue";
import PaginationComp from "../components/PaginationComp.vue";
import SortDropDown from "../components/SortDropDown.vue";
import Resizable from '../directives/resizable';
import DetailsModal from "@/components/DetailsModal.vue";
import Swal from "sweetalert2";

export default {
  name: "ClientsAccountsPage",
  components: {
    PaginationComp,
    ModalComp,
    DetailsModal,
    SortDropDown,
  },
  directives: {
    resizable: Resizable,
  },
  data() {
    return {
      openClientModal: false,
      openContactModal: false,
      contactList: [], // For showing contacts in modal
      locationList: [], // For showing locations in modal
      showContactsModal: false, // Modal visibility
      showLocationModal: false, // Modal visibility
    };
  },
  methods: {
    showModal(client = {}) {
      if (!client.contacts || !client.contacts.length) {
        client.contacts = [{name: '', email: '', phone: ''}, {name: '', email: '', phone: ''}];
      }
      // client.contacts.push({name: '', email: '', phone: ''}); // Ensure at least two contacts

      if (!client.locations || !client.locations.length) {
        client.locations = [{name: ''}];
      }
      // client.locations.push({name: ''}); // Ensure at least two locations
      this.$store.commit('setFormData', client);
      this.openClientModal = true;
    },
    handleClientOk() {
      this.openClientModal = false;
      this.openModal();
    },
    handleCancel(id = false) {
      this.openClientModal = false;
      this.$store.commit('setFormData', {});
      if(id) {
        Swal.fire({
          title: 'Delete this client?',
          text: 'You won’t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Cancel',
          cancelButtonText: 'Delete',
        }).then((result) => {
          if (!result.isConfirmed) {
            this.httpReq({
              urlSuffix: id,
              method: 'DELETE',
              callback: () => {
                this.fetchData();
              }
            })
          }
        });
      }
    },
    openContactsModal(contacts) {
      this.contactList = contacts || [];
      this.showContactsModal = true;
    },
    openLocationsModal(locations) {
      this.locationList = locations || [];
      this.showLocationModal = true;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

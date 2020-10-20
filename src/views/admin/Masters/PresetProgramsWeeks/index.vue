<template >
  <div class="animated fadeIn">
    <div class>
      <PageHeader
        :title="$route.name"
        :titleCounter="totalCount"
        :is_show_serach="true"
        :is_show_add_button="false"
        :is_show_update_sequence_button="sequenceChangeFlag == true"
        :is_delete_all="true"
        :selected_ids="selectedIds"
        :is_show_model="true"
        :search="search"
      ></PageHeader>
      <!-- :add_route="$route.path + '-add'" -->
      <div class="card card-body" v-if="lists && lists.length">
        <table
          class="table table-hover table-responsive-sm col-lg-12 col-md-12 col-sm-12 col-xs-12"
        >
          <thead>
            <tr>
              <!-- <th>
                
              </th>-->
              <th nowrap>
                <b-form-checkbox
                  @change="selectedAllRecords(!allSelectedData)"
                  v-model="allSelectedData"
                >#</b-form-checkbox>
              </th>
              <th class="text-capitalize">Name</th>
              <th class="text-capitalize">Note</th>
              <th class="text-capitalize">Training Activity</th>
              <th class="text-capitalize">Training Goal</th>
              <th class="text-capitalize">Target HR</th>
              <th class="text-capitalize">Intencity</th>
              <th class="text-capitalize">Week Sequence</th>
              <th class="text-capitalize">Status 123</th>
              <th class="text-capitalize">Actions</th>
            </tr>
          </thead>
          <!-- <tbody> -->
          <draggable
            v-if="lists &&  lists.length"
            class="w-100"
            tag="tbody"
            v-model="lists"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
            handle=".handle"
          >
            <!-- <transition-group type="transition" :name="!drag ? 'flip-list' : null"> -->
            <!-- <tbody> -->
            <tr class="w-100" v-for="(list, index) in lists" :key="index">
              <td>
                <b-form-checkbox
                  @change="selectCheckBox(list.id, !list.is_selected)"
                  v-model="list.is_selected"
                >{{ ((page * limit) - (limit - (index + 1)) ) }}</b-form-checkbox>
              </td>
              <td>
                <small class="font-bold">{{ list.name || '-' }}</small>
              </td>
              <td>
                <small class="font-bold">{{ list.note || '-' }}</small>
              </td>
              <td>
                <small
                  class="font-bold"
                >{{ ( (list.training_activity_detail && list.training_activity_detail.name) ? list.training_activity_detail.name : '' ) || '-' }}</small>
              </td>

              <td>
                <small
                  class="font-bold"
                >{{ ( (list.training_goal_detail && list.training_goal_detail.name) ? list.training_goal_detail.name : '' ) || '-' }}</small>
              </td>
              <td>
                <small
                  class="font-bold"
                >{{ ( (list.training_goal_detail && list.training_goal_detail.target_hr) ? list.training_goal_detail.target_hr : '' ) || '-' }}</small>
              </td>
              <td>
                <small
                  class="font-bold"
                >{{ ( (list.training_intensity_detail && list.training_intensity_detail.name) ? list.training_intensity_detail.name : '' ) || '-' }}</small>
              </td>
              <td>
                <span class="pull-left p-1">{{list.sequence}}</span>
                <span>
                  <i class="fa fa-list-ul handle" v-bind:class="{'grabbing': drag,  'grab': !drag}"></i>
                </span>
              </td>
              <td>
                <span class="p-0 m-0" @click="statusChange('is_active', !list.is_active, list.id)">
                  <switches
                    v-model="list.is_active"
                    v-bind:label="(!!list.is_active) ? 'Active' : 'Deactive'"
                    theme="bulma"
                    color="green"
                    type-bold="false"
                  ></switches>
                </span>
              </td>
              <td>
                <a
                  v-b-tooltip.hover.left="'Edit ' + list.name"
                  class="text-primary"
                  @click="getDetails(list.id)"
                >
                  <i class="fa fa-edit"></i>
                </a>

                <a
                  v-b-tooltip.hover.left="'Delete ' + list.name"
                  class="link text-danger p-1"
                  @click="deleteConfirmation(list)"
                >
                  <i class="fa fa-trash"></i>
                </a>
              </td>
            </tr>
            <!-- </tbody> -->
            <!-- </transition-group> -->
          </draggable>
          <!-- </tbody> -->
        </table>
        <div class="col-md-12">
          <span class="col-xl-4 col-sm-4 col-md-4 col-xs-4 pull-left">
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">
                  <b>Limit:</b>
                </span>
                <select
                  class="form-control col-md-4 col-lg-4 col-sm-4"
                  @change="changePageLimits($event)"
                  v-model="limit"
                >
                  <option
                    v-for="(limit, index) in pageLimits"
                    :key="index"
                    :value="limit.value"
                    v-show="(totalCount >=  limit.value)"
                  >
                    {{limit.key}}
                    <!-- -- {{totalCount }} - {{ limit.value}} -->
                  </option>
                  <option :value="totalCount">
                    All
                    <!-- {{ totalCount }} -- {{ limit.value}} -->
                  </option>
                </select>
              </div>
            </div>
          </span>
          <span class="col-xl-4 col-sm-4 col-md-4 col-xs-4">
            Showing
            <span class="text-primary">{{ ((page * limit) - (limit - 1) ) }}</span>
            to
            <b>
              {{ (totalCount >= ((page * limit)) ? ((page * limit)) : totalCount ) }}
              <!-- {{ limit >= totalCount ? totalCount : limit }} -->
            </b> of
            <span class="text-primary">{{ totalCount }}</span>
            entries
          </span>
          <div class="pull-right">
            <b-pagination
              class="col-xl-4 col-sm-4 col-md-4 col-xs-4"
              v-model="page"
              :total-rows="totalCount"
              :per-page="limit"
              aria-controls="my-table"
            ></b-pagination>
          </div>
        </div>
      </div>
      <div
        class="no-data-found mt-5 col-md-12 display-4 text-center text-danger"
        v-if="!lists || lists.length == 0"
      >
        <i class="fa fa-warning mr-3"></i>No Data Found
      </div>
    </div>

    <b-modal
      :title="((  detail &&  detail.id  ) ? 'Edit ' : 'Add '  )  + $route.name   "
      v-model="showModal"
      size="lg"
      okTitle="Save"
      name="addEditForm"
      :okDisabled="!!errors.any()"
      :noCloseOnEsc="true"
      :noCloseOnBackdrop="true"
      @close="clearAllData(); showModal = false"
      @ok="submitData"
    >
      <form method="post" class="col-md-12" novalidate name="addEditForm">
        <div class="row">
          <div class="input-group mb-3 col-md-6">
            <label for="name" class="text-capitalize">
              name
              <small
                :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
              <input
                type="text"
                id="name"
                name="name"
                required
                class="form-control"
                placeholder="Enter name"
                v-model="detail.name"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('name') }"
              />
            </div>
            <small v-if="errors.has('name')" class="text-danger mt-1">{{ errors.first('name') }}</small>
          </div>
          <div class="input-group mb-3 col-md-6">
            <label for="thr" class="text-capitalize">
              THR
              <small
                :class="!detail.thr || errors.has('thr') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
              <input
                type="text"
                id="thr"
                name="thr"
                required
                class="form-control"
                placeholder="Enter THR"
                v-model="detail.thr"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('thr') }"
              />
            </div>
            <small v-if="errors.has('thr')" class="text-danger mt-1">{{ errors.first('thr') }}</small>
          </div>
        </div>
        <div class="row">
          <div class="input-group col-md-12 mb-3">
            <label for="note" class="text-capitalize">
              Note
              <small
                :class="!detail.note || errors.has('note') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
              <textarea
                id="note"
                name="note"
                required
                class="form-control"
                placeholder="Enter name"
                v-model="detail.note"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('note') }"
              ></textarea>
            </div>
            <small v-if="errors.has('note')" class="text-danger mt-1">{{ errors.first('note') }}</small>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 input-group mb-3">
            <label for="training_activity_id" class="text-capitalize">
              Activity
              <small
                :class="!detail.training_activity_id || errors.has('training_activity_id') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
              <!-- @change="changePageLimits($event)" -->
              <select class="form-control" v-model="detail.training_activity_id" required>
                <option
                  v-if="training_activities_list && training_activities_list.length"
                  :selected="!!detail.training_activity_id"
                  value
                >Select Any Activity</option>
                <option
                  v-if="!training_activities_list || training_activities_list.length == 0"
                  value
                >No any activities available</option>
                <option
                  v-for="(list, index) in training_activities_list"
                  :key="index"
                  :value="list.id"
                >{{list.name | capitalize }}</option>
              </select>
            </div>
            <small
              v-if="errors.has('training_activity_id')"
              class="text-danger mt-1"
            >{{ errors.first('training_activity_id') }}</small>
          </div>
          <div class="input-group col-md-6 mb-3">
            <label for="training_goal_id" class="text-capitalize">
              Training Goal
              <small
                :class="!detail.training_goal_id || errors.has('training_goal_id') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
              <select class="form-control" v-model="detail.training_goal_id" required>
                <option
                  v-if="training_goals_list && training_goals_list.length"
                  :selected="!!detail.training_activity_id "
                  value
                >Select any activity</option>
                <option
                  v-if="!training_goals_list || training_goals_list.length == 0"
                  value
                >No any taining goal available</option>
                <option
                  v-for="(list, index) in training_goals_list"
                  :key="index"
                  :value="list.id"
                >{{list.name}}</option>
              </select>
            </div>
            <small
              v-if="errors.has('training_goal_id')"
              class="text-danger mt-1"
            >{{ errors.first('training_goal_id') }}</small>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 input-group mb-3">
            <label for="training_intensity_id" class="text-capitalize ml-3">
              Intensity
              <small
                :class="!detail.training_intensity_id || errors.has('training_intensity_id') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
              <select class="form-control" v-model="detail.training_intensity_id" required>
                <option
                  v-if="training_intensity_list && training_intensity_list.length"
                  :selected="!!detail.training_intensity_id "
                  value
                >Select any intensity</option>
                <option
                  v-if="!training_intensity_list || training_intensity_list.length == 0"
                  value
                >No any taining intensity available</option>

                <option
                  v-for="(list, index) in training_intensity_list"
                  :key="index"
                  :value="list.id"
                >{{list.name}}</option>
              </select>
            </div>
            <small
              v-if="errors.has('training_intensity_id')"
              class="text-danger mt-1"
            >{{ errors.first('training_intensity_id') }}</small>
          </div>

          <div class="input-group col-md-6">
            <label for="sequence" class="text-capitalize pb-0 mb-0">
              Sequence
              <small
                :class="!detail.sequence || errors.has('sequence') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
              <input
                type="text"
                id="sequence"
                name="sequence"
                required
                class="form-control"
                placeholder="Enter sequence"
                v-model="detail.sequence"
                v-validate="'required|numeric'"
                :class="{ 'is-invalid': errors.has('sequence') }"
              />
            </div>
            <small
              v-if="errors.has('sequence')"
              class="text-danger mt-1"
            >{{ errors.first('sequence') }}</small>
          </div>
        </div>

        <div class="row input-group mb-3">
          <label for="name" class="text-capitalize ml-3">
            Active
            <!-- <small
                          :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
            >*</small>-->
          </label>
          <div class="input-group col-md-12">
            <switches
              v-model="detail.is_active"
              v-bind:label="detail.is_active == true ? 'Active' : 'Deactive'"
              theme="bulma"
              color="green"
              type-bold="false"
            ></switches>
          </div>
          <!-- <small
                        v-if="errors.has('name')"
                        class="text-danger mt-1"
          >{{ errors.first('name') }}</small>-->
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Services from "../../../../Services/apiServices";
import { ApiCollections, LIMITS } from "../../../../config/config";
import Switches from "vue-switches";
import PageHeader from "../../../../components/custom/PageHeader";

import draggable from "vuedraggable";

export default {
  name: "ActionForce",
  components: {
    Switches,
    PageHeader,
    draggable
  },
  data: function() {
    return {
      allSelectedData: false,
      selectedIds: [],
      pageLimits: [],
      detail: {
        name: "",
        note: "",
        thr: "",
        training_activity_id: "",
        training_goal_id: "",
        training_intensity_id: "",

        is_active: true
      },
      search: PageHeader.data.search,
      showModal: false,
      totalCount: 0,
      page: 1,
      limit: 10,
      lists: [],
      drag: false,
      sequenceChangeFlag: false,

      training_activities_list: [],
      training_goals_list: [],
      training_intensity_list: []
    };
  },
  mounted() {
    // this.getAllList();
  },
  beforeMount() {
    this.limit = LIMITS[0].value;
    this.pageLimits = LIMITS;
    this.getAllList();
    this.getTrainingActivities();
    this.getTrainingGoals();
    this.getTrainingIntensity();
  },
  computed: {
    dragOptions() {
      return {
        animation: 300,
        // group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  // computed
  methods: {
    /**
     * Get All Listing
     */
    async getAllList(search = "") {
      /** make common request */
      var request = {
        page: this.page,
        limit: this.limit,
        sort_by: ["sequence", "asc"],
        relation: [
          "training_activity_detail",
          "training_goal_detail",
          "training_intensity_detail"
        ]
      };

      /** if search found then send to request */
      if (search && search.length > 0) {
        request.search = search;
      } else if (this.search && this.search.length > 0) {
        request.search = this.search;
      }

      /** start progress here */
      this.$Progress.start();

      let res = await Services.call(
        ApiCollections.preset_programs_weeks_listing
      ).post(request);

      /** check error or success response */
      if (res && res.success && res.success == true) {
        this.lists = res.data.list;
        this.totalCount = parseInt(res.data.count);

        if (this.lists && this.lists.length) {
          /** to set defalt check box is false */
          this.$_.each(this.lists, function(value, key) {
            value.is_selected = false;
          });
        }

        this.$Progress.finish();
      } else {
        this.lists = [];
        this.totalCount = 0;
        this.$Progress.fail();
        // Services.notify("e", res.message);
      }
    },

    async getTrainingActivities() {
      var request = {
        is_active: true
      };
      let res = await Services.call(
        ApiCollections.training_activities_listing
      ).deleteMany(request);
      if (res && res.success && res.success == true) {
        this.training_activities_list = res.data.list;
      } else {
        this.training_activities_list = [];
      }
    },

    async getTrainingGoals() {
      var request = {
        is_active: true
      };
      // training_goals_listing
      let res = await Services.call(
        ApiCollections.training_goals_listing
      ).deleteMany(request);
      if (res && res.success && res.success == true) {
        this.training_goals_list = res.data.list;
      } else {
        this.training_goals_list = [];
      }
    },

    async getTrainingIntensity() {
      var request = {
        is_active: true
      };
      // training_goals_listing
      let res = await Services.call(
        ApiCollections.training_intensity_listing
      ).deleteMany(request);
      if (res && res.success && res.success == true) {
        this.training_intensity_list = res.data.list;
      } else {
        this.training_intensity_list = [];
      }
    },

    async deleteAllFn() {
      var request = {
        ids: this.selectedIds
      };

      this.$swal
        .fire({
          title: "Are you sure?",
          text:
            "You want to delete selected(" +
            this.selectedIds.length +
            ") record!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(async result => {
          if (result.value) {
            if (this.selectedIds && this.selectedIds.length) {
              let res = await Services.call(
                ApiCollections.preset_programs_weeks_delete_multiple
              ).deleteMany(request);

              /**
               * Check Response
               */
              if (res && res.success && res.success == true) {
                this.$Progress.finish();
                this.selectedIds = [];
                this.allSelectedData = false;
                this.getAllList();

                Services.notify("s", res.message);
              } else {
                this.$Progress.fail();
                Services.notify("e", res.message);
              }
            }
          }
        });
    },

    changePageLimits(event) {
      this.limit = event.target.value;
      this.selectedIds = [];
      this.allSelectedData = false;
      this.getAllList();
    },
    /**
     * Set to All Check Box true or false
     */
    selectedAllRecords(allSelectedData) {
      var selIds = [];
      if (allSelectedData == true) {
        this.$_.map(this.lists, function(list) {
          list.is_selected = allSelectedData;
          selIds.push(list.id);
        });
        this.selectedIds = selIds;
      } else {
        this.$_.map(this.lists, function(list) {
          list.is_selected = allSelectedData;
        });
        this.selectedIds = [];
      }
    },

    /**
     * Select single record check box
     */
    selectCheckBox(id, value) {
      if (id) {
        var index = this.$_.findIndex(this.lists, { id: id });
        var data = this.$_.findWhere(this.lists, { id: id });

        if (!data) {
          Services.notify("e", "Records not found");
          return false;
        }
        /** set list check box to check or uncheck */
        data.is_selected = value;
        /** refresh selected object */
        this.lists.splice(index, 1, data);
        if (value == false) {
          /** remove id from all selected ids array */
          if (this.selectedIds && this.selectedIds.length) {
            this.selectedIds = _.reject(this.selectedIds, function(num) {
              return num == id;
            });
          }
          this.allSelectedData = false;
        } else if (value == true) {
          this.selectedIds.push(id);

          /** check for all selected count and total count */
          if (
            this.selectedIds &&
            this.selectedIds.length == this.lists.length
          ) {
            this.allSelectedData = true;
          }
        }
      } else {
        Services.notify("e", "Records not found");
        return false;
      }
    },

    /** get details by id */
    async getDetails(id) {
      let res = await Services.call(
        ApiCollections.get_preset_programs_weeks
      ).getOne(id);
      this.detail = res.data;
      if (res && res.success && res.success == true) {
        this.detail = res.data;
        this.$Progress.finish();
        // Services.notify("s", res.message);
        this.showModal = true;
      } else {
        this.$Progress.fail();
        Services.notify("e", res.message);
      }
    },

    /**
     * Delete Confirmation
     */
    deleteConfirmation(list) {
      //   this.$swal("Hello Vue world!!!");
      // title: "",
      //
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You want to delete " + list.name + " record!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.deleteRecord(list);
          }
        });
      /** if yes then call false */
      //   this.deleteRecord(id);
    },

    /** delete record from list by id  */
    async deleteRecord(list) {
      if (!list.id) {
        Services.notify("e", "Record details not found");
        return false;
      }

      let res = await Services.call(
        ApiCollections.delete_preset_programs_weeks
      ).delete(list.id);
      if (res && res.success && res.success == true) {
        let index = this.$_.findIndex(this.lists, { id: list.id });
        console.log("Index", index, list.id, this.lists);
        /** stop loader */
        this.$Progress.finish();
        if (index == -1) {
          Services.notify("e", "Record not found in listing");
          return false;
        }
        this.lists.splice(index, 1);
        this.totalCount--;
        this.$swal.fire(
          "Deleted!",
          list.name + " record has been deleted.",
          "success"
        );
      }
    },
    clearAllData() {
      // this.detail = {
      //   title: "",
      //   code: "",
      //   is_active: true
      // };
      this.detail = {
        name: "",
        note: "",
        thr: "",
        training_activity_id: "",
        training_goal_id: "",
        training_intensity_id: "",
        is_active: true
      };
    },
    async submitData() {
      this.$Progress.start();
      if (this.detail && this.detail.id) {
        let apiObject = this.$_.clone(
          ApiCollections.update_preset_programs_weeks
        );
        apiObject.url += this.detail.id;

        let res = await Services.call(apiObject).update(this.detail);
        /** set update data  */
        if (res && res.success && res.success == true) {
          let index = this.$_.findIndex(this.lists, { id: this.detail.id });
          console.log("Index", index, this.detail.id, this.lists);
          /** stop loader */
          this.$Progress.finish();
          if (index == -1) {
            // Services.notify("e", "Record not found in listing");
            return false;
          }
          // this.lists.slice(index, 1, this.$_.clone(res.data));

          this.lists[index] = this.$_.clone(res.data);
          Services.notify("s", res.message);
          this.showModal = false;
          this.detail = {};
        } else {
          this.$Progress.fail();
          this.showModal = true;
          Services.notify("e", res.message);
        }
      } else {
        /** create data */
        let res = await Services.call(
          ApiCollections.create_preset_programs_weeks
        ).post(this.detail);
        /** set data  */
        if (res && res.success && res.success == true) {
          this.lists.unshift(res.data);
          this.totalCount++;
          this.$Progress.finish();
          Services.notify("s", res.message);
          this.showModal = false;
          this.clearAllData();
        } else {
          this.$Progress.fail();
          Services.notify("e", res.message);
        }
      }
    },
    clearSearch(value) {},
    pageChangeFn(page = 1) {
      this.selectedIds = [];
      this.allSelectedData = false;
      this.getAllList();
    },

    async statusChange(key, value, id) {
      var request = {
        id: id
      };
      if (key == "is_active") {
        request.is_active = value;
      }

      let res = await Services.call(
        ApiCollections.preset_programs_weeks_status_change
      ).post(request);

      /** set update data  */
      if (res && res.success && res.success == true) {
        var index = this.$_.findIndex(this.lists, { id: id });

        /** stop loader */
        this.$Progress.finish();
        if (index == -1) {
          Services.notify("e", "Record not found in listing");
          return false;
        }
        this.lists.slice(index, 1, res.data);

        Services.notify("s", res.message);
      } else {
        this.$Progress.fail();
        Services.notify("e", res.message);
      }
    },

    async handleUpdateSequence() {
      var allIndexes = this.$_.pluck(this.lists, "id");

      /** start progress bar */
      this.$Progress.start();

      var requestData = [];
      _.each(allIndexes, (id, index) => {
        requestData.push({
          id: id,
          sequence: index + 1
        });
      });
      // sequences
      let res = await Services.call(
        ApiCollections.preset_programs_weeks_update_sequence
      ).post({
        sequences: requestData
      });

      if (res && res.success && res.success == true) {
        /** stop loader */
        this.$Progress.finish();
        Services.notify("s", res.message);
      } else {
        this.$Progress.fail();
        Services.notify("e", res.message);
      }

      this.sequenceChangeFlag = false;
    }
  },
  watch: {
    "detail.name"(newVal) {
      if (newVal) {
        this.detail.code = this.$_.clone(
          newVal.replace(/ /g, "_").toUpperCase()
        );
      }
    },
    page: function(val) {
      this.pageChangeFn(parseInt(val));
    },
    drag: function(val) {
      if (val == true) {
        this.sequenceChangeFlag = true;
      }
      // sequenceChangeFlag
    },
    is_show_add_button: function(val) {
      if (val == true) {
        this.clearAllData();
      }
    },
    showModal: function(val) {
      if (val == false) {
        this.clearAllData();
      }
    }
  }
};
</script>

<style scope="">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.grab {
  cursor: -webkit-grab;
}
.grabbing {
  cursor: grabbing !important;
}

/** For Draggable  */
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}

.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>


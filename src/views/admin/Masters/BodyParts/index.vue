<template >
  <div class="animated fadeIn">
    <div class>
      <PageHeader
        :title="$route.name"
        :titleCounter="totalCount"
        :is_show_serach="true"
        :is_show_add_button="false"
        :is_delete_all="true"
        :is_show_model="true"
        :search="search"
      ></PageHeader>
      <!-- :add_route="$route.path + '-add'" -->

      <div class="card-body col-lg-3 col-md-3 col-sm-3 col-xs-3 pull-left pr-0 pl-0 pt-0">
        <div class="card-header">
          Parent
          <sup class="badge badge-info badge-pill">{{ parentLists.length }}</sup>
        </div>
        <ul id="parent-body-parts" class="text-decoration-none list-unstyled min-vh-100">
          <li
            class="nav-item rounded"
            v-bind:class="{ 'selected-link': list.id == parentId}"
            v-for="(list, index) in parentLists"
            :key="index"
          >
            <div class="pull-right">
              <a
                v-b-tooltip.hover.left="'Delete ' + list.name"
                class="text-danger pull-right pt-2 pr-1 hover-edit-icon"
                @click="deleteConfirmation(list)"
              >
                <i class="fa fa-trash" v-bind:class="{ 'text-white': list.id == parentId}"></i>
              </a>
              <a
                v-b-tooltip.hover.top="'Edit ' + list.name"
                class="text-info pull-right pt-2 pr-1"
                @click="getDetails(list.id)"
              >
                <i
                  class="fa fa-edit hower-white-text"
                  v-bind:class="{ 'text-white': list.id == parentId}"
                ></i>
              </a>

              <!-- <a
				v-b-tooltip.hover.top="'Edit ' + list.name"
				class="text-primary pull-right pt-0 pb-0 pr-2"
				@click="getDetails(list.id)"
			  >
				<i class="fa fa-edit" v-bind:class="{ 'text-white': list.id == parentId}"></i>
              </a>-->
            </div>
            <a
              class="nav-link text-capitalize font-xs rounded pt-2 pl-2"
              @click="parentId = list.id; getAllList()"
            >{{ list.name }}</a>
          </li>
        </ul>
      </div>
      <div class="card card-body col-lg-9 col-md-9 col-sm-9 col-xs-9 pull-right">
        <div v-if="lists && lists.length" class="min-vh-100">
          <table class="table table-hover table-responsive-sm col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <thead>
              <tr>
                <th>#</th>
                <th class="text-capitalize">Name</th>
                <th class="text-capitalize">Code</th>
                <th class="text-capitalize">Status</th>
                <th class="text-capitalize">Actions</th>
              </tr>
            </thead>
            <tbody v-if="lists &&  lists.length">
              <tr v-for="(list, index) in lists" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <small class="font-bold">{{ list.name || '-' }}</small>
                </td>
                <td>
                  <small class="font-bold">{{ (list.code )|| '-' }}</small>
                </td>
                <td>
                  <span
                    class="p-0 m-0"
                    @click="statusChange('is_active', !!!list.is_active, list.id)"
                  >
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
                    class="text-primary p-0"
                    @click="getDetails(list.id)"
                  >
                    <i class="fa fa-edit"></i>
                  </a>
                  <a
                    v-b-tooltip.hover.left="'Delete ' + list.name"
                    class="link text-danger p-0"
                    @click="deleteConfirmation(list)"
                  >
                    <i class="fa fa-trash"></i>
                  </a>
                </td>
              </tr>
            </tbody>
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
                      v-show=" !limit.value &&  (totalCount >  limit.value)"
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
              <span class="text-primary">{{ page }}</span> to
              <b>{{ limit >= totalCount ? totalCount : limit }}</b> of
              <span class="text-primary">{{ totalCount }}</span>
              entries
            </span>
            <div class="pull-right">
              <b-pagination
                class="col-xl-4 col-sm-4 col-md-4 col-xs-4"
                v-model="page"
                @change="pageChangeFn(page)"
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
    </div>

    <div v-if="showModal" @close="showModal = false" name="addEditForm">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-content modal-dialog col-8 center">
              <!-- modal-container -->
              <div class="modal-header pb-1 pt-1">
                <h3>
                  <span v-if="detail.id ">Edit</span>
                  <span v-if="!detail.id">Add</span>
                </h3>
                <small>
                  <button class="btn" @click="clearAllData();showModal = false">
                    <i class="fa fa-times text-danger"></i>
                  </button>
                </small>
              </div>
              <div class="modal-body col-md-12">
                <form method="post" novalidate name="addEditForm">
                  <div class="input-group mb-3">
                    <!-- @change="selectCheckBox(list.id, !list.is_selected  )" -->
                    <span class="input-group-addon p-0 pl-2 pt-1">
                      <label for class>
                        <b-form-checkbox class="pt-1" v-model="detail.is_parent">Parent</b-form-checkbox>
                      </label>
                    </span>

                    <b-form-select
                      v-model="detail.parent_id"
                      readonly
                      :disabled="detail.is_parent != true"
                    >
                      <!--  v-bind:readonly="detail.is_parent != true" -->
                      <option
                        :value="null"
                        :selected="detail.is_parent == false"
                      >Please select an option</option>

                      <!-- <option value="a">Option A</!-->
                      <option
                        v-for="(list, index) in parentLists"
                        :key="index"
                        :value="list.id"
                      >{{list.name}}</option>
                    </b-form-select>

                    <!-- <select
						class="form-control col-md-4 col-lg-4 col-sm-4"
						@change="changePageLimits($event)"
						v-model="limit"
					  >
						<option>Select parent body part</option>
						<option
						  v-for="(list, index) in parentLists"
						  :key="index"
						  :value="list.id"
						>{{list.name}}</option>
                    </select>-->
                  </div>
                  <div class="input-group mb-3">
                    <label for="name" class="text-capitalize ml-3">
                      name
                      <small
                        :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
                      >*</small>
                    </label>
                    <div class="input-group col-md-12">
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
                    <small
                      v-if="errors.has('name')"
                      class="text-danger mt-1"
                    >{{ errors.first('name') }}</small>
                  </div>

                  <div class="input-group mb-3">
                    <label for="code" class="text-capitalize ml-3">
                      code
                      <small
                        :class="!detail.code || errors.has('code') ? 'text-danger' : 'text-success' "
                      >*</small>
                    </label>
                    <div class="input-group col-md-12">
                      <input
                        type="text"
                        id="code"
                        name="code"
                        v-model="detail.code"
                        required="required"
                        placeholder="Enter code"
                        class="form-control"
                        aria-required="true"
                        aria-invalid="true"
                        v-validate="'required'"
                        readonly
                        :class="{ 'is-invalid': errors.has('code') }"
                      />
                      <!-- readonly -->
                    </div>
                    <small
                      v-if="errors.has('code')"
                      class="text-danger mt-1"
                    >{{ errors.first('code') }}</small>
                  </div>

                  <div class="input-group mb-3">
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
              </div>
              <div class="modal-footer">
                <slot name="footer">
                  <button
                    class="btn btn-danger btn-sm"
                    @click="clearAllData();showModal = false"
                  >Cancel</button>
                  <button class="btn btn-success btn-sm" @click="submitData">
                    <span>Save</span>
                    <!-- v-if="detail.id" -->
                    <!-- <span v-if="!detail.id">Add</span> -->
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Services from "../../../../Services/apiServices";
import { ApiCollections, LIMITS } from "../../../../config/config";
import Switches from "vue-switches";
import PageHeader from "../../../../components/custom/PageHeader";

export default {
  name: "ActionForce",
  components: {
    Switches,
    PageHeader
  },
  watch: {
    "detail.name"(newVal) {
      if (newVal && this.detail) {
        this.detail.code = this.$_.clone(
          newVal.replace(/ /g, "_").toUpperCase()
        );
      }
    },
    page: function(val) {
      this.pageChangeFn(parseInt(val));
    }
  },
  data: function() {
    return {
      pageLimits: [],
      detail: {
        name: "",
        code: "",
        parent_id: null,
        is_active: true
      },
      search: PageHeader.data.search,
      showModal: false,
      totalCount: 0,
      page: 1,
      limit: 10,
      lists: [],
      parentLists: [],
      parentId: null
    };
  },
  mounted() {},
  beforeMount() {
    this.limit = LIMITS[0].value;
    this.pageLimits = LIMITS;
    this.getParentList();
    // this.getAllList();
  },
  // computed
  methods: {
    async getParentList() {
      let request = {
        is_parent: true
      };

      let res = await Services.call(
        ApiCollections.body_part_parent_listing
      ).deleteMany(request);
      /**
       * Check Response
       */
      if (res && res.success && res.success == true) {
        this.parentLists = res.data.list;
        this.parentCount =
          res.data && res.data.count ? res.data.count : this.parentLists.length;
        /** set first parent id for fetch data  */
        if (this.parentLists && this.parentLists.length) {
          this.parentId = this.parentLists[0].id;
        }
        this.getAllList();
        // this.$Progress.finish();
        // this.selectedIds = [];
        // this.allSelectedData = false;
        // this.getAllList();
        // Services.notify("s", res.message);
      } else {
        this.$Progress.fail();
        Services.notify("e", res.message);
      }
    },

    async deleteAllFn() {
      var request = {
        ids: this.selectedIds
      };

      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You want to delete selected record!",
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
                ApiCollections.delete_multiple
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
      this.getAllList();
    },

    /** get details by id */
    async getDetails(id) {
      let res = await Services.call(ApiCollections.get_body_part).getOne(id);
      this.detail = res.data;
      if (res && res.success && res.success == true) {
        this.detail = res.data;

        if (this.detail && this.detail.parent_id != null) {
          this.detail.is_parent = true;
        }
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
      let res = await Services.call(ApiCollections.delete_body_part).delete(
        list.id
      );
      if (res && res.success && res.success == true) {
        /** check for parent id  */
        if (list && list.parent_id) {
          /** remove record from chiled records */

          var index = this.$_.findIndex(this.lists, { id: list.id });
          if (index == -1) {
            Services.notify("e", "Record not found in listing");
            return false;
          }
          this.lists.splice(index, 1);
          this.totalCount--;
        } else {
          /** parent record remove from  parent list */
          var index = this.$_.findIndex(this.parentLists, { id: list.id });
          if (index == -1) {
            Services.notify("e", "Record not found in listing");
            return false;
          }
          this.parentLists.splice(index, 1);
        }

        /** stop loader */
        this.$Progress.finish();

        this.$swal.fire(
          "Deleted!",
          list.name + " record has been deleted.",
          "success"
        );
      }
    },
    clearAllData() {
      this.detail = {
        name: "",
        code: "",
        parent_id: null,
        is_active: true
      };
    },
    async submitData() {
      this.$Progress.start();

      /** check if is parent is false then set null parent id */
      if (
        this.detail &&
        this.detail.is_parent &&
        this.detail.parent_id &&
        this.detail.parent_id != null &&
        this.detail.is_parent == false
      ) {
        this.detail.parent_id = null;
      }

      if (this.detail && this.detail.id) {
        var apiObject = this.$_.clone(ApiCollections.update_body_part);
        apiObject.url += this.detail.id;

        let res = await Services.call(apiObject).update(this.detail);
        /** set update data  */
        if (res && res.success && res.success == true) {
          if (res.data && res.data.parent_id) {
            /** chiled record updata */
            var index = this.$_.findIndex(this.lists, { id: this.detail.id });
          } else {
            var index = this.$_.findIndex(this.parentLists, {
              id: this.detail.id
            });
          }

          /** stop loader */
          this.$Progress.finish();
          if (index == -1) {
            Services.notify("e", "Record not found in listing");
            return false;
          }
          if (res.data && res.data.parent_id == null) {
            this.parentLists[index] = this.$_.clone(res.data);
          } else if (this.parentId == res.data.parent_id) {
            this.lists[index] = this.$_.clone(res.data);
            // this.lists.unshift(res.data);
          }
          // this.lists.unshift(res.data);
          // this.lists[index] = this.$_.clone(res.data);

          Services.notify("s", res.message);
          this.showModal = false;
          this.detail = {};
        } else {
          this.$Progress.fail();
          Services.notify("e", res.message);
        }
      } else {
        let res = await Services.call(ApiCollections.create_body_part).post(
          this.detail
        );
        /** set data  */
        if (res && res.success && res.success == true) {
          if (res.data && res.data.parent_id == null) {
            this.parentLists.unshift(res.data);
          } else if (this.parentId == res.data.parent_id) {
            this.lists.unshift(res.data);
          }
          // this.lists.unshift(res.data);
          this.totalCount++;
          this.$Progress.finish();
          Services.notify("s", res.message);
          this.showModal = false;
          this.detail = {};
        } else {
          this.$Progress.fail();
          Services.notify("e", res.message);
        }
      }
      /** reset validaions */
      self.errors.clear();
      this.errors.clear(); // removes errors for all fields
      this.errors.remove(); // removes errors for a specific field.
      this.$validator.reset();
      this.$validator.clean();
    },
    pageChangeFn(page = 1) {
      this.page = page;
      this.getAllList();
    },

    /**
     * Get All Listing
     */
    async getAllList(search = "") {
      /** make common request */
      var request = {
        page: this.page,
        limit: this.limit
      };

      if (this.parentId) {
        request.parent_id = this.parentId;
      }

      /** if search found then send to request */
      if (search && search.length > 0) {
        request.search = search;
      } else if (this.search && this.search.length > 0) {
        request.search = this.search;
      }

      /** start progress here */
      this.$Progress.start();
      let res = await Services.call(ApiCollections.body_part_listing).post(
        request
      );

      if (res && res.success && res.success == true) {
        this.lists = res.data.list;
        this.totalCount = parseInt(res.data.count);
        this.$Progress.finish();
      } else {
        this.lists = [];
        this.totalCount = this.lists.length;
        this.$Progress.fail();
        // Services.notify("e", res.message);
      }
    },
    async statusChange(key, value, id) {
      var request = {
        id: id
      };
      if (key == "is_active") {
        request.is_active = value;
      }

      let res = await Services.call(
        ApiCollections.body_part_status_change
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
    }
  }
};
</script>

<style scoped>
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

/** parent  listing styling */
#parent-body-parts {
  background-color: #d2ecff;
}

.nav-link:hover {
  background-color: #0084ff;
  color: white !important;
}

.selected-link {
  background-color: #0084ff;
  color: white;
}
.hover-edit-icon:hover {
  color: white;
}
</style>

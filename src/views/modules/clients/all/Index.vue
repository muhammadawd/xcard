<template>
  <div id="ag-grid-demo">
    <vx-card>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="6">
          <div class="vx-row w-full  mb-6">
            <div class="vx-col w-full md:w-1/2 mb-2">
              <vs-input class="w-full" :label="$t('search')" name="search" @keyup.enter="submitFilter()"
                        autocomplete="off" v-model="query"/>
            </div>
            <div class="vx-col w-full md:w-1/2 mb-2">
              <label class="vs-input--label">{{$t('city')}}</label>
              <v-select :options="cities" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="city"/>
              <span class="text-danger text-sm" v-show="errors.has('city')">{{ errors.first('city') }}</span>
            </div>
          </div>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="6">
          <div class="btn-group flex">
            <vs-button size="small" type="line" color="primary" icon-pack="feather" icon="icon-plus" class="mb-0"
                       @click="$router.push({name:'add-client'})">{{$t('add')}}
            </vs-button>
            <vs-button size="small" type="line" color="rgb(62, 201, 214)" icon-pack="feather" @click="submitFilter()"
                       icon="icon-search">
              {{$t('filter')}}
            </vs-button>
          </div>
        </vs-col>
      </vs-row>
    </vx-card>

    <div>

      <vs-table :data="users">

        <template slot="thead">
          <vs-th>#</vs-th>
          <vs-th>{{$t('name')}}</vs-th>
          <vs-th>{{$t('phone')}}</vs-th>
          <vs-th>{{$t('city')}}</vs-th>
          <vs-th>{{$t('has_active_card')}}</vs-th>
          <vs-th width="100"></vs-th>
        </template>

        <template slot-scope="{data}">
          <slot v-for="(tr, indextr) in data" class="bg-white">

            <vs-tr class="bg-white">
              <vs-td>
                <vs-button size="small" color="primary" icon-pack="feather" icon="icon-edit"
                           @click="$router.push({name:'edit-client',params:{id:tr.id}})">{{$t('edit')}}
                </vs-button>
              </vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
              <vs-td>
                <div class="btn-group flex">
                  <vs-button type="line" size="small" color="danger" icon-pack="feather" icon="icon-trash"
                             @click="confirmDelete(tr.id)"></vs-button>
                </div>
              </vs-td>
            </vs-tr>
            <vs-tr class="tr-spacer"></vs-tr>
          </slot>
        </template>
      </vs-table>
      <div class="grid-xs mt-2" v-if="pageTotal && currentx">
        <vs-pagination :total="pageTotal" v-model="currentx" goto></vs-pagination>
      </div>


    </div>
  </div>
</template>


<script>
  import vSelect from 'vue-select'

  export default {
    components: {
      'v-select': vSelect
    },
    data() {
      return {
        query: '',
        city: {},
        cities: ['AE', 'EG'],
        currentx: 1,
        pageTotal: 0,
        users: []
      }
    },
    watch: {
      currentx: function (n, o) {
        this.getAllUsers()
      },
    },
    methods: {
      confirmDelete(id) {
        let vm = this;
        vm.$swal({
          title: vm.$t('look_out'),
          text: vm.$t('are_sure'),
          showCancelButton: true,
          confirmButtonText: vm.$t('yes'),
          cancelButtonText: vm.$t('no'),
          buttonsStyling: true
        }).then(function (result) {
          if (result.isConfirmed) {
            vm.$vs.loading();
            let dispatch = vm.$store.dispatch('moduleClient/removeClient', {ids: [id]});
            dispatch.then(() => {
              vm.users = vm.$store.getters['moduleClient/getAllUsers'];
              vm.$vs.loading.close()
            }).catch((error) => {
              vm.$helper.handleError(error, vm);
              vm.$vs.loading.close()
            });
            return;
          }
        });

      },
      getAllUsers() {
        let vm = this;
        vm.$vs.loading();
        let filters = vm.prepareFilters();
        let dispatch = this.$store.dispatch('moduleClient/fetchClient', filters);
        dispatch.then((response) => {
          response = response.data;
          vm.pageTotal = response.data.users.last_page;
          vm.users = this.$store.getters['moduleClient/getAllUsers'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitFilter() {
        this.currentx = 1;
        this.getAllUsers();
      },
      prepareFilters() {
        return {
          limit: 20,
          paginated: true,
          query: this.query,
          page: this.currentx
        }
      }
    },
    mounted() {
      let vm = this;
      vm.getAllUsers();
    }
  }
</script>

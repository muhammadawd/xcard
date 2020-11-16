<template>
  <div>
    <form>
      <fieldset class="fieldSetMain">
        <legend><i class="fa fa-info-circle"></i> {{$t('client_info')}}</legend>
        <vx-card>
          <div class="vx-row mb-2">
            <div class="vx-col w-full md:w-1/3 mb-2">
              <label class="vs-input--label">{{$t('name')}} <span class="star">*</span></label>
              <vs-input v-validate="'required'" class="w-full" name="name"
                        :danger="errors.has('name')" val-icon-danger="close"
                        autocomplete="off" v-model=" dataModel.name"/>
              <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
            </div>
          </div>
          <div class="vx-row mb-2">
            <div class="vx-col w-full md:w-1/3 mb-2">
              <label class="vs-input--label">{{$t('phone')}} <span class="star">*</span></label>
              <vs-input v-validate="'required|numeric|digits:8'" class="w-full" name="phone"
                        :danger="errors.has('phone')" val-icon-danger="close"
                        autocomplete="off" v-model="dataModel.phone"/>
              <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
            </div>
            <div class="vx-col w-full md:w-1/3 mb-2">
              <label class="vs-input--label">{{$t('city')}}</label>
              <v-select :options="cities" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                        v-model="city"/>
              <span class="text-danger text-sm" v-show="errors.has('city')">{{ errors.first('city') }}</span>
            </div>
          </div>
          <div class="vx-row mb-2">
            <div class="vx-col w-full md:w-1/3 mb-2">
              <label class="vs-input--label">{{$t('password')}}</label>
              <vs-input  class="w-full" name="password" type="password"
                        :danger="errors.has('password')" val-icon-danger="close"
                        autocomplete="off" v-model="dataModel.password"/>
              <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
            </div>
            <div class="vx-col w-full md:w-1/3 mb-2">
              <label class="vs-input--label">{{$t('password_confirmation')}} </label>
              <vs-input class="w-full" type="password"
                        name="password_confirmation"
                        :danger="errors.has('password_confirmation')" val-icon-danger="close"
                        autocomplete="off" v-model="dataModel.password_confirmation"/>
              <span class="text-danger text-sm"
                    v-show="errors.has('password')">{{ errors.first('password_confirmation') }}</span>
            </div>
          </div>
        </vx-card>
      </fieldset>
      <fieldset class="fieldSetMain">
        <legend><i class="fa fa-info-circle"></i> {{$t('card')}}</legend>
        <vx-card class="mb-3">
          <div class="vx-row mb-2">
            <div class="vx-col w-full md:w-1/3 mb-2">
              <label class="vs-input--label">{{$t('cards')}}</label>
              <v-select :options="cards" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                        v-model="card"/>
              <span class="text-danger text-sm" v-show="errors.has('card')">{{ errors.first('card') }}</span>
            </div>
            <div class="vx-col w-full md:w-1/3 mb-2">
              <label class="vs-input--label">{{$t('status')}}</label>
              <v-select :options="statuses" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                        v-model="status"/>
              <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>
            </div>
            <div class="vx-col w-full md:w-1/3 mb-2">
              <label class="vs-input--label">{{$t('belongTo')}}</label>
              <v-select :options="stores" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                        v-model="store"/>
              <span class="text-danger text-sm" v-show="errors.has('store')">{{ errors.first('store') }}</span>
            </div>
            <div class="vx-col w-full">
              <vs-button type="filled" size="small" @click.prevent="submitForm" class="mt-5 block">{{$t('edit')}}
              </vs-button>
            </div>
          </div>
        </vx-card>
      </fieldset>
    </form>
  </div>
</template>


<script>
  // For custom error message
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  export default {
    data() {
      return {
        genders: ['male', 'female'],
        dataModel: {}
      }
    },
    components: {
      'v-select': vSelect, flatPickr
    },
    methods: {
      findClient() {
        let vm = this;
        vm.$vs.loading();
        let id = vm.$route.params.id;
        let dispatch = this.$store.dispatch('moduleClient/findClient', {id: id});
        dispatch.then((response) => {
          response = response.data;
          if (response.status) {
            vm.dataModel = response.data.user;
          }
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      updateClient() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;

        let dispatch = this.$store.dispatch('moduleClient/updateClient', request_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
          vm.$router.push({name: 'all-clients'})
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            this.updateClient();
          } else {
            // form have errors
          }
        })
      }
    },
    mounted() {
      this.findClient()
    }
  }
</script>

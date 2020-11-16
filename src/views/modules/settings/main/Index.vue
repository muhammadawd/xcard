<template>
  <vx-card>


    <vs-collapse>

      <vs-collapse-item icon-pack="feather" icon-arrow="icon-arrow-down">
        <div slot="header">
          <i class="fa fa-cog"></i>
          {{$t('main_settings')}}
        </div>

      </vs-collapse-item>
    </vs-collapse>
  </vx-card>
</template>


<script>
  export default {
    components: {},
    data() {
      return {
        dataModel: {},
        settings: null
      }
    },
    methods: {
      updateSettings() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;
        let dispatch = this.$store.dispatch('moduleCommon/updateSetting', request_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            this.updateSettings()
          } else {
            // form have errors
          }
        })
      },
      getAllSettings() {
        let vm = this;
        vm.$vs.loading()
        let dispatch = this.$store.dispatch('moduleCommon/fetchSettings');
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.settings = this.$store.getters['moduleCommon/getAllSettings'];
        }).catch(()=>{

          vm.$vs.loading.close()
        });
      }
    },
    mounted() {
      this.getAllSettings()
    }
  }

</script>


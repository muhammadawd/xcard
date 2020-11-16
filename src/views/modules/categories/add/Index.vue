<template>
  <vx-card>
    <form>
      <div class="vx-row">
        <div class="vx-col w-full md:w-2/3 mb-2">
          <div class="vx-row mb-6">
            <div class="vx-col w-full md:w-1/2 mb-2">
              <label class="vs-input--label">{{$t('category_parent')}}</label>
              <v-select :options="categories" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                        v-model="dataModel.parent_id"/>
              <span class="text-danger text-sm" v-show="errors.has('parent_id')">{{ errors.first('parent_id') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full md:w-1/2 mb-2">
              <label class="vs-input--label">{{$t('category_name')}}
                <span class="star">*</span>
              </label>
              <vs-input v-validate="'required'" class="w-full" name="category_name"
                        :danger="errors.has('category_name')" val-icon-danger="close"
                        autocomplete="off" v-model=" dataModel.category_name"/>
              <span class="text-danger text-sm"
                    v-show="errors.has('category_name')">{{ errors.first('category_name') }}</span>
            </div>
            <div class="vx-col w-full md:w-1/2 mb-2">
              <vs-input v-validate="'numeric'" class="w-full" :label="$t('order')" name="order"
                        :danger="errors.has('order')" val-icon-danger="close"
                        autocomplete="off" v-model=" dataModel.order"/>
              <span class="text-danger text-sm"
                    v-show="errors.has('order')">{{ errors.first('order') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full md:w-1/2 mb-2">
              <vs-input class="w-full" :label="$t('slug')" name="slug"
                        :danger="errors.has('slug')" val-icon-danger="close"
                        autocomplete="off" v-model=" dataModel.slug"/>
              <span class="text-danger text-sm"
                    v-show="errors.has('slug')">{{ errors.first('slug') }}</span>
            </div>
            <div class="vx-col w-full md:w-1/2 mb-2">
              <label class="vs-input--label">{{$t('image')}}
                <span class="star">*</span>
              </label>
              <input class="w-full vs-inputx vs-input--input normal" name="image" accept="image/*" ref="image"
                     v-validate="'required'"
                     v-on:change="handleFileUpload()" autocomplete="off" type="file"/>
              <span class="text-danger text-sm"
                    v-show="errors.has('image')">{{ errors.first('image') }}</span>
            </div>
            <div class="vx-col w-full">
              <vs-button type="filled" size="small" @click.prevent="submitForm" class="mt-5 block">{{$t('add')}}
              </vs-button>
            </div>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/3 mb-2">
          <div class="image_container_cropper">
            <h3 class="text-center mt-2" v-if="!imgSrc">{{$t('preview')}}</h3>
            <vue-cropper v-if="imgSrc"
                         :aspect-ratio="1 / 1"
                         ref="cropper"
                         :src="imgSrc"
                         alt="Source Image">
            </vue-cropper>
          </div>
        </div>
      </div>
    </form>
  </vx-card>
</template>


<script>
  // For custom error message
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import VueCropper from 'vue-cropperjs';
  import 'cropperjs/dist/cropper.css';

  export default {
    data() {
      return {
        categories: [],
        dataModel: {},
        imgSrc: ''
      }
    },
    components: {
      'v-select': vSelect, flatPickr, VueCropper
    },
    methods: {
      handleFileUpload() {
        let vm = this;
        let file = vm.$refs.image.files[0];
        if (file.type.indexOf('image/') === -1) {
          console.log('Please select an image file');
          return;
        }
        if (typeof FileReader === 'function') {
          const reader = new FileReader();
          reader.onload = (event) => {
            vm.imgSrc = event.target.result;
            // this.$refs.cropper.replace(event.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          console.log('Sorry, FileReader API not supported');
        }
      },
      addCategory() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;
        // request_data.type = request_data.type_object ? request_data.type_object.value : '';

        let dispatch = this.$store.dispatch('moduleClient/addClient', request_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
          vm.$router.push({name: 'all-categories'})
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            this.addCategory();
          } else {
            // form have errors
          }
        })
      }
    },
  }
</script>

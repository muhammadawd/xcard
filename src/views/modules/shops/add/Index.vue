<template>
  <div>
    <form>
      <fieldset class="fieldSetMain">
        <legend><i class="fa fa-info-circle"></i> {{$t('shop_info')}}</legend>
        <vx-card>
          <div class="vx-row">
            <div class="vx-col w-full md:w-2/3 mb-2">
              <div class="vx-row mb-2">
                <div class="vx-col w-full md:w-1/2 mb-2">
                  <label class="vs-input--label">{{$t('category')}}<span class="star">*</span></label>
                  <v-select :options="categories" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" name="category"
                            v-model="category"/>
                  <span class="text-danger text-sm"
                        v-show="errors.has('category')">{{ errors.first('category') }}</span>
                </div>
                <div class="vx-col w-full md:w-1/2 mb-2">
                  <label class="vs-input--label">{{$t('shop_name')}} <span class="star">*</span></label>
                  <vs-input v-validate="'required'" class="w-full" name="shop_name"
                            :danger="errors.has('shop_name')" val-icon-danger="close"
                            autocomplete="off" v-model=" dataModel.shop_name"/>
                  <span class="text-danger text-sm"
                        v-show="errors.has('shop_name')">{{ errors.first('shop_name') }}</span>
                </div>
              </div>
              <div class="vx-row mb-2">
                <div class="vx-col w-full md:w-1/2 mb-2">
                  <label class="vs-input--label">{{$t('shop_admin')}} </label>
                  <vs-input class="w-full" name="shop_admin"
                            :danger="errors.has('shop_admin')" val-icon-danger="close"
                            autocomplete="off" v-model=" dataModel.shop_admin"/>
                  <span class="text-danger text-sm"
                        v-show="errors.has('shop_admin')">{{ errors.first('shop_admin') }}</span>
                </div>
                <div class="vx-col w-full md:w-1/2 mb-2">
                  <label class="vs-input--label">{{$t('phone')}}</label>
                  <vs-input v-validate="'numeric|digits:8'" class="w-full" name="phone"
                            :danger="errors.has('phone')" val-icon-danger="close"
                            autocomplete="off" v-model="dataModel.phone"/>
                  <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                </div>
              </div>
              <div class="vx-row mb-2">
                <div class="vx-col w-full mb-2">
                  <label class="vs-input--label">{{$t('terms')}} </label>
                  <vs-textarea class="w-full" name="terms" rows="5"
                               :danger="errors.has('terms')" val-icon-danger="close"
                               autocomplete="off" v-model=" dataModel.terms"/>
                  <span class="text-danger text-sm"
                        v-show="errors.has('terms')">{{ errors.first('terms') }}</span>
                </div>
              </div>
            </div>
            <div class="vx-col w-full md:w-1/3 mb-2">
              <div class="vx-row mb-2">
                <div class="vx-col w-full  mb-2">
                  <label class="vs-input--label">{{$t('image')}}
                    <span class="star">*</span>
                  </label>
                  <input class="w-full vs-inputx vs-input--input normal" name="image" accept="image/*" ref="image"
                         v-validate="'required'"
                         v-on:change="handleFileUpload()" autocomplete="off" type="file"/>
                  <span class="text-danger text-sm"
                        v-show="errors.has('image')">{{ errors.first('image') }}</span>
                  <div class="mt-3 image_container_cropper">
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
            </div>
          </div>
        </vx-card>
      </fieldset>

      <fieldset class="fieldSetMain">
        <legend><i class="fa fa-info-circle"></i> {{$t('branches_info')}}</legend>
        <vx-card>
          <div class="vx-row">
            <div class="vx-col w-full md:w-2/3 mb-2">
            </div>
            <div class="vx-col w-full mb-2">
              <vs-table :data="branches">

                <template slot="thead">
                  <vs-th>
                    <vs-button size="small" color="primary" icon-pack="feather" icon="icon-plus"
                               @click="addBranch()">
                    </vs-button>
                  </vs-th>
                  <vs-th>{{$t('branch_address')}} <span class="star">*</span></vs-th>
                  <vs-th>{{$t('phone')}} <span class="star">*</span></vs-th>
                  <vs-th>{{$t('lat')}}</vs-th>
                  <vs-th>{{$t('lng')}}</vs-th>
                  <vs-th>{{$t('serial_code')}}</vs-th>
                  <vs-th>{{$t('password')}}</vs-th>
                  <vs-th>{{$t('city')}}</vs-th>
                  <vs-th width="180"></vs-th>
                </template>

                <template slot-scope="{data}">
                  <slot v-for="(tr, indextr) in data" class="bg-white">
                    <vs-tr class="bg-white">
                      <vs-td>
                        <vs-button size="small" color="danger" icon-pack="feather" icon="icon-minus"
                                   @click="removeBranch(indextr)">
                        </vs-button>
                      </vs-td>
                      <vs-td>
                        <vs-input v-validate="'required'" class="w-full" :name="`branches[address][${indextr}]`"
                                  :danger="errors.has(`branches[address][${indextr}]`)"
                                  v-model="branches[indextr].address"
                                  val-icon-danger="close"
                                  autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`branches[address][${indextr}]`)">{{ errors.first(`branches[address][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <vs-input v-validate="'required'" class="w-full" :name="`branches[phone][${indextr}]`"
                                  :danger="errors.has(`branches[phone][${indextr}]`)"
                                  v-model="branches[indextr].phone"
                                  val-icon-danger="close"
                                  autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`branches[phone][${indextr}]`)">{{ errors.first(`branches[phone][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <vs-input class="w-full" :name="`branches[lat][${indextr}]`"
                                  :danger="errors.has(`branches[lat][${indextr}]`)"
                                  v-model="branches[indextr].lat"
                                  val-icon-danger="close"
                                  autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`branches[lat][${indextr}]`)">{{ errors.first(`branches[lat][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <vs-input class="w-full" :name="`branches[lng][${indextr}]`"
                                  :danger="errors.has(`branches[lng][${indextr}]`)"
                                  v-model="branches[indextr].lng"
                                  val-icon-danger="close"
                                  autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`branches[lng][${indextr}]`)">{{ errors.first(`branches[lng][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <vs-input class="w-full" :name="`branches[serial_code][${indextr}]`"
                                  :danger="errors.has(`branches[serial_code][${indextr}]`)"
                                  v-model="branches[indextr].serial_code"
                                  val-icon-danger="close"
                                  autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`branches[serial_code][${indextr}]`)">{{ errors.first(`branches[serial_code][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <vs-input class="w-full" :name="`branches[password][${indextr}]`"
                                  :danger="errors.has(`branches[password][${indextr}]`)"
                                  v-model="branches[indextr].password"
                                  val-icon-danger="close" type="password"
                                  autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`branches[password][${indextr}]`)">{{ errors.first(`branches[password][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <v-select :options="categories" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'"
                                  name="category"
                                  v-model="branches[indextr].city"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`branches[city][${indextr}]`)">{{ errors.first(`branches[city][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <vs-button size="small" color="primary" icon-pack="feather" icon="icon-map"
                                   @click="$router.push({name:'edit-category',params:{id:tr.id}})">{{$t('select_map')}}
                        </vs-button>
                      </vs-td>
                    </vs-tr>
                    <vs-tr class="tr-spacer"></vs-tr>
                  </slot>
                </template>
              </vs-table>
            </div>
          </div>
        </vx-card>
      </fieldset>

      <fieldset class="fieldSetMain">
        <legend><i class="fa fa-info-circle"></i> {{$t('offers')}}</legend>
        <vx-card>
          <div class="vx-row">
            <div class="vx-col w-full md:w-2/3 mb-2">
            </div>
            <div class="vx-col w-full mb-2">
              <vs-table :data="offers">

                <template slot="thead">
                  <vs-th>
                    <vs-button size="small" color="primary" icon-pack="feather" icon="icon-plus"
                               @click="addOffer()">
                    </vs-button>
                  </vs-th>
                  <vs-th>{{$t('text')}} <span class="star">*</span></vs-th>
                  <vs-th>{{$t('discount')}} <span class="star">*</span></vs-th>
                  <vs-th>{{$t('image')}}</vs-th>
                </template>

                <template slot-scope="{data}">
                  <slot v-for="(tr, indextr) in data" class="bg-white">

                    <vs-tr class="bg-white">
                      <vs-td>
                        <vs-button size="small" color="danger" icon-pack="feather" icon="icon-minus"
                                   @click="removeOffer(indextr)">
                        </vs-button>
                      </vs-td>
                      <vs-td>
                        <vs-input v-validate="'required'" class="w-full" :name="`offers[text][${indextr}]`"
                                  :danger="errors.has(`offers[text][${indextr}]`)" v-model="offers[indextr].text"
                                  val-icon-danger="close"
                                  autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`offers[text][${indextr}]`)">{{ errors.first(`offers[text][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <vs-input v-validate="'required|numeric'" class="w-full" :name="`offers[discount][${indextr}]`"
                                  :danger="errors.has(`offers[discount][${indextr}]`)"
                                  v-model="offers[indextr].discount"
                                  val-icon-danger="close" autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`offers[discount][${indextr}]`)">{{ errors.first(`offers[discount][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <input class="w-full vs-inputx vs-input--input normal" :name="`offers[image][${indextr}]`"
                               accept="image/*" ref="image" type="file"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`offers[image][${indextr}]`)">{{ errors.first(`offers[image][${indextr}]`) }}</span>
                      </vs-td>
                    </vs-tr>
                    <vs-tr class="tr-spacer"></vs-tr>
                  </slot>
                </template>
              </vs-table>
            </div>
          </div>
        </vx-card>
      </fieldset>

      <fieldset class="fieldSetMain">
        <legend><i class="fa fa-info-circle"></i> {{$t('special_offers')}}</legend>
        <vx-card>
          <div class="vx-row">
            <div class="vx-col w-full md:w-2/3 mb-2">
            </div>
            <div class="vx-col w-full mb-2">
              <vs-table :data="special_offers">

                <template slot="thead">
                  <vs-th>
                    <vs-button size="small" color="primary" icon-pack="feather" icon="icon-plus"
                               @click="addSpecialOffer()">
                    </vs-button>
                  </vs-th>
                  <vs-th>{{$t('text')}} <span class="star">*</span></vs-th>
                  <vs-th>{{$t('discount_before')}} <span class="star">*</span></vs-th>
                  <vs-th>{{$t('discount_after')}} <span class="star">*</span></vs-th>
                  <vs-th>{{$t('to_date')}}</vs-th>
                  <vs-th>{{$t('image')}}</vs-th>
                </template>

                <template slot-scope="{data}">
                  <slot v-for="(tr, indextr) in data" class="bg-white">

                    <vs-tr class="bg-white">
                      <vs-td>
                        <vs-button size="small" color="danger" icon-pack="feather" icon="icon-minus"
                                   @click="removeSpecialOffer(indextr)">
                        </vs-button>
                      </vs-td>
                      <vs-td>
                        <vs-input v-validate="'required'" class="w-full" :name="`special_offers[text][${indextr}]`"
                                  :danger="errors.has(`special_offers[text][${indextr}]`)"
                                  v-model="special_offers[indextr].text"
                                  val-icon-danger="close"
                                  autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`special_offers[text][${indextr}]`)">{{ errors.first(`special_offers[text][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <vs-input v-validate="'required'" class="w-full"
                                  :name="`special_offers[discount_after][${indextr}]`"
                                  :danger="errors.has(`special_offers[discount_after][${indextr}]`)"
                                  v-model="special_offers[indextr].discount_after"
                                  val-icon-danger="close"
                                  autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`special_offers[discount_after][${indextr}]`)">{{ errors.first(`special_offers[discount_after][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <vs-input v-validate="'required'" class="w-full"
                                  :name="`special_offers[discount_before][${indextr}]`"
                                  :danger="errors.has(`special_offers[discount_before][${indextr}]`)"
                                  v-model="special_offers[indextr].discount_before"
                                  val-icon-danger="close"
                                  autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`special_offers[discount_before][${indextr}]`)">{{ errors.first(`special_offers[discount_before][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <flat-pickr v-validate="'required'" class="w-full"
                                    :name="`special_offers[to_date][${indextr}]`"
                                    :danger="errors.has(`special_offers[to_date][${indextr}]`)"
                                    v-model="special_offers[indextr].to_date"
                                    val-icon-danger="close"
                                    autocomplete="off"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`special_offers[to_date][${indextr}]`)">{{ errors.first(`special_offers[to_date][${indextr}]`) }}</span>
                      </vs-td>
                      <vs-td>
                        <input class="w-full vs-inputx vs-input--input normal"
                               :name="`special_offers[image][${indextr}]`"
                               accept="image/*" ref="image" type="file"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has(`special_offers[image][${indextr}]`)">{{ errors.first(`special_offers[image][${indextr}]`) }}</span>
                      </vs-td>
                    </vs-tr>
                    <vs-tr class="tr-spacer"></vs-tr>
                  </slot>
                </template>
              </vs-table>
            </div>
          </div>
        </vx-card>
      </fieldset>

      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-button type="filled" size="small" @click.prevent="submitForm" class="mt-5 block">{{$t('add')}}
          </vs-button>
        </div>
      </div>

    </form>
  </div>
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
        branches: [],
        offers: [],
        special_offers: [],
        categories: [],
        category: null,
        imgSrc: '',
        dataModel: {}
      }
    },
    components: {
      'v-select': vSelect, flatPickr, VueCropper
    },
    methods: {
      addBranch() {
        this.branches.push({
          address: '',
          phone: '',
          lat: '',
          lng: '',
          serial_code: '',
          password: '',
          city: '',
        })
      },
      addOffer() {
        this.offers.push({
          text: '',
          discount: ''
        })
      },
      addSpecialOffer() {
        this.special_offers.push({
          text: '',
          discount_before: '',
          to_date: new Date(),
        })
      },
      removeOffer(index) {
        const vm = this;
        let offers = JSON.parse(JSON.stringify(vm.offers));
        offers.splice(index, 1);
        vm.offers = offers;
      },
      removeBranch(index) {
        const vm = this;
        let branches = JSON.parse(JSON.stringify(vm.branches));
        branches.splice(index, 1);
        vm.branches = branches;
      },
      removeSpecialOffer(index) {
        const vm = this;
        let special_offers = JSON.parse(JSON.stringify(vm.special_offers));
        special_offers.splice(index, 1);
        vm.special_offers = special_offers;
      },
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
      addClient() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;
        // request_data.type = request_data.type_object ? request_data.type_object.value : '';

        let dispatch = this.$store.dispatch('moduleClient/addClient', request_data);
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
            this.addClient();
          } else {
            // form have errors
          }
        })
      }
    },
  }
</script>

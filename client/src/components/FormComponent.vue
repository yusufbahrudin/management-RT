<!-- <template>
  <div class="content-body">
    <div class="container d-flex justify-content-center my-5">
      <div class="card p-3 w-50">
        <h4 class="text-center mb3">{{ formStatus }} New Home</h4>
        <form id="add-form" @submit.prevent="submitForm">
          <label for="form-nomor" class="form-label">Nomor Rumah</label>
          <input
            v-model="dataInput.Nomor_Rumah"
            id="form-nomor"
            type="text"
            placeholder="Input Nomor Rumah"
            class="form-control mb-3"
          />

          <label for="form-pemilik" class="form-label">Nama Pemilik</label>
          <input
            v-model="dataInput.Nama_Pemilik"
            id="form-pemilik"
            type="text"
            placeholder="Input Nama Pemilik"
            class="form-control mb-3"
          />

          <label for="form-status" class="form-label">Status</label>
          <input
            v-model="dataInput.Status"
            id="form-status"
            type="text"
            placeholder="Input Status"
            class="form-control mb-3"
          />

          <button type="submit" class="btn btn-warning">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FormComponent',
  props: ['dataInput'],
  data() {
    return {
      formStatus: 'new'
    };
  },
  methods: {
    async submitForm() {
      try {
        if (this.dataInput.id) {
          this.formStatus = 'edit';
        }

        const response = await axios.post('http://localhost:4000/rumah', this.dataInput);

        this.$emit('handleFormData', response.data, this.formStatus);

        this.dataInput = {};
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  }
};
</script> -->

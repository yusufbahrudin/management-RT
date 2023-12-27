<script>
import TableRumahComponent from './TableRumahComponent.vue'
export default {
  props: ['rumahs'],
  components: {
    TableRumahComponent
  },
}
</script>

<template>
  <div class="content-body">
    <div class="container-fluid mt-3">
      <div class="col-12">
        <button @click.prevent="$emit('changePage', 'form')" class="btn btn-primary mb-5">
          Add Data
        </button>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Rumah</h4>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nama_Pemilik</th>
                    <th scope="col">Nomor_Pemilik</th>
                    <th scope="col">Status</th>
                    <th scope="col" width="50px">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <TableRumahComponent
                    v-for="(rumah, index) in rumahs"
                    :key="rumah.id"
                    :rumah="rumah"
                    :index="index"
                    @getRumahById="getRumahById"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

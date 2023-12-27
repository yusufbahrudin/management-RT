<script>
export default {
  props: ['pembayarans']
}
</script>

<template>
  <div class="content-body">
    <div class="container-fluid mt-3">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Data Pembayaran</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No Pembayaran</th>
                  <th scope="col">Nama Pembayaran</th>
                  <th scope="col">Tanggal Pembayaran</th>
                  <th scope="col">Jumlah Pembayaran</th>
                  <th scope="col">Status Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pembayaran in pembayarans" :key="pembayaran.id">
                  <td>{{ pembayaran.id }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rumahs', 'pembayarans'],
  computed: {
    totalMenus() {
      return this.rumahs.length
    },
    totalCategories() {
      return this.pembayarans.length
    }
  }
}
</script>

<template>
  <div class="content-body">
    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-lg-3 col-sm-6">
          <div class="card gradient-1">
            <div class="card-body">
              <h3 class="card-title text-white">Total Rumah</h3>
              <div class="d-inline-block">
                <h2 class="text-white">{{ totalRumahs }}</h2>
              </div>
              <span class="float-right display-5 opacity-5"> </span>
              <i class="fas fa-utensils"></i>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-sm-6">
          <div class="card gradient-2">
            <div class="card-body">
              <h3 class="card-title text-white">Total Pembayaran</h3>
              <div class="d-inline-block">
                <h2 class="text-white">{{ totalPembayarans}}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

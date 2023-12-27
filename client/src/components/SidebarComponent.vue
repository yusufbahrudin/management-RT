<script>
export default {
  props: ['currentPage']
}
</script>

<template>
  <div class="nk-sidebar">
    <div class="nk-nav-scroll">
      <ul class="metismenu" id="menu">
        <li class="nav-label">Dashboard</li>
        <li>
          <a @click="$emit('changePage', 'home')" aria-expanded="false">
            <i class="icon-speedometer menu-icon"></i><span class="nav-text">Dashboard</span>
          </a>
        </li>
        <li>
          <a @click="$emit('changePage', 'rumah')" aria-expanded="false">
            <i class="icon-badge menu-icon"></i><span class="nav-text">Rumah</span>
          </a>
        </li>
        <li>
          <a @click="$emit('changePage', 'pembayaran')" aria-expanded="false">
            <i class="icon-grid menu-icon"></i><span class="nav-text">Pembayarans</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

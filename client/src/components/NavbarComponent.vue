<script>
export default {
  props: ['currentPage']
}
</script>

<template>
  <div>
    <div class="nav-header">
      <div class="brand-logo">
        <a href="index.html">
          <span class="brand-title">RT LIMA</span>
        </a>
      </div>
    </div>

    <div class="header">
      <div class="header-content clearfix">
        <div class="header-left">
          <!--  -->
        </div>
        <div class="header-right">
          <ul class="clearfix">
            <li class="icons dropdown">
              <div class="user-img c-pointer position-relative" data-toggle="dropdown">
                <span class="activity active"></span>
              </div>
              <div class="drop-down dropdown-profile animated fadeIn dropdown-menu">
                <div class="dropdown-content-body">
                  <ul>
                    <hr class="my-2" />
                    <li>
                      <a href="" @click.prevent="$emit('dologout')"
                        ><i class="icon-key"></i> <span>Logout</span></a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

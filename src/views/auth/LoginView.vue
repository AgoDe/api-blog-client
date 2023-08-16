<script setup>
import LoginFormComponent from "@/components/LoginFormComponent.vue";
import { useTemplateStore } from "@/stores/template";

</script>

<template>
  <!-- Page Content -->
  <div class="hero-static d-flex align-items-center">
    <div class="content">
      <div class="row justify-content-center push">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <!-- Sign In Block -->
          <BaseBlock title="Sign In" class="mb-0">
            <template #options>
              <RouterLink
                :to="{ name: '' }"
                class="btn-block-option fs-sm"
                >Forgot Password?</RouterLink
              >
              <RouterLink
                :to="{ name: '' }"
                class="btn-block-option"
              >
                <i class="fa fa-user-plus"></i>
              </RouterLink>
            </template>

            <div class="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
              <h1 class="h2 mb-1">OneUI</h1>
              <p class="fw-medium text-muted">Welcome, please login.</p>

              <!-- Sign In Form -->
              <LoginFormComponent></LoginFormComponent>
              <!-- END Sign In Form -->
            </div>
          </BaseBlock>
          <!-- END Sign In Block -->
        </div>
      </div>
      <div class="fs-sm text-muted text-center">
        
      </div>
    </div>
  </div>
  <!-- END Page Content -->
</template>

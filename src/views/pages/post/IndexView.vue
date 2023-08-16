<script setup>
import { watch } from 'vue'
import router from '@/router'
import { usePostStore } from '@/stores/post.js'
import dayjs from 'dayjs'
//import activeFiltersPillsComponent from '@/components/activeFiltersPillsComponent.vue'
//import RequestsFiltersComponent from '@/components/offcanvas/RequestsFiltersComponent.vue'
import LoadingIcon from '@/components/LoadingIcon.vue'

const postStore = usePostStore()

// const goToRequestShow = (request) => {
//   const uuid = request.parent_uuid ? request.parent_uuid : request.uuid
//   router.push({ name: 'request-show', params: { uuid: uuid } })
// }

postStore.index()

// watch(
//   () => requestsStore.getFilters,
//   () => requestsStore.fetchRequests(),
//   { deep: true }
// )
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="posts.index" subtitle="posts.index">
    <template #extra>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item">
            <RouterLink :to="{ name: 'dashboard' }" class="link-fx"> Dashboard </RouterLink>
          </li>
          <li class="breadcrumb-item" aria-current="page">{{ $t('pages.posts.index.title') }}</li>
        </ol>
      </nav>
    </template>
  </BasePageHeading>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <!-- floating filters pills container -->
    <div class="pill_filters_box mb-4 d-flex justify-content-between align-items-center">
      <!-- <activeFiltersPillsComponent /> -->

      <!-- show filters offcanvas button -->
      <div>
        <button
          type="button"
          class="btn btn-primary btn-floating btn-lg me-3"
          @click="postStore.index"
        >
          <i class="fa fa-arrows-rotate"></i>
        </button>
        <!-- <button
          type="button"
          class="btn btn-primary btn-floating btn-lg"
          data-bs-toggle="offcanvas"
          data-bs-target="#requestsFilters"
          aria-controls="requestsFilters"
        >
          <i class="fa fa-filter"></i>
        </button> -->
      </div>
    </div>

    <LoadingIcon :store="postStore"></LoadingIcon>

    <!-- Partial Table -->
    <BaseBlock :title="$t('pages.posts.index.tableTitle')" v-show="!postStore.getIsLoading">
      <template #options>
        <strong>{{ postStore.getPostsCount }}</strong>
        {{ $t('pages.posts.index.found', postStore.getPostsCount) }}
      </template>

      <table class="table table-bordered table-striped table-vcenter">
        <thead>
          <tr>
            
            <th class="d-none d-md-table-cell">ID</th>
            <th class="d-none d-md-table-cell">Titolo</th>
            <th class="d-none d-md-table-cell">Data</th>
            <th class="text-center" style="width: 100px">Azioni</th>
  
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in postStore.posts" :key="post.id">
            
            <td class="d-none d-md-table-cell fs-sm">
              <em class="">{{ post.id }}</em>
            </td>
            <td class="d-none d-md-table-cell fs-sm">
              <em class="">{{ post.title }}</em>
            </td>
            <td class="text-center">
              {{ dayjs(post.created_at).format('DD/MM/YYYY HH:mm:ss') }}
            </td>
            <td class="text-center">
              <div class="btn-group">
                <RouterLink :to="{ name: 'posts.show',params: { slug: post.slug} }" class="btn btn-sm btn-alt-secondary">
                  <i class="fa fa-fw fa-eye"></i>
                </RouterLink>
                <button type="button" class="btn btn-sm btn-alt-secondary">
                  <i class="fa fa-fw fa-pencil-alt"></i>
                </button>
                <button type="button" class="btn btn-sm btn-alt-secondary">
                  <i class="fa fa-fw fa-times"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </BaseBlock>
    <!-- END Partial Table -->
  </div>
  <!-- END Page Content -->

  <!-- <post.indexFiltersComponent /> -->
</template>

<style scoped>
.btn-floating {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.pill_filters_box {
  z-index: 999;
  position: -webkit-sticky;
  top: 70px;
  position: sticky;
}
</style>

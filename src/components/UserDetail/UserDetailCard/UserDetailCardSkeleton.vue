<template>
  <!-- Image -->
  <div class="flex justify-center mb-3">
    <Skeleton shape="circle" size="96px" />
  </div>

  <!-- Name -->
  <div class="flex justify-center mb-4">
    <Skeleton width="8rem" height="1.5rem" />
  </div>

  <!-- User Info -->
  <div class="grid grid-cols-[1fr_5fr] gap-y-3 items-center">
    <!-- Email -->
    <i class="pi pi-envelope text-green-200" />
    <Skeleton width="100%" height="1.5rem" class="pb-1 border-b border-gray-200" />

    <!-- Phone -->
    <i class="pi pi-phone text-green-200" />
    <Skeleton width="100%" height="1.5rem" class="pb-1 border-b border-gray-200" />

    <!-- Address -->
    <i class="pi pi-map-marker text-green-200" />
    <Skeleton width="100%" height="4rem" />
  </div>
</template>

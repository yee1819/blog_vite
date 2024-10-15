<script setup>
import DefaultTheme from 'vitepress/theme'
import ContentSize from './extend/ContentSize.vue'
import Return from './extend/Return.vue'


const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #sidebar-nav-before>
      <Return />
    </template>
    <template #aside-ads-after>
      <ContentSize />
    </template>

  </Layout>
</template>
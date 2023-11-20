export default defineNuxtRouteMiddleware((to, _from) => {
  useHead({
    title: to.path,
    titleTemplate: (titleChunk) => {
      const title = titleChunk?.replace(/^\/+/, '') || 'Rick X'
      return title
    },
    meta: [
      {
        name: 'title',
        content: to.path,
      },
    ],
  })
})

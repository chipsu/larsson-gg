<template>
  <div class="container mx-auto">
    <div class="relative">
      <ImageSection :image_url="hero" :large="true">
        <ImageText tag="h1" class="text-center md:text-right">
          {{meta.title}}
        </ImageText>
      </ImageSection>
      <div v-if="heroCredit" class="md:absolute pin-r pin-b md:mx-12 md:my-8 p-2 bg-white-75">
        <div class="content" v-html="heroCredit" />
      </div>
    </div>
    <TextSection>
      <HtmlParser
        class="content"
        v-html="content"
      />
    </TextSection>
    <div>
      {{ meta.date }} by {{ meta.author || 'Anonymous' }}
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import MarkdownItMeta from 'markdown-it-meta'
import HtmlParser from '~/components/HtmlParser'
import ImageSection from '~/components/ImageSection'
import TextSection from '~/components/TextSection'
import ImageText from '~/components/ImageText'

export default {
  components: {
    HtmlParser,
    ImageSection,
    TextSection,
    ImageText
  },
  async asyncData({ res, error, params, $axios }) {
    try {
      const path = '/markdown/' + params.slug + '.md'
      const content = process.browser ? await $axios.$get(path) : require('fs').readFileSync(`./static/${path}`, 'utf8')
      const md = new MarkdownIt()
      md.use(MarkdownItMeta)
      return {
        content: md.render(content),
        meta: md.meta,
        hero: md.meta.hero || 'https://source.unsplash.com/1600x900/?nature',
        heroCredit: md.meta.heroCredit || 'Random photo from <a href="https://unsplash.com/">Unsplash</a>'
      }
    } catch(err) {
      let statusCode = 404
      if ('statusCode' in err) {
        statusCode = err.statusCode
      } else if('response' in err) {
        statusCode = err.response.status
      }
      console.error('Error reading file: ' + params.slug, err)
      error({ statusCode: statusCode, message: 'File not found:'+statusCode })
    }
  }
}
</script>

<style>
.content a {
  color: tomato;
}
.content h1,
.content h2 {
  padding: 1em 0 0.25em;
}
.content h1 + h6 {
  font-size: 1em;
  font-weight: normal;
  padding: 0 0 1em;
}
</style>

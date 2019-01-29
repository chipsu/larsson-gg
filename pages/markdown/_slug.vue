<template>
  <div class="container mx-auto">
    <ImageSection :image_url="hero">
      <ImageText tag="h1" class="text-center md:text-right">
        {{meta.title}}
      </ImageText>
    </ImageSection>
    <TextSection>
      <HtmlParser
        class="markdown"
        v-html="content"
      />
    </TextSection>
    <div>
      {{ meta.date }} by {{ meta.author || 'Anonymous' }}
      <div v-html="heroCredit" />
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
        hero: md.meta.hero || 'https://source.unsplash.com/random?nature',
        heroCredit: md.meta.heroCredit || 'Image from https://unsplash.com/'
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
.markdown a {
  color: tomato;
}
.markdown h1,
.markdown h2 {
  padding: 1em 0 0.25em;
}
.markdown h1 + h6 {
  font-size: 1em;
  font-weight: normal;
  padding: 0 0 1em;
}
</style>

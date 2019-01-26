<template>
  <div class="container mx-auto">
    <div>
      <ImageSection image_url="DSC01157.jpg">
        <ImageText class="text-center md:text-right">
          <Logo tag="h1" class="text-2xl lg:text-5xl" />
        </ImageText>
      </ImageSection>

      <TextSection>
        <h2 class="text-2xl lg:text-5xl font-bold text-red uppercase leading-none mb-4">
          Hello!
        </h2>
        <p>
          My name is Gustav Larsson and I'm a <span class="font-bold text-red">programmer</span>.
          I can <span class="font-bold text-red">code</span> pretty much anything and I'm currently working as a <span class="font-bold text-red">full-stack web-developer</span>.
        </p>
      </TextSection>

      <ImageSection image_url="DSC01106.jpg">
        <ImageText class="text-center">
          {{randomQuote}}
        </ImageText>
      </ImageSection>

      <TextSection>
        <h2 class="text-2xl lg:text-5xl font-bold text-red uppercase leading-none mb-4">
          Skills
        </h2>
        <div class="flex flex-wrap -mx-1">
          <div
            v-for="skill in skills"
            :key="skill"
            class="text-white bg-red p-2 m-1"
          >
            {{ skill }}
          </div>
        </div>

      </TextSection>

      <ImageSection image_url="DSC01141.jpg">
        <ImageText tag="a" class="text-center" :attrs="{class:'hover:text-red-dark', href:'mailto:hello@larsson.gg'}">
          hello@larsson.gg
        </ImageText>
      </ImageSection>

      <!-- <TextSection>
        <h2 class="text-2xl lg:text-5xl font-bold text-red uppercase leading-none mb-4">
          Still reading!? Link to blog
        </h2>
      </TextSection>

      <ImageSection image_url="https://source.unsplash.com/1600x900/?nature,water">
        <div class="text-center">
          <div
            class="inline-block px-8 py-4 mx-8"
            style="background:rgba(255,255,255,.75)"
          >
            <span class="text-2xl lg:text-5xl uppercase font-bold text-red">
              The end
            </span>
          </div>
        </div>
      </ImageSection> -->
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import TextSection from '~/components/TextSection.vue'
import ImageSection from '~/components/ImageSection.vue'
import ImageText from '~/components/ImageText.vue'

export default {
  components: {
    Logo,
    TextSection,
    ImageSection,
    ImageText
  },
  data() {
    const skills = [
      'C',
      'C++',
      'C#',
      'Docker',
      'Git',
      'Linux',
      'NodeJS',
      'React',
      'Vue',
      'Nuxt',
      'StyledComponents',
      'Emotion',
      'Tailwind',
      'PHP',
      'MySQL',
      '.NET',
      'Assembler',
      'Android',
      'NPM',
      'Python',
      'SSH',
      'MongoDB',
      'Rancher',
      'HAProxy',
      'Nginx',
      'Apache',
      'REST',
      'GraphQL',
      'OpenGL',
      'DirectX',
      'Java',
      'JavaScript',
      'SASS',
      'CSS',
      'HTML',
      'PWA',
      'IPTables',
      'Cisco IOS',
      'Debugging',
      'DNS',
      'TCP/IP',
      'SPA',
      'WebGL',
      'HTTP/2',
      'SSL',
      'ACSS',
      'KallistiOS',
      'Allegro',
      'Lua',
      'Ream',
      'Longboard',
      'Snowboard',
      'Airsoft',
      'Photography',
      'Eating',
      'Gaming',
      'Google Cloud',
      'Azure',
      'Kubernetes',
      'NDK',
    ].sort()
    return {
      skills: skills,
      randomQuote: ['TODO:QUOTE_HERE'].sort(_ => Math.random() - Math.random()).pop()
    }
  }
}
</script>

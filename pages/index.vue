<template>
  <div class="container mx-auto">
    <div>
      <ImageSection src="DSC01157.jpg" large>
        <ImageText class="hidden md:block md:text-right">
          <Logo tag="h1" class="text-2xl lg:text-5xl" />
        </ImageText>
      </ImageSection>

      <TextSection>
        <template slot="heading">
          Hello!
        </template>
        <p>
          My name is Gustav Larsson and I'm a <span class="font-bold text-primary">programmer</span>.
          I can <span class="font-bold text-primary">code</span>
          pretty much anything and I'm currently working as a
          <span class="font-bold text-primary">full-stack web-developer</span>.
        </p>
      </TextSection>

      <ImageSection src="DSC01106.jpg">
        <ImageText class="hidden md:block text-center">
          <div class="text-xl lg:text-2xl">
            "{{quoteText}}"
          </div>
          <div class="mt-2 text-right text-grey-darker text-lg lg:text-lg">
            - {{quoteAuthor}}
          </div>
        </ImageText>
      </ImageSection>

      <TextSection>
        <template slot="heading">
          Skills
        </template>
        <div class="flex flex-wrap -mx-1">
          <div
            v-for="skill in skills"
            :key="skill"
            class="text-white bg-primary p-2 m-1"
          >
            {{ skill }}
          </div>
        </div>

      </TextSection>

      <ImageSection src="DSC01141.jpg">
        <ImageText tag="a" class="text-center" :attrs="{class:'transition hover:text-primary', href:'mailto:hi@larsson.gg'}">
          hi@larsson.gg
        </ImageText>
      </ImageSection>
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
    const quote = [
      'Live today, for tomorrow it will all be history. - Anonymous',
      'If you don’t build your dream someone will hire you to help build theirs. - Tony Gaskins',
      'Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs',
      'The most common form of despair is not being who you are. - Søren Kierkegaard',
    ].sort(_ => Math.random() - Math.random()).pop().split('-').map(str => str.trim())
    return {
      skills: skills,
      quoteText: quote[0],
      quoteAuthor: quote[1]
    }
  }
}
</script>

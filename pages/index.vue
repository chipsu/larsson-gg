<template>
  <div class="container mx-auto">
    <div>
      <ImageSection image_url="DSC01157.jpg">
        <div class="text-center md:text-right">
          <div
            class="inline-block px-8 py-4 mx-8"
            style="background:rgba(255,255,255,.75)"
          >
            <Logo
              tag="h1"
              class="text-2xl lg:text-5xl leading-none"
            />
          </div>
        </div>
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
        <div class="text-center">
          <div
            class="inline-block px-8 py-4 mx-8"
            style="background:rgba(255,255,255,.75)"
          >
            <span class="text-2xl lg:text-5xl uppercase font-bold text-red">
              TODO:QUOTE_HERE
            </span>
          </div>
        </div>
      </ImageSection>

      <TextSection>
        <h2 class="text-2xl lg:text-5xl font-bold text-red uppercase leading-none mb-4">
          Skills
        </h2>
        <!-- Lorem ipsum dolor sit amet. <span class="font-bold text-red">programming</span>
        <span class="font-bold text-red">idéas and solutions</span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus laboriosam repudiandae dolorum quo ratione quia, ipsam sunt. Quia, esse incidunt.
        <h3 class="text-red">List of technoligies and buzzwords</h3> -->
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
        <div class="text-center">
          <div
            class="inline-block px-8 py-4 mx-8"
            style="background:rgba(255,255,255,.75)"
          >
            <a
              class="text-2xl lg:text-5xl uppercase font-bold text-red no-underline"
              href="mailto:hello@larsson.gg"
            >
              hello@larsson.gg
            </a>
          </div>
        </div>
      </ImageSection>

      <!-- <TextSection>
        <h2 class="text-2xl lg:text-5xl font-bold text-red uppercase leading-none mb-4">
          Still reading!?
        </h2>
        Info about this site,
        Nuxt, vue, tailwind, static, pagespeed,
        VSCode - Git push - Travis - Test - Docker build - Testrun - Rancher deploy - Live check - Commit - Cloudflare - UptimeRobot
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

export default {
  components: {
    Logo,
    TextSection,
    ImageSection
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
      'Gaming'
    ].sort()
    return {
      skills: skills
    }
  },
  methods: {
    squareStyle(x, y) {
      const xx = ((4 - x) * 0.75) / 4
      const zz = (4 - x) * 0.15
      return {
        left: x * 2 + 'rem',
        top: y * 2 + 'rem',
        zIndex: 1,
        opacity: xx + Math.random() * zz
      }
    }
  }
}
</script>

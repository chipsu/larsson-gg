<template>
  <div class="container mx-auto">
    <ImageSection src="DSC00499.JPG">
      <ImageText>
        Laboratory
      </ImageText>
    </ImageSection>
    <TextSection>
      <div class="flex flex-wrap">
        <div v-for="item in items" :key="item.link" class="p-2 w-1/2 md:w-1/4">
          <nuxt-link :to="item.link" class="transition flex bg-grey hover:bg-grey-light relative text-primary p-4 h-32 justify-center items-center">
            <div>
              <div class="flex p-2 items-center justify-center font-bold text-lg">
                {{ item.title }}
              </div>
              <div class="flex p-2 items-center justify-center -mx-1">
                <span v-for="tag in item.tags" :key="tag" class="bg-white rounded-full px-2 py-1 mx-1">
                  {{ tag }}
                </span>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </TextSection>
  </div>
</template>

<script>
import ImageSection from '~/components/ImageSection'
import TextSection from '~/components/TextSection'
import ImageText from '~/components/ImageText'

export default {
  components: {
    ImageSection,
    TextSection,
    ImageText
  },
  data() {
    return {
      items: [
        { link: 'imagemesh/', 'title': 'ImageMesh', 'tags': ['WebGL', 'Vue'] },
        { link: 'Test1', 'title': 'Test1', 'tags': ['C++'] },
        { link: 'Test2', 'title': 'Test2', 'tags': ['C++'] },
        { link: 'Test3', 'title': 'Test3', 'tags': ['C++'] },
        { link: 'Test4', 'title': 'Test4', 'tags': ['C++'] },
        { link: 'Test5', 'title': 'Test5', 'tags': ['C++'] },
      ]
    }
  }
}
</script>

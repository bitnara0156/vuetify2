<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        <v-tooltip right>
          <template #activator="{ on }">
            <v-btn icon large href target="_blank" v-on="on">
              <v-icon large>mdi-code-tags</v-icon>
            </v-btn>
          </template>
          <span>Source</span>
        </v-tooltip>
        <theCarousel/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import theCarousel from "@/components/theCarousel.vue";

export default {
  components: {
    theCarousel
  },
  head() {
    return {
      title: "Event Listing"
    };
  }
};
</script>


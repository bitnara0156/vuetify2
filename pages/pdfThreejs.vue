<template>
  <v-container>
    <v-row>
      <v-col class="mr-4">
        <v-row>
          <h1>1 - PDFjs</h1>
        </v-row>
        <v-row>
          <v-toolbar dense color="grey lighten-3">
            <v-btn-toggle dense group>
              <v-btn @click="prevPage">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-btn @click="nextPage">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-btn-toggle>
            <v-text-field v-model.number="page" style="width: 1em"/>
            /{{numPages}}
            <v-spacer></v-spacer>
            <v-btn-toggle dense group>
              <v-btn @click="rotate -= 90" text>
                <v-icon>mdi-rotate-left-variant</v-icon>
              </v-btn>
              <v-btn @click="rotate += 90" text>
                <v-icon>mdi-rotate-right-variant</v-icon>
              </v-btn>
              <v-btn @click="$refs.pdf.print()" text>
                <v-icon>mdi-camera-plus</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-toolbar>
        </v-row>
        <v-row>
          <div style="width: 100%" elevation="4">
            <div
              v-if="loadedRatio > 0 && loadedRatio < 1"
              style="background-color: green; color: white; text-align: center"
              :style="{ width: loadedRatio * 100 + '%' }"
            >{{ Math.floor(loadedRatio * 100) }}%</div>
            <client-only placeholder="Loading...">
              <pdf
                id="pdfviewer"
                v-if="show"
                class="pdf"
                style="border: 2px solid"
                src="/example.pdf"
                :page="page"
                :rotate="rotate"
                @password="password"
                @progress="loadedRatio = $event"
                @error="error"
                @num-pages="numPages = $event"
                @link-clicked="page = $event"
              ></pdf>
            </client-only>
          </div>
          <div id="canvascreate"></div>
        </v-row>
      </v-col>
      <v-col class="ml-4">
        <v-row>
          <h1>2 - Three.js</h1>
          <v-btn text @click="copy">copy</v-btn>
          <v-btn text id="cuberBtn">Create cube</v-btn>
        </v-row>
        <v-row>
          <v-card id="ThreeCanvas" elevation="4">
            <ThreeComponent/>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ThreeComponent from "@/components/ThreeComponent.vue";
import PDFDocument from "@/components/PDFDocument.vue";

export default {
  components: { ThreeComponent, PDFDocument },
  data: () => ({
    url: "/example.pdf",
    scale: 2.5,
    show: true,
    loadedRatio: 0,
    page: 1,
    currentPage: 0,
    numPages: 0,
    rotate: 0
  }),
  mounted() {},
  methods: {
    password: function(updatePassword, reason) {
      updatePassword(prompt('password is "test"'));
    },
    error: function(err) {
      console.log(err);
    },
    prevPage() {
      this.page = this.page - 1;
    },
    nextPage() {
      this.page = this.page + 1;
    },
    copy() {
      //create a new canvas
      var newCanvas = document.createElement("canvas");
      var context = newCanvas.getContext("2d");
      var oldCanvas = document.getElementsByTagName("canvas")[0];

      //set dimensions
      newCanvas.width = oldCanvas.width;
      newCanvas.height = oldCanvas.height;

      //apply the old canvas to the new one
      context.drawImage(oldCanvas, 0, 0);

      //return the new canvas
      document.getElementById("copypdf").appendChild(newCanvas);
    }
  }
};
</script>

<style>
</style>

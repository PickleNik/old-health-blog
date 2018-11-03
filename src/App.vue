<template>
  <v-app dark>
    <v-container fluid class="px-2 py-4">
      <v-layout row wrap>
        <v-flex xs12 sm12 class="text-xs-center hidden-md-and-up">
          <v-layout column>
            <h1 id="title" class="grey--text mb-3">Health Fair Blog</h1>
            <a class="my-3" href="https://nikita-krupin.firebaseapp.com"><img id="face" src="./assets/me.jpg" style="width:15em; height:15em; border-radius:100%;"/></a>
            <span id="info"><h2>Nikita Krupin</h2></span>
            <span v-if="status">user: {{ this.user.name }}</span>
            <v-tooltip bottom color="pink" v-if="!status"><span class="text--text">Log in with Google</span><v-btn large slot="activator" color="pink" fab flat id="b1" @click="GoogleSignIn" :loading="loading"><v-icon large>fab fa-google</v-icon></v-btn></v-tooltip>
            <v-btn round color="pink" @click="SignOut" v-if="status">Log out</v-btn>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md9 lg10>
          <v-layout column>
            <v-flex v-for="p in posts" :key="p.id" :id="p.id" class="post ma-2 px-3 pt-4 round grey darken-4">
              <v-layout row>
                <h1 class="grey--text pt-3">{{ p.title }}</h1>
                <v-spacer></v-spacer>
                <social-sharing inline-template
                  :url="'https://health-fair.firebaseapp.com#' + p.id"
                  :title="p.title"
                  description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                  hashtags="healthfair, mdma, ecstasy, molly">
                <v-speed-dial v-model="p.fab" direction="left" :open-on-hover="true" transition="slide-x-reverse-transition">
                  <v-btn slot="activator" v-model="p.fab" dark fab depressed >
                    <v-icon>share</v-icon>
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-btn fab dark small color="grey">
                    <v-icon>faa fa-copy</v-icon>
                  </v-btn>
                  <v-btn fab dark small color="light-blue">
                    <network network="twitter">
                      <v-icon>fab fa-twitter</v-icon>
                    </network>
                  </v-btn>
                  <v-btn fab dark small color="blue">
                    <network network="facebook">
                      <v-icon>fab fa-facebook-f</v-icon>
                    </network>
                  </v-btn>
                  <v-btn fab dark small color="blue darken-1">
                    <network network="linkedin">
                      <v-icon>fab fa-linkedin-in</v-icon>
                    </network>
                  </v-btn>
                  <v-btn fab dark small color="green">
                    <network network="whatsapp">
                      <v-icon>fab fa-whatsapp</v-icon>
                    </network>
                  </v-btn>
                  <v-btn fab dark small color="pink">
                    <network network="pinterest">
                      <v-icon>fab fa-pinterest-p</v-icon>
                    </network>
                  </v-btn>
                  <v-btn fab dark small color="red">
                    <network network="googleplus">
                      <v-icon>fab fa-google-plus-g</v-icon>
                    </network>
                  </v-btn>
                </v-speed-dial>
                </social-sharing>
              </v-layout>
              <v-divider></v-divider>
              <div class="round"><iframe v-if="p.video" :src="p.video" style="width:100%; height: 40vw;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>
              <p class="py-2" style="font-size: 1.3em;">{{ p.text }}</p>
              <v-text-field color="amber" placeholder="Comment" style="border-radius: 3em;" background-color="grey darken-4" solo prepend-inner-icon="comment" append-icon="send"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md3 lg2 class="text-xs-center hidden-sm-and-down">
          <v-layout column style="position: fixed; right: 3em;">
            <h1 id="title" class="grey--text mb-3">Health Fair Blog</h1>
            <a class="my-3" href="https://nikita-krupin.firebaseapp.com"><img id="face" src="./assets/me.jpg" style="width:15em; height:15em; border-radius:100%;"/></a>
            <span id="info"><h2>Nikita Krupin</h2></span>
            <span v-if="status">user: {{ this.user.name }}</span>
            <v-tooltip bottom color="pink" v-if="!status"><span class="text--text">Log in with Google</span><v-btn large slot="activator" color="pink" fab flat id="b1" @click="GoogleSignIn" :loading="loading"><v-icon large>fab fa-google</v-icon></v-btn></v-tooltip>
            <v-btn round color="pink" @click="SignOut" v-if="status">Log out</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data () {
    return {
      status: false,
      posts: [
        { title: 'Post1', fab: false, id: '1', text: '3,4-Methyl​enedioxy​methamphetamine, commonly known as ecstasy, is a psychoactive drug primarily used as a recreational drug. The desired effects include altered sensations and increased energy, empathy, and pleasure. When taken by mouth, effects begin after 30–45 minutes and last 3–6 hours.' },
        { title: 'Post2', fab: false, id: '2' },
        { title: 'Post3', fab: false, id: '3', video: 'https://www.youtube.com/embed/jEAr7ThsYew' }
      ]
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.status = true
      } else this.status = false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    GoogleSignIn () {
      this.$store.dispatch('userProvider', new firebase.auth.GoogleAuthProvider())
      .then(this.status = true)
    },
    SignOut () {
      this.$store.dispatch('SignOut')
    }
  }
}
</script>

<style media="screen">
@import url('https://fonts.googleapis.com/css?family=Quicksand');
*{
  font-family: 'Quicksand', sans-serif;
}
.v-input__slot {
  border-radius: 2em;
}
.round{
  border-radius: 3em;
}
::-webkit-scrollbar{
  width: 0;
}
::selection{
  background:transparent;
  color:#eee;
}
@keyframes rollIn {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

#title {
  animation: fadeInDown .5s ease 1;
}
#info{
  opacity: 0;
  animation: fadeInDown .5s .3s ease 1 forwards;
}
#face{
  animation: rollIn .5s ease 1;
  transition-duration: .5s;
  transition-property: all;
  z-index: 10;
}
#face:hover{
  transform: scale(1.1);
}
.post{
  opacity:0;
  animation: fadeInUp .5s ease 1 forwards;
}
.post:nth-child(1){
  animation-delay: .5s;
}
.post:nth-child(2){
  animation-delay: .7s;
}
.post:nth-child(3){
  animation-delay: .9s;
}
</style>

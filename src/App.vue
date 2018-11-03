<template>
  <v-app dark>
    <v-container fluid class="pa-0 head">
      <v-flex md3 lg2 class="zoom hidden-sm-and-down pa-4" style="position:fixed; z-index: 100; left:0; top:0;">
        <v-layout column>
          <a v-for="nav in navs" :key="nav.name" href="#" v-scroll-to="{el:nav.href, offset: nav.offset}">
            <v-btn small round flat class="ma-0 pr-2 link link--kukuri" style="text-shadow: 0 0 1em 1em #fff;">
              <v-icon left class="pink--text">{{ nav.icon }}</v-icon>
              {{ nav.name }}
              <v-icon class="pb-1">{{ nav.posticon }}</v-icon>
            </v-btn>
          </a>
        </v-layout>
      </v-flex>
      <v-flex md3 lg2 class="zoom hidden-sm-and-down pa-4" style="position:fixed; z-index: 100; right:0; top:0;">
        <span v-if="status">user: {{ this.user.name }}</span>
        <v-tooltip bottom color="pink" v-if="!status"><span class="text--text">Log in with Google</span><v-btn large slot="activator" color="pink" fab flat id="b1" @click="GoogleSignIn" :loading="loading"><v-icon large>fab fa-google</v-icon></v-btn></v-tooltip>
        <v-btn round color="pink" @click="SignOut" v-if="status">Log out</v-btn>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs12 sm12 class="text-xs-center" style="height: 100vh;">
          <v-layout column>
            <h1 id="title" class="white--text my-3">Health Fair Blog</h1>
            <a class="my-5" href="https://nikita-krupin.firebaseapp.com"><img id="face" src="./assets/me.jpg"></a>
            <span id="info"><i>by</i><h1>Nikita Krupin</h1></span>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md6 offset-md3 lg8 offset-lg2 style="margin-top: -20vh;">
          <v-layout column>
            <v-flex v-for="p in posts" :key="p.id" :id="p.id" class="post ma-2 px-3 pt-4 round grey darken-4">
              <v-layout row class="px-3">
                <h1 class="grey--text mx-auto pt-3">{{ p.title }}</h1>
                <social-sharing inline-template
                  :url="'https://health-fair.firebaseapp.com#' + p.id"
                  :title="p.title"
                  description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                  hashtags="healthfair, mdma, ecstasy, molly">
                <v-speed-dial top right v-model="p.fab" direction="bottom" :open-on-hover="true" transition="slide-y-transition" >
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
              <iframe v-if="p.video" :src="p.video" class="round" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              <p class="py-2 text-xs-justify" style="font-size: 1.3em;">{{ p.text }}</p>
              <v-text-field color="amber" placeholder="Comment" background-color="grey darken-3" solo prepend-inner-icon="comment" append-icon="send"></v-text-field>
            </v-flex>
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
      direction: 'bottom',
      status: false,
      posts: [
        { title: 'Post1', fab: false, id: '1', text: '3,4-Methyl​enedioxy​methamphetamine, commonly known as ecstasy, is a psychoactive drug primarily used as a recreational drug. The desired effects include altered sensations and increased energy, empathy, and pleasure. When taken by mouth, effects begin after 30–45 minutes and last 3–6 hours.' },
        { title: 'Post2', fab: false, id: '2' },
        { title: 'Post3', fab: false, id: '3', video: 'https://www.youtube.com/embed/jEAr7ThsYew' }
      ],
      navs: [
        { name: 'Home ', href: '#head', icon: 'home' },
        { name: 'Post 1 ', href: '#1', icon: 'info' },
        { name: 'Post 2 ', href: '#2', icon: 'link' },
        { name: 'Post 3 ', to: '#3', icon: 'video_library' },
        { name: 'Post 4 ', to: '#4', icon: 'library_books' }
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
a {
  text-decoration:none;
}
.v-input__slot {
  border-radius: 2em !important;
}
.head{
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.head::before{
  content: "";
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-image: url('https://i.pinimg.com/originals/e3/a6/4f/e3a64fe6ec8533b097c5708a19a00d10.jpg');
  background-attachment: fixed;
  background-repeat: repeat;
  filter: brightness(30%);
}
.link {
  text-decoration: none;
  position: relative;
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
  font-size: 3em;
  opacity: 0;
  animation: fadeInDown .5s 1s ease 1 forwards;
}
#info{
  opacity: 0;
  animation: fadeInDown .5s .5s ease 1 forwards;
}
#face{
  opacity: 0;
  height: 30vh;
  width: 30vh;
  border-radius: 10em;
  animation: rollIn 1s ease 1 forwards;
  transition-duration: .5s;
  transition-property: all;
  z-index: 10;
}
#face:hover{
  transform: scale(1.1);
}
.post{
  opacity:0;
  animation: fadeInUp 1.5s ease 1 forwards;
}
.post:nth-child(1){
  animation-delay: 1.5s;
}
.post:nth-child(2){
  animation-delay: 1.7s;
}
.post:nth-child(3){
  animation-delay: 1.9s;
}
/* Kukuri */
.link--kukuri {
  text-transform: uppercase;
  font-weight: 900;
  overflow: hidden;
  line-height: 0.75;
  color: var(--text);
}

.link--kukuri:hover {
  color: var(--accent);
}

.link--kukuri::after {
  content: '';
  position: absolute;
  height: 6px;
  width: 100%;
  top: 50%;
  margin-top: -4px;
  right: 0;
  background: var(--accent);
  border-radius:1em;
  -webkit-transform: translate3d(-111%,0,0);
  transform: translate3d(-111%,0,0);
  -webkit-transition: -webkit-transform 0.4s;
  transition: transform .3s;
  -webkit-transition-timing-function: cubic-bezier(0.7,0,0.3,1);
  transition-timing-function: cubic-bezier(0.7,0,0.3,1);
}

.link--kukuri:hover::after {
  -webkit-transform: translate3d(100%,0,0);
  transform: translate3d(100%,0,0);
}
.link--kukuri:hover::before {
  width: 100%;
}
</style>

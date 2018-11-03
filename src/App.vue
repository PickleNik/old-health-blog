<template>
  <v-app dark class="head">
    <v-container fluid class="app">
      <v-flex md3 lg2 class="zoom hidden-sm-and-down pa-4" style="position:fixed; z-index: 100; left:0; top:0;">
        <v-layout column>
          <a v-for="nav in navs" :key="nav.name" href="#" v-scroll-to="{el: nav.href, offset: -50}">
            <v-btn small round flat class="ma-0 pr-2 link link--kukuri">
              <v-icon left class="pink--text">{{ nav.icon }}</v-icon>
              {{ nav.name }}
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
        <v-flex xs12 sm12 class="text-xs-center mb-5">
          <v-layout column>
            <h1 id="title" class="white--text mt-5">Health Fair Blog</h1>
            <a class="mt-5" href="https://www.linkedin.com/in/picklenik/"><img id="face" src="./assets/me.jpg"></a>
            <span id="info"><i><h2> by Nikita Krupin</h2></i>
            Junior @ WJHS</span>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md6 offset-md3 lg8 offset-lg2 class="post">
          <v-layout column>
            <v-flex v-for="p in posts" :key="p.id" :id="p.id" class="my-4 px-4 round black">
              <v-layout row class="py-4 pl-4">
                <span class="grey--text pt-3" style="font-size: 2em; font-family: 'Indie Flower', sans-serif;">{{ p.title }}</span>
                <v-spacer></v-spacer>
                <social-sharing inline-template
                  :url="'https://health-fair.firebaseapp.com#' + p.id"
                  :title="p.title"
                  hashtags="healthfair, mdma, ecstasy, molly">
                <v-speed-dial v-model="p.fab" direction="left" :open-on-hover="true" transition="slide-y-transition" >
                  <v-btn slot="activator" v-model="p.fab" style="position: sticky;" dark fab depressed >
                    <v-icon>share</v-icon>
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-btn fab dark small color="grey" class="hidden-sm-and-down" v-clipboard:copy="'https://health-fair.firebaseapp.com#' + p.id">
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
                  <v-btn fab dark small color="blue darken-1" class="hidden-sm-and-down">
                    <network network="linkedin">
                      <v-icon>fab fa-linkedin-in</v-icon>
                    </network>
                  </v-btn>
                  <v-btn fab dark small color="green" class="hidden-md-and-up">
                    <network network="whatsapp">
                      <v-icon>fab fa-whatsapp</v-icon>
                    </network>
                  </v-btn>
                  <v-btn fab dark small color="pink" class="hidden-sm-and-down">
                    <network network="pinterest">
                      <v-icon>fab fa-pinterest-p</v-icon>
                    </network>
                  </v-btn>
                  <v-btn fab dark small color="red" class="hidden-sm-and-down">
                    <network network="googleplus">
                      <v-icon>fab fa-google-plus-g</v-icon>
                    </network>
                  </v-btn>
                </v-speed-dial>
                </social-sharing>
              </v-layout>
              <v-divider></v-divider>
              <v-flex v-if="p.video" class="pt-2 video"><iframe :src="p.video" id="videoframe" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></v-flex>
              <p v-if="p.text" class="pt-2 px-2 text-xs-justify" style="font-size: 1.5em;">{{ p.text }}</p>
              <a v-if="p.links" v-for="link in p.links" :key="link.title" :href="link.href" target="_blank"><v-btn small round flat class="link link--kukuri"><v-icon left class="pink--text">link</v-icon>{{ link.title }}</v-btn></a>
              <v-text-field class="pt-4" color="pink" placeholder="Comment" background-color="grey darken-3" solo prepend-inner-icon="comment" append-icon="send"></v-text-field>
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
        {
          title: 'What is Molly',
          fab: false,
          id: 'post1',
          text: '3,4-Methyl​enedioxy​methamphetamine(or MDMA), commonly known as ecstasy, is a psychoactive drug primarily used as a recreational drug. The desired effects include altered sensations and increased energy, empathy, and pleasure. When taken by mouth, effects begin after 30–45 minutes and last 3–6 hours.',
          links: [
            { title: 'Outline', href: 'https://docs.google.com/document/d/1iZa7Gf0W3FIoVVw-vEPF_gbyCfb3pTEAJkVRuuvI--A/edit?usp=sharing' }
          ]
        },
        {
          title: 'Quiz',
          fab: false,
          id: 'post2',
          text: 'Tip of the day: Ecstasy, in fact, is a term for Molly which has been chemically altered with other additives, such as amphetamine, caffeine etc.',
          links: [
            { title: 'Quiz', href: 'https://www.justthinktwice.gov/quiz/quiz-ecstasy-and-mdma' },
            { title: 'Source 1', href: 'https://www.drugabuse.gov/publications/drugfacts/mdma-ecstasymolly' },
            { title: 'Source 2', href: 'https://teens.drugabuse.gov/drug-facts/mdma-ecstasy-or-molly' },
            { title: 'Source 3', href: 'https://abovetheinfluence.com/drugs/mdma/' }
          ]
        },
        {
          title: 'Video',
          fab: false,
          id: 'post3',
          video: 'https://www.youtube.com/embed/jEAr7ThsYew'
        },
        {
          title: 'Article',
          fab: false,
          id: 'post4'
        }
      ],
      navs: [
        { name: 'Creator', href: '#title', icon: 'assignment_ind' },
        { name: 'About', href: '#post1', icon: 'assignment' },
        { name: 'Quiz', href: '#post2', icon: 'assignment_turned_in' },
        { name: 'Video', href: '#post3', icon: 'video_library' },
        { name: 'Article', hrey: '#post4', icon: 'library_books' }
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
@import url('https://fonts.googleapis.com/css?family=Permanent+Marker');
@import url('https://fonts.googleapis.com/css?family=Indie+Flower');
*{
  font-family: 'Quicksand', sans-serif;
}
html{
  background: black;
}
body{
  background: black;  
}
a {
  text-decoration: none !important;
}
.v-input__slot {
  border-radius: 2em !important;
}
.video {
  z-index: 9;
	position: relative;
	padding-bottom: 56.25%; /* 16:9 */
	padding-top: 25px;
	height: 0;
}
.video iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
html{
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: 100vh;
}
.head{
  position: relative;
}
.head::before{
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url('https://i.pinimg.com/originals/e3/a6/4f/e3a64fe6ec8533b097c5708a19a00d10.jpg');
  background-attachment: fixed;
  background-repeat: repeat;
  filter: brightness(30%);
}
.round{
  border-radius: 3em;
}
::-webkit-scrollbar{
  width: 0;
}
::selection{
  background:transparent;
  color: pink;
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
@keyframes lightSpeedIn {
  from {
    transform: translate3d(100%, 0, 0) skewX(-30deg);
    opacity: 0;
  }

  60% {
    transform: skewX(20deg);
    opacity: 1;
  }

  80% {
    transform: skewX(-5deg);
    opacity: 1;
  }

  to {
    transform: none;
    opacity: 1;
  }
}
#title {
  font-family: 'Indie Flower', sans-serif;
  font-size: 3em;
  opacity: 0;
  animation: fadeInDown 1s ease 1 forwards;
}
#face{
  opacity: 0;
  height: 30vh;
  width: 30vh;
  border-radius: 100%;
  animation: rollIn 1s 0.5s ease 1 forwards;
}
#info{
  opacity: 0;
  animation: lightSpeedIn 1s 1s ease 1 forwards;
}
.post{
  opacity:0;
  animation: fadeInUp 1s 1.5s ease 1 forwards;
}
.zoom{
  opacity:0;
  animation: zoomIn 1s 2s ease 1 forwards;
}
.link {
  text-decoration: none;
  position: relative;
}
/* Kukuri */
.link--kukuri {
  text-transform: uppercase;
  font-weight: 900;
  overflow: hidden;
  line-height: 0.75;
  color: white;
}

.link--kukuri:hover {
  color: #ea4964;
}

.link--kukuri::after {
  content: '';
  position: absolute;
  height: 6px;
  width: 100%;
  top: 50%;
  margin-top: -4px;
  right: 0;
  background: #ea4964;
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

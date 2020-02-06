<template>
  <div id="main">
      <router-link to="/" activeClass="active" exact>
      <a  :class="[currentPage.includes('home') ? activeClass : '']"
      class="link">
      Calculator
      </a>
      </router-link>
      <router-link to="/narcissistic" activeClass="active" exact>
      <a :class="[currentPage.includes('narcissistic') ? activeClass : '']"
      class="link">Narcissistic
      </a>
      </router-link>
    <div id="app">
    <div>
      <transition name="flip" mode="out-in">
        <router-view/>
      </transition>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeClass: 'active',
    };
  },
  computed: {
    currentPage() {
      return this.$route.name;
    },
  },
};
</script>
<style>
body {
  background-color: #4AAE9B;
}
#main {
  text-align: center;
  margin-top: 1rem;
}
#app {
  margin-top: 1rem;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  text-decoration: none;
}
.link {
  margin-top: 1rem;
  color: black;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
  background-color: white;
  filter: brightness(95%);
  box-shadow: 0px 0px 0px 0px black;
}
.link:hover {
  filter: brightness(95%)
}
.active {
  background-color: #4AAE9B;
  filter: brightness(95%);
  color: black;
  transition: all 0.5s;
  box-shadow: 5px 5px 10px 1px black;
  cursor: not-allowed;
}
.flip-enter-active {
  animation: flip-in 0.5s ease-out forwards

}
.flip-leave-active {
  animation: flip-out 0.5s ease-out forwards;
}

@keyframes flip-in {
   from{
    transform: rotateY(90deg)
  }
  to {
    transform: rotateY(0deg)
  }
}

@keyframes flip-out {
  from{
    transform: rotateY(0deg)
  }
  to {
    transform: rotateY(90deg)
  }
}

</style>

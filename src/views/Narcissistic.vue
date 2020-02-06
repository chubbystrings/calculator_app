<template>
  <div class="about">
    <h3>Narcissitic Number Checker</h3>
    <input type="number" v-model="value" @focus="message = ''">
    <transition name="fade" appear>
    <p v-if="message">{{message}}</p>
     </transition>
    <button @click="narcissistic" class="checkBtn">{{checkValue}}</button>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      value: '',
      message: '',
    };
  },

  mounted() {
    if (this.calculatorChecker) {
      this.checkNars(this.calculatorChecker);
    }
  },
  computed: {
    ...mapState({
      calculatorChecker: 'valueToCheck',
    }),
    checkValue() {
      return this.value ? 'Check' : 'Enter A number';
    },
  },
  methods: {
    checkNars(value) {
      // covert number to object and sum up
      const newNumber = value.split('');
      let arrSum = newNumber.reduce((a, b) => a + b, 0);
      arrSum = Number(arrSum);
      // console.log(arrSum);

      let num = 0;
      // Loop through string and raise each value to the power of length of string
      for (let i = 0; i < newNumber.length; i += 1) {
        num += newNumber[i] ** newNumber.length;
      }
      // console.log(num);
      // condition to validate narcissistic number
      if (num === arrSum) {
        this.message = `Nice, ${value} is a Narcissistic Number!!`;
      } else {
        this.message = `Oops, ${value} is not a Narcissistic Number!!`;
      }

      this.value = '';
      return true;
    },
    narcissistic() {
      // validate the input
      if (!this.value) {
        this.message = 'Invalid Input Please enter a number!';
        return false;
      }

      return this.checkNars(this.value);
    },
  },
};
</script>
<style scoped>
.about {
    background-color: #4AAE9B;;
    box-shadow: 10px 20px 20px 5px black;
    height: 35rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    width: 20rem;
    filter: brightness(70%);
}

 .about input {
    margin: 0 auto;
    font: inherit;
    width: 80%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 20px;
  }

  .about input:focus {
    outline: none;
    border: 1px solid #4AAE9B;
    background-color: #eee;
  }

.checkBtn {
  position: absolute;
  left: 5rem;
  top: 10rem;
  background-color: white;
  color: #4AAE9B;
  font: inherit;
  border: 2px solid #4AAE9B;
  padding: 16px;
  cursor: pointer;
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  box-shadow: 5px 3px 20px 5px #888888;
  animation: shadow-pulse 1s infinite;
  outline: none !important;
}

.checkBtn:hover {
    background-color: #050144;
    color: white;
    cursor: pointer;
    box-shadow: 0 0.4rem 1.4rem 0 white;
    transform: translateY(-0.1rem);
    transition: transform 150ms;
    outline: none !important;
}


.fade-enter {
  opacity: 0
}
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}


h3 {
  color: black;
  font-weight: bolder;
}
p {
  color: black;
  font-weight: bolder;
}


 @keyframes shadow-pulse
  {
    0% {
        box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
    }
    100% {
        box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
    }
  }
</style>

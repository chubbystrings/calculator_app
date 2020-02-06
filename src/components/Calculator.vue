
<template>
    <div id="calculator" ref="calculator" class="calculator">
        <h3>Calculator</h3>
         <div class="calculator__display">
          <p id="display">0</p>
          <small v-if="keyPressed">{{keyPressed}}</small>
         </div>

            <div class="calculator__keys">
                <button @click="buttonClick" data-action="add" class=" rounded">+</button>
                <button @click="buttonClick" data-action="subtract" class=" rounded">
                -</button>
                <button @click="buttonClick" data-action="multiply" class=" rounded">
                &times;</button>
                <button @click="buttonClick" data-action="division" class=" rounded">&#247;</button>
                <button @click="buttonClick" class="rounded">7</button>
                <button @click="buttonClick" class="rounded">8</button>
                <button @click="buttonClick" class="rounded">9</button>
                <button @click="buttonClick" class="rounded">4</button>
                <button @click="buttonClick" class="rounded">5</button>
                <button @click="buttonClick" class="rounded">6</button>
                <button @click="buttonClick" class="rounded">1</button>
                <button @click="buttonClick" class="rounded">2</button>
                <button @click="buttonClick" class="rounded">3</button>
                <button @click="buttonClick" class="rounded">0</button>
                <button @click="buttonClick" class="rounded" data-action="decimal">.</button>
                <button @click="buttonClick" class="rounded" data-action="clear">AC</button>
                <button @click="buttonClick" class="equals" data-action="equals">=</button>
                <button @click="buttonCheck" class="rounded">Check</button>
            </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      keyPressed: '',
    };
  },
  methods: {
    buttonCheck() {
      // eslint-disable-next-line no-useless-escape
      const char = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      const currentDisplay = document.getElementById('display').textContent;
      if (this.keyPressed) {
        let numberToCheck = this.keyPressed.includes('=') ? this.keyPressed.split('=')[1]
          : this.keyPressed;
        const joined = numberToCheck.split('');
        if (char.test(joined)) {
          numberToCheck = currentDisplay;
        }
        this.$store.dispatch('changeValueToCheck', numberToCheck);
      }
      return true;
    },
    calculate(n1, operator, n2) {
      const firstValue = parseFloat(n1);
      const secondValue = parseFloat(n2);

      if (operator === 'add') return firstValue + secondValue;
      if (operator === 'subtract') return firstValue - secondValue;
      if (operator === 'multiply') return firstValue * secondValue;
      if (operator === 'division') return firstValue / secondValue;
      return false;
    },

    buttonClick($event) {
      const key = $event.target;
      if (key.textContent && key.textContent !== 'CE') {
        this.keyPressed += ` ${key.textContent}`;
      } else {
        this.keyPressed = '';
      }
      const calculator = document.getElementById('calculator');
      const display = document.getElementById('display');
      const { action } = $event.target.dataset;
      const keyContent = $event.target.textContent;
      const displayNum = display.textContent;
      // eslint-disable-next-line prefer-destructuring
      const previousKeyType = calculator.dataset.previousKeyType;
      if (!action) {
        if (displayNum === '0' || previousKeyType === 'operator' || previousKeyType === 'equals') {
          display.textContent = keyContent;
        } else {
          display.textContent = displayNum + keyContent;
        }
        calculator.dataset.previousKeyType = 'number';
      }
      if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'division') {
        const { firstValue } = calculator.dataset;
        const { operator } = calculator.dataset;
        const secondValue = displayNum;

        if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'equals') {
          const calcValue = this.calculate(firstValue, operator, secondValue);
          display.textContent = calcValue;

          calculator.dataset.firstValue = calcValue;
        } else {
          calculator.dataset.firstValue = displayNum;
        }
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator = action;
      }

      if (action === 'decimal') {
        if (!displayNum.includes('.')) {
          if (previousKeyType === 'operator' || previousKeyType === 'equals') {
            display.textContent = '0.';
          } else {
            display.textContent = `${displayNum}.`;
          }
        }

        calculator.dataset.previousKeyType = 'decimal';
      }

      if (action === 'clear') {
        if (key.textContent === 'AC') {
          calculator.dataset.firstValue = '';
          calculator.dataset.modValue = '';
          calculator.dataset.operator = '';
          calculator.dataset.previousKeyType = '';
        } else {
          key.textContent = 'AC';
        }
        display.textContent = 0;
        calculator.dataset.previousKeyType = 'clear';
      }

      if (action !== 'clear') {
        const clearButton = document.querySelector('[data-action=clear]');
        clearButton.textContent = 'CE';
      }

      if (calculator.dataset.previousKeyType === 'clear') {
        calculator.dataset.firstValue = '';
        calculator.dataset.modValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = '';
        this.keyPressed = '';
      }

      if (action === 'equals') {
        let { firstValue } = calculator.dataset;
        const { operator } = calculator.dataset;
        let secondValue = displayNum;
        if (firstValue) {
          if (previousKeyType === 'equals') {
            firstValue = displayNum;
            secondValue = calculator.dataset.modValue;
          }
          display.textContent = this.calculate(firstValue, operator, secondValue);
          if (key.textContent === '=') {
            this.keyPressed += ` ${this.calculate(firstValue, operator, secondValue)}`;
          }
        }

        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = 'equals';
      }
    },
  },
};
</script>
<style scoped>
.calculator {
    background-color: #4AAE9B;
    box-shadow: 10px 20px 20px 5px black;
    height: 35rem;
    border-radius: 20px;
    width: 20rem;
}
.calculator__keys > *{
    background-color: white;
    position: relative;
    text-align: center;
}


/* .calculator__keys > * :active::before,
.calculator__keys > .is-depressed::before {
    background-color: rgba(0,0,0,0.2);
    bottom: 0;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5) inset;
    content:"";
    left: 0;
    opacity: 0.3;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;

} */


.calculator__display {
    background-color: #4AAE9B;
    padding: 1em 0.4em;
    text-align: right;
    color: white;
    height: 4em;
}

.calculator__keys {
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(4, 1fr);
    height: 26em;
    width: 19.3rem;
    margin: 0 auto;
}

.calculator__keys button {
    cursor: pointer;
    border: 1px solid #fff;
    background: #fff;
    color: black;
    font-weight: bolder;
    outline: none;
}

.calculator__keys button:hover {
  background-color: #4AAE9B;
}
.equals {
    width: 5.7em;
    grid-column: -2;
    grid-row: 2 / span 3;
}

.rounded {
    border-radius: 50%;
}

h3 {
  color:black ;
  font-weight: bolder;
}

.calculator__display p {
  position: relative;
  top: 0.1rem;
  right: 1rem;
}

.calculator__display small {
    position: relative;
    top: 0.5rem;
    right: 1rem;
    color: black;
    font-weight: bolder;
}
</style>

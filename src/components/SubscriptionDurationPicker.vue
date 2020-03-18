<template>
  <div v-if="data" class="subscription">
    <div class="wrapper-top">
      <div class="bordered-box offer">
        <div class="subheadline">
          <p>{{data.Plans[0].Months + ' ' + (data.Plans[0].Months > 0 ? 'Months' : 'Month')}}</p>
        </div>
        <div class="content">
          <p>
            <span class="large">$ {{data.Plans[0].MonthlyPrice}}</span>
            <br />
            <span>per month</span>
          </p>
        </div>
        <div class="content-three">
          <button class="button" @click="$emit('paddleCheckout', 0)">Subscribe</button>
        </div>
      </div>
      <div class="bordered-box offer-highlight">
        <div class="subheadline-highlight">
          <p>{{data.Plans[1].Months + ' ' + (data.Plans[1].Months > 0 ? 'Months' : 'Month')}}</p>
        </div>
        <div class="content-highlight">
          <p>
            <span class="large-highlight">$ {{data.Plans[1].MonthlyPrice}}</span>
            <br />
            <span class="highlight">per month</span>
          </p>
        </div>
        <div class="content-three-highlight">
          <button class="button-blue" @click="$emit('paddleCheckout', 1)">Subscribe</button>
        </div>
      </div>
      <div class="bordered-box offer">
        <div class="subheadline">
          <p>{{data.Plans[2].Months + ' ' + (data.Plans[2].Months > 0 ? 'Months' : 'Month')}}</p>
        </div>
        <div class="content">
          <p>
            <span class="large">$ {{data.Plans[2].MonthlyPrice}}</span>
            <br />
            <span>per month</span>
          </p>
        </div>
        <div class="content-three">
          <button class="button" @click="$emit('paddleCheckout', 2)">Subscribe</button>
        </div>
      </div>
    </div>
    <!-- wrapper top end -->
  </div>
</template>

<script>
import Paddle from "paddle";

export default {
  props: [
    "data"
  ],
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.view-subscription {
  margin: 30px;

  .bordered-box {
    border: 1px solid $purple;
    padding: 10px 25px;
    border-radius: 4px;
    min-width: 300px;
    width: calc(33% - 5px);

    &:nth-child(1) {
      height: 250px;
      margin-top: 35px;
    }

    &:nth-child(2) {
      min-width: 340px;
      height: 320px;
    }

    &:nth-child(3) {
      height: 250px;
      margin-top: 35px;
    }
  }

  .offer {
    background: $dark-1;
    flex-grow: 1;
    margin: 5px;
    padding: 0;
    text-align: center;
    max-width: 300px;

    &-highlight {
      @extend .offer;
      border: 1px solid $orange;
    }
  }
  .content {
    height: 125px;
    display: flex;
    justify-content: center;
    align-items: center;

    &-highlight {
      @extend .content;
      height: 150px;
      padding-top: 10px;
    }
  }

  .content-three {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    &-highlight {
      @extend .content-three;
      height: 100px;
    }
  }

  .wrapper-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  p {
    color: #fff;
    font-weight: 500;
  }

  .subheadline {
    display: flex;
    background-color: $dark-3;
    padding: 10px;
    margin: 0;
    width: 100%;
    height: 50px;
    border-radius: 4px 4px 0 0;
    p {
      align-self: center;
      color: $orange;
      font-size: 1.3rem;
      font-weight: 500;
      margin: 0 auto;
    }

    &-highlight {
      @extend .subheadline;
      background-color: $orange;
      height: 60px;

      p {
        color: #fff;
        font-size: 1.5rem;
        font-weight: 600;
      }
    }
  }

  p span {
    display: inline-block;
  }

  .large {
    font-size: 2rem;
    font-weight: 600;
    padding: 3px 0;
  }

  .large-highlight {
    font-size: 3rem;
    font-weight: 600;
    padding: 3px 0;
  }

  .highlight {
    font-size: 1.2rem;
  }

  .button {
    min-width: 160px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    border-radius: 10px;
    padding: 0.75em 1.785em 0.75em 1.785em;
    background-color: $green-2;
    border: 1px solid $green;
    line-height: 1;
    cursor: pointer;
    
    &-blue {
      @extend .button;
      min-width: 200px;
      font-size: 20px;
      font-weight: 800;
      padding: 0.75em 1.9em 0.75em 1.9em;
      color: #fff;
      background-color: $green-2;
      border: 1px solid $green;
    }
  }
}
</style>
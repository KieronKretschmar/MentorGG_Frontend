<template>
  <div v-if="data" class="subscription-duration-picker">
    <div class="plans">
      <div class="plan" v-for="(plan, index) in data.Plans" :key="plan.ProductId">
        <div class="header">{{ `${plan.Months} Month${plan.Months > 1 ? 's' : ''}` }}</div>
        <div class="price-tag">
          <span class="price">{{ plan.MonthlyPrice }}</span>/ month
        </div>
        <div class="save-value">
          <span
            v-if="GetTotalMoneySaved(index) > 0"
          >Save a total of ${{ GetTotalMoneySaved(index) }}</span>
        </div>
        <div class="subscribe-button">
          <button class="button-variant-bordered upgrade" @click="$emit('picked', index)">Subscribe</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paddle from "paddle";

export default {
  props: ["data"],
  mounted() {
    console.log(this.data);
  },
  methods: {
    GetTotalMoneySaved(index) {
      if (index <= 0) {
        return 0;
      }

      return (
        (this.data.Plans[0].MonthlyPrice -
          this.data.Plans[index].MonthlyPrice) *
        this.data.Plans[index].Months
      ).toFixed(2);
    }
  }
};
</script>

<style lang="scss">
.subscription-duration-picker {
  .plans {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .plan {
      width: calc(30% - 10px);
      border: 1px solid $purple;
      border-radius: 4px;

      &:nth-child(2) {
        width: calc(40% - 10px);
        -webkit-box-shadow: 0px 0px 5px 0px rgba(255, 72, 0, 0.75);
        -moz-box-shadow: 0px 0px 5px 0px rgba(255, 72, 0, 0.75);
        box-shadow: 0px 0px 5px 0px rgba(255, 72, 0, 0.75);
        border: 1px solid $orange;

        .price-tag {
          margin-top: 40px;
        }

        .save-value {
          margin-bottom: 40px;
        }
      }

      .header {
        background: $dark-3;
        color: $orange;
        padding: 10px;
        font-size: 20px;
        text-transform: uppercase;
        font-weight: 400;
        text-align: center;
      }

      .price-tag {
        color: white;
        font-weight: normal;
        text-align: center;
        margin-top: 20px;

        .price {
          font-size: 24px;

          &:before {
            content: "$";
          }
        }
      }

      .subscribe-button {
        padding: 10px;
        padding-top: 0;

        button {
          width: 100%;
        }
      }

      .save-value {
        color: white;
        text-align: center;
        text-transform: uppercase;
        font-size: 14px;
        margin-bottom: 20px;
        margin-top: 5px;
        color: $orange;
        font-weight: 500;
        height: 18px;
      }
    }
  }
}
</style>
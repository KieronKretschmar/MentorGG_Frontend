<template>
  <div class="round-picker">
    <i class="material-icons prev">chevron_left</i>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <!-- first half -->
        <div
          v-for="(roundSummary) in _1stHalf"
          :key="roundSummary.Round"
          class="swiper-slide half-1"
          :wintype="roundSummary.WinType"
          :winner="roundSummary.WinnerTeam"
          :class="{active: currentRound == roundSummary.Round}"
          @click="$emit('roundchange', roundSummary)"
        >{{ roundSummary.Round }}</div>

        <!-- half time -->
        <div class="swiper-slide half-time">
          <span class="score-1">{{ _1stHalfFinalScore['3'] }}</span>
          <i class="fas fa-random"></i>
          <span class="score-2">{{ _1stHalfFinalScore['2'] }}</span>
        </div>

        <!-- second half -->
        <div
          v-for="(roundSummary) in _2ndHalf"
          :key="roundSummary.Round"
          class="swiper-slide half-2"
          :wintype="roundSummary.WinType"
          :winner="roundSummary.WinnerTeam"
          :class="{active: currentRound == roundSummary.Round}"
          @click="$emit('roundchange', roundSummary)"
        >{{ roundSummary.Round }}</div>

        <!--final result -->
        <div class="swiper-slide final-result">
          <span class="score-1">{{ _2ndHalfFinalScore['3'] }}</span>
          <i class="fas fa-trophy"></i>
          <span class="score-2">{{ _2ndHalfFinalScore['2'] }}</span>
        </div>
      </div>
    </div>
    <i class="material-icons next">chevron_right</i>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  props: ["roundSummaries", "currentRound"],
  mounted() {
    new Swiper(".swiper-container", {
      direction: "horizontal",
      grabCursor: false,
      speed: 350,
      loop: false,
      slidesPerView: 15,
      spaceBetween: 10,
      slidesPerGroup: 5,
      navigation: {
        nextEl: ".next",
        prevEl: ".prev"
      }
    });
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    _1stHalf() {
      return this.roundSummaries.filter(s => s.Round < 16);
    },
    _2ndHalf() {
      return this.roundSummaries.filter(s => s.Round > 15);
    },
    _1stHalfFinalScore() {
      return this.roundSummaries.reduce(
        (acc, cur) => {
          if (cur.Round < 16) {
            acc[cur.WinnerTeam]++;
          }

          return acc;
        },
        { "2": 0, "3": 0 }
      );
    },
    _2ndHalfFinalScore() {
      return this.roundSummaries.reduce(
        (acc, cur) => {
          acc[cur.WinnerTeam]++;

          return acc;
        },
        { "2": 0, "3": 0 }
      );
    }
  }
};
</script>

<style lang="scss">
.round-picker {
  display: flex;
  align-items: center;
  color: white;
  padding: 0 50px;
  margin-top: 30px;

  .next,
  .prev {
    font-size: 40px;
    cursor: pointer;
    outline: 0;
    user-select: none;
  }
}

.swiper-container {
  width: 100%;

  .swiper-wrapper {
    .swiper-slide {
      justify-content: center;
      display: flex;
      align-items: center;
      position: relative;
      font-size: 14px;
      height: 68px;

      &.half-1,
      &.half-2 {
        cursor: pointer;
        transition: 0.35s;

        &:hover {
          color: crimson;
        }
      }

      &.active {
        color: crimson;
        font-weight: bold;
      }

      &.half-time,
      &.final-result {
        position: relative;

        .score-1,
        .score-2 {
          position: absolute;
          width: 100%;
          text-align: center;
          display: block;
        }

        .score-1 {
          top: 0;
          color: $terrorist-color;
        }

        .score-2 {
          bottom: 0;
          color: $ct-color;
        }

        &:after {
          content: none;
        }
      }

      &.half-time {
        .score-1 {
          color: $ct-color;
        }

        .score-2 {
          color: $terrorist-color;
        }
      }

      &.half-2 {
        &[winner="2"] {
          &:after {
            color: $ct-color;
            bottom: 0;
          }
        }
        &[winner="3"] {
          &:after {
            color: $terrorist-color;
            top: 0;
          }
        }
      }

      &[wintype] {
        &:after {
          font-size: 16px;
        }
      }

      //Killed entire team
      &[wintype="0"] {
        &:after {
          @include font-awesome;
          content: "\F54C";
        }
      }

      //Time up
      &[wintype="1"] {
        &:after {
          @include font-awesome;
          content: "\f017";
        }
      }

      //C4
      &[wintype="2"] {
        &:after {
          @include weapon-font;
          content: "a";
          font-size: 20px;
        }
      }

      //Defuse
      &[wintype="3"] {
        &:after {
          @include weapon-font;
          content: "j";
          font-size: 20px;
        }
      }

      //Hostage
      &[wintype="4"] {
        &:after {
          @include font-awesome;
          content: "\f183";
          font-size: 16px;
        }
      }

      &[winner="2"] {
        &:after {
          color: $terrorist-color;
          bottom: 0;
        }
      }
      &[winner="3"] {
        &:after {
          color: $ct-color;
          top: 0;
        }
      }

      &:after {
        content: "x";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
<template>
  <div class="subscription">
    <div class="wrapper-top">
      <div class="bordered-box offer">
        <div class="subheadline">
          <p>FREE</p>
        </div>
        <div class="content">
          <p>
            <span class="large upper">$ 0.00</span>
          </p>
        </div>
        <div class="content-two">
          <p class="strong">View Features</p>
        </div>
        <div class="content-three">
          <button class="button-disabled">Owned</button>
        </div>
      </div>
      <div class="bordered-box offer">
        <div class="subheadline">
          <p>PREMIUM</p>
        </div>
        <div class="content">
          <p>
            <span>starting at</span><br>
            <span class="large">$ 4.99</span><br>
            <span>per month</span>
          </p>
        </div>
        <div class="content-two">
          <p class="strong">View Features</p>
        </div>
        <div class="content-three">
          <button class="button">Subscribe</button>
        </div>
      </div>
      <div class="bordered-box offer">
        <div class="subheadline">
          <p>ULTIMATE</p>
        </div>
        <div class="content">
          <p>
            <span>starting at</span><br>
            <span class="large">$ 14.99</span><br>
            <span>per month</span>
          </p>
        </div>
        <div class="content-two">
          <p class="strong">View Features</p>
        </div>
        <div class="content-three">
          <button class="button">Subscribe</button>
        </div>
      </div>
    </div>

    <div class="wrapper-middle">
      <div class="bordered-box offer-table">
        <p>VAT etc.</p>
      </div>
    </div>

    <div class="wrapper-bottom">
      <div class="bordered-box offer-table-two">
        <div class="table-header">
          <span>FEATURES</span>
          <span>FREE</span>
          <span>PREMIUM</span>
          <span>ULTIMATE</span>
        </div>
        <div class="table-content">
          <span>Analyze matches</span>
          <span>3 per day</span>
          <span>5 per day</span>
          <span>Unlimited</span>
        </div>
        <div class="table-content">
          <span>Matches are deleted after</span>
          <span>2 weeks</span>
          <span>2 months</span>
          <span>6 months</span>
        </div>
        <div class="table-content">
          <span>2D DemoViewer</span>
          <span>Low quality (1 FPS)</span>
          <span>Medium quality (8 FPS)</span>
          <span>High quality (16 FPS)</span>
        </div>
        <div class="table-content">
          <span>Demo upload</span>
          <span>Up to 20 demos manually</span>
          <span>Unlimited manual uploads</span>
          <span>Unlimited manual uploads</span>
        </div>
        <div class="table-content">
          <span>Automatic upload</span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
        </div>
        <div class="table-content">
          <span>Grenade analysis</span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
        </div>
        <div class="table-content">
          <span>Kill analysis</span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
        </div>
        <div class="table-content">
          <span>Misplays from your last match</span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
        </div>
        <div class="table-content">
          <span>Basic match filters</span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
        </div>
        <div class="table-content">
          <span>Best and worst positions</span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
        </div>
        <div class="table-content">
          <span>Additional match filters</span>
          <span class="cross"></span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
        </div>
        <div class="table-content">
          <span>Extended kill analysis</span>
          <span class="cross"></span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
        </div>
        <div class="table-content">
          <span>Premium support in discord</span>
          <span class="cross"></span>
          <span class="check"><i class="material-icons">check</i></span>
          <span class="check"><i class="material-icons">check</i></span>
        </div>
        <div class="table-content">
          <span>Priority queue for demo analysis</span>
          <span class="cross"></span>
          <span class="cross"></span>
          <span class="check"><i class="material-icons">check</i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.subscription {
  margin: 20px 20px 60px 20px;
}
.bordered-box {
  background: $dark-1;
  border: 1px solid $purple;
  padding: 10px 25px;
  border-radius: 4px;
  min-width: 300px;
  width: calc(33% - 5px);
}
.offer {
  background: $dark-1;
  flex-grow: 1;
  margin: 5px;
  padding: 0;
  text-align: center;
  max-width: 350px;
}
.content {
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-two {
  height: 30px;
  margin: 0 0 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-three {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.wrapper-middle {
  display: flex;
  justify-content: center;
}
.wrapper-bottom {
  display: flex;
  justify-content: center;
}

p {
  color: #fff;
  font-weight: 500;
}
.subheadline  {
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
}
p span {
  display: inline-block;
}
.large {
  font-size: 2rem;
  font-weight: 600;
  padding: 3px 0;
}
.small {
  font-size: 0.9rem;
  font-weight: 400;
  padding-top: 15px;
}
/*.high {
  vertical-align: top;
}*/
.strong {
  font-weight: 500;
  text-decoration: underline;
  margin: 0;
}
.material-icons {
  line-height: 0.8;
}
.check {
  height: 18px;
  color: $orange;
}
/*.cross {
  font-size: 14px;
  color: $red;
} */

.button {
  min-width: 160px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  border-radius: 10px;
  padding: 0.65em 1.785em 0.75em 1.785em;
  background-color: $green-2;
  border: 1px solid $green;
  line-height: 1;
  cursor: pointer;
  &-disabled {
        @extend .button;
        color: $dark-4;
        background-color: transparent;
        border: 1px solid $dark-4;
      }
}
.offer-table {
  background: $dark-1;
  flex-grow: 1;
  margin: 5px;
  padding: 0;
  text-align: center;
  max-width: 1070px;
  &-two {
        @extend .offer-table;
        margin-top: 20px;
      }
}

.table-header {
  color: $orange;
  background-color: $dark-3;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  padding: 12px 32px 12px 32px;
  margin: 0;
  border-radius: 4px 4px 0 0;

  span {
    &:nth-child(1) {
      width: 25%;
      color: #fff;
    }
    &:nth-child(2) {
      width: 25%;
    }
    &:nth-child(3) {
      width: 25%;
    }
    &:nth-child(4) {
      width: 25%;
    }
  }
}

.table-content {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  border-bottom: 1px solid $purple;
  padding: 12px;
  margin: 0 20px 0 20px;
  &:last-child {
    border-bottom: none;
  }

  span {
    &:nth-child(1) {
      width: 25%;
    }
    &:nth-child(2) {
      width: 25%;
    }
    &:nth-child(3) {
      width: 25%;
    }
    &:nth-child(4) {
      width: 25%;
    }
  }
}
</style>
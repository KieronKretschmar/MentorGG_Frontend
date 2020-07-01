<template>
  <div class="view view-better-membership">
    <div class="fixed-width-container">
      <h2 class="section-header">Membership & Pricing</h2>

      <div class="pricing-boxes">
        <div class="pricing-box">
          <div class="title">Free</div>
          <div class="feature-list">
            <div class="feature circle"><span>Analyze a total of <span class="highlight">3</span> matches <span class="highlight">every 24 hours</span></span></div>
            <div class="feature circle"><span><span class="highlight">2 weeks</span> match storage</span></div>
            <div class="feature circle"><span><span class="highlight">1 FPS</span> Demo Viewer</span></div>
            <div class="feature circle"><span>Upload a total of up to <span class="highlight">20 demos</span> manually</span></div>
            <div class="feature circle no-border"><span><span class="highlight">Limited</span> filter availability</span></div>
            <div class="feature list">Extras</div>
            <div class="feature check">Automatic upload</div>
            <div class="feature check">Grenade analysis</div>
            <div class="feature check">Kill analysis</div>
            <div class="feature check">Misplay detection</div>
            <div class="feature check">Best and worst positions</div>
          </div>
          <div class="price-tag">
            <span class="price">0</span> / month
          </div>
          <div class="subscribe-button">
            <button class="button-variant-bordered upgrade">Subscribe</button>
          </div>
        </div>
        <div class="pricing-box">
          <div class="title">Premium</div>
          <div class="feature-list">
            <div class="feature circle"><span>Analyze an <span class="highlight">unlimited</span> number of matches</span></div>
            <div class="feature circle"><span><span class="highlight">2 months</span> match storage</span></div>
            <div class="feature circle"><span><span class="highlight">4 FPS</span> Demo Viewer</span></div>
            <div class="feature circle"><span>Upload an <span class="highlight">unlimited</span> number of demos manually</span></div>
            <div class="feature circle no-border"><span><span class="highlight">Full</span> filter availability</span></div>
            <div class="feature arrow">Includes all FREE extras</div>
            <div class="feature check">Best and worst positions</div>
            <div class="feature check">Full access to misplays &amp; highlights</div>
            <div class="feature check">Download your demos</div>
            <div class="feature check">Extended kill analysis</div>
            <div class="feature check">Premium support</div>
          </div>
          <div class="price-tag">
            <span class="price">5.49*</span> / month
          </div>
          <div class="subscribe-button">
            <button class="button-variant-bordered upgrade">Subscribe</button>
          </div>
        </div>
        <div class="pricing-box">
          <div class="title">Ultimate</div>
          <div class="feature-list">
            <div class="feature circle"><span>Analyze an <span class="highlight">unlimited</span> number of matches</span></div>
            <div class="feature circle"><span><span class="highlight">Unlimited</span> match storage</span></div>
            <div class="feature circle"><span><span class="highlight">8 FPS</span> Demo Viewer</span></div>
            <div class="feature circle"><span>Upload an <span class="highlight">unlimited</span> number of demos manually</span></div>
            <div class="feature circle no-border"><span><span class="highlight">Full</span> filter availability</span></div>
            <div class="feature arrow">Includes all PREMIUM extras</div>
          </div>
          <div class="price-tag">
            <span class="price">9.49*</span> / month
          </div>
          <div class="subscribe-button">
            <button class="button-variant-bordered upgrade">Subscribe</button>
          </div>
        </div>
      </div>
      <div class="bordered-box vat-hint">
        <p>* All prices are net prices excl. VAT, which will be charged at the statutory rate depending on your location.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.view-better-membership {
  margin-top: 70px;

  .pricing-boxes {
    display: flex;
    margin: -5px;

    .pricing-box {
      width: calc(33.33% - 10px);
      background: $dark-1;
      border: 1px solid $purple;
      margin: 5px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;

      .title {
        color: $orange;
        background: $dark-3;
        padding: 10px;
        text-align: center;
        // font-weight: 500;
        text-transform: uppercase;
        font-size: 20px;
      }

      .feature-list {
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;

        .feature {
          display: flex;
          align-items: center;
          color: white;
          margin-bottom: 10px;
          border-bottom: 1px solid $dark-3;
          padding-bottom: 10px;
          font-size: 14px;

          .highlight {
              font-weight: 700;
            // background: $purple;
            // padding: 2px 3px;
            // border-radius: 4px;
            //   font-weight: 500;
            //   color: $green-2;
          }

          &:last-child {
            border-bottom: 0;
            margin-bottom: 0;
            padding-bottom: 0;
          }

          &.list {
            margin-top: 30px;
            color: $orange;

            &:before {
              content: "list";
              color: $green;
              margin-right: 10px;
              font-family: "Material Icons";
              font-weight: normal;
              font-style: normal;
              font-size: 24px;
            }
          }

          &.check {
            &:before {
              content: "check";
              color: $green;
              margin-right: 10px;
              font-family: "Material Icons";
              font-weight: normal;
              font-style: normal;
              font-size: 24px;
            }
          }

          &.circle {
            &:before {
              content: "star_border";
              color: $dark-4;
              margin-right: 10px;
              font-family: "Material Icons";
              font-weight: normal;
              font-style: normal;
              font-size: 24px;
            }
          }

          &.arrow {
            color: $orange;
            margin-top: 30px;

            &:before {
              content: "west";
              color: $green;
              margin-right: 10px;
              font-family: "Material Icons";
              font-weight: normal;
              font-style: normal;
              font-size: 24px;
            }
          }

          &.no-border {
              border-bottom: 0;
          }
        }
      }

      .price-tag {
        background: $dark-3;
        padding: 10px;
        text-align: center;
        color: $orange;

        .price {
          font-size: 24px;

          &:before {
            content: "$";
          }
        }
      }

      .subscribe-button {
        padding: 10px;

        button {
          width: 100%;
        }
      }
    }
  }

  .vat-hint {
    margin-top: 10px;
    color: white;

    p {
      margin: 0;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
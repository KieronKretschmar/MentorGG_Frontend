<template>
  <div class="view view-faq">
    <div class="fixed-width-container">
      <div class="bordered-box">
        <h1>Frequently Asked Questions</h1>
      </div>

      <div class="category" v-for="(categoryId, categoryName) in categories" :key="categoryName">
        <h2 class="section-header">{{ categoryName }}</h2>
        <div class="faq-entries">
          <div
            class="entry"
            v-for="entry in faq[categoryId]"
            :key="entry.q"
            :class="{open: entry.open}"
          >
            <div class="bordered-box">
              <div class="header" @click="ToggleEntry(entry)">
                <div class="q" v-html="entry.q"></div>
                <div class="toggle">
                  <i class="fas fa-chevron-down"></i>
                </div>
              </div>
              <div v-if="entry.open" class="a" v-html="entry.a"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  beforeMount() {
    for (let key in this.categories) {
      this.faq[this.categories[key]] = [];
    }

    this.RegisterFAQEntry(
      this.categories.General,
      "Do I have to fear for my Steam Account when logging in?",
      "No. Authentication with Steam was developed by Steam to make sure of this. As you only enter your credentials on Steam's official login site, we can not access them (and also, we don't want to)."
    );

    this.RegisterFAQEntry(
      this.categories.General,
      "Can I get VAC banned when using MENTOR.GG?",
      "No. Using MENTOR.GG is perfectly fine in accordance to VAC rules. VAC is looking for malicious programs running on your computer when playing CS:GO. Because the analytics of MENTOR.GG run on our servers, them being identified as a cheat by VAC is impossible."
    );

    this.RegisterFAQEntry(
      this.categories.General,
      "What perks do I get when I put \"MENTOR.GG\" in my Steam name?",
      "Users who do this get free access to their misplays and highlights from the second half of each match, instead of just the first."
    );

    this.RegisterFAQEntry(
      this.categories.General,
      "I have a question that is not answered here. Where can I ask it?",
      "Please join our discord server and contact us there. We're happy to help!"
    );

    this.RegisterFAQEntry(
      this.categories.Upload,
      "How does the automatic upload work?",
      "If you enable automatic upload for Valve's matchmaking or FACEIT, a request for your newest matches on that platform will be triggered whenever you visit MENTOR.GG. So please be patient for up to a minute if your matches don't show up right away."
    );

    this.RegisterFAQEntry(
      this.categories.Upload,
      "I have configured automatic upload but i can't see my matches.",
      "If you waited for several minutes and nothing happens, please join our discord server and contact us there, and we'll see how we can help."
    );

    this.RegisterFAQEntry(
      this.categories.Upload,
      "Can I upload POV demos that I recorded myself?",
      "No, sadly these demos do not contain the information we need in order to analyze them."
    );

    this.RegisterFAQEntry(
      this.categories.Upload,
      "For one or more of my matches the analysis has failed or the matches are too old. What can I do about it?",
      "This can have a variety of reasons, but usually there's nothing you can do about it. Examples for circumstances where this happens: We can't access the demo file because Valve removed it from their servers (usually happens after 2-3 weeks); You uploaded a POV demo which our software can not analyze; On rare occasions our software can not analyze the demo because it contains unexpected data."
    );
  },
  data() {
    return {
      faq: [],
      categories: {
        General: 1,
        Upload: 2
      }
    };
  },
  methods: {
    RegisterFAQEntry(c, q, a) {
      this.faq[c].push(
        Vue.observable({
          q: q,
          a: a,
          open: false
        })
      );
    },
    ToggleEntry(entry) {
      entry.open = !entry.open;
    }
  }
};
</script>

<style lang="scss">
.view-faq {
  .bordered-box {
    margin-top: 30px;

    h1 {
      font-size: 1.5em;
    }
  }

  .category {
    .section-header {
      margin-top: 20px;
    }

    .faq-entries {
      .entry {
        .bordered-box {
          margin-top: 10px;

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            user-select: none;

            .q {
              color: white;
              font-weight: 500;
            }

            i {
              color: $orange;
              font-size: 20px;
              transition: 0.35s;
            }
          }

          .a {
            color: white;
            margin-top: 10px;
            padding-top: 10px;
            background: $dark-3;
            padding: 10px;
            border-radius: 4px;
          }
        }

        &.open {
          .bordered-box {
            .header {
              i {
                transform: rotate(180deg);
              }
            }
          }
        }
      }
    }
  }
}
</style>
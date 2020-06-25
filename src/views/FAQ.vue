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
      "How are you today?",
      "I'm good, thanks!"
    );

    this.RegisterFAQEntry(
      this.categories.General,
      "What is Lorem Ipsum?",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br><br>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br><br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    );

    this.RegisterFAQEntry(
      this.categories.Upload,
      "I have configured automatic upload but i can't see my matches.",
      "bummer!"
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